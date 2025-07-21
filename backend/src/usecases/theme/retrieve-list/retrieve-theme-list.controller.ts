import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { retrieveThemeListInput } from './retrieve-theme-list.input';
import { retrieveThemeListOutput } from './retrieve-theme-list.output';

export function retrieveThemeListController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'get',
      path: '/themes',
      tags: ['Theme'],
      summary: '테마 리스트 조회',
      description: '테마 목록을 조회합니다. 다양한 필터링 및 정렬 옵션을 지원합니다.',
      request: {
        query: retrieveThemeListInput,
      },
      responses: {
        200: {
          description: '테마 리스트 조회 성공',
          content: {
            'application/json': {
              schema: retrieveThemeListOutput,
            },
          },
        },
      },
    }),
    async (context) => {
      const query = context.req.valid('query');
      const db = context.env.db;

      // 페이지네이션 계산
      const offset = (query.page - 1) * query.limit;

      // 기본 쿼리 구성 - 테마와 작성자 정보 JOIN
      let queryBuilder = db
        .selectFrom('theme')
        .innerJoin('member', 'theme.memberId', 'member.id')
        .select([
          'theme.id',
          'theme.name',
          'theme.summary',
          'theme.likeCount',
          'theme.downloadCount',
          'theme.createdAt',
          'member.id as authorId',
          'member.nickname as authorNickname',
        ]);

      // 검색 필터 적용
      if (query.search) {
        queryBuilder = queryBuilder.where((eb) =>
          eb.or([eb('theme.name', 'like', `%${query.search}%`), eb('theme.summary', 'like', `%${query.search}%`)])
        );
      }

      // 작성자 필터 적용
      if (query.memberId) {
        queryBuilder = queryBuilder.where('theme.memberId', '=', query.memberId);
      }

      // 태그 필터 적용
      if (query.tagIds && query.tagIds.length > 0) {
        queryBuilder = queryBuilder
          .innerJoin('themeTag', 'theme.id', 'themeTag.themeId')
          .where('themeTag.tagId', 'in', query.tagIds)
          .groupBy([
            'theme.id',
            'theme.name',
            'theme.summary',
            'theme.likeCount',
            'theme.downloadCount',
            'theme.createdAt',
            'member.id',
            'member.nickname',
          ])
          .having((eb) => eb.fn.count('themeTag.tagId'), '=', query.tagIds.length);
      }

      // 전체 개수 조회
      const totalCountQuery = queryBuilder.select((eb) => eb.fn.countAll().as('count'));
      const totalResult = await totalCountQuery.executeTakeFirst();
      const total = Number(totalResult?.count || 0);

      // 정렬 적용
      if (query.sortBy === 'name') {
        queryBuilder = queryBuilder.orderBy('theme.name', query.order);
      } else if (query.sortBy === 'createdAt') {
        queryBuilder = queryBuilder.orderBy('theme.createdAt', query.order);
      } else if (query.sortBy === 'likeCount') {
        queryBuilder = queryBuilder.orderBy('theme.likeCount', query.order);
      } else if (query.sortBy === 'downloadCount') {
        queryBuilder = queryBuilder.orderBy('theme.downloadCount', query.order);
      }

      // 페이지네이션 적용
      const themes = await queryBuilder.limit(query.limit).offset(offset).execute();

      // 각 테마의 태그 정보 조회
      const themeIds = themes.map((theme) => theme.id);
      const themeTags =
        themeIds.length > 0
          ? await db
              .selectFrom('themeTag')
              .innerJoin('tag', 'themeTag.tagId', 'tag.id')
              .select(['themeTag.themeId', 'tag.id as tagId', 'tag.name as tagName', 'tag.color as tagColor'])
              .where('themeTag.themeId', 'in', themeIds)
              .execute()
          : [];

      // 테마별 태그 그룹핑
      const themeTagsMap = new Map<number, Array<{ id: number; name: string; color: string }>>();
      themeTags.forEach((themeTag) => {
        if (!themeTagsMap.has(themeTag.themeId)) {
          themeTagsMap.set(themeTag.themeId, []);
        }
        themeTagsMap.get(themeTag.themeId)!.push({
          id: themeTag.tagId,
          name: themeTag.tagName,
          color: themeTag.tagColor,
        });
      });

      // 응답 데이터 구성
      const totalPages = Math.ceil(total / query.limit);

      return context.json({
        themes: themes.map((theme) => ({
          id: theme.id,
          name: theme.name,
          summary: theme.summary,
          author: {
            id: theme.authorId,
            nickname: theme.authorNickname,
          },
          tags: themeTagsMap.get(theme.id) || [],
          likeCount: theme.likeCount,
          downloadCount: theme.downloadCount,
          createdAt: theme.createdAt,
        })),
        pagination: {
          total,
          page: query.page,
          limit: query.limit,
          totalPages,
        },
      });
    }
  );
}
