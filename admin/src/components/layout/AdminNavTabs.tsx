"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Inbox,
  FileText,
  MessageSquare,
  BarChart3,
  Flame,
} from "lucide-react";

interface AdminNavTabsProps {
  activeSource?: string;
  onSelectSource?: (source: string) => void;
  counts?: {
    all: number;
    planner: number;
    contact: number;
    chat: number;
  };
}

export const AdminNavTabs: React.FC<AdminNavTabsProps> = ({
  activeSource = "all",
  onSelectSource,
  counts = { all: 0, planner: 0, contact: 0, chat: 0 },
}) => {
  const pathname = usePathname();
  const isAnalyticsPage = pathname === "/analytics";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200/90 dark:border-white/[0.08]">
      {/* Source Filter Tabs */}
      {!isAnalyticsPage && onSelectSource ? (
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100/90 dark:bg-[#121522] border border-slate-200/80 dark:border-white/[0.08] shadow-inner">
          <button
            onClick={() => onSelectSource("all")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSource === "all"
                ? "bg-white dark:bg-brand-600 text-slate-950 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            <Inbox size={14} />
            <span>All Inquiries</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-200/80 dark:bg-white/20">
              {counts.all}
            </span>
          </button>

          <button
            onClick={() => onSelectSource("project_planner")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSource === "project_planner"
                ? "bg-white dark:bg-brand-600 text-slate-950 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            <FileText size={14} />
            <span>Project Planners</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-200/80 dark:bg-white/20">
              {counts.planner}
            </span>
          </button>

          <button
            onClick={() => onSelectSource("contact_form")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSource === "contact_form"
                ? "bg-white dark:bg-brand-600 text-slate-950 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            <Flame size={14} />
            <span>Contact Forms</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-200/80 dark:bg-white/20">
              {counts.contact}
            </span>
          </button>

          <button
            onClick={() => onSelectSource("chat_widget")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSource === "chat_widget"
                ? "bg-white dark:bg-brand-600 text-slate-950 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            <MessageSquare size={14} />
            <span>Bot Inquiries</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-200/80 dark:bg-white/20">
              {counts.chat}
            </span>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-white">
          <BarChart3 size={18} className="text-brand-600 dark:text-cyan-400" />
          <span>Pipeline Analytics & Lead Intelligence</span>
        </div>
      )}

      {/* Analytics Page Link */}
      <div className="flex items-center gap-2">
        <Link
          href={isAnalyticsPage ? "/" : "/analytics"}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
            isAnalyticsPage
              ? "bg-brand-600 text-white border-brand-500 shadow-sm"
              : "bg-white dark:bg-[#121522] border-slate-200/90 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 hover:border-brand-500/50 shadow-[0_1px_3px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
          }`}
        >
          {isAnalyticsPage ? (
            <>
              <Inbox size={14} />
              <span>Back to Inquiries</span>
            </>
          ) : (
            <>
              <BarChart3 size={14} />
              <span>View Analytics</span>
            </>
          )}
        </Link>
      </div>
    </div>
  );
};
