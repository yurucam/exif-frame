import { MemberRole } from '../extensions/kysely/models/member.model';

/**
 * 권한 레벨 정의 (숫자가 높을수록 높은 권한)
 */
const ROLE_LEVELS: Record<MemberRole, number> = {
  user: 1,
  moderator: 2,
  admin: 3,
};

/**
 * 사용자가 특정 권한 이상인지 확인
 */
export function hasMinimumRole(userRole: MemberRole, requiredRole: MemberRole): boolean {
  return ROLE_LEVELS[userRole] >= ROLE_LEVELS[requiredRole];
}

/**
 * 사용자가 관리자인지 확인
 */
export function isAdmin(role: MemberRole): boolean {
  return role === 'admin';
}

/**
 * 사용자가 모더레이터 이상인지 확인
 */
export function isModerator(role: MemberRole): boolean {
  return hasMinimumRole(role, 'moderator');
}

/**
 * 권한별 허용된 작업들 정의
 */
export const ROLE_PERMISSIONS = {
  user: ['read_own_profile', 'update_own_profile', 'delete_own_account'],
  moderator: ['read_own_profile', 'update_own_profile', 'delete_own_account', 'read_user_profiles', 'moderate_content'],
  admin: [
    'read_own_profile',
    'update_own_profile',
    'delete_own_account',
    'read_user_profiles',
    'moderate_content',
    'manage_users',
    'system_administration',
  ],
} as const;

export type Permission = (typeof ROLE_PERMISSIONS)[keyof typeof ROLE_PERMISSIONS][number];

/**
 * 사용자가 특정 권한을 가지고 있는지 확인
 */
export function hasPermission(role: MemberRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission as any);
}
