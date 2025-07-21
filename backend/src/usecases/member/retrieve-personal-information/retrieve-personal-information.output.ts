import { z } from '@hono/zod-openapi';
import { memberRoles } from '../../../extensions/kysely/models/member.model';

export const retrievePersonalInformationOutput = z.object({
  id: z.number(),
  name: z.string(),
  nickname: z.string(),
  bio: z.string(),
  role: z.enum(memberRoles),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type RetrievePersonalInformationOutput = z.infer<typeof retrievePersonalInformationOutput>;
