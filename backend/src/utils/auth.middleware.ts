import { Context, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { Selectable } from 'kysely';
import { Env } from '../types';
import { authenticateRequest } from './token.util';
import { getMemberById } from './member.util';
import { MemberModel, MemberRole } from '../extensions/kysely/models/member.model';
import { hasMinimumRole, hasPermission, Permission } from './role.util';

// 데이터베이스에서 조회된 멤버 정보 타입 (자동으로 스키마에서 추론)
export type MemberInfo = Selectable<MemberModel>;

// 컨텍스트에 멤버 정보를 추가하기 위한 타입 확장
declare module 'hono' {
  interface ContextVariableMap {
    member: MemberInfo | null;
  }
}

/**
 * JWT 토큰 검증 미들웨어
 * Authorization 헤더의 Bearer 토큰을 검증하고 멤버 정보를 컨텍스트에 추가합니다.
 */
export async function authMiddleware(context: Context<{ Bindings: Env }>, next: Next) {
  try {
    // 1. 토큰 검증
    const authResult = await authenticateRequest(context);

    if (!authResult.success || !authResult.payload) {
      throw new HTTPException(401, { message: authResult.error || '인증에 실패했습니다.' });
    }

    // 2. 멤버 정보 조회
    const member = await getMemberById(context, authResult.payload.id.toString());

    if (!member) {
      throw new HTTPException(404, { message: '멤버를 찾을 수 없습니다.' });
    }

    // 3. 컨텍스트에 멤버 정보 저장
    context.set('member', member);

    // 4. 다음 미들웨어/핸들러로 진행
    await next();
  } catch (error) {
    if (error instanceof HTTPException) {
      throw error;
    }

    console.error('Auth middleware error:', error);
    throw new HTTPException(500, { message: '서버 오류가 발생했습니다.' });
  }
}

/**
 * 선택적 JWT 토큰 검증 미들웨어
 * 토큰이 있으면 검증하고, 없어도 다음으로 진행합니다.
 */
export async function optionalAuthMiddleware(context: Context<{ Bindings: Env }>, next: Next) {
  try {
    const authHeader = context.req.header('Authorization');

    // 토큰이 없으면 그냥 다음으로 진행
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      await next();
      return;
    }

    // 토큰이 있으면 검증 시도
    const authResult = await authenticateRequest(context);

    if (authResult.success && authResult.payload) {
      const member = await getMemberById(context, authResult.payload.id.toString());

      if (member) {
        context.set('member', member);
      }
    }

    await next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    // 선택적 미들웨어이므로 에러가 발생해도 다음으로 진행
    await next();
  }
}

/**
 * 컨텍스트에서 현재 멤버 정보를 가져오는 헬퍼 함수
 */
export function getCurrentMember(context: Context) {
  return context.get('member') || null;
}

/**
 * 최소 권한 요구 미들웨어
 * 사용자가 지정된 권한 이상을 가지고 있는지 확인합니다.
 */
export function requireRole(requiredRole: MemberRole) {
  return async (context: Context<{ Bindings: Env }>, next: Next) => {
    const member = getCurrentMember(context);

    if (!member) {
      throw new HTTPException(401, { message: '인증이 필요합니다.' });
    }

    if (!hasMinimumRole(member.role, requiredRole)) {
      throw new HTTPException(403, {
        message: `이 작업을 수행하려면 ${requiredRole} 이상의 권한이 필요합니다.`,
      });
    }

    await next();
  };
}

/**
 * 특정 권한 요구 미들웨어
 * 사용자가 지정된 권한을 가지고 있는지 확인합니다.
 */
export function requirePermission(permission: Permission) {
  return async (context: Context<{ Bindings: Env }>, next: Next) => {
    const member = getCurrentMember(context);

    if (!member) {
      throw new HTTPException(401, { message: '인증이 필요합니다.' });
    }

    if (!hasPermission(member.role, permission)) {
      throw new HTTPException(403, {
        message: `이 작업을 수행할 권한이 없습니다. 필요한 권한: ${permission}`,
      });
    }

    await next();
  };
}

/**
 * 관리자 권한 요구 미들웨어
 */
export const requireAdmin = requireRole('admin');

/**
 * 모더레이터 이상 권한 요구 미들웨어
 */
export const requireModerator = requireRole('moderator');

/**
 * 자신의 리소스에만 접근 가능한지 확인하는 미들웨어
 * URL 파라미터의 memberId와 현재 사용자의 ID를 비교합니다.
 */
export function requireSelfOrAdmin(paramName: string = 'memberId') {
  return async (context: Context<{ Bindings: Env }>, next: Next) => {
    const member = getCurrentMember(context);

    if (!member) {
      throw new HTTPException(401, { message: '인증이 필요합니다.' });
    }

    const targetMemberId = context.req.param(paramName);
    const currentMemberId = member.id.toString();

    // 관리자이거나 자신의 리소스에 접근하는 경우 허용
    if (member.role === 'admin' || targetMemberId === currentMemberId) {
      await next();
      return;
    }

    throw new HTTPException(403, {
      message: '자신의 정보에만 접근할 수 있습니다.',
    });
  };
}
