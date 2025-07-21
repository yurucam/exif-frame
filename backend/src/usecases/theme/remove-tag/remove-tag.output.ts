import { z } from '@hono/zod-openapi';

const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
});

export const removeTagOutput = z.object({
  tags: z.array(tagSchema),
  message: z.string(),
});

export type RemoveTagOutput = z.infer<typeof removeTagOutput>;
