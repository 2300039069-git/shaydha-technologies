import { neon } from "@neondatabase/serverless";

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

export interface AdminChatSession {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  status: "active" | "resolved" | "closed";
  unreadAdminCount: number;
  unreadCustomerCount: number;
  lastMessage?: string;
  lastMessageAt: string;
  createdAt: string;
}

export interface AdminChatMessage {
  id: string;
  sessionId: string;
  sender: "customer" | "admin" | "system";
  senderName?: string;
  message: string;
  createdAt: string;
}

export async function getAdminChatSessions(): Promise<AdminChatSession[]> {
  const sql = getPostgresClient();
  if (!sql) return [];

  try {
    const rows: any = await sql`
      SELECT 
        s.id,
        s.customer_name,
        s.customer_email,
        s.customer_phone,
        s.status,
        s.unread_admin_count,
        s.unread_customer_count,
        s.last_message_at,
        s.created_at,
        (
          SELECT message 
          FROM chat_messages m 
          WHERE m.session_id = s.id 
          ORDER BY m.created_at DESC 
          LIMIT 1
        ) as last_message
      FROM chat_sessions s
      ORDER BY s.last_message_at DESC;
    `;

    return rows.map((r: any) => ({
      id: r.id,
      customerName: r.customer_name || "Website Visitor",
      customerEmail: r.customer_email || undefined,
      customerPhone: r.customer_phone || undefined,
      status: r.status,
      unreadAdminCount: r.unread_admin_count || 0,
      unreadCustomerCount: r.unread_customer_count || 0,
      lastMessage: r.last_message || undefined,
      lastMessageAt: r.last_message_at ? new Date(r.last_message_at).toISOString() : new Date().toISOString(),
      createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error("[Admin Chat] Error getting sessions:", error);
    return [];
  }
}

export async function getAdminSessionMessages(sessionId: string): Promise<AdminChatMessage[]> {
  const sql = getPostgresClient();
  if (!sql) return [];

  try {
    const rows: any = await sql`
      SELECT * FROM chat_messages 
      WHERE session_id = ${sessionId} 
      ORDER BY created_at ASC;
    `;

    // Mark unread admin count as 0
    await sql`
      UPDATE chat_sessions 
      SET unread_admin_count = 0 
      WHERE id = ${sessionId};
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
    console.error("[Admin Chat] Error getting messages:", error);
    return [];
  }
}

export async function sendAdminReply(
  sessionId: string,
  message: string,
  adminName = "SHAYDHA Executive Support"
): Promise<AdminChatMessage | null> {
  const sql = getPostgresClient();
  if (!sql) return null;

  try {
    const msgId = `msg_admin_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`;

    await sql`
      INSERT INTO chat_messages (id, session_id, sender, sender_name, message, created_at)
      VALUES (${msgId}, ${sessionId}, 'admin', ${adminName}, ${message}, NOW());
    `;

    await sql`
      UPDATE chat_sessions 
      SET 
        unread_customer_count = unread_customer_count + 1,
        last_message_at = NOW() 
      WHERE id = ${sessionId};
    `;

    return {
      id: msgId,
      sessionId,
      sender: "admin",
      senderName: adminName,
      message,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("[Admin Chat] Error sending reply:", error);
    return null;
  }
}

export async function updateSessionStatus(
  sessionId: string,
  status: "active" | "resolved" | "closed"
): Promise<boolean> {
  const sql = getPostgresClient();
  if (!sql) return false;

  try {
    await sql`
      UPDATE chat_sessions 
      SET status = ${status} 
      WHERE id = ${sessionId};
    `;
    return true;
  } catch (error) {
    console.error("[Admin Chat] Error updating status:", error);
    return false;
  }
}
