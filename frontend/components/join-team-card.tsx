import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTeams } from "@/hooks/use-teams";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const JoinTeamCard = () => {
  const { joinTeam } = useTeams();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: joinTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
    },
  });

  const handleJoinTeam = (formData: FormData) => {
    mutation.mutate({
      joinCode: formData.get("joinCode") as string,
    });
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Join team</CardTitle>
      </CardHeader>
      <form className="gap-4">
        <CardContent>
          <div className="grid w-full items-center">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="joinCode"
                name="joinCode"
                placeholder="Paste your team code here"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button formAction={handleJoinTeam}>Join</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default JoinTeamCard;
