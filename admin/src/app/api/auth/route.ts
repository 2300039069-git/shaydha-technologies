import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  getAdminPasscode,
  getAuthTokenValue,
  verifyAdminToken,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { passcode } = body;

    if (!passcode) {
      return NextResponse.json(
        { error: "Passcode is required" },
        { status: 400 }
      );
    }

    const expected = getAdminPasscode();
    if (passcode !== expected) {
      return NextResponse.json(
        { error: "Invalid admin passcode" },
        { status: 401 }
      );
    }

    // Set auth cookie
    const cookieStore = cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, getAuthTokenValue(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" && !req.headers.get("host")?.includes("localhost"),
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Authenticated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const isAuth = verifyAdminToken(token);
  return NextResponse.json({ authenticated: isAuth });
}

export async function DELETE() {
  const cookieStore = cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return NextResponse.json({ success: true, message: "Logged out" });
}
