import React from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { readAllLeads, calculateDashboardStats } from "@/lib/leads";
import { AdminDashboardClient } from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuth = isAuthenticated();

  if (!isAuth) {
    redirect("/login");
  }

  const initialLeads = await readAllLeads();
  const initialStats = await calculateDashboardStats();

  return (
    <AdminDashboardClient
      initialLeads={initialLeads}
      initialStats={initialStats}
    />
  );
}
