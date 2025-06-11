import { AuthError, Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { requestClient } from "@/lib/request-client";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUser() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;

        if (session) {
          setSession(session);
          setUser(session.user);
        }
      } catch (error) {
        setError(error as AuthError);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const getUserFromDb = async () => {
    const { data: userFromDb } = await requestClient.get("/get-me", {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    return userFromDb;
  }

  return { loading, error, session, user, getUserFromDb };
}
