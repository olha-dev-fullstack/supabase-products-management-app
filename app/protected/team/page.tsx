import CreateTeamCard from "@/components/create-team-card";
import JoinTeamCard from "@/components/join-team-card";
import React from "react";

const TeamsPage = () => {
  return (
    <div className="flex flex-row justify-around items-stretch">
      <CreateTeamCard/>
      <p className="self-center">or</p>
      <JoinTeamCard />
    </div>
  );
};

export default TeamsPage;
