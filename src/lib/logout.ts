import { auth } from "./firebase";

export async function logout() {
  try {
    await auth.signOut();

    // Call the API route to clear the session cookie
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });

    if (!response.ok) {
      throw new Error("Failed to logout on the server");
    }

    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
}
