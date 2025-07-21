import { z } from '@hono/zod-openapi';

export const removeTagInput = z.object({
  tagId: z.string().transform((val) => parseInt(val, 10)),
});

export type RemoveTagInput = z.infer<typeof removeTagInput>;
