import React from "react";
import type { Metadata } from "next";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { CTASection } from "@/components/cta/CTASection";

export const metadata: Metadata = {
  title: "Selected Work & Case Studies",
  description:
    "Explore case studies and live platforms engineered by SHAYDHA TECHNOLOGIES, spanning CineYatra, BusinessFlow, DocuMind AI, ShopNova, and beyond.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Header Banner */}
      <section className="py-16 relative bg-white dark:bg-[#07080B] border-b border-slate-200 dark:border-white/[0.06] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-mono uppercase tracking-widest mb-4">
            Production Portfolio
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Selected Digital Products & Platforms
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Real products solving high-stakes challenges. Explore our architecture, engineering execution, and verifiable business outcomes.
          </p>
        </div>
      </section>

      <ProjectsSection />
      <CTASection />
    </div>
  );
}
