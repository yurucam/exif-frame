import { z } from '@hono/zod-openapi';

export const likeThemeInput = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
});

export type LikeThemeInput = z.infer<typeof likeThemeInput>;
