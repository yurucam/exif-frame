import { z } from '@hono/zod-openapi';

export const signInOutput = z.object({
  id: z.number(),
  name: z.string(),
  nickname: z.string(),
  bio: z.string(),
  token: z.string(),
});

export type SignInOutput = z.infer<typeof signInOutput>;
