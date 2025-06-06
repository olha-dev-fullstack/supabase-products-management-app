"use client";
import { AppSidebar } from "@/components/team-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useTeams } from "@/hooks/use-teams";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "next/navigation";
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
        redirect("/protected/team");
      }
    }
    return <div>Error</div>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <SidebarProvider defaultOpen className="w-auto">
      {data && (
        <>
          <AppSidebar teamName={data.name} />
          <SidebarTrigger />
          <div className="p-5">{children}</div>
        </>
      )}
    </SidebarProvider>
  );
};

export default TeamPageLayout;
