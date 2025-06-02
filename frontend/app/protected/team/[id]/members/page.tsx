import React from "react";
interface Props {
  params: { id: string };
}

const MembersPage = ({ params: { id } }: Props) => {
  return <div>Members of team {id}</div>;
};

export default MembersPage;
