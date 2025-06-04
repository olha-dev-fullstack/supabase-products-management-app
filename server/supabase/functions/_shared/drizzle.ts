import { sql } from "drizzle-orm";
import { PgDatabase } from "drizzle-orm/pg-core";

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
