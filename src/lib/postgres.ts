import { neon } from "@neondatabase/serverless";
import { LeadRecord, LeadStatus } from "@/types";

let sqlClient: ReturnType<typeof neon> | null = null;
let isInitialized = false;
let isChatInitialized = false;

export function getPostgresClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }
  if (!sqlClient) {
    sqlClient = neon(connectionString);
  }
  return sqlClient;
}

export async function ensureLeadsTable(): Promise<boolean> {
  if (isInitialized) return true;
  const sql = getPostgresClient();
  if (!sql) return false;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        whatsapp VARCHAR(100),
        company VARCHAR(255),
        project_type VARCHAR(255),
        budget VARCHAR(100),
        timeline VARCHAR(100),
        deliverables JSONB DEFAULT '[]'::jsonb,
        message TEXT,
        status VARCHAR(50) DEFAULT 'New',
        source VARCHAR(50) DEFAULT 'project_planner',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    isInitialized = true;
    return true;
  } catch (error) {
    console.error("[PostgreSQL] Error ensuring leads table schema:", error);
    return false;
  }
}

export async function ensureChatTables(): Promise<boolean> {
  if (isChatInitialized) return true;
  const sql = getPostgresClient();
  if (!sql) return false;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id VARCHAR(64) PRIMARY KEY,
        customer_name VARCHAR(255) DEFAULT 'Website Visitor',
        customer_email VARCHAR(255),
        customer_phone VARCHAR(100),
        status VARCHAR(50) DEFAULT 'active',
        unread_admin_count INT DEFAULT 0,
        unread_customer_count INT DEFAULT 0,
        last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id VARCHAR(64) PRIMARY KEY,
        session_id VARCHAR(64) NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
        sender VARCHAR(20) NOT NULL,
        sender_name VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    isChatInitialized = true;
    return true;
  } catch (error) {
    console.error("[PostgreSQL] Error ensuring chat tables schema:", error);
    return false;
  }
}

export async function insertLeadToPostgres(lead: LeadRecord): Promise<boolean> {
  const sql = getPostgresClient();
  if (!sql) return false;

  try {
    await ensureLeadsTable();
    await sql`
      INSERT INTO leads (
        id, name, email, phone, whatsapp, company, project_type,
        budget, timeline, deliverables, message, status, source, notes, created_at
      ) VALUES (
        ${lead.id},
        ${lead.name},
        ${lead.email},
        ${lead.phone || ''},
        ${lead.whatsapp || lead.phone || ''},
        ${lead.company || ''},
        ${lead.projectType || ''},
        ${lead.budget || ''},
        ${lead.timeline || ''},
        ${JSON.stringify(lead.deliverables || [])},
        ${lead.message || ''},
        ${lead.status || 'New'},
        ${lead.source || 'web'},
        ${lead.notes || ''},
        ${lead.createdAt ? new Date(lead.createdAt).toISOString() : new Date().toISOString()}
      )
      ON CONFLICT (id) DO UPDATE SET
        status = EXCLUDED.status,
        notes = EXCLUDED.notes;
    `;
    return true;
  } catch (error) {
    console.error("[PostgreSQL] Insert failed:", error);
    return false;
  }
}

export async function getLeadsFromPostgres(filterStatus?: string): Promise<LeadRecord[] | null> {
  const sql = getPostgresClient();
  if (!sql) return null;

  try {
    await ensureLeadsTable();
    let rows: any;

    if (filterStatus && filterStatus !== "All") {
      rows = await sql`
        SELECT * FROM leads 
        WHERE status = ${filterStatus} 
        ORDER BY created_at DESC;
      `;
    } else {
      rows = await sql`
        SELECT * FROM leads 
        ORDER BY created_at DESC;
      `;
    }

    return rows.map((r: any) => ({
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
      status: r.status as LeadStatus,
      source: r.source,
      notes: r.notes || undefined,
      createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error("[PostgreSQL] Query failed:", error);
    return null;
  }
}

export async function updateLeadStatusInPostgres(
  id: string,
  status: LeadStatus,
  notes?: string
): Promise<boolean> {
  const sql = getPostgresClient();
  if (!sql) return false;

  try {
    await ensureLeadsTable();
    if (notes !== undefined) {
      await sql`
        UPDATE leads 
        SET status = ${status}, notes = ${notes}, updated_at = NOW() 
        WHERE id = ${id};
      `;
    } else {
      await sql`
        UPDATE leads 
        SET status = ${status}, updated_at = NOW() 
        WHERE id = ${id};
      `;
    }
    return true;
  } catch (error) {
    console.error("[PostgreSQL] Update failed:", error);
    return false;
  }
}

// ----------------------------------------------------
// TWO-WAY LIVE CHAT METHODS
// ----------------------------------------------------

export interface ChatSession {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  status: "active" | "resolved" | "closed";
  unreadAdminCount: number;
  unreadCustomerCount: number;
  lastMessageAt: string;
  createdAt: string;
}

export interface ChatMessageRecord {
  id: string;
  sessionId: string;
  sender: "customer" | "admin" | "system";
  senderName?: string;
  message: string;
  createdAt: string;
}

export async function createOrGetChatSession(
  sessionId?: string,
  customerData?: { name?: string; email?: string; phone?: string }
): Promise<ChatSession | null> {
  const sql = getPostgresClient();
  if (!sql) return null;

  try {
    await ensureChatTables();

    if (sessionId) {
      const rows: any = await sql`
        SELECT * FROM chat_sessions WHERE id = ${sessionId} LIMIT 1;
      `;
      if (rows.length > 0) {
        const r = rows[0];
        // If customerData provided, update it
        if (customerData?.name || customerData?.email || customerData?.phone) {
          await sql`
            UPDATE chat_sessions 
            SET 
              customer_name = COALESCE(${customerData.name || null}, customer_name),
              customer_email = COALESCE(${customerData.email || null}, customer_email),
              customer_phone = COALESCE(${customerData.phone || null}, customer_phone)
            WHERE id = ${sessionId};
          `;
        }
        return {
          id: r.id,
          customerName: customerData?.name || r.customer_name || "Website Visitor",
          customerEmail: customerData?.email || r.customer_email || undefined,
          customerPhone: customerData?.phone || r.customer_phone || undefined,
          status: r.status,
          unreadAdminCount: r.unread_admin_count,
          unreadCustomerCount: r.unread_customer_count,
          lastMessageAt: r.last_message_at,
          createdAt: r.created_at,
        };
      }
    }

    // Create a new session
    const newId = sessionId || `session_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
    const name = customerData?.name || "Website Visitor";
    const email = customerData?.email || null;
    const phone = customerData?.phone || null;

    await sql`
      INSERT INTO chat_sessions (id, customer_name, customer_email, customer_phone)
      VALUES (${newId}, ${name}, ${email}, ${phone})
      ON CONFLICT (id) DO NOTHING;
    `;

    // Add welcome message from System / Engineering Lead
    const welcomeMsgId = `msg_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
    await sql`
      INSERT INTO chat_messages (id, session_id, sender, sender_name, message)
      VALUES (
        ${welcomeMsgId},
        ${newId},
        'admin',
        'SHAYDHA Executive Support',
        'Hello! Welcome to SHAYDHA TECHNOLOGIES. How can we help architect or build your project today?'
      );
    `;

    return {
      id: newId,
      customerName: name,
      customerEmail: email || undefined,
      customerPhone: phone || undefined,
      status: "active",
      unreadAdminCount: 0,
      unreadCustomerCount: 1,
      lastMessageAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("[PostgreSQL] Error in createOrGetChatSession:", error);
    return null;
  }
}

export async function saveChatMessage(
  sessionId: string,
  sender: "customer" | "admin" | "system",
  message: string,
  senderName?: string
): Promise<ChatMessageRecord | null> {
  const sql = getPostgresClient();
  if (!sql) return null;

  try {
    await ensureChatTables();
    const msgId = `msg_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
    const sName = senderName || (sender === "customer" ? "Customer" : "SHAYDHA Team");

    await sql`
      INSERT INTO chat_messages (id, session_id, sender, sender_name, message, created_at)
      VALUES (${msgId}, ${sessionId}, ${sender}, ${sName}, ${message}, NOW());
    `;

    if (sender === "customer") {
      await sql`
        UPDATE chat_sessions 
        SET 
          unread_admin_count = unread_admin_count + 1,
          last_message_at = NOW(),
          status = 'active'
        WHERE id = ${sessionId};
      `;
    } else if (sender === "admin") {
      await sql`
        UPDATE chat_sessions 
        SET 
          unread_customer_count = unread_customer_count + 1,
          last_message_at = NOW()
        WHERE id = ${sessionId};
      `;
    }

    return {
      id: msgId,
      sessionId,
      sender,
      senderName: sName,
      message,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("[PostgreSQL] Error in saveChatMessage:", error);
    return null;
  }
}

export async function getChatMessages(sessionId: string): Promise<ChatMessageRecord[]> {
  const sql = getPostgresClient();
  if (!sql) return [];

  try {
    await ensureChatTables();
    const rows: any = await sql`
      SELECT * FROM chat_messages 
      WHERE session_id = ${sessionId} 
      ORDER BY created_at ASC;
    `;

    return rows.map((r: any) => ({
      id: r.id,
      sessionId: r.session_id,
      sender: r.sender,
      senderName: r.sender_name || (r.sender === "customer" ? "Customer" : "SHAYDHA Team"),
      message: r.message,
      createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error("[PostgreSQL] Error in getChatMessages:", error);
    return [];
  }
}

export async function markSessionReadByCustomer(sessionId: string): Promise<void> {
  const sql = getPostgresClient();
  if (!sql) return;

  try {
    await sql`
      UPDATE chat_sessions 
      SET unread_customer_count = 0 
      WHERE id = ${sessionId};
    `;
  } catch (err) {
    console.error("[PostgreSQL] Error marking read by customer:", err);
  }
}

export async function markSessionReadByAdmin(sessionId: string): Promise<void> {
  const sql = getPostgresClient();
  if (!sql) return;

  try {
    await sql`
      UPDATE chat_sessions 
      SET unread_admin_count = 0 
      WHERE id = ${sessionId};
    `;
  } catch (err) {
    console.error("[PostgreSQL] Error marking read by admin:", err);
  }
}

export async function getAllChatSessions(): Promise<ChatSession[]> {
  const sql = getPostgresClient();
  if (!sql) return [];

  try {
    await ensureChatTables();
    const rows: any = await sql`
      SELECT * FROM chat_sessions 
      ORDER BY last_message_at DESC;
    `;

    return rows.map((r: any) => ({
      id: r.id,
      customerName: r.customer_name || "Website Visitor",
      customerEmail: r.customer_email || undefined,
      customerPhone: r.customer_phone || undefined,
      status: r.status,
      unreadAdminCount: r.unread_admin_count || 0,
      unreadCustomerCount: r.unread_customer_count || 0,
      lastMessageAt: r.last_message_at ? new Date(r.last_message_at).toISOString() : new Date().toISOString(),
      createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error("[PostgreSQL] Error in getAllChatSessions:", error);
    return [];
  }
}
