import { TeamList } from "@/components/Teams/TeamsList";
import { NoTeams } from "@/components/Teams/NoTeams";
import { getUserTeams } from "@/lib/getUserTeams";
import { getUserFromSession } from "@/lib/auth";
import { Team } from "@/lib/teams";

export default async function HomePage() {
  const user = await getUserFromSession();

  if (!user) {
    return <div>Please log in to view your teams.</div>;
  }

  const teams: Team[] = await getUserTeams(user.id);

  if (teams.length === 0) {
    return <NoTeams />;
  }

  return <TeamList teams={teams} />;
}
