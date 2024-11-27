import { auth, db } from "./firebase-admin";
import { cookies } from "next/headers";

export async function createSessionCookie(idToken: string) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
  (await cookies()).set("session", sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function getUserFromSession() {
  const session = await (await cookies()).get("session")?.value;
  if (!session) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(session, true);
    const userDoc = await db.collection("users").doc(decodedClaims.uid).get();
    if (userDoc.exists) {
      return { id: decodedClaims.uid, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error("Error verifying session:", error);
    return null;
  }
}
