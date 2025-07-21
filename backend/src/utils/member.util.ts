import { Context } from 'hono';
import { Env } from '../types';

/**
 * 멤버 정보를 ID로 조회하는 함수
 * @param context Hono 컨텍스트
 * @param memberId 멤버 ID (문자열 또는 숫자)
 * @returns 멤버 정보 또는 undefined
 */

export async function getMemberById(context: Context<{ Bindings: Env }>, memberId: string | number) {
  const db = context.env.db;
  const memberIdNumber = typeof memberId === 'string' ? parseInt(memberId, 10) : memberId;
  return await db.selectFrom('member').selectAll().where('id', '=', memberIdNumber).executeTakeFirst();
}
