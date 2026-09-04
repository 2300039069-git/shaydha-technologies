import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/db";
import { sendLeadNotificationEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, projectType, message, conversationHistory, isQuickDoubt } = body;

    // 1. If it's a quick question / doubt without contact info, return automated answer
    if (isQuickDoubt && !email) {
      const q = (message || "").toLowerCase();
      let botReply = "Thank you for reaching out to SHAYDHA TECHNOLOGIES. How can our engineering team assist you today?";

      if (q.includes("time") || q.includes("reply") || q.includes("contact") || q.includes("fast") || q.includes("response") || q.includes("how long")) {
        botReply = "⏱ **Engineering Response Time**: Our engineering directors review every incoming specification within **2 hours** during business hours. Once verified, a senior technical lead will contact you directly via WhatsApp or email to discuss architecture and timelines.";
      } else if (q.includes("service") || q.includes("technology") || q.includes("stack") || q.includes("what do you do") || q.includes("build")) {
        botReply = "💡 **Our Core Capabilities**:\n• **Next.js & Full-Stack Web**: High-performance SSR applications & SaaS platforms.\n• **Mobile Apps**: Cross-platform iOS & Android engineering.\n• **Enterprise AI & LLMs**: Custom AI agents, fine-tuned models & RAG document search.\n• **Custom Cloud Architecture**: High-availability, scalable AWS/GCP pipelines.";
      } else if (q.includes("pricing") || q.includes("cost") || q.includes("budget") || q.includes("ip") || q.includes("ownership") || q.includes("nda")) {
        botReply = "💰 **Pricing & IP Ownership**:\n• **100% Client Ownership**: All intellectual property, source code, and assets belong exclusively to you.\n• **Strict Mutual NDA**: Signed before any deep architectural discovery.\n• **Flexible Engagements**: Fixed-scope MVP sprints, dedicated engineering pods, or agile time & materials.";
      } else if (q.includes("process") || q.includes("how it works") || q.includes("steps")) {
        botReply = "🚀 **Our 5-Step Engineering Process**:\n1. **Technical Discovery & Blueprint** (48h)\n2. **Interactive UI/UX Prototype**\n3. **Agile 2-Week Sprints**\n4. **Automated QA & Security Audit**\n5. **Production Launch & 90-Day Post-Launch Warranty**";
      }

      return NextResponse.json({
        success: true,
        reply: botReply,
      });
    }

    // 2. Full Project Application Submission
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required to submit your project for engineering review." },
        { status: 400 }
      );
    }

    const conversationSummary = conversationHistory
      ? conversationHistory
          .map((m: any) => `[${m.sender === "user" || m.sender === "customer" ? "Client" : "Automated Bot"}]: ${m.text}`)
          .join("\n")
      : message;

    const lead = await createLead({
      source: "chat_widget",
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      whatsapp: phone?.trim(),
      projectType: projectType || "Live Chat Project Application",
      message: `${message ? message + "\n\n" : ""}Interactive Bot Conversation:\n${conversationSummary}`,
    });

    sendLeadNotificationEmail({
      subject: `New Automated Bot Application: ${lead.name} (${lead.projectType})`,
      leadDetails: {
        source: "Automated Engineering Concierge",
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        projectType: lead.projectType,
        message: lead.message,
      },
    }).catch((err) => console.error("Email dispatch failed:", err));

    return NextResponse.json({
      success: true,
      reply:
        "✅ We have received your project application! Our engineering team is currently reviewing your technical specifications. Once verified, our technical lead will contact you directly via WhatsApp / Email within 2 hours.",
      leadId: lead.id,
      lead,
    });
  } catch (err: any) {
    console.error("API /api/chat error:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your enquiry. Please reach out via WhatsApp." },
      { status: 500 }
    );
  }
}
