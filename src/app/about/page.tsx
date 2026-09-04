import React from "react";
import type { Metadata } from "next";
import {
  Lightbulb,
  ShieldCheck,
  Eye,
  Activity,
  TrendingUp,
  Target,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/cta/CTASection";
import { LogoMark } from "@/components/brand/LogoMark";

export const metadata: Metadata = {
  title: "About Us — Engineering & Brand Philosophy",
  description:
    "Learn about SHAYDHA TECHNOLOGIES — our mission, architectural discipline, and 5 core values: Innovation, Quality, Transparency, Reliability, and Continuous Improvement.",
};

const coreValues = [
  {
    title: "Innovation",
    description: "We constantly research, evaluate, and adopt emerging technologies to give our clients an unfair competitive advantage.",
    icon: Lightbulb,
    color: "text-amber-500 dark:text-amber-400",
  },
  {
    title: "Quality",
    description: "Every line of code, component architecture, and design token is crafted to enterprise standards. We never ship shortcuts.",
    icon: ShieldCheck,
    color: "text-brand-600 dark:text-brand-400",
  },
  {
    title: "Transparency",
    description: "Open communication, honest timelines, itemized pricing, and direct access to senior engineers throughout the lifecycle.",
    icon: Eye,
    color: "text-cyan-600 dark:text-cyan-400",
  },
  {
    title: "Reliability",
    description: "We build systems designed to withstand real-world peak traffic, deadlocks, and network failures with 99.9%+ uptime.",
    icon: Activity,
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Continuous Improvement",
    description: "Launch is day one. We proactively monitor performance data, user feedback, and security advisories to keep products evolving.",
    icon: TrendingUp,
    color: "text-indigo-600 dark:text-indigo-400",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Hero Header */}
      <section className="py-20 relative bg-white dark:bg-[#07080B] border-b border-slate-200 dark:border-white/[0.06] overflow-hidden transition-colors duration-200">
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-brand-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-mono uppercase tracking-widest">
            Identity & Vision
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.1]">
            Technology. Creativity. Results.
          </h1>

          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            SHAYDHA TECHNOLOGIES is a modern technology and engineering studio dedicated to transforming ambitious ideas into world-class digital products.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section (Visual Architecture) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] shadow-[0_2px_6px_rgba(0,0,0,0.02),0_12px_28px_-6px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] relative overflow-hidden space-y-6">
            {/* Top Hairline Shine */}
            <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500/50 dark:via-cyan-400/50 to-transparent" />

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-brand-50 to-slate-100 dark:from-brand-500/20 dark:to-white/[0.03] border border-brand-200 dark:border-brand-500/40 flex items-center justify-center text-brand-700 dark:text-cyan-400 shadow-[0_2px_6px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
              <Target size={26} />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 font-bold">
                Our Purpose
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">Our Mission</h2>
              <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                To empower forward-thinking organizations with resilient, high-speed, and aesthetically transcendent digital platforms. We bridge the gap between creative design and hardcore software engineering so businesses can move faster with total confidence.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] shadow-[0_2px_6px_rgba(0,0,0,0.02),0_12px_28px_-6px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] relative overflow-hidden space-y-6">
            {/* Top Hairline Shine */}
            <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-cyan-50 to-slate-100 dark:from-cyan-500/20 dark:to-white/[0.03] border border-cyan-200 dark:border-cyan-500/40 flex items-center justify-center text-cyan-700 dark:text-cyan-300 shadow-[0_2px_6px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
              <Sparkles size={26} />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
                The Long Horizon
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">Our Vision</h2>
              <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                To become the benchmark technology partner for ambitious ventures globally — recognized not just for writing clean code, but for engineering digital products that set new standards in usability, stability, and measurable business growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-mono uppercase tracking-widest">
            Guiding Principles
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">
            Our Core Values
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            The non-negotiable principles that drive our engineering standards and client partnerships every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="p-8 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] hover:border-brand-500/50 dark:hover:border-brand-400/50 transition-all duration-300 space-y-4 hover:-translate-y-1 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_10px_20px_-5px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-xl relative overflow-hidden group"
              >
                {/* Top Hairline Shine */}
                <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500/40 dark:via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-13 h-13 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] flex items-center justify-center p-3 shadow-inner">
                  <Icon size={24} className={val.color} />
                </div>
                <h3 className="text-xl font-bold text-slate-950 dark:text-white">{val.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {val.description}
                </p>
              </div>
            );
          })}

          {/* 6th Card: Brand Symbol Aesthetic Showcase */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-white dark:from-[#131726] dark:to-[#0A0C14] border border-brand-200/80 dark:border-brand-500/40 flex flex-col justify-between text-center items-center shadow-[0_2px_6px_rgba(0,0,0,0.02),0_12px_24px_-4px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] relative overflow-hidden">
            <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
            <LogoMark size={54} />
            <div className="space-y-1 my-3">
              <h4 className="text-base font-bold text-slate-950 dark:text-white">Engineering Without Compromise</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Crafted for founders and teams who value quality.
              </p>
            </div>
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight size={14} />}
            >
              Start a Project
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
