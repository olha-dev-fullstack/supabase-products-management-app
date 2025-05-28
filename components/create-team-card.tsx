

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"



const CreateTeamCard = () => {
  return (
    <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Create team</CardTitle>
    </CardHeader>
    <CardContent>
      <form>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Input id="name" placeholder="Name of your team" />
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex justify-center">
      <Button>Create</Button>
    </CardFooter>
  </Card>
  )
}

export default CreateTeamCard