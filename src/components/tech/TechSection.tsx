"use client";

import React, { useState } from "react";
import { Layers, Server, Database, Cloud, Sparkles, LucideIcon } from "lucide-react";

interface TechGroup {
  id: string;
  name: string;
  icon: LucideIcon;
  items: { name: string; tag: string; description: string }[];
}

const techGroups: TechGroup[] = [
  {
    id: "frontend",
    name: "Frontend & Web",
    icon: Layers,
    items: [
      { name: "Next.js", tag: "Framework", description: "Edge rendering & full-stack React" },
      { name: "React", tag: "Library", description: "Declarative component architectures" },
      { name: "TypeScript", tag: "Language", description: "Strict type safety & maintainability" },
      { name: "Tailwind CSS", tag: "Styling", description: "Design systems & rapid UI delivery" },
      { name: "Framer Motion", tag: "Motion", description: "High-performance micro-interactions" },
    ],
  },
  {
    id: "backend",
    name: "Backend & APIs",
    icon: Server,
    items: [
      { name: "Node.js", tag: "Runtime", description: "High-concurrency event-driven services" },
      { name: "Express", tag: "API Framework", description: "Lightweight robust REST endpoints" },
      { name: "FastAPI", tag: "Python API", description: "Asynchronous high-throughput services" },
      { name: "Python", tag: "Language", description: "Core data science & backend logic" },
    ],
  },
  {
    id: "database",
    name: "Database & Caching",
    icon: Database,
    items: [
      { name: "PostgreSQL", tag: "Relational", description: "ACID compliance & complex queries" },
      { name: "MongoDB", tag: "Document", description: "Flexible schemas & horizontal scaling" },
      { name: "Redis", tag: "In-Memory", description: "Sub-millisecond caching & queues" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    icon: Cloud,
    items: [
      { name: "Vercel", tag: "Edge Cloud", description: "Global edge CDN & serverless functions" },
      { name: "AWS", tag: "Cloud Infrastructure", description: "Scalable compute, S3 & security" },
      { name: "Render", tag: "Deployment", description: "Automated container & web hosting" },
      { name: "Docker", tag: "Containers", description: "Reproducible microservice environments" },
    ],
  },
  {
    id: "ai",
    name: "AI & Intelligence",
    icon: Sparkles,
    items: [
      { name: "LLMs", tag: "Cognitive", description: "OpenAI, Claude & localized open models" },
      { name: "LangChain", tag: "Orchestration", description: "Agentic RAG workflows & memory" },
      { name: "Neural OCR", tag: "Extraction", description: "Intelligent document transcription" },
      { name: "AI APIs", tag: "Integration", description: "Vision, audio & semantic pipelines" },
    ],
  },
];

export const TechSection: React.FC = () => {
  const [activeGroupId, setActiveGroupId] = useState("frontend");
  const activeGroup = techGroups.find((g) => g.id === activeGroupId) || techGroups[0];

  return (
    <section className="py-24 relative bg-slate-50 dark:bg-[#07080B] overflow-hidden transition-colors duration-200">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-600/5 blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-mono uppercase tracking-widest">
            Engineering Arsenal
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Built With Modern Technology
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            We intentionally choose battle-tested, high-performance tools engineered for reliability, security, and effortless scaling.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {techGroups.map((group) => {
            const Icon = group.icon;
            const isActive = activeGroupId === group.id;

            return (
              <button
                key={group.id}
                onClick={() => setActiveGroupId(group.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-250 select-none ${
                  isActive
                    ? "bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_8px_20px_-6px_rgba(99,102,241,0.5)] scale-105 border border-white/20"
                    : "bg-white dark:bg-[#121522] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200/90 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.18] shadow-[0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                }`}
              >
                <Icon size={15} />
                <span>{group.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Technology Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeGroup.items.map((tech) => (
            <div
              key={tech.name}
              className="bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] hover:border-brand-500/40 dark:hover:border-brand-400/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_10px_20px_-5px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-xl group flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Hairline Shine */}
              <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-brand-500/40 dark:via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-2.5 relative z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                    {tech.name}
                  </h3>
                  <span className="text-[10px] font-mono font-semibold uppercase px-2.5 py-0.5 rounded-md bg-slate-100/90 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-white/[0.06] shadow-sm">
                    {tech.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tech.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center gap-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 relative z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Production Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
