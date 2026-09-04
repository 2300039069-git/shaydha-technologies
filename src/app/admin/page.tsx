"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  Download,
  Search,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { LeadRecord, LeadStatus } from "@/types";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

const statusColors: Record<LeadStatus, string> = {
  New: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30",
  Contacted: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30",
  "In Progress": "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30",
  Completed: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30",
  Closed: "bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-500/20 dark:text-slate-300 dark:border-slate-500/30",
};

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Leads Data
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sourceFilter, setSourceFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);

  // Check login on mount
  useEffect(() => {
    fetchLeads();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      setIsAuthenticated(true);
      fetchLeads(passcode);
    } catch (err: any) {
      setLoginError(err.message || "Invalid administrative passcode.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setPasscode("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("shaydha_passcode");
    }
  };

  const fetchLeads = async (secret?: string) => {
    setIsLoadingLeads(true);
    const key = secret || passcode || (typeof window !== "undefined" ? localStorage.getItem("shaydha_passcode") : "");
    try {
      const headers: Record<string, string> = {};
      if (key) headers["x-admin-secret"] = key;

      const res = await fetch("/api/admin/leads", {
        headers,
        credentials: "include",
      });
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
        setIsAuthenticated(true);
        if (key && typeof window !== "undefined") {
          localStorage.setItem("shaydha_passcode", key);
        }
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: LeadStatus) => {
    const key = passcode || (typeof window !== "undefined" ? localStorage.getItem("shaydha_passcode") : "");
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (key) headers["x-admin-secret"] = key;

      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers,
        credentials: "include",
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Export CSV
  const exportToCSV = () => {
    const headers = [
      "ID",
      "Date",
      "Source",
      "Name",
      "Email",
      "Phone",
      "Company",
      "ProjectType",
      "Budget",
      "Status",
      "Message",
    ];

    const rows = filteredLeads.map((l) => [
      `"${l.id}"`,
      `"${l.createdAt}"`,
      `"${l.source}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email}"`,
      `"${l.phone || ""}"`,
      `"${l.company || ""}"`,
      `"${l.projectType || ""}"`,
      `"${l.budget || ""}"`,
      `"${l.status}"`,
      `"${(l.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `shaydha_leads_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    if (statusFilter !== "All" && lead.status !== statusFilter) return false;
    if (sourceFilter !== "All" && lead.source !== sourceFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        (lead.company && lead.company.toLowerCase().includes(q)) ||
        (lead.projectType && lead.projectType.toLowerCase().includes(q)) ||
        (lead.message && lead.message.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Authentication View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28 pb-16 px-4 bg-slate-50 dark:bg-[#07080B] transition-colors duration-200">
        <div className="w-full max-w-md bg-white dark:bg-[#0D0F17] border border-slate-200 dark:border-white/[0.1] rounded-3xl p-8 shadow-2xl space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-100 dark:bg-brand-500/15 border border-brand-200 dark:border-brand-500/30 flex items-center justify-center mx-auto text-brand-600 dark:text-brand-400">
            <Lock size={28} />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Management Portal</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              SHAYDHA TECHNOLOGIES Internal Lead Operations
            </p>
          </div>

          {loginError && (
            <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-3 rounded-xl border border-red-200 dark:border-red-500/30">
              {loginError}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1.5">
                Passcode / Access Key
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode (default: shaydha2026)"
                className="w-full text-sm px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#08090D] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoggingIn}
              className="w-full justify-center"
            >
              Authenticate & Enter →
            </Button>
          </form>

          <p className="text-[11px] text-slate-500 font-mono">
            Protected endpoint with secure session authentication.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 min-h-screen bg-slate-50 dark:bg-[#07080B] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-500/20 border border-brand-200 dark:border-brand-500/40 flex items-center justify-center text-brand-700 dark:text-brand-300">
              <Shield size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Operations & Leads</h1>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                ● Live Database Active ({leads.length} Records)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              onClick={() => fetchLeads()}
              variant="secondary"
              size="sm"
              leftIcon={<RefreshCw size={14} className={isLoadingLeads ? "animate-spin" : ""} />}
              className="bg-white dark:bg-surface-100 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-border-subtle shadow-sm"
            >
              Refresh
            </Button>
            <Button
              onClick={exportToCSV}
              variant="secondary"
              size="sm"
              leftIcon={<Download size={14} />}
              className="bg-white dark:bg-surface-100 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-border-subtle shadow-sm"
            >
              Export CSV
            </Button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-full bg-white dark:bg-surface-100 border border-slate-200 dark:border-white/[0.08] text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors shadow-sm"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Metrics Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0D0F17] border border-slate-200 dark:border-white/[0.08] shadow-sm">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">Total Enquiries</span>
            <span className="text-3xl font-extrabold font-mono text-slate-950 dark:text-white">
              {leads.length}
            </span>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0D0F17] border border-slate-200 dark:border-white/[0.08] shadow-sm">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">New Leads</span>
            <span className="text-3xl font-extrabold font-mono text-blue-600 dark:text-blue-400">
              {leads.filter((l) => l.status === "New").length}
            </span>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0D0F17] border border-slate-200 dark:border-white/[0.08] shadow-sm">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">In Progress</span>
            <span className="text-3xl font-extrabold font-mono text-amber-600 dark:text-amber-400">
              {leads.filter((l) => l.status === "In Progress").length}
            </span>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0D0F17] border border-slate-200 dark:border-white/[0.08] shadow-sm">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">Completed / Won</span>
            <span className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
              {leads.filter((l) => l.status === "Completed").length}
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0D0F17] border border-slate-200 dark:border-white/[0.08] shadow-sm">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, email, or keywords..."
              className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#08090D] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {["All", "New", "Contacted", "In Progress", "Completed", "Closed"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  statusFilter === s
                    ? "bg-brand-600 text-white shadow-sm font-semibold"
                    : "bg-slate-100 text-slate-700 hover:text-slate-950 dark:bg-surface-100 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white dark:bg-[#0D0F17] border border-slate-200 dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#121520] border-b border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 font-mono uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Channel</th>
                  <th className="py-3.5 px-4">Project / Budget</th>
                  <th className="py-3.5 px-4">Received</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500 font-mono">
                      No leads match the selected criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      {/* Client Info */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">{lead.name}</div>
                        <div className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="text-emerald-600 dark:text-emerald-400 text-[11px] font-mono">
                            {lead.phone}
                          </div>
                        )}
                      </td>

                      {/* Source */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.06]">
                          {lead.source === "project_planner"
                            ? "Planner"
                            : lead.source === "chat_widget"
                            ? "Chat"
                            : "Contact Form"}
                        </span>
                      </td>

                      {/* Project Type & Budget */}
                      <td className="py-3.5 px-4">
                        <div className="text-slate-900 dark:text-white font-medium">
                          {lead.projectType || "General"}
                        </div>
                        {lead.budget && (
                          <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                            {lead.budget}
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-mono text-[11px] whitespace-nowrap">
                        {formatDate(lead.createdAt)}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                            statusColors[lead.status] || "text-slate-500"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>

                      {/* Quick Status Toggle */}
                      <td
                        className="py-3.5 px-4 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleUpdateStatus(lead.id, e.target.value as LeadStatus)
                          }
                          className="text-xs bg-slate-50 dark:bg-[#151926] border border-slate-200 dark:border-white/[0.1] rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-brand-500"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Detail Drawer / Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedLead(null)}
            />

            <div className="relative z-10 w-full max-w-xl bg-white dark:bg-[#0E1119] border border-slate-200 dark:border-white/[0.12] rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-white/[0.08]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400">
                    Lead Inspection: {selectedLead.id}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {selectedLead.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-surface-100 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-white/[0.06]">
                  <div>
                    <span className="text-slate-500 block font-mono">Email:</span>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="text-brand-600 dark:text-brand-300 font-bold hover:underline"
                    >
                      {selectedLead.email}
                    </a>
                  </div>
                  {selectedLead.phone && (
                    <div>
                      <span className="text-slate-500 block font-mono">Phone / WhatsApp:</span>
                      <a
                        href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                      >
                        {selectedLead.phone}
                      </a>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-500 block font-mono">Project Type:</span>
                    <span className="text-slate-900 dark:text-white font-medium">{selectedLead.projectType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-mono">Budget:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                      {selectedLead.budget || "N/A"}
                    </span>
                  </div>
                </div>

                {selectedLead.message && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#121520] border border-slate-200 dark:border-white/[0.06] space-y-1">
                    <span className="text-slate-500 dark:text-slate-400 font-mono uppercase block text-[10px]">
                      Message / Brief:
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                      {selectedLead.message}
                    </p>
                  </div>
                )}
              </div>

              {/* Status Update & Direct Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 dark:text-slate-400">Update Status:</span>
                  <select
                    value={selectedLead.status}
                    onChange={(e) =>
                      handleUpdateStatus(selectedLead.id, e.target.value as LeadStatus)
                    }
                    className="text-xs bg-slate-50 dark:bg-[#181C2A] border border-slate-200 dark:border-white/[0.1] rounded-lg px-3 py-1.5 text-slate-800 dark:text-white focus:outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  {selectedLead.phone && (
                    <Button
                      href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                      external
                      variant="whatsapp"
                      size="sm"
                    >
                      WhatsApp Client
                    </Button>
                  )}
                  <Button
                    href={`mailto:${selectedLead.email}`}
                    variant="primary"
                    size="sm"
                  >
                    Email Client
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
