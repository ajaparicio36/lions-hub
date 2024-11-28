import { Metadata } from "next";
import AccountTabs from "@/components/Account/AccountTabs";
import { getUserFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Account | VALORANT Team Hub",
  description: "Sign up or log in to your VALORANT Team Hub account",
};

export default async function AccountPage() {
  const user = await getUserFromSession();
  if (user) {
    redirect("/app");
  }
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <AccountTabs />
      </div>
    </div>
  );
}
