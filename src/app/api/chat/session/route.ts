import { NextRequest, NextResponse } from "next/server";
import {
  createOrGetChatSession,
  insertLeadToPostgres,
  saveChatMessage,
} from "@/lib/postgres";
import { generateId } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { sessionId, name, email, phone } = body;

    const session = await createOrGetChatSession(sessionId, {
      name: name?.trim(),
      email: email?.trim(),
      phone: phone?.trim(),
    });

    if (!session) {
      return NextResponse.json({ error: "Failed to initialize chat session" }, { status: 500 });
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error("API /api/chat/session error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, name, email, phone, projectType, message } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    const session = await createOrGetChatSession(sessionId, {
      name: name?.trim(),
      email: email?.trim(),
      phone: phone?.trim(),
    });

    // Also register lead in pipeline
    if (name || email) {
      await insertLeadToPostgres({
        id: `lead_chat_${generateId()}`,
        source: "chat_widget",
        name: name?.trim() || "Live Chat Visitor",
        email: email?.trim() || "chat-visitor@shaydha.com",
        phone: phone?.trim(),
        whatsapp: phone?.trim(),
        projectType: projectType || "Live Chat Project Discussion",
        message: message?.trim() || "Customer initiated live chat session.",
        status: "New",
        createdAt: new Date().toISOString(),
      });

      // Insert system acknowledgment in chat
      await saveChatMessage(
        sessionId,
        "admin",
        `Thank you ${name || ""}! Your details have been received. An executive engineer has joined this thread.`,
        "SHAYDHA Executive Support"
      );
    }

    return NextResponse.json({ success: true, session });
  } catch (error) {
    console.error("API /api/chat/session PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
