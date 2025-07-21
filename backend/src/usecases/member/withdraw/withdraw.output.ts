import { z } from '@hono/zod-openapi';

export const withdrawOutput = z.object({
  result: z.string(),
  withdrawnAt: z.date(),
});

export type WithdrawOutput = z.infer<typeof withdrawOutput>;
