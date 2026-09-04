import React from "react";
import { Compass, Lightbulb, PenTool, Code, Rocket, TrendingUp, LucideIcon } from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  deliverables: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Discover",
    description: "Understand your business, customer personas, competitive landscape, and exact requirements.",
    icon: Compass,
    deliverables: "Technical brief & requirements matrix",
  },
  {
    number: "02",
    title: "Strategize",
    description: "Define the product architecture, technology stack, database models, and delivery roadmap.",
    icon: Lightbulb,
    deliverables: "Architecture diagram & sprint milestones",
  },
  {
    number: "03",
    title: "Design",
    description: "Create the user experience, interactive Figma prototypes, component systems, and design tokens.",
    icon: PenTool,
    deliverables: "Clickable prototype & design system",
  },
  {
    number: "04",
    title: "Build",
    description: "Develop the full-stack product in weekly sprints with automated tests and CI/CD pipelines.",
    icon: Code,
    deliverables: "Tested, production-grade code repository",
  },
  {
    number: "05",
    title: "Launch",
    description: "Deploy the product to high-availability cloud infrastructure and monitor real-time telemetry.",
    icon: Rocket,
    deliverables: "Live deployment & DNS SSL configuration",
  },
  {
    number: "06",
    title: "Grow",
    description: "Continuously optimize speed, implement analytics insights, scale infrastructure, and add features.",
    icon: TrendingUp,
    deliverables: "Performance audits & ongoing support",
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-24 relative bg-white dark:bg-[#090B10] border-t border-slate-200 dark:border-white/[0.06] overflow-hidden transition-colors duration-200">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-cyan-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-mono uppercase tracking-widest">
            Delivery Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            From Idea to Launch
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            A structured, transparent engineering methodology designed for predictable timelines, zero friction, and high-quality outcomes.
          </p>
        </div>

        {/* 6 Steps Grid with Connecting Pipeline Concept */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] hover:border-brand-500/50 dark:hover:border-brand-400/50 rounded-2xl p-8 transition-all duration-300 group shadow-[0_2px_4px_rgba(0,0,0,0.02),0_10px_20px_-5px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Hairline Shine */}
                <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500/40 dark:via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Step Top Header */}
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-brand-50/80 to-slate-100/90 dark:from-brand-500/15 dark:to-white/[0.03] border border-brand-200/80 dark:border-brand-500/30 flex items-center justify-center text-brand-600 dark:text-cyan-400 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300 p-3.5 shadow-[0_2px_6px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                      <Icon size={24} />
                    </div>
                    <span className="text-2xl font-extrabold font-mono text-slate-300 dark:text-slate-600 group-hover:text-brand-600 dark:group-hover:text-cyan-400 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Deliverables Footer */}
                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-white/[0.06] text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 relative z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                  <span className="font-mono text-slate-700 dark:text-slate-300 truncate">
                    Output: {step.deliverables}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
