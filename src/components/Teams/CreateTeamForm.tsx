"use client";

import { useState, useRef } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const createTeam = async (formData: FormData) => {
  // Implement team creation
  console.log("Creating team", formData);
};

const formSchema = z.object({
  teamName: z.string().min(2, {
    message: "Team name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  gameName: z.string().min(2, {
    message: "Game name must be at least 2 characters.",
  }),
  photo: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .png and .webp files are accepted."
    )
    .optional(),
});

interface CreateTeamFormProps {
  userId: string;
  onSuccess: () => void;
}

export function CreateTeamForm({ userId, onSuccess }: CreateTeamFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      description: "",
      gameName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("teamName", values.teamName);
      formData.append("description", values.description);
      formData.append("gameName", values.gameName);
      formData.append("userUids", JSON.stringify([userId]));

      if (values.photo && values.photo.length > 0) {
        formData.append("photo", values.photo[0]);
      } else {
        formData.append("photo", "teams/default.jpg");
      }

      await createTeam(formData);
      onSuccess();
    } catch (error) {
      console.error("Failed to create team:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter team name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your team"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gameName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter game name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photo"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Team Logo</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleImageChange(e);
                      onChange(e.target.files);
                    }}
                    {...field}
                    ref={fileInputRef}
                  />
                  {previewUrl && (
                    <div className="relative w-16 h-16">
                      <Image
                        src={previewUrl}
                        alt="Team logo preview"
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Upload a team logo (optional). Max file size: 5MB. Accepted
                formats: .jpg, .png, .webp
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Team"}
        </Button>
      </form>
    </Form>
  );
}
