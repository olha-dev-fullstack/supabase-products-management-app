import React from "react";
interface Props {
  params: { id: string };
}

const TeamPage = ({ params: { id } }: Props) => {
  return <div>Detailed page for team {id}</div>;
};

export default TeamPage;
