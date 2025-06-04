import { createClient } from "jsr:@supabase/supabase-js@2";


export const supabaseClient = (req) =>
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

export const getUserFromAuth = async (req) => {
  console.log("create client req", req);
  const {
    data: { user },
  } = await supabaseClient(req).auth.getUser();
  return user;
};

