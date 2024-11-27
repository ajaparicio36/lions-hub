import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { ThemeProviders } from "@/components/Themes/ThemeProviders";
import { CookieConsent } from "@/components/Themes/CookieConsent";
import { AuthProvider } from "@/components/Context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lions Hub",
  description: "Manage your team like professionals",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProviders defaultTheme={theme?.value}>
          <AuthProvider>
            {children}
            <CookieConsent />
          </AuthProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
