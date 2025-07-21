import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { retrieveTagListInput } from './retrieve-tag-list.input';
import { retrieveTagListOutput } from './retrieve-tag-list.output';

export function retrieveTagListController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'get',
      path: '/tags',
      tags: ['Tag'],
      summary: '태그 리스트 조회',
      description: '모든 태그 목록을 조회합니다.',
      request: {
        query: retrieveTagListInput,
      },
      responses: {
        200: {
          description: '태그 리스트 조회 성공',
          content: {
            'application/json': {
              schema: retrieveTagListOutput,
            },
          },
        },
      },
    }),
    async (context) => {
      const query = context.req.valid('query');
      const db = context.env.db;

      // 기본 쿼리 구성
      let queryBuilder = db.selectFrom('tag').select(['id', 'name', 'color', 'usageCount', 'createdAt']);

      // 검색 필터 적용
      if (query.search) {
        queryBuilder = queryBuilder.where('name', 'like', `%${query.search}%`);
      }

      // 정렬 적용
      const sortColumn = query.sortBy || 'createdAt';
      const sortOrder = query.order || 'desc';
      queryBuilder = queryBuilder.orderBy(sortColumn, sortOrder);

      // 쿼리 실행
      const tags = await queryBuilder.execute();

      return context.json({
        tags: tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
          color: tag.color,
          usageCount: tag.usageCount,
          createdAt: tag.createdAt,
        })),
      });
    }
  );
}
