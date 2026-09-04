import React from "react";
import Link from "next/link";
import { LogoMark } from "./LogoMark";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showWordmark = true,
  className = "",
}) => {
  const markSizes = {
    sm: 28,
    md: 36,
    lg: 44,
  };

  const textSizes = {
    sm: "text-base tracking-widest",
    md: "text-lg tracking-wider",
    lg: "text-2xl tracking-wider",
  };

  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 select-none transition-opacity hover:opacity-90 ${className}`}
      aria-label="SHAYDHA TECHNOLOGIES Home"
    >
      <LogoMark size={markSizes[size]} />
      {showWordmark && (
        <div className="flex flex-col">
          <span
            className={`font-extrabold uppercase font-sans text-slate-900 dark:text-white leading-none ${textSizes[size]}`}
          >
            SHAYDHA
            <span className="text-brand-600 dark:text-brand-400 ml-1.5 font-normal tracking-widest text-xs opacity-90 block sm:inline sm:text-[0.75rem]">
              TECHNOLOGIES
            </span>
          </span>
        </div>
      )}
    </Link>
  );
};
