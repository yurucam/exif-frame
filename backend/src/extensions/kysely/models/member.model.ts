import { Generated } from 'kysely';

export const memberRoles = ['admin', 'moderator', 'user'] as const;
export type MemberRole = (typeof memberRoles)[number];

export interface MemberModel {
  id: Generated<number>;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;

  name: string; // ! Unique
  password: string;
  role: MemberRole;

  nickname: string;
  bio: string;
}
