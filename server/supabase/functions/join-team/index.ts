// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import getDB from "../_shared/db.ts";
import { teams, users } from "../_shared/schema.ts";
import { getUserFromAuth } from "../_shared/supabase-client.ts";
import { eq } from "drizzle-orm";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response("Only POST allowed", { status: 405 });
  }
  try {
    const db = getDB();
    const { joinCode } = await req.json();
    const user = await getUserFromAuth(req);
    const userId = user.id;
    console.log("USER", userId);
    

    if (!joinCode) {
      return new Response("Missing join code", { status: 400 });
    }

    const userTeams = await db
      .select({ teamId: users.teamId })
      .from(users)
      .where(eq(users.id, userId));
    if (userTeams[0].teamId) {
      console.log("userTeams", userTeams[0]);
      
      return new Response("User already joined team", { status: 400 });
    }
    const team = await db
      .select({ teamId: teams.id })
      .from(teams)
      .where(eq(teams.joinCode, joinCode))
      .limit(1);

    if (!team[0]) {
      return new Response("Invalid join code", { status: 400 });
    }

    const teamId = team[0].teamId;

    await db.update(users).set({ teamId: teamId }).where(eq(users.id, userId));

    return new Response(JSON.stringify(team[0]), {
      status: 201,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      headers: { ...corsHeaders },
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
