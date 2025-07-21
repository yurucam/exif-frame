import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { z } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { deleteThemeOutput } from './delete-theme.output';
import { authMiddleware, getCurrentMember } from '../../../utils/auth.middleware';
import { isAdmin } from '../../../utils/role.util';

export function deleteThemeController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'delete',
      path: '/themes/{id}',
      tags: ['Theme'],
      summary: '테마 삭제',
      description:
        '기존 테마를 삭제합니다. 관련된 모든 데이터(태그 관계, 좋아요)도 함께 삭제됩니다. 작성자 또는 관리자만 삭제할 수 있습니다.',
      security: [{ Bearer: [] }],
      middleware: [authMiddleware],
      request: {
        params: z.object({
          id: z.string().transform((val) => parseInt(val, 10)),
        }),
      },
      responses: {
        200: {
          description: '테마 삭제 성공',
          content: {
            'application/json': {
              schema: deleteThemeOutput,
            },
          },
        },
        401: {
          description: '인증 실패',
        },
        403: {
          description: '권한 없음 (작성자 또는 관리자만)',
        },
        404: {
          description: '테마를 찾을 수 없음',
        },
      },
    }),
    async (context) => {
      const { id } = context.req.valid('param');
      const db = context.env.db;
      const member = getCurrentMember(context)!;

      // 테마 존재 확인 및 작성자 정보 조회
      const existingTheme = await db.selectFrom('theme').select(['id', 'name', 'memberId']).where('id', '=', id).executeTakeFirst();

      if (!existingTheme) {
        throw new HTTPException(404, { message: '테마를 찾을 수 없습니다.' });
      }

      // 권한 체크 (작성자 또는 관리자)
      if (existingTheme.memberId !== member.id && !isAdmin(member.role)) {
        throw new HTTPException(403, { message: '테마를 삭제할 권한이 없습니다.' });
      }

      // 트랜잭션으로 관련 데이터 모두 삭제
      await db.transaction().execute(async (trx) => {
        // 1. 테마와 연결된 태그들의 사용횟수 감소
        const themeTags = await trx.selectFrom('themeTag').select(['tagId']).where('themeId', '=', id).execute();

        if (themeTags.length > 0) {
          const tagIds = themeTags.map((tt) => tt.tagId);
          await trx
            .updateTable('tag')
            .set((eb) => ({ usageCount: eb('usageCount', '-', 1) }))
            .where('id', 'in', tagIds)
            .execute();
        }

        // 2. 관련된 ThemeTag 관계 삭제
        await trx.deleteFrom('themeTag').where('themeId', '=', id).execute();

        // 3. 관련된 ThemeLike 삭제
        await trx.deleteFrom('themeLike').where('themeId', '=', id).execute();

        // 4. 테마 삭제
        await trx.deleteFrom('theme').where('id', '=', id).execute();
      });

      return context.json({
        message: `테마 '${existingTheme.name}'이(가) 성공적으로 삭제되었습니다.`,
      });
    }
  );
}
