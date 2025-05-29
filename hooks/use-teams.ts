import { requestClient } from "@/lib/request-client";

export const useTeams = () => {
  const createTeam = async ({ name }: { name: string }) => {
    try {      
      const { data: createdTeam } = await requestClient.post("/create-team", {
        name,
      });
      console.log("createdTeam", createdTeam);
    } catch (error) {
      console.log(error.message);
    }
  };

  return { createTeam };
};
