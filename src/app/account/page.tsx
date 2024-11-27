import { Metadata } from "next";
import AccountTabs from "@/components/Account/AccountTabs";

export const metadata: Metadata = {
  title: "Account | VALORANT Team Hub",
  description: "Sign up or log in to your VALORANT Team Hub account",
};

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <AccountTabs />
      </div>
    </div>
  );
}
