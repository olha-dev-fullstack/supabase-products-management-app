"use client";
import { AppSidebar } from "@/components/team-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useTeams } from "@/hooks/use-teams";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { use } from "react";
import { toast } from "sonner";
import { TeamContextProvider } from "../components/TeamContext";

const TeamPageLayout = ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) => {
  const router = useRouter();
  const { getTeamById } = useTeams();
  const { id } = use(params);
  const { session } = useUser();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["team"],
    queryFn: () => getTeamById({ teamId: id }),
    enabled: !!session,
    retry: false,
  });

  if (isError || error) {
    toast.error(error.message);
    if (axios.isAxiosError(error)) {
      if (error.status === 403) {
        router.push("/protected/team");
      }
    }
    return <div>Error</div>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <TeamContextProvider params={params}>
      <SidebarProvider defaultOpen className="w-auto">
        {data && (
          <>
            <AppSidebar teamId={data.id} teamName={data.name} />
            <SidebarTrigger />
            <div className="p-5 w-full">{children}</div>
          </>
        )}
      </SidebarProvider>
      </TeamContextProvider>
  );
};

export default TeamPageLayout;
