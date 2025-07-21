import { z } from '@hono/zod-openapi';

export const withdrawInput = z.object({
  reason: z.string().optional(),
});

export type WithdrawInput = z.infer<typeof withdrawInput>;
