import { Frown } from "lucide-react";

export function NoTeams() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 opacity-80 h-screen">
      <Frown className="h-24 w-24 text-gray-500" />
      <p className="text-2xl font-bold mb-4 text-gray-500">
        You are not on a team!
      </p>
    </div>
  );
}
