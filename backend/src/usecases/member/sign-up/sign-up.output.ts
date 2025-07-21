import { z } from '@hono/zod-openapi';

export const signUpOutput = z.object({
  id: z.number(),
  name: z.string(),
  nickname: z.string(),
  bio: z.string(),
  createdAt: z.date(),
});

export type SignUpOutput = z.infer<typeof signUpOutput>;
