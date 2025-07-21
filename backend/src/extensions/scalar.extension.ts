import { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import { Bindings } from '../types';

export function scalarExtension(app: OpenAPIHono<Bindings>): void {
  app.get(
    '/docs',
    Scalar({
      url: '/spec.json',
    }),
  );
}
