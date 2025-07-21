import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { z } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { retrieveThemeDetailOutput } from './retrieve-theme-detail.output';

export function retrieveThemeDetailController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'get',
      path: '/themes/{id}',
      tags: ['Theme'],
      summary: '테마 상세 조회',
      description: '특정 테마의 상세 정보를 조회합니다. 로그인한 사용자의 경우 좋아요 상태도 포함됩니다.',
      request: {
        params: z.object({
          id: z.string().transform((val) => parseInt(val, 10)),
        }),
      },
      responses: {
        200: {
          description: '테마 상세 조회 성공',
          content: {
            'application/json': {
              schema: retrieveThemeDetailOutput,
            },
          },
        },
        404: {
          description: '테마를 찾을 수 없음',
        },
      },
    }),
    async (context) => {
      const { id } = context.req.valid('param');
      const db = context.env.db;

      // 인증된 사용자 정보 (선택적)
      const member = context.get('member');

      // 테마 기본 정보 및 작성자 정보 조회
      const theme = await db
        .selectFrom('theme')
        .innerJoin('member', 'theme.memberId', 'member.id')
        .select([
          'theme.id',
          'theme.name',
          'theme.summary',
          'theme.description',
          'theme.svg',
          'theme.likeCount',
          'theme.downloadCount',
          'theme.createdAt',
          'theme.updatedAt',
          'member.id as authorId',
          'member.name as authorName',
          'member.nickname as authorNickname',
        ])
        .where('theme.id', '=', id)
        .executeTakeFirst();

      if (!theme) {
        throw new HTTPException(404, { message: '테마를 찾을 수 없습니다.' });
      }

      // 테마의 태그 정보 조회
      const tags = await db
        .selectFrom('themeTag')
        .innerJoin('tag', 'themeTag.tagId', 'tag.id')
        .select(['tag.id', 'tag.name', 'tag.color'])
        .where('themeTag.themeId', '=', id)
        .execute();

      // 사용자의 좋아요 상태 확인 (로그인한 경우만)
      let isLiked = false;
      if (member) {
        const likeRecord = await db
          .selectFrom('themeLike')
          .select(['id'])
          .where('themeId', '=', id)
          .where('memberId', '=', member.id)
          .executeTakeFirst();

        isLiked = !!likeRecord;
      }

      return context.json({
        id: theme.id,
        name: theme.name,
        summary: theme.summary,
        description: theme.description,
        svg: theme.svg,
        author: {
          id: theme.authorId,
          name: theme.authorName,
          nickname: theme.authorNickname,
        },
        tags: tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
          color: tag.color,
        })),
        likeCount: theme.likeCount,
        downloadCount: theme.downloadCount,
        isLiked,
        createdAt: theme.createdAt,
        updatedAt: theme.updatedAt,
      });
    }
  );
}
