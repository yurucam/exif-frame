import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { z } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { deleteTagOutput } from './delete-tag.output';
import { authMiddleware } from '../../../utils/auth.middleware';
import { isAdmin } from '../../../utils/role.util';

export function deleteTagController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'delete',
      path: '/tags/{id}',
      tags: ['Tag'],
      summary: '태그 삭제',
      description: '기존 태그를 삭제합니다. 관련된 모든 ThemeTag 관계도 함께 삭제됩니다. (관리자 전용)',
      security: [{ Bearer: [] }],
      middleware: [authMiddleware],
      request: {
        params: z.object({
          id: z.string().transform((val) => parseInt(val, 10)),
        }),
      },
      responses: {
        200: {
          description: '태그 삭제 성공',
          content: {
            'application/json': {
              schema: deleteTagOutput,
            },
          },
        },
        401: {
          description: '인증 실패',
        },
        403: {
          description: '권한 없음 (관리자 전용)',
        },
        404: {
          description: '태그를 찾을 수 없음',
        },
      },
    }),
    async (context) => {
      const { id } = context.req.valid('param');
      const db = context.env.db;
      const member = context.get('member');

      // 관리자 권한 체크
      if (!member || !isAdmin(member.role)) {
        throw new HTTPException(403, { message: '관리자만 태그를 삭제할 수 있습니다.' });
      }

      // 태그 존재 확인
      const existingTag = await db.selectFrom('tag').select(['id', 'name']).where('id', '=', id).executeTakeFirst();

      if (!existingTag) {
        throw new HTTPException(404, { message: '태그를 찾을 수 없습니다.' });
      }

      // 트랜잭션으로 관련 데이터 모두 삭제
      await db.transaction().execute(async (trx) => {
        // 1. 관련된 ThemeTag 관계 모두 삭제
        await trx.deleteFrom('themeTag').where('tagId', '=', id).execute();

        // 2. 태그 삭제
        await trx.deleteFrom('tag').where('id', '=', id).execute();
      });

      return context.json({
        message: `태그 '${existingTag.name}'이(가) 성공적으로 삭제되었습니다.`,
      });
    }
  );
}
