"use client";
import { AppSidebar } from "@/components/team-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useTeams } from "@/hooks/use-teams";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";
import { toast } from "sonner";

const TeamPageLayout = ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) => {
  const { getTeamById } = useTeams();
  const { id } = use(params);
  const { session } = useUser();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["team"],
    queryFn: () => getTeamById({ teamId: id }),
    enabled: !!session,
  });

  if (isError) {
    toast.error(error.message);
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <SidebarProvider>
      <AppSidebar teamName={data.name} />
      <>
        <SidebarTrigger />
        {children}
      </>
    </SidebarProvider>
  );
};

export default TeamPageLayout;
