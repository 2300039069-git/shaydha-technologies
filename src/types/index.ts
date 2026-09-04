export type ProjectCategory =
  | "All"
  | "Web"
  | "Mobile"
  | "AI"
  | "Software"
  | "E-Commerce";

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  technologies: string[];
  deliverables: string[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: "Web" | "Mobile" | "AI" | "Software" | "E-Commerce";
  tagline: string;
  summary: string;
  coverImage: string;
  featured: boolean;
  technologies: string[];
  timeline: string;
  metrics: {
    label: string;
    value: string;
  }[];
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  architecture?: string[];
  results: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatarUrl?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export type LeadStatus =
  | "New"
  | "Contacted"
  | "In Progress"
  | "Completed"
  | "Closed";

export interface LeadRecord {
  id: string;
  source: "contact_form" | "project_planner" | "chat_widget";
  name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  deliverables?: string[];
  message?: string;
  status: LeadStatus;
  createdAt: string;
  notes?: string;
}

export type Lead = LeadRecord;
