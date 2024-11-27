import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/firebase-admin";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value || "";

  // Validate the session
  if (session) {
    try {
      const decodedClaims = await auth.verifySessionCookie(session, true);
      const response = NextResponse.next();
      response.headers.set("X-User-ID", decodedClaims.uid);
      return response;
    } catch (error) {
      // Session is invalid or expired
      console.error("Error verifying session:", error);
    }
  }

  // Redirect to login if session is invalid or doesn't exist
  if (request.nextUrl.pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/account/:path*"],
};
