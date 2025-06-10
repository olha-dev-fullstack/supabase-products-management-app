// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getDrizzleDbClient } from "../_shared/db.ts";
import { products } from "../_shared/schema.ts";
import { getUserFromAuth } from "../_shared/supabase-client.ts";
import { asc, count, ne } from "drizzle-orm";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "GET") {
    return new Response("Only GET allowed", { status: 405 });
  }
  try {
    const searchParams = new URL(req.url).searchParams;
    const page = parseInt(searchParams.get("page")!);
    const pageSize = parseInt(searchParams.get("pageSize")!);
    const drizzleDb = await getDrizzleDbClient(req);
    const result = await drizzleDb.rls((tx) =>
      tx
        .select()
        .from(products)
        .where(ne(products.status, "Deleted"))
        .orderBy(asc(products.createdAt), asc(products.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize)
    );
    const numberOfProducts = await drizzleDb.rls((tx) =>
      tx.select({ count: count() }).from(products)
    );

    const totalPages = Math.ceil(numberOfProducts[0].count / pageSize);

    return new Response(JSON.stringify({result, totalPages}), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      headers: { ...corsHeaders },
      status: 500,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/get-products' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
