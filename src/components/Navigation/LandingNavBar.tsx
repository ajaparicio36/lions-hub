import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";
import { ThemeSwitcher } from "../Themes/ThemeSwitcher";

const LandingNavBar = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
      <Link className="flex items-center justify-center" href="/">
        <Shield className="h-6 w-6" />
        <span className="ml-2 text-lg font-bold">Golden Lions VALORANT</span>
      </Link>
      <nav className="flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#about"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/login"
        >
          Login
        </Link>
        <ThemeSwitcher />
      </nav>
    </header>
  );
};

export default LandingNavBar;
