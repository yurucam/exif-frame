import { z } from '@hono/zod-openapi';

export const updatePersonalInformationOutput = z.object({
  id: z.number(),
  name: z.string(),
  nickname: z.string(),
  bio: z.string(),
  updatedAt: z.date(),
});

export type UpdatePersonalInformationOutput = z.infer<typeof updatePersonalInformationOutput>;
