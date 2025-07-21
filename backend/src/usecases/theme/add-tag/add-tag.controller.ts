import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { z } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { addTagInput } from './add-tag.input';
import { addTagOutput } from './add-tag.output';
import { authMiddleware, getCurrentMember } from '../../../utils/auth.middleware';
import { isAdmin } from '../../../utils/role.util';

export function addTagController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'post',
      path: '/themes/{id}/tags',
      tags: ['Theme'],
      summary: '테마에 태그 추가',
      description: '기존 테마에 새로운 태그를 추가합니다. 작성자 또는 관리자만 추가할 수 있습니다.',
      security: [{ Bearer: [] }],
      middleware: [authMiddleware],
      request: {
        params: z.object({
          id: z.string().transform((val) => parseInt(val, 10)),
        }),
        body: {
          content: {
            'application/json': {
              schema: addTagInput,
            },
          },
        },
      },
      responses: {
        200: {
          description: '태그 추가 성공',
          content: {
            'application/json': {
              schema: addTagOutput,
            },
          },
        },
        401: {
          description: '인증 실패',
        },
        403: {
          description: '권한 없음 (작성자 또는 관리자만)',
        },
        404: {
          description: '테마 또는 태그를 찾을 수 없음',
        },
        409: {
          description: '이미 연결된 태그',
        },
      },
    }),
    async (context) => {
      const { id } = context.req.valid('param');
      const { tagId } = context.req.valid('json');
      const db = context.env.db;
      const member = getCurrentMember(context)!;

      // 테마 존재 확인 및 작성자 정보 조회
      const existingTheme = await db.selectFrom('theme').select(['id', 'name', 'memberId']).where('id', '=', id).executeTakeFirst();

      if (!existingTheme) {
        throw new HTTPException(404, { message: '테마를 찾을 수 없습니다.' });
      }

      // 권한 체크 (작성자 또는 관리자)
      if (existingTheme.memberId !== member.id && !isAdmin(member.role)) {
        throw new HTTPException(403, { message: '테마에 태그를 추가할 권한이 없습니다.' });
      }

      // 태그 존재 확인
      const existingTag = await db.selectFrom('tag').select(['id', 'name']).where('id', '=', tagId).executeTakeFirst();

      if (!existingTag) {
        throw new HTTPException(404, { message: '태그를 찾을 수 없습니다.' });
      }

      // 이미 연결된 태그인지 확인
      const existingThemeTag = await db
        .selectFrom('themeTag')
        .select(['id'])
        .where('themeId', '=', id)
        .where('tagId', '=', tagId)
        .executeTakeFirst();

      if (existingThemeTag) {
        throw new HTTPException(409, { message: '이미 연결된 태그입니다.' });
      }

      // 트랜잭션으로 태그 연결 및 사용횟수 증가
      await db.transaction().execute(async (trx) => {
        // 1. ThemeTag 관계 생성
        await trx
          .insertInto('themeTag')
          .values({
            themeId: id,
            tagId: tagId,
          })
          .execute();

        // 2. 태그 사용횟수 증가
        await trx
          .updateTable('tag')
          .set((eb) => ({ usageCount: eb('usageCount', '+', 1) }))
          .where('id', '=', tagId)
          .execute();
      });

      // 업데이트된 태그 목록 조회
      const updatedTags = await db
        .selectFrom('themeTag')
        .innerJoin('tag', 'themeTag.tagId', 'tag.id')
        .select(['tag.id', 'tag.name', 'tag.color'])
        .where('themeTag.themeId', '=', id)
        .execute();

      return context.json({
        tags: updatedTags.map((tag) => ({
          id: tag.id,
          name: tag.name,
          color: tag.color,
        })),
        message: `태그 '${existingTag.name}'이(가) 테마에 추가되었습니다.`,
      });
    }
  );
}
