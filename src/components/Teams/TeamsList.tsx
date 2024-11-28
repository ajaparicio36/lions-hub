"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Team } from "@/lib/teams";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";

interface TeamListProps {
  teams: Team[];
}

export function TeamList({ teams }: TeamListProps) {
  const router = useRouter();

  const handleTeamClick = (teamId: string) => {
    router.push(`/app/team/${teamId}`);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {teams.map((team) => (
        <Card
          key={team.id}
          className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
          onClick={() => handleTeamClick(team.id)}
        >
          <div className="p-6 flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={team.photo} alt={team.name} />
              <AvatarFallback className="text-2xl">
                {team.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold mb-1">{team.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {team.gameName}
            </p>
            <div className="w-full space-y-2">
              <p className="text-sm line-clamp-2 text-muted-foreground">
                {team.description}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{team.userUids.length} members</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
