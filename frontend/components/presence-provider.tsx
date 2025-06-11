"use client";

import { useUser } from "@/hooks/use-user";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

type OnlineStatus = { [userId: string]: boolean };

const PresenceContext = createContext<{ status: OnlineStatus }>({ status: {} });

export const usePresence = () => useContext(PresenceContext);

export default function PresenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { user, getUserFromDb } = useUser();
  const [status, setStatus] = useState<OnlineStatus>({});

  const {
    isLoading,
    data: userFromDb,
    error,
  } = useQuery({
    queryKey: ["getMe"],
    queryFn: getUserFromDb,
    enabled: !!user,
    retry: false,
  });
  useEffect(() => {
    const initPresence = async () => {
      if (!user || isLoading || error || !userFromDb) return;
      const teamId = userFromDb.teamId;
      const channel = supabase.channel(`presence:team-${teamId}`, {
        config: { presence: { key: user.id } },
      });

      channel
        .on("presence", { event: "sync" }, () => {
          const state = channel.presenceState();

          const online = Object.keys(state).reduce((acc, id) => {
            acc[id] = true;
            return acc;
          }, {} as OnlineStatus);

          setStatus(online);
        })
        .on("presence", { event: "join" }, ({ key, newPresences }) => {
          console.log("join", key, newPresences);
        })
        .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
          console.log("leave", key, leftPresences);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading, error]);

  return (
    <PresenceContext.Provider value={{ status }}>
      {children}
    </PresenceContext.Provider>
  );
}
