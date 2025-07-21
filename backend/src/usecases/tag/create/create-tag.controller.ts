import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { Bindings } from '../../../types';
import { createTagInput } from './create-tag.input';
import { createTagOutput } from './create-tag.output';
import { authMiddleware } from '../../../utils/auth.middleware';
import { isAdmin } from '../../../utils/role.util';

export function createTagController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'post',
      path: '/tags',
      tags: ['Tag'],
      summary: '태그 생성',
      description: '새로운 태그를 생성합니다. (관리자 전용)',
      security: [{ Bearer: [] }],
      middleware: [authMiddleware],
      request: {
        body: {
          content: {
            'application/json': {
              schema: createTagInput,
            },
          },
        },
      },
      responses: {
        201: {
          description: '태그 생성 성공',
          content: {
            'application/json': {
              schema: createTagOutput,
            },
          },
        },
        401: {
          description: '인증 실패',
        },
        403: {
          description: '권한 없음 (관리자 전용)',
        },
        409: {
          description: '중복된 태그명',
        },
      },
    }),
    async (context) => {
      const input = context.req.valid('json');
      const db = context.env.db;
      const member = context.get('member');

      // 관리자 권한 체크
      if (!member || !isAdmin(member.role)) {
        throw new HTTPException(403, { message: '관리자만 태그를 생성할 수 있습니다.' });
      }

      // 중복 태그명 체크
      const existingTag = await db.selectFrom('tag').select(['id']).where('name', '=', input.name).executeTakeFirst();

      if (existingTag) {
        throw new HTTPException(409, { message: '이미 존재하는 태그명입니다.' });
      }

      // 태그 생성
      const newTag = await db
        .insertInto('tag')
        .values({
          name: input.name,
          color: input.color,
          usageCount: 0,
        })
        .returning(['id', 'name', 'color', 'usageCount', 'createdAt', 'updatedAt'])
        .executeTakeFirstOrThrow();

      return context.json(
        {
          id: newTag.id,
          name: newTag.name,
          color: newTag.color,
          usageCount: newTag.usageCount,
          createdAt: newTag.createdAt,
          updatedAt: newTag.updatedAt,
        },
        201
      );
    }
  );
}
