import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { theme } = await request.json();
  const cookieStore = await cookies();

  cookieStore.set("theme", theme, { maxAge: 60 * 60 * 24 * 365 }); // 1 year

  return NextResponse.json({ success: true });
}
