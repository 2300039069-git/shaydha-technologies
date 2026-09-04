import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EngagementModel {
  title: string;
  tag: string;
  description: string;
  idealFor: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

const models: EngagementModel[] = [
  {
    title: "Sprint / MVP Launch",
    tag: "High Velocity",
    description: "Rapid delivery of high-impact websites, validation prototypes, and core production MVPs.",
    idealFor: "Startups, rapid product validation, marketing platform overhauls",
    features: [
      "Fixed scope & milestone delivery",
      "2 - 4 weeks intensive turnaround",
      "Full Next.js / React production deployment",
      "Complete code ownership & documentation",
      "30-day post-launch warranty support",
    ],
    ctaText: "Request an MVP Quote",
  },
  {
    title: "Dedicated Engineering Pod",
    tag: "Most Flexible",
    popular: true,
    description: "An agile dedicated team embedded with your organization to continuously build and scale features.",
    idealFor: "Scaling companies requiring steady high-tier engineering throughput",
    features: [
      "Dedicated senior frontend & backend engineers",
      "Weekly sprint planning & direct Slack sync",
      "Adaptive backlog and dynamic priority shifting",
      "Continuous CI/CD deployment & testing",
      "Dedicated tech lead & code review governance",
    ],
    ctaText: "Discuss Dedicated Pod",
  },
  {
    title: "Enterprise Custom Architecture",
    tag: "Mission Critical",
    description: "Comprehensive end-to-end architecture, bespoke ERPs, AI pipelines, and large platforms.",
    idealFor: "Enterprises needing custom workflows, compliance, and multi-region scaling",
    features: [
      "Bespoke system architecture & cloud design",
      "Enterprise security, RBAC & SOC-2 compliance",
      "High-throughput AI, OCR & RAG integration",
      "Stringent 99.9% uptime Service Level Agreements (SLAs)",
      "24/7 incident escalation and site reliability",
    ],
    ctaText: "Request Enterprise Consultation",
  },
];

export const PricingSection: React.FC = () => {
  return (
    <section className="py-24 relative bg-white dark:bg-[#07080B] overflow-hidden transition-colors duration-200">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-600/5 blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-mono uppercase tracking-widest">
            Investment Structure
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Let&apos;s Find the Right Solution
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Every business has distinct requirements. We tailor engineering scope, architecture, and engagement models to deliver maximum return on your capital.
          </p>

          {/* Pricing Factors Pill */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06]">
              • Project Scope
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06]">
              • Architecture & Features
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06]">
              • Design Complexity
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06]">
              • Third-party Integrations
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06]">
              • Timeline & Concurrency
            </span>
          </div>
        </div>

        {/* Engagement Models Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {models.map((m) => (
            <div
              key={m.title}
              className={`rounded-2xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                m.popular
                  ? "bg-gradient-to-b from-indigo-50/80 via-white to-white dark:from-[#15192c] dark:to-[#0c0f18] border-2 border-brand-500 shadow-[0_0_35px_rgba(99,102,241,0.22),0_15px_35px_-5px_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_0_40px_rgba(99,102,241,0.28),inset_0_1px_0_0_rgba(255,255,255,0.15)] -translate-y-2 z-10"
                  : "bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C13] border border-slate-200/90 dark:border-white/[0.08] hover:border-brand-500/40 dark:hover:border-white/[0.18] shadow-[0_2px_4px_rgba(0,0,0,0.02),0_10px_20px_-5px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:-translate-y-1"
              }`}
            >
              {/* Subtle Hairline Shine */}
              <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500/50 dark:via-cyan-400/50 to-transparent" />

              {m.popular && (
                <div className="absolute -top-0 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-b-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-[11px] font-mono uppercase tracking-widest font-bold shadow-[0_4px_12px_rgba(99,102,241,0.4)] border border-t-0 border-white/20">
                    ★ Recommended Model
                  </span>
                </div>
              )}

              <div className="space-y-6 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase px-3 py-1 rounded-md bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 font-semibold">
                    {m.tag}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-950 dark:text-white">{m.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {m.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.05] text-xs text-slate-700 dark:text-slate-300 shadow-inner">
                  <span className="text-slate-950 dark:text-white font-bold block mb-1">Ideal For:</span>
                  {m.idealFor}
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-2">
                  {m.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200">
                      <CheckCircle2 size={16} className="text-brand-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Action */}
              <div className="pt-8 mt-8 border-t border-slate-200/80 dark:border-white/[0.08]">
                <Button
                  href={`/contact?model=${encodeURIComponent(m.title)}`}
                  variant={m.popular ? "primary" : "secondary"}
                  size="md"
                  rightIcon={<ArrowRight size={15} />}
                  className="w-full justify-center"
                >
                  {m.ctaText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
