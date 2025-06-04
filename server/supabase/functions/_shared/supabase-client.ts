import { createClient } from "jsr:@supabase/supabase-js@2";
import { jwtDecode, JwtPayload } from "npm:jwt-decode";
import { createDrizzle } from "./drizzle.ts";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users } from "./schema.ts";

export function decode(accessToken: string) {
  try {
    return jwtDecode<JwtPayload & { role: string }>(accessToken);
  } catch (error) {
    return { role: "anon" } as JwtPayload & { role: string };
  }
}
console.log("11111111", Deno.env.get("DB_CONNECTION_STRING"));
console.log("11111111", Deno.env.get("SUPABASE_DB_URL"));

const client = drizzle({
  client: postgres(Deno.env.get("SUPABASE_DB_URL"), { prepare: false }),
});
export const getUserFromAuth = async (req) => {
  console.log("create client req", req);

  const supabaseClient = (req) =>
    createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get("SUPABASE_URL") ?? "",
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );
  const {
    data: { user },
  } = await supabaseClient(req).auth.getUser();
  return user;
};

export const getDrizzleDbClient = async (req) => {

  const supabaseClient = (req) =>
    createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get("SUPABASE_URL") ?? "",
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );
  const {
    data: { user },
    error
  } = await supabaseClient(req).auth.getUser();
  console.log(await supabaseClient(req).auth.getUser());
  
  
  return createDrizzle(user.id, user.role, user, { client });
};