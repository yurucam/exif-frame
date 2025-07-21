import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { z } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { likeThemeOutput } from './like-theme.output';
import { authMiddleware, getCurrentMember } from '../../../utils/auth.middleware';

export function likeThemeController(app: OpenAPIHono<Bindings>): void {
  // 좋아요 추가
  app.openapi(
    createRoute({
      method: 'post',
      path: '/themes/{id}/like',
      tags: ['Theme'],
      summary: '테마 좋아요',
      description: '테마에 좋아요를 추가합니다.',
      security: [{ Bearer: [] }],
      middleware: [authMiddleware],
      request: {
        params: z.object({
          id: z.string().transform((val) => parseInt(val, 10)),
        }),
      },
      responses: {
        200: {
          description: '좋아요 추가 성공',
          content: {
            'application/json': {
              schema: likeThemeOutput,
            },
          },
        },
        401: {
          description: '인증 실패',
        },
        404: {
          description: '테마를 찾을 수 없음',
        },
        409: {
          description: '이미 좋아요한 테마',
        },
      },
    }),
    async (context) => {
      const { id } = context.req.valid('param');
      const db = context.env.db;
      const member = getCurrentMember(context)!;

      // 테마 존재 확인
      const theme = await db.selectFrom('theme').select(['id', 'name']).where('id', '=', id).executeTakeFirst();

      if (!theme) {
        throw new HTTPException(404, { message: '테마를 찾을 수 없습니다.' });
      }

      // 이미 좋아요했는지 확인
      const existingLike = await db
        .selectFrom('themeLike')
        .select(['id'])
        .where('themeId', '=', id)
        .where('memberId', '=', member.id)
        .executeTakeFirst();

      if (existingLike) {
        throw new HTTPException(409, { message: '이미 좋아요한 테마입니다.' });
      }

      // 트랜잭션으로 좋아요 추가 및 카운트 증가
      const result = await db.transaction().execute(async (trx) => {
        // 1. 좋아요 레코드 생성
        await trx
          .insertInto('themeLike')
          .values({
            themeId: id,
            memberId: member.id,
          })
          .execute();

        // 2. 테마의 좋아요 카운트 증가
        const updatedTheme = await trx
          .updateTable('theme')
          .set((eb) => ({ likeCount: eb('likeCount', '+', 1) }))
          .where('id', '=', id)
          .returning(['likeCount'])
          .executeTakeFirstOrThrow();

        return updatedTheme;
      });

      return context.json({
        isLiked: true,
        likeCount: result.likeCount,
        message: '좋아요가 추가되었습니다.',
      });
    }
  );

  // 좋아요 취소
  app.openapi(
    createRoute({
      method: 'delete',
      path: '/themes/{id}/like',
      tags: ['Theme'],
      summary: '테마 좋아요 취소',
      description: '테마의 좋아요를 취소합니다.',
      security: [{ Bearer: [] }],
      middleware: [authMiddleware],
      request: {
        params: z.object({
          id: z.string().transform((val) => parseInt(val, 10)),
        }),
      },
      responses: {
        200: {
          description: '좋아요 취소 성공',
          content: {
            'application/json': {
              schema: likeThemeOutput,
            },
          },
        },
        401: {
          description: '인증 실패',
        },
        404: {
          description: '테마를 찾을 수 없음 또는 좋아요하지 않은 테마',
        },
      },
    }),
    async (context) => {
      const { id } = context.req.valid('param');
      const db = context.env.db;
      const member = getCurrentMember(context)!;

      // 테마 존재 확인
      const theme = await db.selectFrom('theme').select(['id', 'name']).where('id', '=', id).executeTakeFirst();

      if (!theme) {
        throw new HTTPException(404, { message: '테마를 찾을 수 없습니다.' });
      }

      // 좋아요 레코드 확인
      const existingLike = await db
        .selectFrom('themeLike')
        .select(['id'])
        .where('themeId', '=', id)
        .where('memberId', '=', member.id)
        .executeTakeFirst();

      if (!existingLike) {
        throw new HTTPException(404, { message: '좋아요하지 않은 테마입니다.' });
      }

      // 트랜잭션으로 좋아요 제거 및 카운트 감소
      const result = await db.transaction().execute(async (trx) => {
        // 1. 좋아요 레코드 삭제
        await trx.deleteFrom('themeLike').where('id', '=', existingLike.id).execute();

        // 2. 테마의 좋아요 카운트 감소
        const updatedTheme = await trx
          .updateTable('theme')
          .set((eb) => ({ likeCount: eb('likeCount', '-', 1) }))
          .where('id', '=', id)
          .returning(['likeCount'])
          .executeTakeFirstOrThrow();

        return updatedTheme;
      });

      return context.json({
        isLiked: false,
        likeCount: result.likeCount,
        message: '좋아요가 취소되었습니다.',
      });
    }
  );
}
