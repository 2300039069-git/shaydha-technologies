import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { LeadRecord, LeadStatus } from "@/types";
import { LeadModel } from "./models/Lead";
import { generateId } from "./utils";

const MONGODB_URI = process.env.MONGODB_URI;
const DATA_DIR = path.join(process.cwd(), "data");
const LOCAL_LEADS_FILE = path.join(DATA_DIR, "leads.json");

// Ensure local fallback directory and file exist safely across environments
function ensureLocalFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {
    // Read-only filesystem in serverless environments (e.g. Vercel)
  }
}

function readLocalLeads(): LeadRecord[] {
  ensureLocalFile();
  try {
    const raw = fs.readFileSync(LOCAL_LEADS_FILE, "utf-8");
    return JSON.parse(raw) || [];
  } catch (err) {
    console.error("Error reading local leads:", err);
    return [];
  }
}

function writeLocalLeads(leads: LeadRecord[]): void {
  ensureLocalFile();
  try {
    fs.writeFileSync(LOCAL_LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing local leads:", err);
  }
}

// Database Connection Manager
let isConnected = false;

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    return false;
  }
  if (isConnected) {
    return true;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    isConnected = true;
    return true;
  } catch (err) {
    console.warn("MongoDB connection failed, using local file store:", err);
    return false;
  }
}

import {
  insertLeadToPostgres,
  getLeadsFromPostgres,
  updateLeadStatusInPostgres,
} from "./postgres";

// Unified Lead Methods
export async function createLead(data: Omit<LeadRecord, "id" | "createdAt" | "status">): Promise<LeadRecord> {
  const newLead: LeadRecord = {
    ...data,
    id: generateId(),
    status: "New",
    createdAt: new Date().toISOString(),
  };

  // 1. Try Neon PostgreSQL
  try {
    const pgSuccess = await insertLeadToPostgres(newLead);
    if (pgSuccess) {
      // Also update local file for offline resilience
      const localLeads = readLocalLeads();
      localLeads.unshift(newLead);
      writeLocalLeads(localLeads);
      return newLead;
    }
  } catch (err) {
    console.warn("PostgreSQL insert error, checking MongoDB/local:", err);
  }

  // 2. Try MongoDB fallback
  const hasMongo = await connectToDatabase();
  if (hasMongo) {
    try {
      await LeadModel.create(newLead);
      return newLead;
    } catch (error) {
      console.error("MongoDB insert failed, saving to local file:", error);
    }
  }

  // 3. Fallback to local file store
  const localLeads = readLocalLeads();
  localLeads.unshift(newLead);
  writeLocalLeads(localLeads);
  return newLead;
}

export async function getAllLeads(filterStatus?: string): Promise<LeadRecord[]> {
  // 1. Try Neon PostgreSQL
  try {
    const pgLeads = await getLeadsFromPostgres(filterStatus);
    if (pgLeads && pgLeads.length > 0) {
      return pgLeads;
    }
  } catch (err) {
    console.warn("PostgreSQL query error, falling back:", err);
  }

  // 2. Try MongoDB fallback
  const hasMongo = await connectToDatabase();
  if (hasMongo) {
    try {
      const query = filterStatus && filterStatus !== "All" ? { status: filterStatus } : {};
      const leads = await LeadModel.find(query).sort({ createdAt: -1 }).lean();
      return leads.map((l: any) => ({
        id: l.id,
        source: l.source,
        name: l.name,
        email: l.email,
        phone: l.phone,
        whatsapp: l.whatsapp,
        company: l.company,
        projectType: l.projectType,
        budget: l.budget,
        timeline: l.timeline,
        message: l.message,
        status: l.status,
        createdAt: l.createdAt?.toISOString ? l.createdAt.toISOString() : String(l.createdAt),
        notes: l.notes,
      }));
    } catch (err) {
      console.error("MongoDB query failed, falling back to local file:", err);
    }
  }

  // 3. Fallback to local file
  const localLeads = readLocalLeads();
  if (filterStatus && filterStatus !== "All") {
    return localLeads.filter((l) => l.status === filterStatus);
  }
  return localLeads;
}

export async function updateLeadStatus(id: string, status: LeadStatus, notes?: string): Promise<boolean> {
  // 1. Try Neon PostgreSQL
  try {
    const pgUpdated = await updateLeadStatusInPostgres(id, status, notes);
    if (pgUpdated) {
      // Keep local file in sync
      const localLeads = readLocalLeads();
      const index = localLeads.findIndex((l) => l.id === id);
      if (index !== -1) {
        localLeads[index].status = status;
        if (notes !== undefined) localLeads[index].notes = notes;
        writeLocalLeads(localLeads);
      }
      return true;
    }
  } catch (err) {
    console.warn("PostgreSQL update failed, trying fallback:", err);
  }

  // 2. Try MongoDB fallback
  const hasMongo = await connectToDatabase();
  if (hasMongo) {
    try {
      const updateData: any = { status };
      if (notes !== undefined) updateData.notes = notes;
      await LeadModel.findOneAndUpdate({ id }, updateData);
      return true;
    } catch (err) {
      console.error("MongoDB update failed, falling back to local file:", err);
    }
  }

  // 3. Fallback to local file
  const localLeads = readLocalLeads();
  const index = localLeads.findIndex((l) => l.id === id);
  if (index !== -1) {
    localLeads[index].status = status;
    if (notes !== undefined) localLeads[index].notes = notes;
    writeLocalLeads(localLeads);
    return true;
  }
  return false;
}
