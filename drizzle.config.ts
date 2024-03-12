import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import 'dotenv/config';


export default {
  schema: './app/.server/schema/schema.ts',
  out: './drizzle',
  driver: 'turso', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
    authToken: process.env.DATABASE_TOKEN ??    ''
  },
} satisfies Config;
