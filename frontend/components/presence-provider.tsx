"use client";

import { useUser } from "@/hooks/use-user";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

type OnlineStatus = { [userId: string]: boolean };

const PresenceContext = createContext<{ status: OnlineStatus }>({status: {}});

export const usePresence = () => useContext(PresenceContext);

export default function PresenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { user, getUserFromDb } = useUser();
  const [status, setStatus] = useState<OnlineStatus>({});
    console.log("123", user);

    
    const { isLoading, isError, data: userFromDb, error, refetch } = useQuery({
        queryKey: ["getMe"],
        queryFn: getUserFromDb,
        enabled: !!user,
        retry: false,
        
      });
  useEffect(() => {
    const initPresence = async () => {
      if (!user || isLoading || error || !userFromDb) return;

        console.log("user from db", userFromDb);
        

      //   const teamId = user.user_metadata.team_id; // Make sure you set this during signup
      const teamId = userFromDb.teamId;
      const channel = supabase.channel(`presence:team-${teamId}`, {
        config: { presence: { key: user.id } },
      });

      channel
        .on("presence", { event: "sync" }, () => {
          const state = channel.presenceState();
          console.log("state presence", state, user.id);
          
          const online = Object.keys(state).reduce((acc, id) => {
            acc[id] = true;
            return acc;
          }, {} as OnlineStatus);

          setStatus(online);
        })
        .subscribe(async (status) => {
          if (status !== "SUBSCRIBED") return;
          console.log("status subscribe", status, user.id);

          await channel.track({ id: user.id });
        });

      return () => {
        channel.unsubscribe();
      };
    };

    initPresence();
  }, [user,isLoading, error]);

  return (
    <PresenceContext.Provider value={{ status }}>
      {children}
    </PresenceContext.Provider>
  );
}
