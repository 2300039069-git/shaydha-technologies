import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/db";
import { sendLeadNotificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      whatsapp,
      company,
      projectType,
      budget,
      timeline,
      message,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    const lead = await createLead({
      source: "project_planner",
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      whatsapp: whatsapp?.trim() || phone?.trim(),
      company: company?.trim(),
      projectType: projectType || "Not Specified",
      budget: budget || "Not sure yet",
      timeline: timeline || "Flexible",
      message: message?.trim() || "Project request submitted via multi-step form.",
    });

    sendLeadNotificationEmail({
      subject: `New Project Request: ${lead.projectType} (${lead.budget}) - ${lead.name}`,
      leadDetails: {
        source: "Multi-Step Project Planner",
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        whatsapp: lead.whatsapp,
        company: lead.company,
        projectType: lead.projectType,
        budget: lead.budget,
        timeline: lead.timeline,
        message: lead.message,
      },
    }).catch((err) => console.error("Email dispatch failed:", err));

    return NextResponse.json({
      success: true,
      message:
        "Thank you! Your project request has been received. Our team will contact you shortly.",
      leadId: lead.id,
    });
  } catch (err: any) {
    console.error("API /api/project-request error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try reaching us directly on WhatsApp." },
      { status: 500 }
    );
  }
}
