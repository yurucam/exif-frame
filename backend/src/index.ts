import { corsExtension } from './extensions/cors/cors.extension';
import { kyselyExtension } from './extensions/kysely/kysely.extension';
import { openApiExtension } from './extensions/open-api/open-api.extension';
import { scalarExtension } from './extensions/scalar/scalar.extension';
import { Bindings } from './types';
import { OpenAPIHono } from '@hono/zod-openapi';

async function bootstrap(): Promise<OpenAPIHono<Bindings>> {
  const app = new OpenAPIHono<Bindings>();

  [kyselyExtension, corsExtension, openApiExtension, scalarExtension].map((extension) => extension(app));

  return app;
}

export default await bootstrap();
