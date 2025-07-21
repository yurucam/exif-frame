import { z } from '@hono/zod-openapi';

export const likeThemeOutput = z.object({
  isLiked: z.boolean(),
  likeCount: z.number(),
  message: z.string(),
});

export type LikeThemeOutput = z.infer<typeof likeThemeOutput>;
