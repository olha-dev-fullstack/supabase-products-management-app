"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTeams } from "../hooks/use-teams";

const CreateTeamCard = () => {
  const { createTeam } = useTeams();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries(["team"]);
    },
  });

  const handleCreateTeam = (formData: FormData) => {
    mutation.mutate({
      name: formData.get("name") as string,
    });
  };
  return (
    <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create team</CardTitle>
        </CardHeader>
      <form className="gap-4">
        <CardContent>
          <div className="grid w-full items-center">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="name"
                name="name"
                placeholder="Name of your team"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button formAction={handleCreateTeam}>Create</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateTeamCard;
