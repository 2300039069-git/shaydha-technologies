import React from "react";
import { CheckCircle2, Shield, Flame, Activity, Handshake, Code2 } from "lucide-react";

export const WhyUsSection: React.FC = () => {
  return (
    <section className="py-24 relative bg-white dark:bg-[#090B10] border-y border-slate-200 dark:border-white/[0.06] overflow-hidden transition-colors duration-200">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-brand-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-mono uppercase tracking-widest">
            Engineering Standard
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Why Businesses Choose SHAYDHA
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            We operate as an extension of your leadership team — combining high-velocity engineering, architectural discipline, and total transparency.
          </p>
        </div>

        {/* Asymmetric Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 01: Built Around Your Business (Large Highlight - 7 cols) */}
          <div className="md:col-span-7 bg-white dark:bg-gradient-to-br dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] hover:border-brand-500/50 dark:hover:border-brand-400/50 rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.02),0_12px_24px_-4px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-xl hover:-translate-y-0.5">
            {/* Top Hairline Shine */}
            <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500/50 dark:via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute top-0 right-0 p-8 opacity-15 dark:opacity-20 group-hover:opacity-30 dark:group-hover:opacity-35 transition-opacity select-none pointer-events-none">
              <span className="text-8xl font-mono font-black text-slate-300 dark:text-white/15">01</span>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-brand-50 to-slate-100 dark:from-brand-500/20 dark:to-white/[0.03] border border-brand-200 dark:border-brand-500/40 flex items-center justify-center text-brand-700 dark:text-brand-300 shadow-[0_2px_6px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                <Code2 size={26} />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono text-brand-600 dark:text-brand-400 font-bold uppercase tracking-widest">
                  01 — Bespoke Architecture
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white leading-snug">
                  Built Around Your Business
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-lg">
                  We don&apos;t force your business into a template. We analyze your customer journeys, operational bottlenecks, and strategic milestones to build custom solutions around your actual requirements.
                </p>
              </div>
            </div>

            <div className="pt-8 grid grid-cols-2 gap-4 border-t border-slate-200/80 dark:border-white/[0.08] mt-8 relative z-10">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.04]">
                <p className="text-2xl font-bold text-slate-950 dark:text-white font-mono">100%</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Custom Codebases</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.04]">
                <p className="text-2xl font-bold text-brand-600 dark:text-brand-400 font-mono">Zero</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Pre-built Theme Bloat</p>
              </div>
            </div>
          </div>

          {/* Card 02: Modern Technology (5 cols) */}
          <div className="md:col-span-5 bg-white dark:bg-gradient-to-br dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] hover:border-cyan-500/50 dark:hover:border-cyan-400/50 rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.02),0_12px_24px_-4px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-xl hover:-translate-y-0.5">
            {/* Top Hairline Shine */}
            <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute top-0 right-0 p-8 opacity-15 dark:opacity-20 group-hover:opacity-30 dark:group-hover:opacity-35 transition-opacity select-none pointer-events-none">
              <span className="text-8xl font-mono font-black text-slate-300 dark:text-white/15">02</span>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-cyan-50 to-slate-100 dark:from-cyan-500/20 dark:to-white/[0.03] border border-cyan-200 dark:border-cyan-500/40 flex items-center justify-center text-cyan-700 dark:text-cyan-300 shadow-[0_2px_6px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                <Flame size={26} />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-widest">
                  02 — Elite Stack
                </span>
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white leading-snug">
                  Modern Technology
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  We use modern development practices to create fast, scalable, and maintainable products. From edge-rendered Next.js to containerized microservices and AI pipelines.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/80 dark:border-white/[0.08] mt-6 relative z-10 flex items-center gap-3 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/[0.02] p-3 rounded-xl border border-slate-200/60 dark:border-white/[0.04]">
              <CheckCircle2 size={16} className="text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span>Sub-second load times & modern DevOps</span>
            </div>
          </div>

          {/* Card 03: Transparent Communication (5 cols) */}
          <div className="md:col-span-5 bg-white dark:bg-gradient-to-br dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] hover:border-indigo-500/50 dark:hover:border-indigo-400/50 rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.02),0_12px_24px_-4px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-xl hover:-translate-y-0.5">
            {/* Top Hairline Shine */}
            <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute top-0 right-0 p-8 opacity-15 dark:opacity-20 group-hover:opacity-30 dark:group-hover:opacity-35 transition-opacity select-none pointer-events-none">
              <span className="text-8xl font-mono font-black text-slate-300 dark:text-white/15">03</span>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-indigo-50 to-slate-100 dark:from-indigo-500/20 dark:to-white/[0.03] border border-indigo-200 dark:border-indigo-500/40 flex items-center justify-center text-indigo-700 dark:text-indigo-300 shadow-[0_2px_6px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                <Activity size={26} />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest">
                  03 — Direct Access
                </span>
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white leading-snug">
                  Transparent Communication
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Stay connected with our engineering team throughout the project. Weekly staging demos, real-time Slack/WhatsApp channels, and zero hidden technical debt.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/80 dark:border-white/[0.08] mt-6 relative z-10 flex items-center gap-3 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/[0.02] p-3 rounded-xl border border-slate-200/60 dark:border-white/[0.04]">
              <CheckCircle2 size={16} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>Direct engineer access & weekly sprint demos</span>
            </div>
          </div>

          {/* Card 04: Long-Term Partnership (7 cols) */}
          <div className="md:col-span-7 bg-white dark:bg-gradient-to-br dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] hover:border-emerald-500/50 dark:hover:border-emerald-400/50 rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.02),0_12px_24px_-4px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-xl hover:-translate-y-0.5">
            {/* Top Hairline Shine */}
            <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute top-0 right-0 p-8 opacity-15 dark:opacity-20 group-hover:opacity-30 dark:group-hover:opacity-35 transition-opacity select-none pointer-events-none">
              <span className="text-8xl font-mono font-black text-slate-300 dark:text-white/15">04</span>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-emerald-50 to-slate-100 dark:from-emerald-500/20 dark:to-white/[0.03] border border-emerald-200 dark:border-emerald-500/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shadow-[0_2px_6px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                <Handshake size={26} />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest">
                  04 — Dedicated Support
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white leading-snug">
                  Long-Term Partnership
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-lg">
                  We don&apos;t disappear after launch. We can continue improving, maintaining, and scaling your product as your user base expands and your market evolves.
                </p>
              </div>
            </div>

            <div className="pt-8 grid grid-cols-2 gap-4 border-t border-slate-200/80 dark:border-white/[0.08] mt-8 relative z-10">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.04]">
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">99.9%</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Uptime & Monitoring</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.04]">
                <p className="text-2xl font-bold text-slate-950 dark:text-white font-mono">24/7</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Security & Maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
