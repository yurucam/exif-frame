import { z } from '@hono/zod-openapi';

export const retrieveThemeDetailInput = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
});

export type RetrieveThemeDetailInput = z.infer<typeof retrieveThemeDetailInput>;
