import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { Bindings } from '../../../types';
import { manageRoleInput } from './manage-role.input';
import { manageRoleOutput } from './manage-role.output';
import { authMiddleware, requireAdmin } from '../../../utils/auth.middleware';

export function manageRoleController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'patch',
      path: '/manage-role',
      tags: ['Admin'],
      summary: '사용자 권한 관리',
      description: '관리자가 다른 사용자의 권한을 변경합니다.',
      security: [{ Bearer: [] }],
      middleware: [authMiddleware, requireAdmin],
      request: {
        body: {
          content: {
            'application/json': {
              schema: manageRoleInput,
            },
          },
        },
      },
      responses: {
        200: {
          description: '권한 변경 성공',
          content: {
            'application/json': {
              schema: manageRoleOutput,
            },
          },
        },
        401: {
          description: '인증 실패',
        },
        403: {
          description: '권한 없음 (관리자만 접근 가능)',
        },
        404: {
          description: '사용자를 찾을 수 없음',
        },
      },
    }),
    async (context) => {
      try {
        const input = context.req.valid('json');
        const db = context.env.db;

        // 1. 대상 사용자 존재 확인
        const targetMember = await db
          .selectFrom('member')
          .select(['id', 'name', 'nickname', 'role'])
          .where('id', '=', input.memberId)
          .executeTakeFirst();

        if (!targetMember) {
          throw new HTTPException(404, { message: '사용자를 찾을 수 없습니다.' });
        }

        // 2. 권한 업데이트
        const updatedMember = await db
          .updateTable('member')
          .set({ role: input.role })
          .where('id', '=', input.memberId)
          .returning(['id', 'name', 'nickname', 'role', 'updatedAt'])
          .executeTakeFirstOrThrow();

        // 3. 응답 반환
        return context.json(
          {
            id: updatedMember.id,
            name: updatedMember.name,
            nickname: updatedMember.nickname,
            role: updatedMember.role,
            updatedAt: updatedMember.updatedAt,
          },
          200
        );
      } catch (error) {
        if (error instanceof HTTPException) {
          throw error;
        }

        console.error('Manage role error:', error);
        throw new HTTPException(500, { message: '서버 오류가 발생했습니다.' });
      }
    }
  );
}
