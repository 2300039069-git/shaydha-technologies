export type LeadStatus =
  | "New"
  | "Contacted"
  | "Proposal Sent"
  | "In Progress"
  | "Won"
  | "Archived";

export type LeadSource =
  | "project_planner"
  | "contact_form"
  | "chat_widget"
  | "api";

export interface Lead {
  id: string;
  source: LeadSource | string;
  name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  deliverables?: string[];
  message: string;
  status: LeadStatus;
  createdAt: string;
  notes?: string;
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  inProgressLeads: number;
  wonLeads: number;
  conversionRate: number;
  projectTypesBreakdown: Record<string, number>;
  budgetBreakdown: Record<string, number>;
  sourceBreakdown: Record<string, number>;
}
