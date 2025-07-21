import { z } from '@hono/zod-openapi';

export const patchThemeInput = z.object({
  name: z.string().min(1, 'Theme name is required').max(100, 'Theme name must be less than 100 characters').optional(),
  summary: z.string().min(1, 'Summary is required').max(200, 'Summary must be less than 200 characters').optional(),
  description: z.string().min(1, 'Description is required').max(2000, 'Description must be less than 2000 characters').optional(),
  svg: z.string().min(1, 'SVG content is required').optional(),
});

export type PatchThemeInput = z.infer<typeof patchThemeInput>;
