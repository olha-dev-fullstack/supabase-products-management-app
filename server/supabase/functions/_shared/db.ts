import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { getUserFromAuth } from "./supabase-client.ts";
import { createDrizzle, client } from "./drizzle.ts";

const connectionString = Deno.env.get("SUPABASE_DB_URL")!;
const cleanedConnectionString = connectionString.replace(/\?sslmode=prefer$/, "");

export default function getDb() {
  const client = postgres(cleanedConnectionString, { prepare: false });
  const db = drizzle(client);
  return db;
}

export const getDrizzleDbClient = async (req) => {
  const user = await getUserFromAuth(req);
  return createDrizzle(user.id, user.role, user, { client });
};
