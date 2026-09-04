import { neon } from "@neondatabase/serverless";

export interface Lead {
  id: string;
  source: string;
  name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  deliverables?: string[];
  message?: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

function getPostgresClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is missing.");
  }
  return neon(connectionString);
}

export async function insertLead(lead: Lead): Promise<boolean> {
  const sql = getPostgresClient();
  await sql`
    INSERT INTO leads (
      id, source, name, email, phone, whatsapp, company,
      project_type, budget, timeline, deliverables, message,
      status, notes, created_at, updated_at
    ) VALUES (
      ${lead.id}, ${lead.source || "website"}, ${lead.name}, ${lead.email},
      ${lead.phone || ""}, ${lead.whatsapp || lead.phone || ""},
      ${lead.company || ""}, ${lead.projectType || ""}, ${lead.budget || ""},
      ${lead.timeline || ""}, ${JSON.stringify(lead.deliverables || [])},
      ${lead.message || ""}, ${lead.status || "New"}, ${lead.notes || ""},
      ${lead.createdAt || new Date().toISOString()},
      ${new Date().toISOString()}
    )
    ON CONFLICT (id) DO UPDATE SET
      status = EXCLUDED.status,
      notes = EXCLUDED.notes,
      updated_at = EXCLUDED.updated_at;
  `;
  return true;
}

export async function getLeads(statusFilter?: string, search?: string): Promise<Lead[]> {
  const sql = getPostgresClient();
  const rows = await sql`
    SELECT 
      id, source, name, email, phone, whatsapp, company,
      project_type as "projectType", budget, timeline, deliverables,
      message, status, notes, created_at as "createdAt", updated_at as "updatedAt"
    FROM leads
    ORDER BY created_at DESC;
  `;

  let leads: Lead[] = rows.map((r: any) => ({
    id: r.id,
    source: r.source || "contact_form",
    name: r.name,
    email: r.email,
    phone: r.phone || "",
    whatsapp: r.whatsapp || r.phone || "",
    company: r.company || "",
    projectType: r.projectType || "",
    budget: r.budget || "",
    timeline: r.timeline || "",
    deliverables: typeof r.deliverables === "string" ? JSON.parse(r.deliverables || "[]") : r.deliverables || [],
    message: r.message || "",
    status: r.status || "New",
    notes: r.notes || "",
    createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: r.updatedAt ? new Date(r.updatedAt).toISOString() : undefined,
  }));

  if (statusFilter && statusFilter !== "All") {
    leads = leads.filter((l) => l.status.toLowerCase() === statusFilter.toLowerCase());
  }

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    leads = leads.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.company && l.company.toLowerCase().includes(q)) ||
        (l.projectType && l.projectType.toLowerCase().includes(q))
    );
  }

  return leads;
}

export async function updateLeadStatus(id: string, status: string, notes?: string): Promise<boolean> {
  const sql = getPostgresClient();
  if (notes !== undefined) {
    await sql`
      UPDATE leads 
      SET status = ${status}, notes = ${notes}, updated_at = ${new Date().toISOString()}
      WHERE id = ${id};
    `;
  } else {
    await sql`
      UPDATE leads 
      SET status = ${status}, updated_at = ${new Date().toISOString()}
      WHERE id = ${id};
    `;
  }
  return true;
}

export async function deleteLead(id: string): Promise<boolean> {
  const sql = getPostgresClient();
  await sql`DELETE FROM leads WHERE id = ${id};`;
  return true;
}

export async function getStats() {
  const sql = getPostgresClient();
  const leads = await getLeads();

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const inProgressLeads = leads.filter((l) =>
    ["Reviewing", "Contacted", "Proposal Sent"].includes(l.status)
  ).length;
  const wonLeads = leads.filter((l) => l.status === "Won").length;
  const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;

  return {
    totalLeads,
    newLeads,
    inProgressLeads,
    wonLeads,
    conversionRate,
    bySource: {
      contact_form: leads.filter((l) => l.source === "contact_form").length,
      project_planner: leads.filter((l) => l.source === "project_planner").length,
      chat_bot: leads.filter((l) => ["chat_bot", "chat_widget"].includes(l.source)).length,
    },
  };
}
