import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "whatsapp";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      external = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none rounded-xl group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 tracking-wide";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5 h-8",
      md: "text-xs sm:text-sm px-4 py-2 gap-2 h-10",
      lg: "text-sm px-6 py-2.5 gap-2.5 h-11",
    };

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_8px_20px_-6px_rgba(99,102,241,0.45)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_12px_28px_-6px_rgba(99,102,241,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] border border-white/15",
      secondary:
        "bg-white dark:bg-[#141824] hover:bg-slate-50 dark:hover:bg-[#1A1F30] text-slate-900 dark:text-white border border-slate-200/90 dark:border-white/15 hover:border-brand-400/60 shadow-[0_2px_4px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.12)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
      outline:
        "bg-white/60 dark:bg-white/[0.03] backdrop-blur-md hover:bg-slate-100/90 dark:hover:bg-white/[0.08] text-slate-800 dark:text-slate-200 border border-slate-300/90 dark:border-white/15 hover:border-brand-500/60 dark:hover:border-brand-400/60 shadow-[0_1px_2px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
      ghost:
        "bg-transparent hover:bg-slate-100/70 dark:hover:bg-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white active:scale-[0.98]",
      danger:
        "bg-red-600 hover:bg-red-500 text-white shadow-sm hover:shadow-md active:scale-[0.98]",
      whatsapp:
        "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_8px_20px_-6px_rgba(16,185,129,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] border border-emerald-400/20",
    };

    const content = (
      <>
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span className="truncate">{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </>
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
          >
            {content}
          </a>
        );
      }
      return (
        <Link href={href} className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
