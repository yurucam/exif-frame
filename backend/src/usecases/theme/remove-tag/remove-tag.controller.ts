import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { z } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { removeTagOutput } from './remove-tag.output';
import { authMiddleware, getCurrentMember } from '../../../utils/auth.middleware';
import { isAdmin } from '../../../utils/role.util';

export function removeTagController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'delete',
      path: '/themes/{id}/tags/{tagId}',
      tags: ['Theme'],
      summary: '테마에서 태그 제거',
      description: '기존 테마에서 태그를 제거합니다. 작성자 또는 관리자만 제거할 수 있습니다.',
      security: [{ Bearer: [] }],
      middleware: [authMiddleware],
      request: {
        params: z.object({
          id: z.string().transform((val) => parseInt(val, 10)),
          tagId: z.string().transform((val) => parseInt(val, 10)),
        }),
      },
      responses: {
        200: {
          description: '태그 제거 성공',
          content: {
            'application/json': {
              schema: removeTagOutput,
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
          description: '테마, 태그 또는 연결 관계를 찾을 수 없음',
        },
      },
    }),
    async (context) => {
      const { id, tagId } = context.req.valid('param');
      const db = context.env.db;
      const member = getCurrentMember(context)!;

      // 테마 존재 확인 및 작성자 정보 조회
      const existingTheme = await db.selectFrom('theme').select(['id', 'name', 'memberId']).where('id', '=', id).executeTakeFirst();

      if (!existingTheme) {
        throw new HTTPException(404, { message: '테마를 찾을 수 없습니다.' });
      }

      // 권한 체크 (작성자 또는 관리자)
      if (existingTheme.memberId !== member.id && !isAdmin(member.role)) {
        throw new HTTPException(403, { message: '테마에서 태그를 제거할 권한이 없습니다.' });
      }

      // 태그 존재 확인
      const existingTag = await db.selectFrom('tag').select(['id', 'name']).where('id', '=', tagId).executeTakeFirst();

      if (!existingTag) {
        throw new HTTPException(404, { message: '태그를 찾을 수 없습니다.' });
      }

      // ThemeTag 관계 존재 확인
      const existingThemeTag = await db
        .selectFrom('themeTag')
        .select(['id'])
        .where('themeId', '=', id)
        .where('tagId', '=', tagId)
        .executeTakeFirst();

      if (!existingThemeTag) {
        throw new HTTPException(404, { message: '테마에 연결되지 않은 태그입니다.' });
      }

      // 트랜잭션으로 태그 연결 해제 및 사용횟수 감소
      await db.transaction().execute(async (trx) => {
        // 1. ThemeTag 관계 삭제
        await trx.deleteFrom('themeTag').where('id', '=', existingThemeTag.id).execute();

        // 2. 태그 사용횟수 감소
        await trx
          .updateTable('tag')
          .set((eb) => ({ usageCount: eb('usageCount', '-', 1) }))
          .where('id', '=', tagId)
          .execute();
      });

      // 업데이트된 태그 목록 조회
      const updatedTags = await db
        .selectFrom('themeTag')
        .innerJoin('tag', 'themeTag.tagId', 'tag.id')
        .select(['tag.id', 'tag.name', 'tag.color'])
        .where('themeTag.themeId', '=', id)
        .execute();

      return context.json({
        tags: updatedTags.map((tag) => ({
          id: tag.id,
          name: tag.name,
          color: tag.color,
        })),
        message: `태그 '${existingTag.name}'이(가) 테마에서 제거되었습니다.`,
      });
    }
  );
}
