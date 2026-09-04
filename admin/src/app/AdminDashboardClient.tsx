"use client";

import React, { useState, useMemo } from "react";
import { Lead, DashboardStats, LeadStatus } from "@/types";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminNavTabs } from "@/components/layout/AdminNavTabs";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { LeadsTable } from "@/components/dashboard/LeadsTable";
import { LeadDetailModal } from "@/components/dashboard/LeadDetailModal";

interface AdminDashboardClientProps {
  initialLeads: Lead[];
  initialStats: DashboardStats;
}

export const AdminDashboardClient: React.FC<AdminDashboardClientProps> = ({
  initialLeads,
  initialStats,
}) => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [activeSource, setActiveSource] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const [leadsRes, statsRes] = await Promise.all([
        fetch("/api/leads"),
        fetch("/api/stats"),
      ]);

      if (leadsRes.ok) {
        const data = await leadsRes.json();
        setLeads(data.leads || []);
      }
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to refresh leads data:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Status update
  const handleUpdateStatus = async (id: string, newStatus: LeadStatus) => {
    // Optimistic UI update
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      // Refresh stats
      const statsRes = await fetch("/api/stats");
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to update status on server:", err);
    }
  };

  // Notes update
  const handleUpdateNotes = async (id: string, notes: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, notes } : l))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, notes } : null));
    }

    try {
      await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
    } catch (err) {
      console.error("Failed to update notes on server:", err);
    }
  };

  // Delete lead
  const handleDeleteLead = async (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(null);
    }

    try {
      await fetch(`/api/leads/${id}`, { method: "DELETE" });
      const statsRes = await fetch("/api/stats");
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to delete lead on server:", err);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    window.location.href = "/api/leads?format=csv";
  };

  // Source count calculation
  const counts = useMemo(() => {
    let planner = 0;
    let contact = 0;
    let chat = 0;

    for (const l of leads) {
      if (l.source === "project_planner") planner++;
      else if (l.source === "contact_form") contact++;
      else if (l.source === "chat_widget") chat++;
    }

    return {
      all: leads.length,
      planner,
      contact,
      chat,
    };
  }, [leads]);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      // Source filter
      if (activeSource !== "all" && l.source !== activeSource) {
        return false;
      }
      // Status filter
      if (statusFilter !== "all" && l.status !== statusFilter) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase().trim();
        const matchesName = l.name?.toLowerCase().includes(term);
        const matchesEmail = l.email?.toLowerCase().includes(term);
        const matchesCompany = l.company?.toLowerCase().includes(term);
        const matchesScope = l.projectType?.toLowerCase().includes(term);
        const matchesMessage = l.message?.toLowerCase().includes(term);

        if (!matchesName && !matchesEmail && !matchesCompany && !matchesScope && !matchesMessage) {
          return false;
        }
      }
      return true;
    });
  }, [leads, activeSource, statusFilter, searchTerm]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#07080B] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Header */}
      <AdminHeader
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metrics Grid */}
        <MetricsGrid stats={stats} />

        {/* Navigation Tabs (Sources + Analytics link) */}
        <AdminNavTabs
          activeSource={activeSource}
          onSelectSource={setActiveSource}
          counts={counts}
        />

        {/* Leads Data Table */}
        <LeadsTable
          leads={filteredLeads}
          onSelectLead={setSelectedLead}
          onExportCSV={handleExportCSV}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </main>

      {/* Lead Detail Modal */}
      <LeadDetailModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdateStatus={handleUpdateStatus}
        onUpdateNotes={handleUpdateNotes}
        onDeleteLead={handleDeleteLead}
      />
    </div>
  );
};
