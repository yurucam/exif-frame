import { verify } from 'hono/jwt';
import { Context } from 'hono';
import { Env } from '../types';
import { MemberInfo } from './auth.middleware';

export interface AuthPayload {
  id: string;
  [key: string]: any;
}

export interface AuthResult {
  success: boolean;
  payload?: AuthPayload;
  error?: string;
}

/**
 * Authorization 헤더에서 Bearer 토큰을 추출합니다.
 * @param authHeader Authorization 헤더 값
 * @returns 추출된 토큰 또는 null
 */
export function extractBearerToken(authHeader: string | undefined): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7); // "Bearer " 제거
}

/**
 * JWT 토큰을 검증하고 페이로드를 반환합니다.
 * @param token JWT 토큰
 * @param secretKey JWT 시크릿 키
 * @returns 검증 결과와 페이로드
 */
export async function verifyJwtToken(token: string, secretKey: string): Promise<AuthResult> {
  try {
    const payload = (await verify(token, secretKey, 'HS256')) as AuthPayload;

    if (!payload.id) {
      return {
        success: false,
        error: '토큰에 사용자 정보가 없습니다.',
      };
    }

    return {
      success: true,
      payload,
    };
  } catch (error) {
    return {
      success: false,
      error: '유효하지 않은 토큰입니다.',
    };
  }
}

/**
 * 요청에서 토큰을 추출하고 검증합니다.
 * @param context Hono 컨텍스트
 * @returns 검증 결과와 페이로드
 */
export async function authenticateRequest(context: Context<{ Bindings: Env }>): Promise<AuthResult> {
  // 1. Authorization 헤더에서 토큰 추출
  const authHeader = context.req.header('Authorization');
  const token = extractBearerToken(authHeader);

  if (!token) {
    return {
      success: false,
      error: '인증 토큰이 필요합니다.',
    };
  }

  // 2. JWT 토큰 검증
  return await verifyJwtToken(token, context.env.JWT_SECRET_KEY);
}

/**
 * 멤버 존재 여부를 확인합니다.
 * @param context Hono 컨텍스트
 * @param memberId 멤버 ID
 * @returns 멤버 정보 또는 null
 */
export async function getMemberById(context: Context<{ Bindings: Env }>, memberId: string): Promise<MemberInfo | undefined> {
  const db = context.env.db;
  const memberIdNumber = parseInt(memberId, 10);
  return await db.selectFrom('member').selectAll().where('id', '=', memberIdNumber).executeTakeFirst();
}
