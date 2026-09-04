import nodemailer from "nodemailer";

interface EmailPayload {
  subject: string;
  recipientEmail?: string;
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

const OFFICIAL_EMAIL = "shaydhatechnologies@gmail.com";

// 1. Sends automated acknowledgment email to customer
export async function sendCustomerAutoReplyEmail({
  customerName,
  customerEmail,
  projectType,
  phone,
  referenceId,
}: CustomerAutoReplyPayload): Promise<{ success: boolean; simulated?: boolean }> {
  const subject = "We Received Your Project Enquiry — SHAYDHA TECHNOLOGIES";

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #07080b; color: #f8fafc; border: 1px solid #1f2438; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #1e1b4b 0%, #0c1222 100%); padding: 36px 28px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.08); position: relative;">
        <div style="display: inline-block; padding: 10px; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); margin-bottom: 12px;">
          <span style="font-size: 22px; font-weight: 900; letter-spacing: 3px; color: #ffffff; text-transform: uppercase;">SHAYDHA</span>
          <span style="font-size: 11px; font-weight: 700; color: #06b6d4; margin-left: 4px; letter-spacing: 1px;">TECHNOLOGIES</span>
        </div>
        <h1 style="margin: 8px 0 0; color: #ffffff; font-size: 20px; font-weight: 700;">We Have Received Your Project Request</h1>
        <p style="margin: 6px 0 0; color: #94a3b8; font-size: 13px; font-family: monospace;">2-Hour Engineering Review In Progress</p>
      </div>

      <!-- Main Body -->
      <div style="padding: 32px 28px;">
        <p style="font-size: 15px; color: #f1f5f9; line-height: 1.6; margin-top: 0;">
          Dear <strong>${customerName}</strong>,
        </p>

        <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
          Thank you for reaching out to <strong>SHAYDHA TECHNOLOGIES</strong>. We have successfully logged your project specifications and requirements into our engineering pipeline.
        </p>

        <!-- 2-Hour SLA Callout Box -->
        <div style="background: rgba(6, 182, 212, 0.08); border: 1px solid rgba(6, 182, 212, 0.25); border-radius: 12px; padding: 18px 20px; margin: 24px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 6px;">
            <span style="color: #38bdf8; font-size: 16px; margin-right: 8px;">⏱</span>
            <strong style="color: #38bdf8; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-family: monospace;">2-Hour Engineering Response Guarantee</strong>
          </div>
          <p style="margin: 0; color: #e2e8f0; font-size: 13px; line-height: 1.5;">
            Our engineering directors are reviewing your technical specifications now. Once verified, one of our <strong>senior technical leads will contact you directly within 2 hours</strong> to discuss the architecture roadmap, scope breakdown, and preliminary estimates.
          </p>
        </div>

        <!-- Application Summary -->
        <div style="background: #0f131d; border: 1px solid #1e2433; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <h3 style="margin: 0 0 12px; color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-family: monospace;">Application Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            ${referenceId ? `
            <tr style="border-bottom: 1px solid #1a202c;">
              <td style="padding: 8px 0; color: #64748b; width: 35%;">Reference ID:</td>
              <td style="padding: 8px 0; color: #38bdf8; font-family: monospace; font-weight: bold;">${referenceId}</td>
            </tr>` : ""}
            ${projectType ? `
            <tr style="border-bottom: 1px solid #1a202c;">
              <td style="padding: 8px 0; color: #64748b;">Project Focus:</td>
              <td style="padding: 8px 0; color: #f8fafc; font-weight: 600;">${projectType}</td>
            </tr>` : ""}
            <tr style="border-bottom: 1px solid #1a202c;">
              <td style="padding: 8px 0; color: #64748b;">Registered Email:</td>
              <td style="padding: 8px 0; color: #f8fafc;">${customerEmail}</td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Phone / WhatsApp:</td>
              <td style="padding: 8px 0; color: #f8fafc;">${phone}</td>
            </tr>` : ""}
          </table>
        </div>

        <p style="font-size: 13px; color: #94a3b8; line-height: 1.6;">
          If your request is urgent, or if you wish to share diagrams, technical specifications, or documents directly, you can reply directly to this email or reach us on WhatsApp:
        </p>

        <!-- Action Buttons -->
        <div style="margin: 28px 0 10px; text-align: center;">
          <a href="https://wa.me/919876543210?text=Hi%20SHAYDHA,%20I%20just%20submitted%20a%20project%20enquiry" 
             style="background: #25d366; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px; display: inline-block; margin-right: 10px; box-shadow: 0 4px 12px rgba(37,211,102,0.3);">
            Chat on WhatsApp →
          </a>
          <a href="mailto:${OFFICIAL_EMAIL}?subject=Urgent%20Project%20Query%20-%20${encodeURIComponent(customerName)}" 
             style="background: #1e293b; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px; display: inline-block; border: 1px solid rgba(255,255,255,0.15);">
            Reply via Email
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #050608; padding: 18px 24px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #151824;">
        <p style="margin: 0 0 4px;"><strong>SHAYDHA TECHNOLOGIES</strong> • Bengaluru & Hyderabad, India</p>
        <p style="margin: 0;">Official Communications: <a href="mailto:${OFFICIAL_EMAIL}" style="color: #38bdf8; text-decoration: none;">${OFFICIAL_EMAIL}</a></p>
      </div>
    </div>
  `;

  // SMTP Check
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("-----------------------------------------");
    console.log("[EMAIL AUTO-RESPONDER] Automated customer response triggered:");
    console.log(`To Customer: ${customerName} <${customerEmail}>`);
    console.log(`From Official: SHAYDHA TECHNOLOGIES <${OFFICIAL_EMAIL}>`);
    console.log(`Subject: ${subject}`);
    console.log(`Notice: "Our engineers have received your application and will contact you within 2 hours."`);
    console.log("-----------------------------------------");
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"SHAYDHA TECHNOLOGIES" <${OFFICIAL_EMAIL}>`,
      to: customerEmail,
      subject,
      html: htmlContent,
    });

    return { success: true, simulated: false };
  } catch (error) {
    console.error("Failed to send customer auto-responder email:", error);
    return { success: false };
  }
}

// 2. Sends notification to internal admin team & triggers customer auto-responder
export async function sendLeadNotificationEmail({
  subject,
  leadDetails,
}: EmailPayload): Promise<{ success: boolean; simulated?: boolean }> {
  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    OFFICIAL_EMAIL;

  const {
    source,
    name,
    email,
    phone,
    whatsapp,
    company,
    projectType,
    budget,
    timeline,
    message,
  } = leadDetails;

  // Fire automated auto-reply to customer
  if (email) {
    sendCustomerAutoReplyEmail({
      customerName: name,
      customerEmail: email,
      projectType,
      phone: phone || whatsapp,
    }).catch((err) => console.error("Auto-reply trigger failed:", err));
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0e14; color: #f8fafc; border: 1px solid #1f2432; border-radius: 8px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #4f46e5, #06b6d4); padding: 24px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">SHAYDHA TECHNOLOGIES</h1>
        <p style="margin: 4px 0 0; color: #e0e7ff; font-size: 14px;">New Client Enquiry Captured</p>
      </div>

      <div style="padding: 24px;">
        <h2 style="font-size: 18px; color: #38bdf8; margin-top: 0;">Enquiry Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr style="border-bottom: 1px solid #1f2432;">
            <td style="padding: 10px 0; color: #94a3b8; font-weight: bold; width: 35%;">Source:</td>
            <td style="padding: 10px 0; color: #f8fafc;">${source}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1f2432;">
            <td style="padding: 10px 0; color: #94a3b8; font-weight: bold;">Client Name:</td>
            <td style="padding: 10px 0; color: #f8fafc; font-weight: bold;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1f2432;">
            <td style="padding: 10px 0; color: #94a3b8; font-weight: bold;">Email:</td>
            <td style="padding: 10px 0; color: #38bdf8;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
          </tr>
          ${phone ? `
          <tr style="border-bottom: 1px solid #1f2432;">
            <td style="padding: 10px 0; color: #94a3b8; font-weight: bold;">Phone / WhatsApp:</td>
            <td style="padding: 10px 0; color: #f8fafc;"><a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}" style="color: #4ade80; text-decoration: none;">${phone} (Chat on WhatsApp)</a></td>
          </tr>` : ""}
          ${company ? `
          <tr style="border-bottom: 1px solid #1f2432;">
            <td style="padding: 10px 0; color: #94a3b8; font-weight: bold;">Company:</td>
            <td style="padding: 10px 0; color: #f8fafc;">${company}</td>
          </tr>` : ""}
          ${projectType ? `
          <tr style="border-bottom: 1px solid #1f2432;">
            <td style="padding: 10px 0; color: #94a3b8; font-weight: bold;">Project Type:</td>
            <td style="padding: 10px 0; color: #818cf8; font-weight: bold;">${projectType}</td>
          </tr>` : ""}
          ${budget ? `
          <tr style="border-bottom: 1px solid #1f2432;">
            <td style="padding: 10px 0; color: #94a3b8; font-weight: bold;">Budget Range:</td>
            <td style="padding: 10px 0; color: #34d399;">${budget}</td>
          </tr>` : ""}
          ${timeline ? `
          <tr style="border-bottom: 1px solid #1f2432;">
            <td style="padding: 10px 0; color: #94a3b8; font-weight: bold;">Timeline:</td>
            <td style="padding: 10px 0; color: #f8fafc;">${timeline}</td>
          </tr>` : ""}
        </table>

        ${message ? `
        <div style="background: #131722; padding: 16px; border-radius: 6px; border-left: 3px solid #6366f1;">
          <p style="margin: 0 0 6px; color: #94a3b8; font-size: 12px; text-transform: uppercase;">Message Brief</p>
          <p style="margin: 0; color: #f1f5f9; line-height: 1.5; white-space: pre-wrap;">${message}</p>
        </div>` : ""}

        <div style="margin-top: 24px; text-align: center;">
          <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject)}" 
             style="background: #4f46e5; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
            Reply to Client Directly →
          </a>
        </div>
      </div>

      <div style="background: #08090d; padding: 12px; text-align: center; font-size: 11px; color: #64748b;">
        Automated Dispatch from SHAYDHA TECHNOLOGIES Platform
      </div>
    </div>
  `;

  // Check if SMTP is configured
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("-----------------------------------------");
    console.log("[EMAIL SIMULATOR] SMTP not configured. Lead notification logged:");
    console.log(`To Admin: ${adminEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`From Client: ${name} <${email}>`);
    console.log("-----------------------------------------");
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"SHAYDHA TECHNOLOGIES" <${OFFICIAL_EMAIL}>`,
      to: adminEmail,
      replyTo: email,
      subject: subject,
      html: htmlContent,
    });

    return { success: true, simulated: false };
  } catch (error) {
    console.error("Failed to dispatch lead email to admin:", error);
    return { success: false };
  }
}
