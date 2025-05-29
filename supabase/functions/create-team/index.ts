// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import getDB from "../_shared/db.ts";
import { teams } from "../_shared/schema.ts";
import { corsHeaders } from "../_shared/cors.ts";
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  if (req.method !== "POST") {
    return new Response("Only POST allowed", { status: 405 });
  }
  try {
    const db = getDB();
    const { name: teamName } = await req.json();

    if (!teamName) {
      return new Response("Missing team name", { status: 400 });
    }

    const joinCode = crypto.randomUUID().slice(0, 6);
    console.log(joinCode);

    const result = await db.insert(teams).values({
      name: teamName,
      joinCode,
    }).returning();

    

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: {  ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      headers: { ...corsHeaders},
      status: 500,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-team' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
