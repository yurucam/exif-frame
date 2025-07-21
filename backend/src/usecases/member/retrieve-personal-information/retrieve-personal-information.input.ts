import { z } from '@hono/zod-openapi';

export const retrievePersonalInformationInput = z.object({
  memberId: z.number().positive('Member ID must be a positive number'),
});

export type RetrievePersonalInformationInput = z.infer<typeof retrievePersonalInformationInput>;
