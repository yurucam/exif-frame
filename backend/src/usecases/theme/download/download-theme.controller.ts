import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { z } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { downloadThemeOutput } from './download-theme.output';

export function downloadThemeController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'post',
      path: '/themes/{id}/download',
      tags: ['Theme'],
      summary: '테마 다운로드',
      description: '테마의 다운로드 카운트를 증가시킵니다. 인증이 필요하지 않습니다.',
      request: {
        params: z.object({
          id: z.string().transform((val) => parseInt(val, 10)),
        }),
      },
      responses: {
        200: {
          description: '다운로드 카운트 증가 성공',
          content: {
            'application/json': {
              schema: downloadThemeOutput,
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

      // 테마 존재 확인
      const theme = await db.selectFrom('theme').select(['id', 'name']).where('id', '=', id).executeTakeFirst();

      if (!theme) {
        throw new HTTPException(404, { message: '테마를 찾을 수 없습니다.' });
      }

      // 다운로드 카운트 증가
      const updatedTheme = await db
        .updateTable('theme')
        .set((eb) => ({ downloadCount: eb('downloadCount', '+', 1) }))
        .where('id', '=', id)
        .returning(['downloadCount'])
        .executeTakeFirstOrThrow();

      return context.json({
        downloadCount: updatedTheme.downloadCount,
        message: '다운로드 카운트가 증가되었습니다.',
      });
    }
  );
}
