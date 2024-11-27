import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Clear the session cookie
    const response = NextResponse.json({ status: "success" }, { status: 200 });
    response.cookies.set("session", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
