"use client";
import CreateTeamCard from "@/components/create-team-card";
import JoinTeamCard from "@/components/join-team-card";
import { useTeams } from "@/hooks/use-teams";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const TeamsPage = () => {
  const { getTeam } = useTeams();
  const { session } = useUser();
  const { isLoading, isError, data,  error } = useQuery({
    queryKey: ["team"],
    queryFn: getTeam,
    enabled: !!session,
  });

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if(isLoading) return;
    if (data?.id) {
      router.push(`${pathname}/${data.id}`);
    }
    if (isError) {
      toast.error(error.message);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-row justify-around items-stretch">
      <CreateTeamCard />
      <p className="self-center">or</p>
      <JoinTeamCard />
    </div>
  );
};

export default TeamsPage;
