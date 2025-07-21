import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { retrievePersonalInformationOutput } from './retrieve-personal-information.output';
import { authMiddleware, getCurrentMember } from '../../../utils/auth.middleware';

export function retrievePersonalInformationController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'get',
      path: '/retrieve-personal-information',
      tags: ['Member'],
      summary: '개인정보 조회',
      description: '사용자의 개인정보를 조회합니다.',
      security: [{ Bearer: [] }],
      middleware: [authMiddleware],
      responses: {
        200: {
          description: '개인정보 조회 성공',
          content: {
            'application/json': {
              schema: retrievePersonalInformationOutput,
            },
          },
        },
        401: {
          description: '인증 실패',
        },
        404: {
          description: '사용자를 찾을 수 없음',
        },
      },
    }),
    async (context) => {
      try {
        // 1. 미들웨어에서 설정된 멤버 정보 가져오기 (미들웨어에서 이미 검증됨)
        const member = getCurrentMember(context)!;

        // 2. 개인정보 반환 (비밀번호 제외)
        return context.json(
          {
            id: member.id,
            name: member.name,
            nickname: member.nickname,
            bio: member.bio,
            role: member.role,
          },
          200
        );
      } catch (error) {
        console.error('Retrieve personal information error:', error);
        return context.json({ error: '서버 오류가 발생했습니다.' }, 500);
      }
    }
  );
}
