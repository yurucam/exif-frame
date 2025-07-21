import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { updatePersonalInformationInput } from './update-personal-information.input';
import { updatePersonalInformationOutput } from './update-personal-information.output';
import { authMiddleware, getCurrentMember } from '../../../utils/auth.middleware';
import { getMemberById } from '../../../utils/auth.util';

export function updatePersonalInformationController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'put',
      path: '/update-personal-information',
      tags: ['Member'],
      summary: '개인정보 수정',
      description: '사용자의 개인정보를 수정합니다.',
      security: [{ Bearer: [] }],
      middleware: [authMiddleware],
      request: {
        body: {
          content: {
            'application/json': {
              schema: updatePersonalInformationInput,
            },
          },
        },
      },
      responses: {
        200: {
          description: '개인정보 수정 성공',
          content: {
            'application/json': {
              schema: updatePersonalInformationOutput,
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
        const input = context.req.valid('json');
        const db = context.env.db;

        // 1. 미들웨어에서 설정된 멤버 정보 가져오기 (미들웨어에서 이미 검증됨)
        const member = getCurrentMember(context)!;

        // 2. 개인정보 업데이트 (input에 따라 필요한 필드만 업데이트)
        const updateData: any = {};
        if (input.nickname !== undefined) updateData.nickname = input.nickname;
        if (input.bio !== undefined) updateData.bio = input.bio;

        if (Object.keys(updateData).length > 0) {
          await db.updateTable('member').set(updateData).where('id', '=', member.id).execute();
        }

        // 3. 업데이트된 멤버 정보 조회
        const updatedMember = await getMemberById(context, member.id.toString());

        // 4. 응답 반환 (비밀번호 제외)
        return context.json(
          {
            id: updatedMember?.id,
            name: updatedMember?.name,
            nickname: updatedMember?.nickname,
            bio: updatedMember?.bio,
          },
          200
        );
      } catch (error) {
        console.error('Update personal information error:', error);
        return context.json({ error: '서버 오류가 발생했습니다.' }, 500);
      }
    }
  );
}
