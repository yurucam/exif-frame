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

export const patchThemeOutput = z.object({
  id: z.number(),
  name: z.string(),
  summary: z.string(),
  description: z.string(),
  svg: z.string(),
  author: authorSchema,
  tags: z.array(tagSchema),
  likeCount: z.number(),
  downloadCount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PatchThemeOutput = z.infer<typeof patchThemeOutput>;
