import { z } from '@hono/zod-openapi';

export const refreshTokenOutput = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type RefreshTokenOutput = z.infer<typeof refreshTokenOutput>;
