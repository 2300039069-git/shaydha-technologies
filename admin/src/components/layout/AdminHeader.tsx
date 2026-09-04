"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ExternalLink,
  LogOut,
  RefreshCw,
  Bell,
  Search,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

interface AdminHeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onRefresh,
  isRefreshing = false,
  searchTerm = "",
  onSearchChange,
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#07080B]/90 backdrop-blur-md border-b border-slate-200/90 dark:border-white/[0.08] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-6">
            <Logo />
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Online • Port 3001</span>
            </div>
          </div>

          {/* Search Input */}
          {onSearchChange && (
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search leads by name, email, company, or scope..."
                  className="w-full text-xs pl-10 pr-4 py-2 rounded-xl bg-slate-100/80 dark:bg-[#121522] border border-slate-200/90 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-brand-500 shadow-inner"
                />
              </div>
            </div>
          )}

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] transition-all disabled:opacity-50"
                title="Refresh Leads Data"
                aria-label="Refresh Data"
              >
                <RefreshCw
                  size={16}
                  className={isRefreshing ? "animate-spin text-brand-600" : ""}
                />
              </button>
            )}

            {/* Visit Customer Site */}
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-brand-700 dark:text-brand-300 hover:text-brand-800 dark:hover:text-white bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/30 transition-all shadow-sm"
              title="Open Customer Website"
            >
              <span>Customer Site</span>
              <ExternalLink size={13} />
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] transition-colors"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
