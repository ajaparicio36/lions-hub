"use client";

import { useState } from "react";
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
import { FirebaseError } from "firebase/app";
import { storage, auth, db } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { createNewTeam } from "@/lib/getNewTeamRef";
import { doc, setDoc } from "firebase/firestore";

// Constants
const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Types
interface FormValues {
  teamName: string;
  description: string;
  gameName: string;
  photo?: FileList;
}

interface CreateTeamFormProps {
  userId: string;
  onSuccess: () => void;
}

// Helper functions
const validateFile = (file: File): string | null => {
  if (file.size > MAX_FILE_SIZE) {
    return "File size must be less than 5MB";
  }
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "Only .jpg, .png and .webp files are accepted";
  }
  return null;
};

const uploadImage = async (file: File, teamId: string): Promise<string> => {
  const fileName = `teams/${teamId}_${Date.now()}_${file.name}`;
  const storageRef = ref(storage, fileName);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "storage/unauthorized") {
        throw new Error("Unauthorized to upload images");
      }
    }
    throw new Error("Failed to upload image");
  }
};

export function CreateTeamForm({ userId, onSuccess }: CreateTeamFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      teamName: "",
      description: "",
      gameName: "",
    },
  });

  const handleImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const fileError = validateFile(file);
    if (fileError) {
      form.setError("photo", { message: fileError });
      return;
    }

    handleImagePreview(file);
  };

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);

    try {
      // Get current user
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("You must be logged in to create a team");
      }

      // Create team reference first to get ID
      const teamDoc = await createNewTeam();

      // Handle photo upload if exists
      let photoUrl: string | undefined;
      if (values.photo?.[0]) {
        photoUrl = await uploadImage(values.photo[0], teamDoc.id);
      }

      const teamRef = doc(db, "teams", teamDoc.id);

      await setDoc(teamRef, {
        teamName: values.teamName,
        description: values.description,
        gameName: values.gameName,
        userUids: [...new Set([userId, currentUser.uid])],
        photo: photoUrl || null,
      });

      onSuccess();
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "storage/unauthorized":
            setError("You don't have permission to upload images");
            break;
          case "storage/canceled":
            setError("Image upload was cancelled");
            break;
          case "storage/retry-limit-exceeded":
            setError("Network error. Please try again");
            break;
          default:
            setError(error.message);
        }
      } else {
        setError((error as Error).message || "Failed to create team");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="teamName"
          rules={{
            required: "Team name is required",
            minLength: {
              value: 2,
              message: "Team name must be at least 2 characters",
            },
            maxLength: {
              value: 50,
              message: "Team name must be less than 50 characters",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter team name"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          rules={{
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
            maxLength: {
              value: 500,
              message: "Description must be less than 500 characters",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your team"
                  className="resize-none"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gameName"
          rules={{
            required: "Game name is required",
            minLength: {
              value: 2,
              message: "Game name must be at least 2 characters",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter game name"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photo"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Team Logo</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                    onChange={(e) => {
                      handleImageChange(e);
                      onChange(e.target.files);
                    }}
                    disabled={isLoading}
                    {...field}
                    {...value}
                  />
                  {previewUrl && (
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src={previewUrl}
                        alt="Team logo preview"
                        fill
                        className="object-cover"
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

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Creating Team..." : "Create Team"}
        </Button>
      </form>
    </Form>
  );
}
