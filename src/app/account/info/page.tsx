import { Metadata } from "next";
import UserInfoForm from "@/components/Account/UserInfoForm";
import { getUserFromSession } from "@/lib/auth";
import { db } from "@/lib/firebase-admin";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Complete Your Profile | VALORANT Team Hub",
  description:
    "Provide additional information to complete your VALORANT Team Hub profile",
};

export default async function UserInfoPage() {
  const user = await getUserFromSession();
  if (user) {
    const userRef = db.collection("users").doc(user.id);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      redirect("/app");
    }
  }
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <UserInfoForm />
      </div>
    </div>
  );
}
