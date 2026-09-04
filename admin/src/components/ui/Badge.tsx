import React from "react";
import { cn } from "@/lib/utils";
import { LeadStatus } from "@/types";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "status" | "source";
  status?: LeadStatus | string;
  className?: string;
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  status,
  className = "",
  pulse = false,
}) => {
  const getStatusStyles = (st?: string) => {
    switch (st) {
      case "New":
        return "bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-500/15 dark:border-brand-500/30 dark:text-cyan-300";
      case "Contacted":
        return "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/15 dark:border-sky-500/30 dark:text-sky-300";
      case "Proposal Sent":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/15 dark:border-purple-500/30 dark:text-purple-300";
      case "In Progress":
        return "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/15 dark:border-amber-500/30 dark:text-amber-300";
      case "Won":
        return "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-300";
      case "Archived":
      default:
        return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-white/[0.05] dark:border-white/10 dark:text-slate-400";
    }
  };

  const getDotColor = (st?: string) => {
    switch (st) {
      case "New":
        return "bg-brand-500 dark:bg-cyan-400";
      case "Contacted":
        return "bg-sky-500";
      case "Proposal Sent":
        return "bg-purple-500";
      case "In Progress":
        return "bg-amber-500";
      case "Won":
        return "bg-emerald-500";
      default:
        return "bg-slate-400";
    }
  };

  if (variant === "status") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border shadow-sm",
          getStatusStyles(status),
          className
        )}
      >
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            getDotColor(status),
            (pulse || status === "New") && "animate-pulse"
          )}
        />
        <span>{children}</span>
      </span>
    );
  }

  if (variant === "source") {
    return (
      <span
        className={cn(
          "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.06] shadow-sm",
          className
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-slate-100 dark:bg-white/[0.05] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10",
        className
      )}
    >
      {children}
    </span>
  );
};
