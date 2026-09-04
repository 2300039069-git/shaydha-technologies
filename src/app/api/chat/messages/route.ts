import { NextRequest, NextResponse } from "next/server";
import {
  getChatMessages,
  saveChatMessage,
  markSessionReadByCustomer,
} from "@/lib/postgres";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    const messages = await getChatMessages(sessionId);
    await markSessionReadByCustomer(sessionId);

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("API /api/chat/messages GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, message, senderName } = body;

    if (!sessionId || !message?.trim()) {
      return NextResponse.json(
        { error: "sessionId and message are required" },
        { status: 400 }
      );
    }

    const saved = await saveChatMessage(
      sessionId,
      "customer",
      message.trim(),
      senderName?.trim() || "Customer"
    );

    if (!saved) {
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: saved });
  } catch (error) {
    console.error("API /api/chat/messages POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
