import { z } from '@hono/zod-openapi';

export const createThemeInput = z.object({
  name: z.string().min(1, 'Theme name is required').max(100, 'Theme name must be less than 100 characters'),
  summary: z.string().min(1, 'Summary is required').max(200, 'Summary must be less than 200 characters'),
  description: z.string().min(1, 'Description is required').max(2000, 'Description must be less than 2000 characters'),
  svg: z.string().min(1, 'SVG content is required'),
  tagIds: z.array(z.number()).optional().default([]),
});

export type CreateThemeInput = z.infer<typeof createThemeInput>;
