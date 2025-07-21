import { z } from '@hono/zod-openapi';

export const retrieveTagListInput = z.object({
  search: z.string().optional(),
  sortBy: z.enum(['name', 'usageCount', 'createdAt']).optional().default('createdAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type RetrieveTagListInput = z.infer<typeof retrieveTagListInput>;
