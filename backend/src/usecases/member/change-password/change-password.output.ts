import { z } from '@hono/zod-openapi';

export const changePasswordOutput = z.object({
  result: z.string(),
});

export type ChangePasswordOutput = z.infer<typeof changePasswordOutput>;
