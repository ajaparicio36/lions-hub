"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Team } from "@/lib/teams";

export default function TeamPage() {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    async function fetchTeam() {
      const docRef = doc(db, "teams", id);
      const teamDoc = await getDoc(docRef);
      if (teamDoc.exists()) {
        const team = {
          id: teamDoc.id,
          teamName: teamDoc.data().teamName,
          description: teamDoc.data().description,
          gameName: teamDoc.data().gameName,
          userUids: teamDoc.data().userUids,
        };
        setTeam(team);
      }
    }
    fetchTeam();
  }, [id]);

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>{team["teamName"]}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Game:</strong> {team.gameName}
          </p>
          <p>
            <strong>Description:</strong> {team.description}
          </p>
          <p>
            <strong>Members:</strong> {team["userUids"].length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
