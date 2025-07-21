import { corsExtension } from './extensions/cors.extension';
import { openApiExtension } from './extensions/open-api.extension';
import { scalarExtension } from './extensions/scalar.extension';
import { Bindings } from './types';
import { OpenAPIHono } from '@hono/zod-openapi';

async function bootstrap(): Promise<OpenAPIHono<Bindings>> {
  const app = new OpenAPIHono<Bindings>();

  [corsExtension, openApiExtension, scalarExtension].map((extension) => extension(app));

  return app;
}

export default await bootstrap();
