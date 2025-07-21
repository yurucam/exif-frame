import { z } from '@hono/zod-openapi';

export const retrieveThemeListInput = z.object({
  page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional()
    .default(1),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional()
    .default(20),
  sortBy: z.enum(['createdAt', 'likeCount', 'downloadCount', 'name']).optional().default('createdAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().optional(),
  tagIds: z
    .string()
    .transform((val) => val.split(',').map((id) => parseInt(id, 10)))
    .optional(),
  memberId: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
});

export type RetrieveThemeListInput = z.infer<typeof retrieveThemeListInput>;
