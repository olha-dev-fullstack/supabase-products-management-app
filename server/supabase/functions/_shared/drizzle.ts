import { sql } from "drizzle-orm";
import { PgDatabase } from "drizzle-orm/pg-core";
import postgres from "postgres";
import { jwtDecode, JwtPayload } from "npm:jwt-decode";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = Deno.env.get("SUPABASE_DB_URL")!;
const cleanedConnectionString = connectionString.replace(/\?sslmode=prefer$/, "");

export function createDrizzle(
  userId: string,
  userRole: string,
  claims: any,
  { client }: { client: PgDatabase<any> }
) {
  return {
    rls: (async (transaction, ...rest) => {
      return await client.transaction(async (tx) => {
        // 1. Set RLS context
        await tx.execute(
          sql`SET LOCAL ROLE "${sql.raw(userRole || "authenticated")}";`
        );
        const claimsToSet = {
          sub: userId,
          role: userRole || "authenticated",
          ...claims,
        };
        await tx.execute(
          sql`SELECT set_config('request.jwt.claims', ${JSON.stringify(
            claimsToSet
          )}, true);`
        );
        await tx.execute(
          sql`SELECT set_config('request.user.id', ${userId}, true);`
        );
        await tx.execute(
          sql`SELECT set_config('request.role', ${
            userRole || "authenticated"
          }, true);`
        );
        return transaction(tx);
      }, ...rest);
    }) as typeof client.transaction,
  };
}
export function decode(accessToken: string) {
  try {
    return jwtDecode<JwtPayload & { role: string }>(accessToken);
  } catch (error) {
    return { role: "anon" } as JwtPayload & { role: string };
  }
}

export const client = drizzle({
  client: postgres(cleanedConnectionString, { prepare: false }),
});
