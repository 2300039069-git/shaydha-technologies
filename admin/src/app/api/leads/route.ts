import { NextRequest, NextResponse } from "next/server";
import { readAllLeads, generateLeadsCSV } from "@/lib/leads";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Optional auth verification
  const isAuth = isAuthenticated(req);
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format");

  // CSV export
  if (format === "csv") {
    const csv = await generateLeadsCSV();
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="shaydha-leads-${new Date()
          .toISOString()
          .slice(0, 10)}.csv"`,
      },
    });
  }

  let leads = await readAllLeads();

  // Filter by source
  const source = searchParams.get("source");
  if (source && source !== "all") {
    leads = leads.filter((l) => l.source === source);
  }

  // Filter by status
  const status = searchParams.get("status");
  if (status && status !== "all") {
    leads = leads.filter((l) => l.status === status);
  }

  // Search filter
  const q = searchParams.get("q")?.toLowerCase().trim();
  if (q) {
    leads = leads.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.company && l.company.toLowerCase().includes(q)) ||
        (l.projectType && l.projectType.toLowerCase().includes(q)) ||
        l.message.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ leads, total: leads.length });
}
