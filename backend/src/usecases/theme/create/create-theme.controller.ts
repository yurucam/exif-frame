import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { Bindings } from '../../../types';
import { createThemeInput } from './create-theme.input';
import { createThemeOutput } from './create-theme.output';
import { authMiddleware, getCurrentMember } from '../../../utils/auth.middleware';

export function createThemeController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'post',
      path: '/themes',
      tags: ['Theme'],
      summary: '테마 생성',
      description: '새로운 테마를 생성합니다.',
      security: [{ Bearer: [] }],
      middleware: [authMiddleware],
      request: {
        body: {
          content: {
            'application/json': {
              schema: createThemeInput,
            },
          },
        },
      },
      responses: {
        201: {
          description: '테마 생성 성공',
          content: {
            'application/json': {
              schema: createThemeOutput,
            },
          },
        },
        401: {
          description: '인증 실패',
        },
        400: {
          description: '잘못된 태그 ID',
        },
        409: {
          description: '중복된 테마명',
        },
      },
    }),
    async (context) => {
      const input = context.req.valid('json');
      const db = context.env.db;
      const member = getCurrentMember(context)!;

      // 중복 테마명 체크
      const existingTheme = await db.selectFrom('theme').select(['id']).where('name', '=', input.name).executeTakeFirst();

      if (existingTheme) {
        throw new HTTPException(409, { message: '이미 존재하는 테마명입니다.' });
      }

      // 태그 ID 유효성 검증
      if (input.tagIds.length > 0) {
        const validTags = await db.selectFrom('tag').select(['id']).where('id', 'in', input.tagIds).execute();

        if (validTags.length !== input.tagIds.length) {
          throw new HTTPException(400, { message: '존재하지 않는 태그 ID가 포함되어 있습니다.' });
        }
      }

      // 트랜잭션으로 테마 생성 및 태그 연결
      const result = await db.transaction().execute(async (trx) => {
        // 1. 테마 생성
        const newTheme = await trx
          .insertInto('theme')
          .values({
            memberId: member.id,
            name: input.name,
            summary: input.summary,
            description: input.description,
            svg: input.svg,
            likeCount: 0,
            downloadCount: 0,
          })
          .returning(['id', 'name', 'summary', 'description', 'svg', 'likeCount', 'downloadCount', 'createdAt', 'updatedAt'])
          .executeTakeFirstOrThrow();

        // 2. 태그 연결
        if (input.tagIds.length > 0) {
          const themeTagInserts = input.tagIds.map((tagId) => ({
            themeId: newTheme.id,
            tagId: tagId,
          }));

          await trx.insertInto('themeTag').values(themeTagInserts).execute();

          // 3. 태그 사용횟수 증가
          await trx
            .updateTable('tag')
            .set((eb) => ({ usageCount: eb('usageCount', '+', 1) }))
            .where('id', 'in', input.tagIds)
            .execute();
        }

        // 4. 연결된 태그 정보 조회
        const tags =
          input.tagIds.length > 0
            ? await trx.selectFrom('tag').select(['id', 'name', 'color']).where('id', 'in', input.tagIds).execute()
            : [];

        return {
          theme: newTheme,
          tags: tags,
        };
      });

      return context.json(
        {
          id: result.theme.id,
          name: result.theme.name,
          summary: result.theme.summary,
          description: result.theme.description,
          svg: result.theme.svg,
          author: {
            id: member.id,
            nickname: member.nickname,
          },
          tags: result.tags.map((tag) => ({
            id: tag.id,
            name: tag.name,
            color: tag.color,
          })),
          likeCount: result.theme.likeCount,
          downloadCount: result.theme.downloadCount,
          createdAt: result.theme.createdAt,
          updatedAt: result.theme.updatedAt,
        },
        201
      );
    }
  );
}
