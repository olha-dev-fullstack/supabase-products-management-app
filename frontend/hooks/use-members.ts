"use client";
import { requestClient } from "@/lib/request-client";
import { useUser } from "./use-user";

export const useMembers = () => {
  const { session } = useUser();
  const getMembers = async () => {
    try {
      const { data: membersData } = await requestClient.get(`/get-members`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      
      return membersData;
    } catch (error) {
      console.log(error.message);
    }
  };
  return { getMembers };
};
