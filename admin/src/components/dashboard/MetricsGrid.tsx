import React from "react";
import {
  Users,
  Sparkles,
  Activity,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { DashboardStats } from "@/types";

interface MetricsGridProps {
  stats: DashboardStats;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ stats }) => {
  const cards = [
    {
      title: "Total Inquiries",
      value: stats.totalLeads,
      subtitle: "Lifetime customer inquiries",
      icon: Users,
      color: "text-brand-600 dark:text-brand-400",
      bg: "bg-brand-50 dark:bg-brand-500/10",
      border: "border-brand-200 dark:border-brand-500/30",
    },
    {
      title: "New Unread",
      value: stats.newLeads,
      subtitle: "Requires founder attention",
      icon: Sparkles,
      color: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-50 dark:bg-cyan-500/10",
      border: "border-cyan-200 dark:border-cyan-500/30",
      badge: stats.newLeads > 0 ? `${stats.newLeads} Actionable` : undefined,
    },
    {
      title: "Active In Progress",
      value: stats.inProgressLeads,
      subtitle: "Discussions & proposals",
      icon: Activity,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
    },
    {
      title: "Closed / Won",
      value: stats.wonLeads,
      subtitle: "Active engineering contracts",
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.title}
            className="p-6 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] shadow-[0_2px_4px_rgba(0,0,0,0.02),0_10px_20px_-5px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] flex flex-col justify-between relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
          >
            {/* Top Hairline Accent */}
            <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-brand-500/40 dark:via-cyan-400/40 to-transparent" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                {c.title}
              </span>
              <div
                className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center ${c.color} shadow-sm`}
              >
                <Icon size={20} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-950 dark:text-white">
                  {c.value}
                </span>
                {c.badge && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 animate-pulse">
                    {c.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                {c.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
