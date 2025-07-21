import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { signInInput } from './sign-in.input';
import { signInOutput } from './sign-in.output';
import { verifyPassword } from '../../../utils/password.util';
import {
  generateAccessToken,
  generateRefreshToken,
  generateTokenId,
  storeRefreshToken,
  getTokenExpiresIn,
} from '../../../utils/token.util';

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

      // 3. 액세스 토큰과 리프레시 토큰 생성
      const accessToken = await generateAccessToken(user.id, user.name, context.env.JWT_SECRET_KEY, context.env);

      const tokenId = generateTokenId();
      const refreshToken = await generateRefreshToken(user.id, tokenId, context.env.JWT_SECRET_KEY, context.env);

      // 4. 리프레시 토큰을 데이터베이스에 저장
      const refreshTokenExpiresIn = getTokenExpiresIn(context.env, 'refresh');
      const expiresAt = new Date(Date.now() + refreshTokenExpiresIn * 1000);
      await storeRefreshToken(context, refreshToken, user.id, expiresAt);

      // 5. 응답 반환
      return context.json(
        {
          id: user.id,
          name: user.name,
          nickname: user.nickname,
          bio: user.bio,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        200
      );
    }
  );
}
