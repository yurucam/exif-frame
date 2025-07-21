import { z } from '@hono/zod-openapi';

export const deleteThemeInput = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
});

export type DeleteThemeInput = z.infer<typeof deleteThemeInput>;
