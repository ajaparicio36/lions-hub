"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  inviteLink: z.string().url({
    message: "Please enter a valid invite link.",
  }),
});

interface JoinTeamFormProps {
  userId: string;
  onSuccess: () => void;
}

const joinTeam = async (userId: string, teamId: string, code: string) => {
  // Implement joining a team
  console.log("Joining team", userId, teamId, code);
};

export function JoinTeamForm({ userId, onSuccess }: JoinTeamFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inviteLink: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const url = new URL(values.inviteLink);
      const teamId = url.searchParams.get("team");
      const code = url.searchParams.get("code");

      if (!teamId || !code) {
        throw new Error("Invalid invite link");
      }

      await joinTeam(userId, teamId, code);
      onSuccess();
    } catch (error) {
      console.error("Failed to join team:", error);
      form.setError("inviteLink", {
        type: "manual",
        message: "Failed to join team. Please check your invite link.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="inviteLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invite Link</FormLabel>
              <FormControl>
                <Input placeholder="Paste invite link here" {...field} />
              </FormControl>
              <FormDescription>
                Enter the invite link in the format:
                /invite?team=[teamId]&code=[code]
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Joining..." : "Join Team"}
        </Button>
      </form>
    </Form>
  );
}
