import { z } from '@hono/zod-openapi';

export const createTagInput = z.object({
  name: z.string().min(1, 'Tag name is required').max(50, 'Tag name must be less than 50 characters'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex color (e.g., #FF0000)'),
});

export type CreateTagInput = z.infer<typeof createTagInput>;
