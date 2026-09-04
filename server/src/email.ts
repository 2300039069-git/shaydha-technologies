import nodemailer from "nodemailer";

const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || "shaydhatechnologies@gmail.com";
const ADMIN_NOTIFICATION_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "shaydhatechnologies@gmail.com";

interface LeadNotificationPayload {
  subject: string;
  leadDetails: {
    source: string;
    name: string;
    email: string;
    phone?: string;
    whatsapp?: string;
    company?: string;
    projectType?: string;
    budget?: string;
    timeline?: string;
    message?: string;
  };
}

interface CustomerAutoReplyPayload {
  customerName: string;
  customerEmail: string;
  projectType?: string;
  phone?: string;
  referenceId?: string;
}

export async function sendCustomerAutoReplyEmail({
  customerName,
  customerEmail,
  projectType,
  phone,
  referenceId,
}: CustomerAutoReplyPayload): Promise<{ success: boolean; simulated?: boolean }> {
  const subject = "We Received Your Project Enquiry — SHAYDHA TECHNOLOGIES";

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0f19; color: #f8fafc; border: 1px solid #1e293b; border-radius: 14px; overflow: hidden;">
      <div style="background: #0f172a; padding: 28px; text-align: center; border-bottom: 1px solid #1e293b;">
        <h2 style="margin: 0; color: #38bdf8; font-size: 22px; letter-spacing: 2px;">SHAYDHA TECHNOLOGIES</h2>
        <p style="margin: 6px 0 0; color: #94a3b8; font-size: 13px;">Engineering Concierge Notification</p>
      </div>
      <div style="padding: 28px;">
        <p style="font-size: 15px; margin-top: 0;">Dear <strong>${customerName}</strong>,</p>
        <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
          Thank you for reaching out to <strong>SHAYDHA TECHNOLOGIES</strong>. We have logged your project enquiry into our engineering review pipeline.
        </p>
        <div style="background: #131d31; border: 1px solid #1e293b; border-radius: 10px; padding: 18px; margin: 20px 0;">
          <h4 style="margin: 0 0 10px; color: #38bdf8; font-size: 14px;">Review Notice & SLA:</h4>
          <p style="margin: 0; font-size: 13px; color: #e2e8f0; line-height: 1.5;">
            Our technical directors review every proposal. Once verified, our engineering lead will contact you directly within <strong>2 hours</strong>.
          </p>
          ${referenceId ? `<p style="margin: 10px 0 0; font-size: 12px; color: #64748b; font-family: monospace;">Reference ID: ${referenceId}</p>` : ""}
        </div>
        <p style="font-size: 13px; color: #94a3b8; line-height: 1.5;">
          Direct Inquiries: <a href="mailto:${OFFICIAL_EMAIL}" style="color: #38bdf8;">${OFFICIAL_EMAIL}</a>
        </p>
      </div>
      <div style="background: #050811; padding: 16px; text-align: center; font-size: 11px; color: #64748b;">
        © 2026 SHAYDHA TECHNOLOGIES • High-Performance Software Engineering
      </div>
    </div>
  `;

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("-----------------------------------------");
    console.log(`[AWS SERVER AUTO-RESPONDER] Automated response triggered:`);
    console.log(`To Customer: ${customerName} <${customerEmail}>`);
    console.log(`From: SHAYDHA TECHNOLOGIES <${OFFICIAL_EMAIL}>`);
    console.log(`Subject: ${subject}`);
    console.log("-----------------------------------------");
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) !== 587,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"SHAYDHA TECHNOLOGIES" <${OFFICIAL_EMAIL}>`,
      to: customerEmail,
      subject,
      html: htmlContent,
    });

    return { success: true, simulated: false };
  } catch (error) {
    console.error("Failed to send auto-reply email:", error);
    return { success: false };
  }
}

export async function sendLeadNotificationEmail({
  subject,
  leadDetails,
}: LeadNotificationPayload): Promise<{ success: boolean; simulated?: boolean }> {
  // Always trigger the customer auto-reply
  if (leadDetails.email) {
    sendCustomerAutoReplyEmail({
      customerName: leadDetails.name,
      customerEmail: leadDetails.email,
      projectType: leadDetails.projectType,
      phone: leadDetails.phone,
    }).catch((err) => console.error("Auto-reply trigger failed:", err));
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("-----------------------------------------");
    console.log(`[AWS SERVER NOTIFICATION] Lead logged:`);
    console.log(`To Admin: ${ADMIN_NOTIFICATION_EMAIL}`);
    console.log(`From Client: ${leadDetails.name} <${leadDetails.email}>`);
    console.log(`Subject: ${subject}`);
    console.log("-----------------------------------------");
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) !== 587,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"SHAYDHA Pipeline" <${OFFICIAL_EMAIL}>`,
      to: ADMIN_NOTIFICATION_EMAIL,
      subject,
      html: `<h3>New Lead Received</h3><p><strong>Name:</strong> ${leadDetails.name}</p><p><strong>Email:</strong> ${leadDetails.email}</p><p><strong>Message:</strong> ${leadDetails.message}</p>`,
    });

    return { success: true, simulated: false };
  } catch (err) {
    console.error("Failed to send admin notification:", err);
    return { success: false };
  }
}
