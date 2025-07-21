import { z } from '@hono/zod-openapi';

export const patchTagInput = z.object({
  name: z.string().min(1, 'Tag name is required').max(50, 'Tag name must be less than 50 characters').optional(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex color (e.g., #FF0000)')
    .optional(),
});

export type PatchTagInput = z.infer<typeof patchTagInput>;
