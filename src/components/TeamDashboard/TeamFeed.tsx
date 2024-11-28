"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageSquare, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-3 mb-4">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-sm">
        {description}
      </p>
      <Button onClick={onAction}>{actionLabel}</Button>
    </div>
  );
}

export default function TeamFeed({ teamId }: { teamId: string }) {
  const [activeTab, setActiveTab] = useState("posts");
  console.log(teamId);

  const handleCreatePost = () => {
    // Implement post creation
    console.log("Create post");
  };

  const handleCreateEvent = () => {
    // Implement event creation
    console.log("Create event");
  };

  const handleCreateTournament = () => {
    // Implement tournament creation
    console.log("Create tournament");
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Team Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="posts"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <EmptyState
              icon={<MessageSquare className="h-6 w-6 text-muted-foreground" />}
              title="No posts yet"
              description="Create your first post to share with your team."
              actionLabel="Create Post"
              onAction={handleCreatePost}
            />
          </TabsContent>
          <TabsContent value="schedule">
            <EmptyState
              icon={<Calendar className="h-6 w-6 text-muted-foreground" />}
              title="No events scheduled"
              description="Schedule your first team event or practice session."
              actionLabel="Schedule Event"
              onAction={handleCreateEvent}
            />
          </TabsContent>
          <TabsContent value="tournaments">
            <EmptyState
              icon={<Trophy className="h-6 w-6 text-muted-foreground" />}
              title="No tournaments yet"
              description="Add your first tournament participation."
              actionLabel="Add Tournament"
              onAction={handleCreateTournament}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
