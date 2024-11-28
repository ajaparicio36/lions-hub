"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function NoTeams() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-2xl font-bold mb-4">You are not on a team!</p>
      <div className="space-x-4">
        <Button onClick={() => router.push("/create-team")}>
          Create a team
        </Button>
        <Button onClick={() => router.push("/join-team")}>Join a team</Button>
      </div>
    </div>
  );
}
