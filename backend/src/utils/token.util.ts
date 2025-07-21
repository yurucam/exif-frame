import { sign, verify } from 'hono/jwt';
import { Context } from 'hono';
import { Env } from '../types';

export interface AccessTokenPayload {
  id: number;
  name: string;
  iat: number;
  exp: number;
  [key: string]: any;
}

export interface RefreshTokenPayload {
  id: number;
  tokenId: string;
  iat: number;
  exp: number;
  [key: string]: any;
}

export interface AuthResult {
  success: boolean;
  payload?: AccessTokenPayload;
  error?: string;
}

/**
 * 시간 문자열을 초 단위로 변환합니다.
 * 예: "15m" -> 900, "30d" -> 2592000, "1h" -> 3600
 * @param timeString 시간 문자열 (예: "15m", "30d", "1h")
 * @returns 초 단위 시간
 */
export function parseTimeToSeconds(timeString: string): number {
  const match = timeString.match(/^(\d+)([smhd])$/);
  if (!match) {
    throw new Error(`Invalid time format: ${timeString}. Use format like "15m", "1h", "30d"`);
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 's':
      return value; // 초
    case 'm':
      return value * 60; // 분
    case 'h':
      return value * 60 * 60; // 시간
    case 'd':
      return value * 24 * 60 * 60; // 일
    default:
      throw new Error(`Unsupported time unit: ${unit}`);
  }
}

/**
 * 환경변수에서 토큰 만료 시간을 가져옵니다.
 * @param env 환경변수
 * @param tokenType 토큰 타입 ('access' | 'refresh')
 * @returns 초 단위 만료 시간
 */
export function getTokenExpiresIn(env: Env, tokenType: 'access' | 'refresh'): number {
  if (tokenType === 'access') {
    const expiresIn = env.ACCESS_TOKEN_EXPIRES_IN || '15m';
    return parseTimeToSeconds(expiresIn);
  } else {
    const expiresIn = env.REFRESH_TOKEN_EXPIRES_IN || '30d';
    return parseTimeToSeconds(expiresIn);
  }
}

/**
 * 액세스 토큰을 생성합니다.
 * @param userId 사용자 ID
 * @param userName 사용자 이름
 * @param secretKey JWT 시크릿 키
 * @returns 액세스 토큰
 */
export async function generateAccessToken(userId: number, userName: string, secretKey: string, env: Env): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const expiresIn = getTokenExpiresIn(env, 'access');
  const payload: AccessTokenPayload = {
    id: userId,
    name: userName,
    iat: now,
    exp: now + expiresIn,
  };

  return await sign(payload, secretKey);
}

/**
 * 리프레시 토큰을 생성합니다.
 * @param userId 사용자 ID
 * @param tokenId 토큰 고유 ID
 * @param secretKey JWT 시크릿 키
 * @returns 리프레시 토큰
 */
export async function generateRefreshToken(userId: number, tokenId: string, secretKey: string, env: Env): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const expiresIn = getTokenExpiresIn(env, 'refresh');
  const payload: RefreshTokenPayload = {
    id: userId,
    tokenId: tokenId,
    iat: now,
    exp: now + expiresIn,
  };

  return await sign(payload, secretKey);
}

/**
 * 액세스 토큰을 검증합니다.
 * @param token 액세스 토큰
 * @param secretKey JWT 시크릿 키
 * @returns 검증 결과와 페이로드
 */
export async function verifyAccessToken(token: string, secretKey: string): Promise<AuthResult> {
  try {
    const payload = (await verify(token, secretKey, 'HS256')) as AccessTokenPayload;

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
 * 리프레시 토큰을 검증합니다.
 * @param token 리프레시 토큰
 * @param secretKey JWT 시크릿 키
 * @returns 검증된 페이로드 또는 null
 */
export async function verifyRefreshToken(token: string, secretKey: string): Promise<RefreshTokenPayload | null> {
  try {
    const payload = (await verify(token, secretKey, 'HS256')) as RefreshTokenPayload;
    return payload;
  } catch (error) {
    return null;
  }
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
  return await verifyAccessToken(token, context.env.JWT_SECRET_KEY);
}

/**
 * 랜덤한 토큰 ID를 생성합니다.
 * @returns 랜덤 토큰 ID
 */
export function generateTokenId(): string {
  return crypto.randomUUID();
}

/**
 * 데이터베이스에 리프레시 토큰을 저장합니다.
 * @param context Hono 컨텍스트
 * @param token 리프레시 토큰
 * @param memberId 멤버 ID
 * @param expiresAt 만료 시간
 * @returns 저장된 토큰 ID
 */
export async function storeRefreshToken(
  context: Context<{ Bindings: Env }>,
  token: string,
  memberId: number,
  expiresAt: Date
): Promise<number> {
  const db = context.env.db;

  const result = await db
    .insertInto('refreshToken')
    .values({
      token,
      memberId,
      expiresAt,
      isRevoked: false,
    })
    .returning('id')
    .executeTakeFirstOrThrow();

  return result.id;
}

/**
 * 데이터베이스에서 리프레시 토큰을 조회합니다.
 * @param context Hono 컨텍스트
 * @param token 리프레시 토큰
 * @returns 토큰 정보 또는 null
 */
export async function getRefreshTokenFromDB(context: Context<{ Bindings: Env }>, token: string) {
  const db = context.env.db;

  return await db
    .selectFrom('refreshToken')
    .selectAll()
    .where('token', '=', token)
    .where('isRevoked', '=', false)
    .where('expiresAt', '>', new Date())
    .executeTakeFirst();
}

/**
 * 리프레시 토큰을 무효화합니다.
 * @param context Hono 컨텍스트
 * @param tokenId 토큰 ID
 */
export async function revokeRefreshToken(context: Context<{ Bindings: Env }>, tokenId: number): Promise<void> {
  const db = context.env.db;

  await db.updateTable('refreshToken').set({ isRevoked: true }).where('id', '=', tokenId).execute();
}

/**
 * 사용자의 모든 리프레시 토큰을 무효화합니다.
 * @param context Hono 컨텍스트
 * @param memberId 멤버 ID
 */
export async function revokeAllRefreshTokens(context: Context<{ Bindings: Env }>, memberId: number): Promise<void> {
  const db = context.env.db;

  await db.updateTable('refreshToken').set({ isRevoked: true }).where('memberId', '=', memberId).execute();
}
