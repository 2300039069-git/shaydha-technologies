"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Mail,
  Eye,
  Download,
  Filter,
  Search,
  Building,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";
import { Lead, LeadStatus } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate, getCleanPhone } from "@/lib/utils";

interface LeadsTableProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onExportCSV: () => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

const filterOptions: { label: string; value: string }[] = [
  { label: "All Statuses", value: "all" },
  { label: "New Leads", value: "New" },
  { label: "Contacted", value: "Contacted" },
  { label: "In Progress", value: "In Progress" },
  { label: "Won", value: "Won" },
  { label: "Archived", value: "Archived" },
];

export const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  onSelectLead,
  onExportCSV,
  statusFilter,
  onStatusFilterChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Table Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-[#121522] border border-slate-200/80 dark:border-white/[0.08]">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onStatusFilterChange(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all select-none ${
                statusFilter === opt.value
                  ? "bg-white dark:bg-brand-600 text-slate-950 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Export CSV Button */}
        <div className="flex items-center gap-2">
          <Button
            onClick={onExportCSV}
            variant="outline"
            size="sm"
            leftIcon={<Download size={14} />}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Leads Table Container */}
      <div className="bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.02),0_10px_20px_-5px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
        {leads.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/[0.04] text-slate-400 flex items-center justify-center mx-auto">
              <Search size={22} />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">No Inquiries Found</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              No customer inquiries match your active filter criteria. Try selecting &quot;All Statuses&quot; or clearing search.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-white/[0.06] bg-slate-50/70 dark:bg-white/[0.02] text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="py-3.5 px-5 font-semibold">Client & Company</th>
                  <th className="py-3.5 px-4 font-semibold">Project Scope</th>
                  <th className="py-3.5 px-4 font-semibold">Budget & Timeline</th>
                  <th className="py-3.5 px-4 font-semibold">Channel</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Date</th>
                  <th className="py-3.5 px-5 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04] text-xs">
                {leads.map((lead) => {
                  const cleanPhone = getCleanPhone(lead.whatsapp || lead.phone);
                  const whatsappUrl = cleanPhone
                    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                        `Hi ${lead.name}, this is SHAYDHA TECHNOLOGIES regarding your project inquiry.`
                      )}`
                    : null;

                  return (
                    <tr
                      key={lead.id}
                      onClick={() => onSelectLead(lead)}
                      className="group hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
                    >
                      {/* Client Name & Company */}
                      <td className="py-4 px-5">
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-cyan-300 transition-colors">
                            {lead.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                            {lead.email}
                          </div>
                          {lead.company && (
                            <div className="text-[10px] text-slate-600 dark:text-slate-400 flex items-center gap-1 font-medium pt-0.5">
                              <Building size={11} className="text-slate-400" />
                              <span>{lead.company}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Project Scope */}
                      <td className="py-4 px-4">
                        <div className="space-y-1 max-w-[200px]">
                          <span className="font-semibold text-slate-900 dark:text-slate-200 block truncate">
                            {lead.projectType || "General Software"}
                          </span>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                            {lead.message}
                          </p>
                        </div>
                      </td>

                      {/* Budget & Timeline */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5 font-mono">
                          <div className="font-bold text-emerald-700 dark:text-emerald-400 text-[11px]">
                            {lead.budget || "Flexible"}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            {lead.timeline || "Unspecified"}
                          </div>
                        </div>
                      </td>

                      {/* Source Channel */}
                      <td className="py-4 px-4">
                        <Badge variant="source">
                          {lead.source.replace("_", " ")}
                        </Badge>
                      </td>

                      {/* Workflow Status */}
                      <td className="py-4 px-4">
                        <Badge variant="status" status={lead.status}>
                          {lead.status}
                        </Badge>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-[11px] font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {formatDate(lead.createdAt)}
                      </td>

                      {/* Quick Actions */}
                      <td className="py-4 px-5 text-right">
                        <div
                          className="inline-flex items-center gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {whatsappUrl && (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/15 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare size={15} />
                            </a>
                          )}

                          <a
                            href={`mailto:${lead.email}`}
                            className="p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/15 transition-colors"
                            title="Send Email"
                          >
                            <Mail size={15} />
                          </a>

                          <button
                            onClick={() => onSelectLead(lead)}
                            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
                            title="Inspect Lead"
                          >
                            <Eye size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
