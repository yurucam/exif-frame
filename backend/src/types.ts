import { Kysely } from 'kysely';
import { Database } from './extensions/kysely/kysely.database';

export type Env = {
  DB: D1Database;
  JWT_SECRET_KEY: string;

  db: Kysely<Database>;
};

export type Bindings = {
  Bindings: Env;
};
