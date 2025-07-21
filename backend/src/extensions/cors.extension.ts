import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { Bindings } from '../types';

export function corsExtension(app: OpenAPIHono<Bindings>): void {
  app.use('*', cors());
}
