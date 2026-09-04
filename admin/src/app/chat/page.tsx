import React from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getAdminChatSessions } from "@/lib/chat";
import { AdminChatConsole } from "./AdminChatConsole";

export const dynamic = "force-dynamic";

export default async function ChatPage() {
  if (!isAuthenticated()) {
    redirect("/login");
  }

  const initialSessions = await getAdminChatSessions();

  return <AdminChatConsole initialSessions={initialSessions} />;
}
