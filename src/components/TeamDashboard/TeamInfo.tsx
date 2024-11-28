import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Team } from "@/lib/teams";

export default function TeamInfo({ team }: { team: Team }) {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={team.photo} alt={team.name} />
          <AvatarFallback className="text-3xl">
            {team.name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{team.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{team.gameName}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p>{team.description}</p>
      </CardContent>
    </Card>
  );
}
