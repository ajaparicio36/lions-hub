"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Team } from "@/lib/teams";

interface TeamListProps {
  teams: Team[];
}

export function TeamList({ teams }: TeamListProps) {
  const router = useRouter();

  const handleTeamClick = (teamId: string) => {
    router.push(`/app/team/${teamId}`);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
      {teams.map((team) => (
        <Card
          key={team.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleTeamClick(team.id)}
        >
          <CardHeader>
            <CardTitle>{team.teamName}</CardTitle>
            <CardDescription>{team.gameName}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{team.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
