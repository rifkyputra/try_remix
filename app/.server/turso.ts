import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();



 const  tursoClient = createClient({
  
  url: process.env.DATABASE_URL ?? '',
  authToken: process.env.DATABASE_TOKEN ?? '',
});


export default tursoClient;