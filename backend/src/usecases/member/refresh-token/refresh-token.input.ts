import { z } from '@hono/zod-openapi';

export const refreshTokenInput = z.object({
  refreshToken: z.string().min(1, '리프레시 토큰이 필요합니다.'),
});

export type RefreshTokenInput = z.infer<typeof refreshTokenInput>;
