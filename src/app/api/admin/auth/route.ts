import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { passcode } = await req.json();
    const expectedPasscode = process.env.ADMIN_SECRET || "shaydha2026";

    if (passcode === expectedPasscode) {
      const response = NextResponse.json({
        success: true,
        message: "Authenticated successfully.",
      });

      // Set cookie for session persistence
      const isHttps = process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://") ?? false;
      response.cookies.set("shaydha_admin_auth", "authenticated", {
        httpOnly: true,
        secure: isHttps,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { error: "Invalid administrative passcode." },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Authentication failed." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out." });
  response.cookies.delete("shaydha_admin_auth");
  return response;
}
