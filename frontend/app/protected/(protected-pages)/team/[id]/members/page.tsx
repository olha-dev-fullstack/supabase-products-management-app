"use client";
import React from "react";
import TeamMembersList from "./components/TeamMembersList";
import { useMembers } from "@/hooks/use-members";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";


const MembersPage = () => {
  const { getMembers } = useMembers();
  const { session, loading: isSessionLoading } = useUser();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["members"],
    queryFn: async () => getMembers(),
    enabled: !!session,
    retry: false,
  });
  if (isSessionLoading) {
    return <div>Loading session...</div>;
  }
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Team Members</h1>
      <TeamMembersList data={data} isLoading={isLoading} error={error} />
    </div>
  );
};

export default MembersPage;
