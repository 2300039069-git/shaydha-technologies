import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/db";
import { sendLeadNotificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, company } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const lead = await createLead({
      source: "contact_form",
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      whatsapp: phone?.trim(),
      company: company?.trim(),
      message: message.trim(),
    });

    // Send email notification asynchronously
    sendLeadNotificationEmail({
      subject: `New Contact Form Enquiry from ${lead.name}`,
      leadDetails: {
        source: "Contact Page Form",
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        message: lead.message,
      },
    }).catch((err) => console.error("Email dispatch failed:", err));

    return NextResponse.json({
      success: true,
      message: "Thank you for contacting SHAYDHA TECHNOLOGIES. We will get back to you shortly.",
      leadId: lead.id,
    });
  } catch (err: any) {
    console.error("API /api/contact error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try reaching us directly on WhatsApp or email." },
      { status: 500 }
    );
  }
}
