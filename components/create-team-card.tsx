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
import { useMutation } from "@tanstack/react-query";
import { useTeams } from "../hooks/use-teams";

const CreateTeamCard = () => {
  const { createTeam } = useTeams();

  const mutation = useMutation({
    mutationFn: createTeam,
  });

  const handleCreateTeam = (formData: FormData) => {
    console.log(formData);
    
    // const name = formData.get("name");
    // if(!name || name === "") {
    //   toast.error("Name cannot be empty")
    // }
    mutation.mutate({
      name: formData.get("name") as string,
    });
  };
  return (
    <Card className="w-[350px]">
      <form>
        <CardHeader>
          <CardTitle>Create team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input id="name" name="name" placeholder="Name of your team" required />
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
