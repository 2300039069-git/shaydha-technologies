"use client";

import React, { useState } from "react";
import {
  X,
  MessageSquare,
  Mail,
  Phone,
  Building,
  Calendar,
  Layers,
  DollarSign,
  Clock,
  Save,
  CheckCircle2,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { Lead, LeadStatus } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate, getCleanPhone } from "@/lib/utils";

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: LeadStatus) => Promise<void>;
  onUpdateNotes: (id: string, notes: string) => Promise<void>;
  onDeleteLead?: (id: string) => Promise<void>;
}

const statusOptions: LeadStatus[] = [
  "New",
  "Contacted",
  "Proposal Sent",
  "In Progress",
  "Won",
  "Archived",
];

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  onClose,
  onUpdateStatus,
  onUpdateNotes,
  onDeleteLead,
}) => {
  if (!lead) return null;

  const [currentStatus, setCurrentStatus] = useState<LeadStatus>(lead.status);
  const [notes, setNotes] = useState(lead.notes || "");
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const cleanPhone = getCleanPhone(lead.whatsapp || lead.phone);
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        `Hello ${lead.name}, this is SHAYDHA TECHNOLOGIES regarding your project inquiry for ${lead.projectType || "software engineering"}.`
      )}`
    : null;

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(lead.email)}&su=${encodeURIComponent(
    `SHAYDHA TECHNOLOGIES — Project Inquiry: ${lead.projectType || "Software Engineering"}`
  )}&body=${encodeURIComponent(
    `Dear ${lead.name},\n\nThank you for reaching out to SHAYDHA TECHNOLOGIES regarding your initiative.\n\nWe have reviewed your project requirements:\n"${lead.message}"\n\nWhen would be a convenient time for a brief 15-minute discovery call?\n\nBest regards,\nSHAYDHA TECHNOLOGIES Leadership Team`
  )}`;

  const handleStatusChange = async (newStatus: LeadStatus) => {
    setCurrentStatus(newStatus);
    setIsUpdatingStatus(true);
    try {
      await onUpdateStatus(lead.id, newStatus);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    try {
      await onUpdateNotes(lead.id, notes);
      setIsSavedSuccess(true);
      setTimeout(() => setIsSavedSuccess(false), 2500);
    } finally {
      setIsSavingNotes(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Dark Blur Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-[#0E1119] border border-slate-200/90 dark:border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.25),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.08)] overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Top Hairline Accent */}
        <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-5 border-b border-slate-200/80 dark:border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="status" status={currentStatus}>
                {currentStatus}
              </Badge>
              <Badge variant="source">
                {lead.source.replace("_", " ")}
              </Badge>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                {formatDate(lead.createdAt)}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white pt-1">
              {lead.name}
            </h2>
            {lead.company && (
              <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <Building size={14} className="text-slate-400" />
                <span>{lead.company}</span>
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-6 space-y-6">
          {/* Quick Contact Action Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {whatsappUrl ? (
              <Button
                href={whatsappUrl}
                external
                variant="whatsapp"
                size="md"
                leftIcon={<MessageSquare size={16} />}
                className="w-full justify-center shadow-md"
              >
                Chat on WhatsApp
              </Button>
            ) : (
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] text-xs text-slate-500 flex items-center justify-center">
                No WhatsApp Number Provided
              </div>
            )}

            <Button
              href={gmailComposeUrl}
              external
              variant="outline"
              size="md"
              leftIcon={<Mail size={16} />}
              className="w-full justify-center"
            >
              Reply via Gmail
            </Button>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50/80 dark:bg-[#131622] border border-slate-200/80 dark:border-white/[0.06]">
            <div>
              <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 block mb-1">
                Email Address
              </span>
              <a
                href={`mailto:${lead.email}`}
                className="text-xs font-bold text-brand-600 dark:text-brand-300 hover:underline break-all"
              >
                {lead.email}
              </a>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 block mb-1">
                Phone / WhatsApp
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                {lead.whatsapp || lead.phone || "Not specified"}
              </span>
            </div>
          </div>

          {/* Project Scope & Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                <Layers size={14} className="text-brand-600 dark:text-brand-400" />
                <span className="font-mono uppercase text-[10px]">Scope</span>
              </div>
              <span className="text-xs font-bold text-slate-950 dark:text-white">
                {lead.projectType || "General"}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                <DollarSign size={14} className="text-emerald-600 dark:text-emerald-400" />
                <span className="font-mono uppercase text-[10px]">Budget</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 font-mono">
                {lead.budget || "Flexible"}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                <Clock size={14} className="text-indigo-600 dark:text-indigo-400" />
                <span className="font-mono uppercase text-[10px]">Timeline</span>
              </div>
              <span className="text-xs font-bold text-slate-950 dark:text-white font-mono">
                {lead.timeline || "TBD"}
              </span>
            </div>
          </div>

          {/* Customer Requirements Message */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
              Customer Requirements & Message
            </h4>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#121522] border border-slate-200/90 dark:border-white/[0.08] text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
              {lead.message}
            </div>
          </div>

          {/* Workflow Status Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">
              Workflow Status
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {statusOptions.map((st) => (
                <button
                  key={st}
                  onClick={() => handleStatusChange(st)}
                  disabled={isUpdatingStatus}
                  className={`py-2 px-2 rounded-xl text-xs font-mono font-semibold transition-all select-none text-center ${
                    currentStatus === st
                      ? "bg-brand-600 text-white shadow-md scale-105 border border-brand-500"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.06]"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Executive Notes Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                Private Engineering / Founder Notes
              </label>
              {isSavedSuccess && (
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  <span>Notes Saved</span>
                </span>
              )}
            </div>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record call notes, technical evaluation, proposal milestones, or pricing agreed..."
              className="w-full text-xs sm:text-sm p-3.5 rounded-2xl bg-slate-50 dark:bg-[#121522] border border-slate-200/90 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-brand-500 leading-relaxed resize-none shadow-inner"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSaveNotes}
                variant="secondary"
                size="sm"
                isLoading={isSavingNotes}
                leftIcon={<Save size={14} />}
              >
                Save Internal Notes
              </Button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between">
          {onDeleteLead && (
            <button
              onClick={() => {
                if (confirm("Are you sure you want to remove this lead?")) {
                  onDeleteLead(lead.id);
                  onClose();
                }
              }}
              className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 inline-flex items-center gap-1.5 p-2"
            >
              <Trash2 size={14} />
              <span>Delete Lead</span>
            </button>
          )}

          <Button onClick={onClose} variant="secondary" size="sm" className="ml-auto">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
