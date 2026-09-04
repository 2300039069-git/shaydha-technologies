import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { insertLead, getLeads, updateLeadStatus, deleteLead, getStats } from "./db";
import { sendLeadNotificationEmail } from "./email";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PASSCODE = process.env.ADMIN_SECRET || process.env.ADMIN_PASSCODE || "shaydha2026";

// Middleware
app.use(cors({
  origin: true, // Allow all incoming origins (Vercel, custom domains, localhost)
  credentials: true,
}));
app.use(express.json());

// 1. Health Check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "healthy",
    service: "SHAYDHA TECHNOLOGIES AWS Backend",
    timestamp: new Date().toISOString(),
    cloud: "AWS Free Tier",
  });
});

// 2. Contact Form Intake
app.post("/api/contact", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const leadId = `lead_${Date.now().toString(36)}${Math.random().toString(36).substring(2, 6)}`;
    const lead = {
      id: leadId,
      source: "contact_form",
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || "",
      whatsapp: phone?.trim() || "",
      company: company?.trim() || "",
      message: message.trim(),
      status: "New",
      notes: "",
      createdAt: new Date().toISOString(),
    };

    await insertLead(lead);

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
    }).catch(console.error);

    res.json({
      success: true,
      message: "Thank you for contacting SHAYDHA TECHNOLOGIES. We will get back to you shortly.",
      leadId: lead.id,
    });
  } catch (error: any) {
    console.error("Error in /api/contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 3. Multi-Step Project Planner Intake
app.post("/api/project-request", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, whatsapp, company, projectType, budget, timeline, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    const leadId = `lead_${Date.now().toString(36)}${Math.random().toString(36).substring(2, 6)}`;
    const lead = {
      id: leadId,
      source: "project_planner",
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || "",
      whatsapp: whatsapp?.trim() || phone?.trim() || "",
      company: company?.trim() || "",
      projectType: projectType || "Custom Development",
      budget: budget || "Not specified",
      timeline: timeline || "Flexible",
      message: message?.trim() || "Multi-step planner submission",
      status: "New",
      notes: "",
      createdAt: new Date().toISOString(),
    };

    await insertLead(lead);

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
    }).catch(console.error);

    res.json({
      success: true,
      message: "Thank you! Your project request has been received.",
      leadId: lead.id,
    });
  } catch (error: any) {
    console.error("Error in /api/project-request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 4. Automated Concierge Bot Intake & Q&A
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { message, leadData } = req.body;

    if (leadData && leadData.name && leadData.email) {
      const leadId = `lead_${Date.now().toString(36)}${Math.random().toString(36).substring(2, 6)}`;
      const lead = {
        id: leadId,
        source: "chat_bot",
        name: leadData.name.trim(),
        email: leadData.email.trim().toLowerCase(),
        phone: leadData.phone?.trim() || "",
        whatsapp: leadData.whatsapp?.trim() || leadData.phone?.trim() || "",
        company: leadData.company?.trim() || "",
        projectType: leadData.projectType || "General Software Inquiry",
        budget: leadData.budget || "TBD",
        timeline: leadData.timeline || "TBD",
        message: leadData.message?.trim() || message || "Bot inquiry submitted",
        status: "New",
        notes: "Captured via Automated Engineering Concierge Bot",
        createdAt: new Date().toISOString(),
      };

      await insertLead(lead);

      sendLeadNotificationEmail({
        subject: `New Bot Inquiry from ${lead.name} (${lead.email})`,
        leadDetails: {
          source: "Automated Engineering Bot",
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          company: lead.company,
          message: lead.message,
        },
      }).catch(console.error);

      return res.json({
        reply: `✅ Application Received & Logged! Reference ID: ${lead.id}. Our engineering directors are reviewing your specifications. Once verified, our technical lead will contact you directly via WhatsApp or Email within 2 hours.`,
        leadId: lead.id,
        saved: true,
      });
    }

    // Default FAQs
    const lower = (message || "").toLowerCase();
    let reply = "Thanks for asking! Our engineering directors review every proposal. Once verified, our technical lead contacts you within 2 hours. Would you like to share your project scope or leave your email so we can reach you?";

    if (lower.includes("time") || lower.includes("how long") || lower.includes("sla") || lower.includes("turnaround")) {
      reply = "Our engineering directors review every proposal within 2 hours. Once verified, our lead engineer will reach out to you directly via WhatsApp or Email.";
    } else if (lower.includes("pricing") || lower.includes("cost") || lower.includes("rate") || lower.includes("budget")) {
      reply = "We offer flexible delivery models including milestone-based fixed scope and dedicated engineering sprint pods. Share your requirements and we will send a tailored estimate.";
    }

    res.json({ reply });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 5. Admin Authentication
app.post("/api/auth", (req: Request, res: Response) => {
  const { passcode } = req.body;
  if (passcode === ADMIN_PASSCODE) {
    return res.json({ success: true, token: "authorized" });
  }
  return res.status(401).json({ error: "Invalid passcode" });
});

// 6. Admin Leads Query & Filter
app.get("/api/leads", async (req: Request, res: Response) => {
  try {
    const status = req.query.status as string;
    const search = req.query.search as string;
    const leads = await getLeads(status, search);
    res.json({ leads, total: leads.length });
  } catch (error: any) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

// 7. Update Lead Status & Notes
app.patch("/api/leads/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    await updateLeadStatus(id, status, notes);
    res.json({ success: true, id, status, notes });
  } catch (error: any) {
    console.error("Error updating lead:", error);
    res.status(500).json({ error: "Failed to update lead" });
  }
});

// 8. Delete Lead
app.delete("/api/leads/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteLead(id);
    res.json({ success: true, deletedId: id });
  } catch (error: any) {
    console.error("Error deleting lead:", error);
    res.status(500).json({ error: "Failed to delete lead" });
  }
});

// 9. Pipeline Stats
app.get("/api/stats", async (_req: Request, res: Response) => {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error: any) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 SHAYDHA TECHNOLOGIES AWS Backend Service`);
  console.log(`📡 Listening on http://0.0.0.0:${PORT}`);
  console.log(`☁️  Target: AWS Free Tier (EC2 t2.micro / t3.micro)`);
  console.log(`=================================================`);
});
