"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateTeamForm } from "./CreateTeamForm";
import { JoinTeamForm } from "./JoinTeamForm";
import { Plus } from "lucide-react";

interface CreateJoinTeamDialogProps {
  userId: string;
}

export function CreateJoinTeamDialog({ userId }: CreateJoinTeamDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Team
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create or Join a Team</DialogTitle>
          <DialogDescription>
            Create a new team or join an existing one using an invite link.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Team</TabsTrigger>
            <TabsTrigger value="join">Join Team</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <CreateTeamForm userId={userId} onSuccess={() => setOpen(false)} />
          </TabsContent>
          <TabsContent value="join">
            <JoinTeamForm userId={userId} onSuccess={() => setOpen(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
