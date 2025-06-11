import { useTeams } from "@/hooks/use-teams";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import { createContext, use, useContext } from "react";

interface TeamContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  teamData: any; // Replace `any` with your actual team data type if known
  refetchTeam: () => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamContextProvider({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) {
  const { session} = useUser();
  const { getTeamById } = useTeams();
  const { id } = use(params);
  const {
    data: teamData,
    refetch,
  } = useQuery({
    queryKey: ["team", id],
    queryFn: () => getTeamById({ teamId: id }),
    enabled: !!session?.access_token,
  });

  return (
    <TeamContext.Provider value={{ teamData, refetchTeam: refetch }}>
      {children}
    </TeamContext.Provider>
  );
}
export const useTeamContext = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeamContext must be used within a TeamContextProvider");
  }
  return context;
};
