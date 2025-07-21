import { OpenAPIHono } from '@hono/zod-openapi';
import { Bindings } from '../../types';

export function openApiExtension(app: OpenAPIHono<Bindings>): void {
  app.doc('/spec.json', {
    openapi: '3.1.0',
    info: {
      version: '0.1.0',
      title: 'EXIF Frame API',
      description: 'EXIF Frame API Documentation',
    },
  });

  // OpenAPI 보안 스키마 추가
  app.openAPIRegistry.registerComponent('securitySchemes', 'Bearer', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  });
}
