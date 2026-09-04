import React from "react";
import Link from "next/link";
import { LogoMark } from "./LogoMark";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group select-none ${className}`}
    >
      <div className="relative p-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 group-hover:border-brand-500/50 transition-colors shadow-sm">
        <LogoMark size={28} />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-base tracking-wider text-slate-950 dark:text-white uppercase font-sans">
            SHAYDHA
          </span>
          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-brand-500/10 dark:bg-brand-500/20 text-brand-700 dark:text-cyan-300 font-bold border border-brand-500/30">
            Admin
          </span>
        </div>
        <span className="text-[9px] font-mono tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase -mt-0.5 font-medium">
          Operations & Leads
        </span>
      </div>
    </Link>
  );
};
