import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "brand" | "success" | "neutral" | "cyan" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "brand",
  size = "sm",
  dot = false,
  className,
}) => {
  const sizeStyles = {
    sm: "text-[11px] px-3 py-1 tracking-wider",
    md: "text-xs px-3.5 py-1.5 tracking-wider font-semibold",
  };

  const variantStyles = {
    brand:
      "bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]",
    success:
      "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-500/30 shadow-sm",
    neutral:
      "bg-slate-100 dark:bg-white/[0.05] text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-white/[0.1] shadow-sm",
    cyan:
      "bg-cyan-50 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300 border border-cyan-500/30 shadow-sm",
    outline:
      "bg-transparent text-slate-700 dark:text-slate-400 border border-slate-300 dark:border-white/15",
  };

  const dotColors = {
    brand: "bg-brand-600 dark:bg-brand-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]",
    success: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
    neutral: "bg-slate-500",
    cyan: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]",
    outline: "bg-slate-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono rounded-full uppercase transition-all duration-200 select-none backdrop-blur-sm",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              dotColors[variant]
            )}
          />
          <span
            className={cn("relative inline-flex rounded-full h-2 w-2", dotColors[variant])}
          />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};
