import { z } from '@hono/zod-openapi';

const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
});

const authorSchema = z.object({
  id: z.number(),
  name: z.string(),
  nickname: z.string(),
});

export const retrieveThemeDetailOutput = z.object({
  id: z.number(),
  name: z.string(),
  summary: z.string(),
  description: z.string(),
  svg: z.string(),
  author: authorSchema,
  tags: z.array(tagSchema),
  likeCount: z.number(),
  downloadCount: z.number(),
  isLiked: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type RetrieveThemeDetailOutput = z.infer<typeof retrieveThemeDetailOutput>;
