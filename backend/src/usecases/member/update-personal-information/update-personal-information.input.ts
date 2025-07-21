import { z } from '@hono/zod-openapi';

export const updatePersonalInformationInput = z.object({
  nickname: z.string().min(1, 'Nickname is required').optional(),
  bio: z.string().optional(),
});

export type UpdatePersonalInformationInput = z.infer<typeof updatePersonalInformationInput>;
