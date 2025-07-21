import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { sign } from 'hono/jwt';
import { Bindings } from '../../../types';
import { signInInput } from './sign-in.input';
import { signInOutput } from './sign-in.output';
import { verifyPassword } from '../../../utils/password.util';

export function signInController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'post',
      path: '/sign-in',
      tags: ['Member'],
      summary: '로그인',
      description: '사용자가 로그인합니다.',
      request: {
        body: {
          content: {
            'application/json': {
              schema: signInInput,
            },
          },
        },
      },
      responses: {
        200: {
          description: '응답',
          content: {
            'application/json': {
              schema: signInOutput,
            },
          },
        },
      },
    }),
    async (context) => {
      const input = context.req.valid('json');
      const db = context.env.db;

      // 1. 사용자 조회
      const user = await db
        .selectFrom('member')
        .select(['id', 'name', 'password', 'nickname', 'bio'])
        .where('name', '=', input.name)
        .executeTakeFirst();

      if (!user) {
        // 사용자가 없으면 에러 발생
        throw new Error('사용자를 찾을 수 없습니다.');
      }

      // 2. 패스워드 검증
      const isPasswordValid = await verifyPassword(input.password, user.password);

      if (!isPasswordValid) {
        // 패스워드가 틀리면 에러 발생
        throw new Error('패스워드가 올바르지 않습니다.');
      }

      // 3. JWT 토큰 생성
      const payload = {
        id: user.id,
        name: user.name,
        iat: Math.floor(Date.now() / 1000), // 문제가 되는 부분
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7일 후 만료
      };

      const token = await sign(payload, context.env.JWT_SECRET_KEY);

      // 4. 응답 반환
      return context.json(
        {
          id: user.id,
          name: user.name,
          nickname: user.nickname,
          bio: user.bio,
          token: token,
        },
        200
      );
    }
  );
}
