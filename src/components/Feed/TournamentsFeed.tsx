"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TeamListProps {
  tournaments?: string[];
}

export function TournamentFeed({ tournaments }: TeamListProps) {
  const router = useRouter();

  const handleTeamClick = (teamId: string) => {
    router.push(`/app/team/${teamId}`);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
      {tournaments &&
        tournaments.map((tournament) => (
          <Card
            key={tournament}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleTeamClick(tournament)}
          >
            <CardHeader>
              <CardTitle>{tournament}</CardTitle>
              <CardDescription>{tournament}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{tournament}</p>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
