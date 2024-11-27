import { Metadata } from "next";
import UserInfoForm from "@/components/Account/UserInfoForm";

export const metadata: Metadata = {
  title: "Complete Your Profile | VALORANT Team Hub",
  description:
    "Provide additional information to complete your VALORANT Team Hub profile",
};

export default function UserInfoPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <UserInfoForm />
      </div>
    </div>
  );
}
