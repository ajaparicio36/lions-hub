import { Suspense } from "react";
import { getUserFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import TeamInfo from "@/components/TeamDashboard/TeamInfo";
import PracticeArea from "@/components/TeamDashboard/PracticeArea";
import TeamFeed from "@/components/TeamDashboard/TeamFeed";
import TeamMembers from "@/components/TeamDashboard/TeamMembers";
import { getUserTeamById } from "@/lib/getTeamById";
import TeamInfoSkeleton from "@/components/TeamDashboard/skeletons/TeamInfoSkeleton";
import PracticeAreaSkeleton from "@/components/TeamDashboard/skeletons/PracticeAreaSkeleton";
import TeamFeedSkeleton from "@/components/TeamDashboard/skeletons/TeamFeedSkeleton";
import TeamMembersSkeleton from "@/components/TeamDashboard/skeletons/TeamMembersSkeleton";

export default async function TeamDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const user = await getUserFromSession();
  if (!user) {
    redirect("/account");
  }

  const team = await getUserTeamById(user.id, id);
  if (!team) {
    redirect("/app");
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Section A - Team Info */}
        <div className="md:col-span-2">
          <Suspense fallback={<TeamInfoSkeleton />}>
            <TeamInfo team={team} />
          </Suspense>
        </div>

        {/* Section B - Practice Area */}
        <div>
          <Suspense fallback={<PracticeAreaSkeleton />}>
            <PracticeArea />
          </Suspense>
        </div>

        {/* Section C - Team Feed */}
        <div className="md:col-span-2">
          <Suspense fallback={<TeamFeedSkeleton />}>
            <TeamFeed teamId={team.id} />
          </Suspense>
        </div>

        {/* Section D - Team Members */}
        <div>
          <Suspense fallback={<TeamMembersSkeleton />}>
            <TeamMembers team={team} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
