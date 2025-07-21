import { z } from '@hono/zod-openapi';

export const addTagInput = z.object({
  tagId: z.number().min(1, 'Tag ID is required'),
});

export type AddTagInput = z.infer<typeof addTagInput>;
