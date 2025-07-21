import { z } from '@hono/zod-openapi';

export const deleteTagOutput = z.object({
  message: z.string(),
});

export type DeleteTagOutput = z.infer<typeof deleteTagOutput>;
