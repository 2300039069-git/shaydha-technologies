import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
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
  message?: string;
  status: "New" | "Contacted" | "In Progress" | "Completed" | "Closed";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    source: {
      type: String,
      enum: ["contact_form", "project_planner", "chat_widget"],
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    whatsapp: { type: String },
    company: { type: String },
    projectType: { type: String },
    budget: { type: String },
    timeline: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Completed", "Closed"],
      default: "New",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

export const LeadModel =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);
