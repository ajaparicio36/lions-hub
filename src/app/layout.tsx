import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProviders } from "@/components/Themes/ThemeProviders";
import { CookieConsent } from "@/components/Themes/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VALORANT Team Hub",
  description: "Manage your VALORANT team like professionals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProviders>
          {/* You can add a persistent layout here, e.g., a header with the theme switcher */}
          {children}
          <CookieConsent />
        </ThemeProviders>
      </body>
    </html>
  );
}
