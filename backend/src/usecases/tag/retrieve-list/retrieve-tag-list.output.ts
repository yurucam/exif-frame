import { z } from '@hono/zod-openapi';

const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
  usageCount: z.number(),
  createdAt: z.date(),
});

export const retrieveTagListOutput = z.object({
  tags: z.array(tagSchema),
});

export type RetrieveTagListOutput = z.infer<typeof retrieveTagListOutput>;
