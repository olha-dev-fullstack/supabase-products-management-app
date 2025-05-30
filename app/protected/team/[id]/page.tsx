"use client";
import React, { use } from "react";
interface Props {
  params: Promise<{ id: string }>;
}

const TeamPage = ({ params }: Props) => {
  const { id } = use(params);
  return <div>Detailed page for team {id}</div>;
};

export default TeamPage;
