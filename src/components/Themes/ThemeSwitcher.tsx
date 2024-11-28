"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface ThemeSwitcherProps {
  variant?: "button-only" | "full";
}

export function ThemeSwitcher({ variant = "button-only" }: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    // Update the cookie via API route
    await fetch("/api/theme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ theme: newTheme }),
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex flex-row items-center gap-2 w-full"
    >
      {variant === "button-only" ? (
        theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )
      ) : theme === "dark" ? (
        <div className="flex flex-row items-center gap-4">
          <Sun className="h-5 w-5" />
          <p className="text-sm font-medium">Switch to Light Mode</p>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-4">
          <Moon className="h-5 w-5" />
          <p>Switch to Dark Mode</p>
        </div>
      )}
    </Button>
  );
}
