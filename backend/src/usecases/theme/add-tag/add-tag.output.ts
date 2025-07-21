import { z } from '@hono/zod-openapi';

const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
});

export const addTagOutput = z.object({
  tags: z.array(tagSchema),
  message: z.string(),
});

export type AddTagOutput = z.infer<typeof addTagOutput>;
