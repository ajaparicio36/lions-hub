import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const consent = cookieStore.get("cookie-consent");

  return NextResponse.json({ consent: consent?.value });
}

export async function POST(request: Request) {
  const { consent } = await request.json();
  const cookieStore = await cookies();

  cookieStore.set("cookie-consent", consent, { maxAge: 60 * 60 * 24 * 365 }); // 1 year

  return NextResponse.json({ success: true });
}
