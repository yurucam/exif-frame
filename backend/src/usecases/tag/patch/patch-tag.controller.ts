import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { z } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { patchTagInput } from './patch-tag.input';
import { patchTagOutput } from './patch-tag.output';
import { authMiddleware } from '../../../utils/auth.middleware';
import { isAdmin } from '../../../utils/role.util';

export function patchTagController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'patch',
      path: '/tags/{id}',
      tags: ['Tag'],
      summary: '태그 수정',
      description: '기존 태그를 수정합니다. (관리자 전용)',
      security: [{ Bearer: [] }],
      middleware: [authMiddleware],
      request: {
        params: z.object({
          id: z.string().transform((val) => parseInt(val, 10)),
        }),
        body: {
          content: {
            'application/json': {
              schema: patchTagInput,
            },
          },
        },
      },
      responses: {
        200: {
          description: '태그 수정 성공',
          content: {
            'application/json': {
              schema: patchTagOutput,
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
        409: {
          description: '중복된 태그명',
        },
      },
    }),
    async (context) => {
      const { id } = context.req.valid('param');
      const input = context.req.valid('json');
      const db = context.env.db;
      const member = context.get('member');

      // 관리자 권한 체크
      if (!member || !isAdmin(member.role)) {
        throw new HTTPException(403, { message: '관리자만 태그를 수정할 수 있습니다.' });
      }

      // 태그 존재 확인
      const existingTag = await db.selectFrom('tag').select(['id', 'name']).where('id', '=', id).executeTakeFirst();

      if (!existingTag) {
        throw new HTTPException(404, { message: '태그를 찾을 수 없습니다.' });
      }

      // 이름 변경 시 중복 체크
      if (input.name && input.name !== existingTag.name) {
        const duplicateTag = await db.selectFrom('tag').select(['id']).where('name', '=', input.name).executeTakeFirst();

        if (duplicateTag) {
          throw new HTTPException(409, { message: '이미 존재하는 태그명입니다.' });
        }
      }

      // 업데이트할 필드 구성
      const updateData: any = {};
      if (input.name) updateData.name = input.name;
      if (input.color) updateData.color = input.color;

      // 태그 수정
      const updatedTag = await db
        .updateTable('tag')
        .set(updateData)
        .where('id', '=', id)
        .returning(['id', 'name', 'color', 'usageCount', 'createdAt', 'updatedAt'])
        .executeTakeFirstOrThrow();

      return context.json({
        id: updatedTag.id,
        name: updatedTag.name,
        color: updatedTag.color,
        usageCount: updatedTag.usageCount,
        createdAt: updatedTag.createdAt,
        updatedAt: updatedTag.updatedAt,
      });
    }
  );
}
