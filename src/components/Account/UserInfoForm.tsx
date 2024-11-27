"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Skeleton } from "../ui/skeleton";

const formSchema = z.object({
  ign: z
    .string()
    .min(3)
    .max(16)
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "IGN can only contain letters, numbers, and underscores",
    }),
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  phoneNumber: z.string(),
});

export default function UserInfoForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(db, "users", user.uid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          router.push("/app");
          setLoading(false);
        }
      }
    };

    getUserInfo();
  }, [router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ign: "",
      fullName: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = auth.currentUser;
      console.log(user);
      if (!user) {
        throw new Error("No authenticated user found");
      }

      const docRef = doc(db, "users", user.uid);

      await setDoc(docRef, {
        ign: values.ign,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        email: user.email,
      });

      console.log("User info saved successfully");
      router.push("/app"); // Redirect to dashboard or home page
    } catch (error) {
      console.error("Error saving user info:", error);
      setError("Failed to save user information. Please try again.");
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent>
          <div className="flex flex-col items-center justify-center py-4 space-y-3">
            <Skeleton className="h-[200px] w-[325px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[325px]" />
              <Skeleton className="h-4 w-[275px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>
          Provide additional information to complete your VALORANT Team Hub
          profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="ign"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>In-game Name (IGN)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your IGN" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your unique in-game identifier.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-red-500 text-sm">{error !== "" && error}</p>
            <Button type="submit" className="w-full">
              Complete Profile
            </Button>
          </form>
        </Form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
}
