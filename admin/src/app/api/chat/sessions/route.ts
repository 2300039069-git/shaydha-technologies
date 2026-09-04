import { NextRequest, NextResponse } from "next/server";
import { getAdminChatSessions } from "@/lib/chat";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sessions = await getAdminChatSessions();
    return NextResponse.json({ sessions, total: sessions.length });
  } catch (error) {
    console.error("API /api/chat/sessions error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
