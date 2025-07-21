import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { z } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { patchThemeInput } from './patch-theme.input';
import { patchThemeOutput } from './patch-theme.output';
import { authMiddleware, getCurrentMember } from '../../../utils/auth.middleware';
import { isAdmin } from '../../../utils/role.util';

export function patchThemeController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'patch',
      path: '/themes/{id}',
      tags: ['Theme'],
      summary: '테마 수정',
      description: '기존 테마를 수정합니다. 작성자 또는 관리자만 수정할 수 있습니다.',
      security: [{ Bearer: [] }],
      middleware: [authMiddleware],
      request: {
        params: z.object({
          id: z.string().transform((val) => parseInt(val, 10)),
        }),
        body: {
          content: {
            'application/json': {
              schema: patchThemeInput,
            },
          },
        },
      },
      responses: {
        200: {
          description: '테마 수정 성공',
          content: {
            'application/json': {
              schema: patchThemeOutput,
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
          description: '테마를 찾을 수 없음',
        },
        409: {
          description: '중복된 테마명',
        },
      },
    }),
    async (context) => {
      const { id } = context.req.valid('param');
      const input = context.req.valid('json');
      const db = context.env.db;
      const member = getCurrentMember(context)!;

      // 테마 존재 확인 및 작성자 정보 조회
      const existingTheme = await db.selectFrom('theme').select(['id', 'name', 'memberId']).where('id', '=', id).executeTakeFirst();

      if (!existingTheme) {
        throw new HTTPException(404, { message: '테마를 찾을 수 없습니다.' });
      }

      // 권한 체크 (작성자 또는 관리자)
      if (existingTheme.memberId !== member.id && !isAdmin(member.role)) {
        throw new HTTPException(403, { message: '테마를 수정할 권한이 없습니다.' });
      }

      // 이름 변경 시 중복 체크
      if (input.name && input.name !== existingTheme.name) {
        const duplicateTheme = await db.selectFrom('theme').select(['id']).where('name', '=', input.name).executeTakeFirst();

        if (duplicateTheme) {
          throw new HTTPException(409, { message: '이미 존재하는 테마명입니다.' });
        }
      }

      // 업데이트할 필드 구성
      const updateData: any = {};
      if (input.name) updateData.name = input.name;
      if (input.summary) updateData.summary = input.summary;
      if (input.description) updateData.description = input.description;
      if (input.svg) updateData.svg = input.svg;

      // 테마 수정
      const updatedTheme = await db
        .updateTable('theme')
        .set(updateData)
        .where('id', '=', id)
        .returning(['id', 'name', 'summary', 'description', 'svg', 'likeCount', 'downloadCount', 'createdAt', 'updatedAt'])
        .executeTakeFirstOrThrow();

      // 작성자 정보 조회
      const author = await db
        .selectFrom('member')
        .select(['id', 'nickname'])
        .where('id', '=', existingTheme.memberId)
        .executeTakeFirstOrThrow();

      // 태그 정보 조회
      const tags = await db
        .selectFrom('themeTag')
        .innerJoin('tag', 'themeTag.tagId', 'tag.id')
        .select(['tag.id', 'tag.name', 'tag.color'])
        .where('themeTag.themeId', '=', id)
        .execute();

      return context.json({
        id: updatedTheme.id,
        name: updatedTheme.name,
        summary: updatedTheme.summary,
        description: updatedTheme.description,
        svg: updatedTheme.svg,
        author: {
          id: author.id,
          nickname: author.nickname,
        },
        tags: tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
          color: tag.color,
        })),
        likeCount: updatedTheme.likeCount,
        downloadCount: updatedTheme.downloadCount,
        createdAt: updatedTheme.createdAt,
        updatedAt: updatedTheme.updatedAt,
      });
    }
  );
}
