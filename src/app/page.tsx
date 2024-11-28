import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Trophy, MessageCircle } from "lucide-react";
import { CookieConsent } from "@/components/Themes/CookieConsent";
import LandingNavBar from "@/components/Navigation/LandingNavBar";
import { getUserFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const user = await getUserFromSession();
  if (user) {
    redirect("/app");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavBar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Level Up Your Team Management
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Track tournaments, log scrimmages, and analyze team
                    statistics all in one place. Join the elite ranks of
                    organized competitive play.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/account">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground"
                    >
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-[400px] h-[400px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 rounded-lg transform rotate-3"></div>
                  <div className="absolute inset-0 bg-card rounded-lg transform -rotate-3 shadow-xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="h-40 w-40 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Essential Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage your VALORANT team effectively
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4">
                <Trophy className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Tournament Tracking</h3>
                <p className="text-muted-foreground text-center">
                  Keep track of all your tournament schedules, results, and
                  achievements in one place.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Team Statistics</h3>
                <p className="text-muted-foreground text-center">
                  Analyze team performance with detailed statistics and
                  performance metrics.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <MessageCircle className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Team Communication</h3>
                <p className="text-muted-foreground text-center">
                  Built-in chat system for seamless team coordination and
                  strategy discussion.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Join Now
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start managing your team like professionals. Create your
                  account today.
                </p>
              </div>
              <Link href="/account">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground"
                >
                  Create Your Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center justify-between px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} tatayless. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
      <CookieConsent />
    </div>
  );
}
