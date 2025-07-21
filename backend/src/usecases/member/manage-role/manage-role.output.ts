import { z } from '@hono/zod-openapi';
import { memberRoles } from '../../../extensions/kysely/models/member.model';

export const manageRoleOutput = z
  .object({
    id: z.number(),
    name: z.string(),
    nickname: z.string(),
    role: z.enum(memberRoles),
    updatedAt: z.date(),
  })
  .openapi({
    description: '권한 변경된 멤버 정보',
  });

export type ManageRoleOutput = z.infer<typeof manageRoleOutput>;
