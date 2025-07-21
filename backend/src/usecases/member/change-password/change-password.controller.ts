import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { changePasswordInput } from './change-password.input';
import { changePasswordOutput } from './change-password.output';
import { verifyPassword, hashPassword } from '../../../utils/password.util';
import { authMiddleware, getCurrentMember } from '../../../utils/auth.middleware';

export function changePasswordController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'post',
      path: '/change-password',
      tags: ['Member'],
      summary: '비밀번호 변경',
      description: '사용자의 비밀번호를 변경합니다.',
      security: [{ Bearer: [] }],
      middleware: [authMiddleware],
      request: {
        body: {
          content: {
            'application/json': {
              schema: changePasswordInput,
            },
          },
        },
      },
      responses: {
        200: {
          description: '비밀번호 변경 성공',
          content: {
            'application/json': {
              schema: changePasswordOutput,
            },
          },
        },
        401: {
          description: '인증 실패',
        },
        400: {
          description: '잘못된 요청',
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

        // 1. 미들웨어에서 설정된 멤버 정보 가져오기 (미들웨어에서 이미 검증됨)
        const member = getCurrentMember(context)!;

        // 2. 현재 비밀번호 검증
        const isCurrentPasswordValid = await verifyPassword(input.currentPassword, member.password);
        if (!isCurrentPasswordValid) {
          return context.json({ error: '현재 비밀번호가 올바르지 않습니다.' }, 400);
        }

        // 3. 새 비밀번호 해싱
        const hashedNewPassword = await hashPassword(input.newPassword);

        // 4. 비밀번호 업데이트
        await db.updateTable('member').set({ password: hashedNewPassword }).where('id', '=', member.id).execute();

        // 5. 응답 반환
        return context.json(
          {
            result: '비밀번호가 성공적으로 변경되었습니다.',
          },
          200
        );
      } catch (error) {
        console.error('Change password error:', error);
        return context.json({ error: '서버 오류가 발생했습니다.' }, 500);
      }
    }
  );
}
