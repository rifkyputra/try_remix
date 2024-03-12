import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { migrate } from 'drizzle-orm/libsql/migrator';
import 'dotenv/config';
export const client = createClient({ url: process.env.DATABASE_URL ?? '', authToken: process.env.DATABASE_TOKEN ?? '' });

const db = drizzle(client);



export default db;