import { TeamList } from "@/components/Teams/TeamsList";
import { NoTeams } from "@/components/Teams/NoTeams";
import { getUserTeams } from "@/lib/getUserTeams";
import { getUserFromSession } from "@/lib/auth";
import { Team } from "@/lib/teams";
import { redirect } from "next/navigation";
import { CreateJoinTeamDialog } from "@/components/Teams/CreateJoinTeamDialog";

export default async function HomePage() {
  const user = await getUserFromSession();
  if (!user) {
    redirect("/account");
  }
  const teams: Team[] = await getUserTeams(user.id);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Teams</h1>
        <CreateJoinTeamDialog userId={user.id} />
      </div>
      {teams.length === 0 ? <NoTeams /> : <TeamList teams={teams} />}
    </div>
  );
}
