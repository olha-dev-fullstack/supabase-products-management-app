import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
const connectionString = Deno.env.get("SUPABASE_DB_URL")!;
export default function getDb() {
  const client = postgres(connectionString, { prepare: false });
  const db = drizzle(client);
  return db;
}
