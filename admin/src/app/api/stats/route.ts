import { NextRequest, NextResponse } from "next/server";
import { calculateDashboardStats } from "@/lib/leads";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = await calculateDashboardStats();
  return NextResponse.json({ stats });
}
