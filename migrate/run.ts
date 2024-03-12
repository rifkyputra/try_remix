import tursoClient from "app/.server/turso"
import db, { client } from "app/.server/drizzle"
import { todoSchema } from "~/.server/schema/schema"
import 'dotenv/config';
import { migrate } from 'drizzle-orm/libsql/migrator';

async function main() {

    // This will run migrations on the database, skipping the ones already applied
    await migrate(db, { migrationsFolder: './drizzle' });

    await client.close();

}


await main()