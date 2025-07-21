import { z } from '@hono/zod-openapi';

const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
});

const authorSchema = z.object({
  id: z.number(),
  nickname: z.string(),
});

const themeListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  summary: z.string(),
  author: authorSchema,
  tags: z.array(tagSchema),
  likeCount: z.number(),
  downloadCount: z.number(),
  createdAt: z.date(),
});

const paginationSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const retrieveThemeListOutput = z.object({
  themes: z.array(themeListItemSchema),
  pagination: paginationSchema,
});

export type RetrieveThemeListOutput = z.infer<typeof retrieveThemeListOutput>;
