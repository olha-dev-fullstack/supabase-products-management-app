import type { Config } from "drizzle-kit";
export default {
    dbCredentials: {
        url: "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
      },
    schema: "./supabase/functions/_shared/schema.ts",
    out: "./supabase/migrations",
    dialect: "postgresql",
    verbose: true
} satisfies Config;
