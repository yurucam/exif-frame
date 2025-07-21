import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { withdrawInput } from './withdraw.input';
import { withdrawOutput } from './withdraw.output';
import { authMiddleware, getCurrentMember } from '../../../utils/auth.middleware';

export function withdrawController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'delete',
      path: '/withdraw',
      tags: ['Member'],
      summary: '회원탈퇴',
      description: '사용자의 계정을 삭제합니다.',
      security: [{ Bearer: [] }],
      middleware: [authMiddleware],
      request: {
        body: {
          content: {
            'application/json': {
              schema: withdrawInput,
            },
          },
        },
      },
      responses: {
        200: {
          description: '회원탈퇴 성공',
          content: {
            'application/json': {
              schema: withdrawOutput,
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

        // 2. 계정 삭제
        await db.deleteFrom('member').where('id', '=', member.id).execute();

        // 3. 탈퇴 사유
        console.log(`Member ID ${member.id} has withdrawn. Reason: ${input.reason || 'No reason provided'}`); // TODO: 디스코드 웹훅 호출하기

        // 4. 응답 반환
        return context.json(
          {
            result: '회원탈퇴가 성공적으로 처리되었습니다.',
          },
          200
        );
      } catch (error) {
        console.error('Withdraw error:', error);
        return context.json({ error: '서버 오류가 발생했습니다.' }, 500);
      }
    }
  );
}
