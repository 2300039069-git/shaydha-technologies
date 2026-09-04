import React from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { calculateDashboardStats, readAllLeads } from "@/lib/leads";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminNavTabs } from "@/components/layout/AdminNavTabs";
import {
  Layers,
  DollarSign,
  TrendingUp,
  Inbox,
  CheckCircle2,
  PieChart,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  if (!isAuthenticated()) {
    redirect("/login");
  }

  const stats = await calculateDashboardStats();
  const leads = await readAllLeads();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#07080B] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <AdminHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AdminNavTabs />

        {/* Analytics Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] shadow-[0_2px_4px_rgba(0,0,0,0.02),0_10px_20px_-5px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] relative overflow-hidden">
            <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-slate-500 font-semibold">
                Conversion Rate
              </span>
              <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-500/15 text-brand-600 dark:text-cyan-400 flex items-center justify-center">
                <TrendingUp size={18} />
              </div>
            </div>
            <div className="text-3xl font-extrabold font-mono text-slate-950 dark:text-white">
              {stats.conversionRate}%
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {stats.wonLeads} closed deals out of {stats.totalLeads} total leads
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] shadow-[0_2px_4px_rgba(0,0,0,0.02),0_10px_20px_-5px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] relative overflow-hidden">
            <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-slate-500 font-semibold">
                Active Discussions
              </span>
              <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Layers size={18} />
              </div>
            </div>
            <div className="text-3xl font-extrabold font-mono text-slate-950 dark:text-white">
              {stats.inProgressLeads + stats.contactedLeads}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Leads actively undergoing scoping or proposal reviews
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] shadow-[0_2px_4px_rgba(0,0,0,0.02),0_10px_20px_-5px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] relative overflow-hidden">
            <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-slate-500 font-semibold">
                Direct WhatsApp Availability
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
              100%
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Direct connection link available for verified phones
            </p>
          </div>
        </div>

        {/* Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project Types Distribution */}
          <div className="p-8 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-950 dark:text-white">
                Project Categories Breakdown
              </h3>
              <PieChart size={18} className="text-brand-600 dark:text-cyan-400" />
            </div>

            <div className="space-y-3.5">
              {Object.entries(stats.projectTypesBreakdown).map(([category, count]) => {
                const pct = stats.totalLeads > 0 ? Math.round((count / stats.totalLeads) * 100) : 0;
                return (
                  <div key={category} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-800 dark:text-slate-200">{category}</span>
                      <span className="text-slate-500 dark:text-slate-400 font-mono">
                        {count} inquiries ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-600 to-cyan-500 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Budget Range Distribution */}
          <div className="p-8 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-950 dark:text-white">
                Customer Budget Distribution
              </h3>
              <DollarSign size={18} className="text-emerald-600 dark:text-emerald-400" />
            </div>

            <div className="space-y-3.5">
              {Object.entries(stats.budgetBreakdown).length === 0 ? (
                <p className="text-xs text-slate-500">No budget metrics recorded yet.</p>
              ) : (
                Object.entries(stats.budgetBreakdown).map(([range, count]) => {
                  const pct = stats.totalLeads > 0 ? Math.round((count / stats.totalLeads) * 100) : 0;
                  return (
                    <div key={range} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-800 dark:text-slate-200 font-mono">{range}</span>
                        <span className="text-slate-500 dark:text-slate-400 font-mono">
                          {count} ({pct}%)
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
