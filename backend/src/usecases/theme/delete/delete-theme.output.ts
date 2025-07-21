import { z } from '@hono/zod-openapi';

export const deleteThemeOutput = z.object({
  message: z.string(),
});

export type DeleteThemeOutput = z.infer<typeof deleteThemeOutput>;
