import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { refreshTokenInput } from './refresh-token.input';
import { refreshTokenOutput } from './refresh-token.output';
import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  generateTokenId,
  getRefreshTokenFromDB,
  revokeRefreshToken,
  storeRefreshToken,
  getTokenExpiresIn,
} from '../../../utils/token.util';

export function refreshTokenController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'post',
      path: '/refresh-token',
      tags: ['Member'],
      summary: '토큰 갱신',
      description: '리프레시 토큰을 사용하여 새로운 액세스 토큰과 리프레시 토큰을 발급합니다.',
      request: {
        body: {
          content: {
            'application/json': {
              schema: refreshTokenInput,
            },
          },
        },
      },
      responses: {
        200: {
          description: '응답',
          content: {
            'application/json': {
              schema: refreshTokenOutput,
            },
          },
        },
      },
    }),
    async (context) => {
      const input = context.req.valid('json');
      const db = context.env.db;

      // 1. 리프레시 토큰 검증
      const payload = await verifyRefreshToken(input.refreshToken, context.env.JWT_SECRET_KEY);

      if (!payload) {
        throw new Error('유효하지 않은 리프레시 토큰입니다.');
      }

      // 2. 데이터베이스에서 리프레시 토큰 조회
      const tokenRecord = await getRefreshTokenFromDB(context, input.refreshToken);

      if (!tokenRecord) {
        throw new Error('리프레시 토큰을 찾을 수 없거나 만료되었습니다.');
      }

      // 3. 사용자 정보 조회
      const user = await db.selectFrom('member').select(['id', 'name']).where('id', '=', tokenRecord.memberId).executeTakeFirst();

      if (!user) {
        throw new Error('사용자를 찾을 수 없습니다.');
      }

      // 4. 기존 리프레시 토큰 무효화
      await revokeRefreshToken(context, tokenRecord.id);

      // 5. 새로운 액세스 토큰과 리프레시 토큰 생성
      const newAccessToken = await generateAccessToken(user.id, user.name, context.env.JWT_SECRET_KEY, context.env);

      const newTokenId = generateTokenId();
      const newRefreshToken = await generateRefreshToken(user.id, newTokenId, context.env.JWT_SECRET_KEY, context.env);

      // 6. 새로운 리프레시 토큰을 데이터베이스에 저장
      const refreshTokenExpiresIn = getTokenExpiresIn(context.env, 'refresh');
      const expiresAt = new Date(Date.now() + refreshTokenExpiresIn * 1000);
      await storeRefreshToken(context, newRefreshToken, user.id, expiresAt);

      // 7. 응답 반환
      return context.json(
        {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
        200
      );
    }
  );
}
