"use client";
import { useTeamContext } from "../components/TeamContext";
interface Props {
  params: Promise<{ id: string }>;
}

const TeamPage = () => {
  const { teamData } = useTeamContext();

  return <div>
    <h2>{teamData?.name}</h2>
    <p>Join code: {teamData?.joinCode}</p>
  </div>;
};

export default TeamPage;
