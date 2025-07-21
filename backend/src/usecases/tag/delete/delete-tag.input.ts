import { z } from '@hono/zod-openapi';

export const deleteTagInput = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
});

export type DeleteTagInput = z.infer<typeof deleteTagInput>;
