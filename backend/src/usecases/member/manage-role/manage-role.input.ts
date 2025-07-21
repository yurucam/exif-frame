import { z } from '@hono/zod-openapi';
import { memberRoles } from '../../../extensions/kysely/models/member.model';

export const manageRoleInput = z.object({
  memberId: z.number().int().positive().openapi({
    description: '권한을 변경할 멤버의 ID',
    example: 1,
  }),
  role: z.enum(memberRoles).openapi({
    description: '새로운 권한',
    example: 'moderator',
  }),
});

export type ManageRoleInput = z.infer<typeof manageRoleInput>;
