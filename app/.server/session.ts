import { Cookie, createSessionStorage } from "@remix-run/node"; // or cloudflare/deno
import db from "./drizzle";
import { sessionSchema } from "./schema/schema";
import { eq } from "drizzle-orm/sql";

function createDatabaseSessionStorage({
    cookie,
}: {
    cookie: Cookie;
}) {
  // Configure your database client...

  return createSessionStorage({
    cookie,
    async createData(data, expires) {
      // `expires` is a Date after which the data should be considered
      // invalid. You could use it to invalidate the data somehow or
      // automatically purge this record from your database.
      const resultSet = await db.insert(sessionSchema).values({
        id: data.id,
        user_id: data.userId,
        expires: expires?.toISOString() ?? "",
        
      });
      return data.id;
    },
    async readData(id) {
      return (await db.select().from(sessionSchema).where(eq(sessionSchema.id, id))) || null;
    },
    async updateData(id, data, expires) {
      await db.update(sessionSchema).set(
        {
            id: data.id,
            user_id: data.userId,
            expires: expires?.toISOString() ?? "",
            
          }).where(eq(sessionSchema.id, id));
    },
    async deleteData(id) {
      await db.delete(sessionSchema).where(eq(sessionSchema.id, id));
    },
  });
}

const { getSession, commitSession, destroySession } =
  createDatabaseSessionStorage({
    cookie: {
      name: "__session",
      isSigned: true,
      serialize: async(data) => {
        // Serialize the data into a string
        return JSON.stringify(data);
      },
      parse: (s) => {
        // Parse the cookie value and return the data
        return JSON.parse(s ??'{}');

      }
    },
  });


  export { getSession, commitSession, destroySession };