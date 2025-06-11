"use client";
import { useTeamContext } from "../components/TeamContext";

const TeamPage = () => {
  const { teamData } = useTeamContext();

  return <div>
    <h2>{teamData?.name}</h2>
    <p>Join code: {teamData?.joinCode}</p>
  </div>;
};

export default TeamPage;
