import { Kysely } from 'kysely';
import { Database } from './extensions/kysely/kysely.database';

export type Env = {
  DB: D1Database;
  JWT_SECRET_KEY: string;
  ACCESS_TOKEN_EXPIRES_IN?: string; // 기본값: 15분 (15m)
  REFRESH_TOKEN_EXPIRES_IN?: string; // 기본값: 30일 (30d)

  db: Kysely<Database>;
};

export type Bindings = {
  Bindings: Env;
};
