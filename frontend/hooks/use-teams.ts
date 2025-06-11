import { requestClient } from "@/lib/request-client";
import { useUser } from "./use-user";

export const useTeams = () => {
  const { session } = useUser();
  const createTeam = async ({
    name
  }: {
    name: string;
  }) => {
    try {
      const { data: createdTeam } = await requestClient.post(
        "/create-team",
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      return createdTeam;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTeam = async () => {    
    try {
      const { data: teamData } = await requestClient.get(
        "/get-team",
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
     return teamData;
    } catch (error) {
      console.log(error.message);
    }
  }

  const getTeamById = async ({teamId}: {teamId: string}) => {
    try {
      const { data: teamData } = await requestClient.get(
        `/get-team?id=${teamId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      return teamData;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  const joinTeam = async ({
    joinCode
  }: {
    joinCode: string;
  }) => {
    try {
      const { data: joinedTeam } = await requestClient.post(
        "/join-team",
        {
          joinCode,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      return joinedTeam;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  return { createTeam, getTeam, getTeamById, joinTeam };
};
