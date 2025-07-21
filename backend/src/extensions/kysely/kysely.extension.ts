import { Hono } from 'hono';
import { D1Dialect } from 'kysely-d1';
import { Kysely } from 'kysely';
import { Bindings } from '../../types';

export async function kyselyExtension(app: Hono<Bindings>): Promise<void> {
  app.use(async (c, next) => {
    c.env.db = new Kysely({
      dialect: new D1Dialect({
        database: c.env.DB,
      }),
    });
    await next();
  });
}
