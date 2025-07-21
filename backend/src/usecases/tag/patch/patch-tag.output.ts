import { z } from '@hono/zod-openapi';

export const patchTagOutput = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
  usageCount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PatchTagOutput = z.infer<typeof patchTagOutput>;
