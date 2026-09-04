import { NextRequest, NextResponse } from "next/server";
import {
  getAdminSessionMessages,
  sendAdminReply,
  updateSessionStatus,
} from "@/lib/chat";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
  }

  try {
    const messages = await getAdminSessionMessages(sessionId);
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("API /api/chat/messages error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { sessionId, message, adminName } = body;

    if (!sessionId || !message?.trim()) {
      return NextResponse.json(
        { error: "sessionId and message are required" },
        { status: 400 }
      );
    }

    const reply = await sendAdminReply(
      sessionId,
      message.trim(),
      adminName?.trim() || "SHAYDHA Executive Support"
    );

    if (!reply) {
      return NextResponse.json({ error: "Failed to send reply" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: reply });
  } catch (error) {
    console.error("API /api/chat/messages POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { sessionId, status } = body;

    if (!sessionId || !status) {
      return NextResponse.json(
        { error: "sessionId and status are required" },
        { status: 400 }
      );
    }

    const updated = await updateSessionStatus(sessionId, status);
    return NextResponse.json({ success: updated });
  } catch (error) {
    console.error("API /api/chat/messages PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
