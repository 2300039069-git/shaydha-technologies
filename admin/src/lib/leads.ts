import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";
import { Lead, DashboardStats, LeadStatus } from "@/types";

let sqlClient: ReturnType<typeof neon> | null = null;

function getPostgresClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }
  if (!sqlClient) {
    sqlClient = neon(connectionString);
  }
  return sqlClient;
}

function getLeadsFilePath(): string {
  const candidate1 = path.resolve(process.cwd(), "../data/leads.json");
  if (fs.existsSync(candidate1)) {
    return candidate1;
  }
  const candidate2 = path.resolve(process.cwd(), "data/leads.json");
  if (fs.existsSync(candidate2)) {
    return candidate2;
  }
  return candidate1;
}

function readLocalLeads(): Lead[] {
  const filePath = getLeadsFilePath();
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    if (!raw.trim()) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    
    return parsed.sort((a, b) => {
      const timeA = new Date(a.createdAt || 0).getTime();
      const timeB = new Date(b.createdAt || 0).getTime();
      return timeB - timeA;
    });
  } catch (error) {
    console.error("[Admin Storage] Error reading local leads:", error);
    return [];
  }
}

function writeLocalLeads(leads: Lead[]): boolean {
  const filePath = getLeadsFilePath();
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("[Admin Storage] Error writing local leads:", error);
    return false;
  }
}

export async function readAllLeads(): Promise<Lead[]> {
  const sql = getPostgresClient();
  if (sql) {
    try {
      const rows: any = await sql`
        SELECT * FROM leads 
        ORDER BY created_at DESC;
      `;
      const leads: Lead[] = rows.map((r: any) => ({
        id: r.id,
        name: r.name,
        email: r.email,
        phone: r.phone || undefined,
        whatsapp: r.whatsapp || undefined,
        company: r.company || undefined,
        projectType: r.project_type || undefined,
        budget: r.budget || undefined,
        timeline: r.timeline || undefined,
        deliverables: Array.isArray(r.deliverables) ? r.deliverables : [],
        message: r.message || "",
        status: (r.status || "New") as LeadStatus,
        source: r.source || "project_planner",
        notes: r.notes || undefined,
        createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
      }));

      // Cache locally for fallback
      writeLocalLeads(leads);
      return leads;
    } catch (err) {
      console.warn("[Admin Storage] PostgreSQL read failed, falling back to local file:", err);
    }
  }

  return readLocalLeads();
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const sql = getPostgresClient();
  if (sql) {
    try {
      const rows: any = await sql`
        SELECT * FROM leads 
        WHERE id = ${id} 
        LIMIT 1;
      `;
      if (rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          name: r.name,
          email: r.email,
          phone: r.phone || undefined,
          whatsapp: r.whatsapp || undefined,
          company: r.company || undefined,
          projectType: r.project_type || undefined,
          budget: r.budget || undefined,
          timeline: r.timeline || undefined,
          deliverables: Array.isArray(r.deliverables) ? r.deliverables : [],
          message: r.message || "",
          status: (r.status || "New") as LeadStatus,
          source: r.source || "project_planner",
          notes: r.notes || undefined,
          createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
        };
      }
    } catch (err) {
      console.warn("[Admin Storage] PostgreSQL getById failed, falling back:", err);
    }
  }

  const leads = readLocalLeads();
  return leads.find((l) => l.id === id) || null;
}

export async function updateLead(
  id: string,
  updates: { status?: LeadStatus; notes?: string }
): Promise<Lead | null> {
  const sql = getPostgresClient();
  if (sql) {
    try {
      if (updates.status && updates.notes !== undefined) {
        await sql`
          UPDATE leads 
          SET status = ${updates.status}, notes = ${updates.notes}, updated_at = NOW() 
          WHERE id = ${id};
        `;
      } else if (updates.status) {
        await sql`
          UPDATE leads 
          SET status = ${updates.status}, updated_at = NOW() 
          WHERE id = ${id};
        `;
      } else if (updates.notes !== undefined) {
        await sql`
          UPDATE leads 
          SET notes = ${updates.notes}, updated_at = NOW() 
          WHERE id = ${id};
        `;
      }
    } catch (err) {
      console.warn("[Admin Storage] PostgreSQL update failed:", err);
    }
  }

  // Update local file cache
  const leads = readLocalLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) {
    return await getLeadById(id);
  }

  const existing = leads[index];
  const updated: Lead = {
    ...existing,
    status: updates.status || existing.status,
    notes: updates.notes !== undefined ? updates.notes : existing.notes,
  };

  leads[index] = updated;
  writeLocalLeads(leads);
  return updated;
}

export async function deleteLead(id: string): Promise<boolean> {
  const sql = getPostgresClient();
  if (sql) {
    try {
      await sql`
        DELETE FROM leads 
        WHERE id = ${id};
      `;
    } catch (err) {
      console.warn("[Admin Storage] PostgreSQL delete failed:", err);
    }
  }

  const leads = readLocalLeads();
  const filtered = leads.filter((l) => l.id !== id);
  writeLocalLeads(filtered);
  return true;
}

export async function calculateDashboardStats(): Promise<DashboardStats> {
  const leads = await readAllLeads();

  const totalLeads = leads.length;
  let newLeads = 0;
  let contactedLeads = 0;
  let inProgressLeads = 0;
  let wonLeads = 0;

  const projectTypesBreakdown: Record<string, number> = {};
  const budgetBreakdown: Record<string, number> = {};
  const sourceBreakdown: Record<string, number> = {};

  for (const lead of leads) {
    if (lead.status === "New") newLeads++;
    else if (lead.status === "Contacted") contactedLeads++;
    else if (lead.status === "In Progress" || lead.status === "Proposal Sent") inProgressLeads++;
    else if (lead.status === "Won") wonLeads++;

    // Project types
    const pType = lead.projectType || "General Enquiry";
    projectTypesBreakdown[pType] = (projectTypesBreakdown[pType] || 0) + 1;

    // Budget
    if (lead.budget) {
      budgetBreakdown[lead.budget] = (budgetBreakdown[lead.budget] || 0) + 1;
    }

    // Source
    const src = lead.source || "web";
    sourceBreakdown[src] = (sourceBreakdown[src] || 0) + 1;
  }

  const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;

  return {
    totalLeads,
    newLeads,
    contactedLeads,
    inProgressLeads,
    wonLeads,
    conversionRate,
    projectTypesBreakdown,
    budgetBreakdown,
    sourceBreakdown,
  };
}

export async function generateLeadsCSV(): Promise<string> {
  const leads = await readAllLeads();
  const headers = [
    "ID",
    "Date",
    "Source",
    "Name",
    "Company",
    "Email",
    "Phone",
    "Project Type",
    "Budget",
    "Timeline",
    "Status",
    "Message",
    "Internal Notes",
  ];

  const escapeCSV = (val?: string) => {
    if (!val) return '""';
    const escaped = val.replace(/"/g, '""').replace(/\n/g, ' ');
    return `"${escaped}"`;
  };

  const rows = leads.map((l) =>
    [
      escapeCSV(l.id),
      escapeCSV(l.createdAt),
      escapeCSV(l.source),
      escapeCSV(l.name),
      escapeCSV(l.company),
      escapeCSV(l.email),
      escapeCSV(l.phone || l.whatsapp),
      escapeCSV(l.projectType),
      escapeCSV(l.budget),
      escapeCSV(l.timeline),
      escapeCSV(l.status),
      escapeCSV(l.message),
      escapeCSV(l.notes),
    ].join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}
