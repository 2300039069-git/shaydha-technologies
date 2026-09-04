import React from "react";
import type { Metadata } from "next";
import {
  Globe,
  Smartphone,
  Cpu,
  Sparkles,
  Palette,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { SERVICES_DATA } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/cta/CTASection";

export const metadata: Metadata = {
  title: "Services & Capabilities",
  description:
    "Explore our complete suite of software engineering services: Web Development, Mobile Apps, Custom Enterprise Software, AI Solutions, UI/UX Design, and E-Commerce.",
};

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Cpu,
  Sparkles,
  Palette,
  ShoppingBag,
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="py-16 relative bg-white dark:bg-[#07080B] border-b border-slate-200 dark:border-white/[0.06] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-mono uppercase tracking-widest mb-4">
            Capabilities & Specializations
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Engineered for Precision & Impact
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            From modern web applications and mobile ecosystems to high-throughput enterprise software and AI systems, SHAYDHA TECHNOLOGIES delivers software built to scale.
          </p>
        </div>
      </section>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {SERVICES_DATA.map((service, index) => {
          const IconComponent = iconMap[service.iconName] || Cpu;
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-32 p-8 sm:p-12 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] shadow-[0_2px_6px_rgba(0,0,0,0.02),0_12px_28px_-6px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] relative overflow-hidden transition-all duration-300"
            >
              {/* Subtle top hairline shine */}
              <div className="absolute top-0 inset-x-12 h-[2px] bg-gradient-to-r from-transparent via-brand-500/50 dark:via-cyan-400/50 to-transparent" />

              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Left Column: Scope & Description */}
                <div className="lg:col-span-7 space-y-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-brand-50 to-slate-100 dark:from-brand-500/20 dark:to-white/[0.03] border border-brand-200 dark:border-brand-500/40 flex items-center justify-center text-brand-700 dark:text-cyan-400 shadow-[0_2px_6px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                      <IconComponent size={26} />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold px-2.5 py-1 rounded bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.06]">
                      Service 0{index + 1}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
                    {service.title}
                  </h2>

                  <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    {service.fullDescription}
                  </p>

                  {/* Core Features */}
                  <div className="space-y-2.5 pt-2">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold">
                      Key Capabilities Included:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 bg-slate-50/70 dark:bg-white/[0.02] p-2.5 rounded-xl border border-slate-200/60 dark:border-white/[0.04]"
                        >
                          <CheckCircle2 size={16} className="text-brand-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Button
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight size={16} />}
                    >
                      Build With This Service
                    </Button>
                  </div>
                </div>

                {/* Right Column: Technical Deliverables & Stack */}
                <div className="lg:col-span-5 bg-slate-50/80 dark:bg-[#121624] border border-slate-200/90 dark:border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_2px_4px_rgba(0,0,0,0.02),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] relative z-10">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-brand-700 dark:text-cyan-400 font-bold mb-3">
                      Standard Deliverables
                    </h4>
                    <ul className="space-y-2.5">
                      {service.deliverables.map((del, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400 shrink-0 mt-1.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 dark:border-white/[0.06]">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-400 font-bold mb-2.5">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {service.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono px-2.5 py-1 rounded bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.06] text-slate-800 dark:text-slate-300 shadow-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <CTASection />
    </div>
  );
}
