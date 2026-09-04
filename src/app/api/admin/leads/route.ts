import { NextRequest, NextResponse } from "next/server";
import { getAllLeads, updateLeadStatus } from "@/lib/db";

function isAuthorized(req: NextRequest): boolean {
  const authCookie = req.cookies.get("shaydha_admin_auth");
  const authHeader = req.headers.get("x-admin-secret");
  const expectedSecret = process.env.ADMIN_SECRET || "shaydha2026";

  return (
    authCookie?.value === "authenticated" ||
    authHeader === expectedSecret
  );
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("status") || "All";
    const leads = await getAllLeads(filter);

    return NextResponse.json({
      success: true,
      leads,
    });
  } catch (err: any) {
    console.error("Admin leads fetch failed:", err);
    return NextResponse.json({ error: "Failed to retrieve leads." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Lead ID and updated status are required." },
        { status: 400 }
      );
    }

    const updated = await updateLeadStatus(id, status, notes);
    if (!updated) {
      return NextResponse.json({ error: "Lead record not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Lead ${id} status updated to ${status}.`,
    });
  } catch (err: any) {
    console.error("Admin lead update failed:", err);
    return NextResponse.json({ error: "Failed to update lead status." }, { status: 500 });
  }
}
