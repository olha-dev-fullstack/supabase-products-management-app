// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { eq } from "drizzle-orm";
import getDb from "../_shared/db.ts";
import { teams, users } from "../_shared/schema.ts";
import { getUserFromAuth } from "../_shared/supabase-client.ts";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "GET") {
    return new Response("Only GET allowed", { status: 405 });
  }

  const url = new URL(req.url);
  const teamIdFromUrl = url.searchParams.get("id");
  const user = await getUserFromAuth(req);

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      headers: { ...corsHeaders },
      status: 401,
    });
  }

  const db = getDb();
  const userId = user.id;
  const teamIdResult = await db
    .select({ teamId: users.teamId })
    .from(users)
    .where(eq(users.id, userId));
  const { teamId } = teamIdResult[0];

  if (!teamIdFromUrl) {
    return new Response(JSON.stringify({ id: teamId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (teamId !== teamIdFromUrl) {
    return new Response(
      JSON.stringify({ error: "User doesn't have an access to this team" }),
      {
        headers: { ...corsHeaders },
        status: 403,
      }
    );
  }

  const teamDataResult = await db
    .select()
    .from(teams)
    .where(eq(teams.id, teamId));

  return new Response(JSON.stringify(teamDataResult[0]), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/get-team' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
