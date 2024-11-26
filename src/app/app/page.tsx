import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AppPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Total number of team members</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">5</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Tournaments</CardTitle>
          <CardDescription>Tournaments in the next 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">2</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Win Rate</CardTitle>
          <CardDescription>Overall team win rate</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">68%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Unread Messages</CardTitle>
          <CardDescription>Messages in team chat</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">12</p>
        </CardContent>
      </Card>
    </div>
  );
}
