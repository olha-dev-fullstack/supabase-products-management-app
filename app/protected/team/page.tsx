"use client";
import CreateTeamCard from "@/components/create-team-card";
import JoinTeamCard from "@/components/join-team-card";
import { useTeams } from "@/hooks/use-teams";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const TeamsPage = () => {
  const { getTeam } = useTeams();
  const { session } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["team"],
    queryFn: getTeam,
    enabled: !!session,
  });

  if (isError) {
    toast.error(error.message);
  }

  if (isPending) {
    return <p>Loading...</p>;
  }
  if (data.id) {
    router.push(`${pathname}/${data.id}`);
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
