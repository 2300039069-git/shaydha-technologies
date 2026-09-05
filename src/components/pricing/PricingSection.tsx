"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Layers,
  ShieldCheck,
  Clock,
  Code2,
  Check,
  TrendingUp,
  Cpu,
  BadgePercent,
  Sliders,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PricingTier {
  id: string;
  title: string;
  tag: string;
  badge?: string;
  priceRange: string;
  priceUsd: string;
  turnaround: string;
  description: string;
  idealFor: string;
  features: string[];
  deliverables: string[];
  ctaText: string;
  popular?: boolean;
  accentColor: string;
  icon: React.ElementType;
}

const pricingTiers: PricingTier[] = [
  {
    id: "sprint-mvp",
    title: "Sprint / MVP Launch",
    tag: "High Velocity",
    badge: "Quick Validation",
    priceRange: "₹10,000 – ₹25,000+",
    priceUsd: "$250 – $600+",
    turnaround: "1 - 3 Weeks",
    description: "Rapid delivery of high-impact websites, landing pages, validation prototypes, and core production MVPs.",
    idealFor: "Startups, seed-stage founders, rapid validation & high-converting brand overhauls",
    features: [
      "Fixed scope & milestone delivery",
      "Full Next.js 14 & React 18 production build",
      "100% responsive luxury UI with micro-animations",
      "Lead capture, SEO & Core Web Vitals optimization",
      "30-day post-launch warranty & bug-fix support",
    ],
    deliverables: ["Production Codebase", "Vercel / Cloud Deployment", "Direct WhatsApp SLA Support"],
    ctaText: "Select MVP Launch",
    accentColor: "from-cyan-500/20 via-blue-500/10 to-transparent",
    icon: Zap,
  },
  {
    id: "growth-platform",
    title: "Dedicated Engineering Pod",
    tag: "Most Popular",
    badge: "★ Recommended Choice",
    priceRange: "₹25,000 – ₹75,000+",
    priceUsd: "$600 – $1,800+",
    turnaround: "2 - 6 Weeks / Monthly",
    description: "An embedded agile engineering squad to continuously design, build, test, and scale platforms with maximum velocity.",
    idealFor: "Growing businesses, SaaS platforms, complex portals & high-throughput apps",
    features: [
      "Dedicated senior frontend & backend engineers",
      "Custom full-stack architecture & database design",
      "Payment gateway (Razorpay/Stripe) & auth integration",
      "Automated CI/CD pipelines & staging environments",
      "Weekly sprint demos & direct technical sync",
      "60-day warranty & performance tuning",
    ],
    deliverables: ["Full Application & APIs", "Admin Dashboard Portal", "Architecture Documentation"],
    ctaText: "Select Growth Pod",
    popular: true,
    accentColor: "from-brand-500/30 via-indigo-500/20 to-cyan-500/10",
    icon: Sparkles,
  },
  {
    id: "enterprise-custom",
    title: "Enterprise Architecture",
    tag: "Mission Critical",
    badge: "Custom Scale",
    priceRange: "₹75,000 – ₹2,50,000+",
    priceUsd: "$1,800 – $5,000+",
    turnaround: "Custom Sprints / Retainer",
    description: "End-to-end bespoke enterprise platforms, multi-tenant ERPs, custom AI pipelines, and mission-critical cloud backends.",
    idealFor: "Enterprises, multi-brand organizations & scalable digital infrastructures",
    features: [
      "Bespoke system architecture & cloud infrastructure",
      "Enterprise security, RBAC & SOC-2 compliance",
      "High-throughput AI, OCR & LLM agent pipelines",
      "Stringent 99.9% uptime SLA & disaster recovery",
      "Dedicated Solutions Architect & Technical Director",
      "24/7 priority incident response & code governance",
    ],
    deliverables: ["Enterprise Cloud Infra", "Full IP & Security Audit", "Dedicated SLA Guarantee"],
    ctaText: "Select Enterprise",
    accentColor: "from-indigo-500/20 via-purple-500/10 to-transparent",
    icon: ShieldCheck,
  },
];

const budgetQuickFilters = [
  { id: "all", label: "All Models", desc: "View all investment tiers" },
  { id: "sprint-mvp", label: "MVP & Sprint", range: "₹10K – ₹25K+", tierId: "sprint-mvp" },
  { id: "growth-platform", label: "Growth & Pods", range: "₹25K – ₹75K+", tierId: "growth-platform" },
  { id: "enterprise-custom", label: "Enterprise Scale", range: "₹75K – ₹2.5L+", tierId: "enterprise-custom" },
];

export const PricingSection: React.FC = () => {
  const [selectedTierId, setSelectedTierId] = useState<string>("growth-platform");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  const handleFilterClick = (filter: typeof budgetQuickFilters[0]) => {
    setActiveFilter(filter.id);
    if (filter.tierId) {
      setSelectedTierId(filter.tierId);
    }
  };

  return (
    <section id="pricing" className="py-24 relative bg-white dark:bg-[#07080B] overflow-hidden transition-colors duration-200">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-brand-600/10 via-indigo-500/5 to-cyan-500/10 blur-[180px] pointer-events-none" />
      <div className="absolute -bottom-10 left-1/4 w-[400px] h-[250px] bg-cyan-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 dark:bg-brand-500/15 border border-brand-500/25 text-brand-700 dark:text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-sm">
            <BadgePercent size={14} className="text-brand-600 dark:text-cyan-400" />
            <span>Investment Structure & Scope</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Transparent, High-ROI Engineering
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Select an engagement tier below to see what is included. Every project includes full source code ownership, guaranteed turnaround SLAs, and zero hidden costs.
          </p>

          {/* Interactive Controls Bar: Currency & Quick Filters */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Quick Filter Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-[#111422] border border-slate-200/90 dark:border-white/[0.08] shadow-inner gap-1">
              {budgetQuickFilters.map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => handleFilterClick(filter)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold font-mono transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? "bg-white dark:bg-brand-600 text-slate-950 dark:text-white shadow-md scale-105 border border-slate-200/80 dark:border-brand-400"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{filter.label}</span>
                    {filter.range && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? "bg-brand-50 dark:bg-white/20 text-brand-700 dark:text-white font-bold"
                          : "bg-slate-200/70 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400"
                      }`}>
                        {filter.range}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Currency Toggle */}
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-100 dark:bg-[#111422] border border-slate-200/90 dark:border-white/[0.08] text-xs font-mono">
              <button
                onClick={() => setCurrency("INR")}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  currency === "INR"
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  currency === "USD"
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                $ USD
              </button>
            </div>
          </div>
        </div>

        {/* 3 Interactive Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {pricingTiers.map((tier) => {
            const isSelected = selectedTierId === tier.id;
            const Icon = tier.icon;
            const isHighlightedByFilter = activeFilter === "all" || activeFilter === tier.id;

            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTierId(tier.id)}
                className={`group cursor-pointer rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                  !isHighlightedByFilter ? "opacity-60 grayscale-[0.3] hover:opacity-90 hover:grayscale-0" : ""
                } ${
                  isSelected
                    ? "bg-white dark:bg-gradient-to-b dark:from-[#171b30] dark:to-[#0d101a] border-2 border-brand-500 dark:border-cyan-400 ring-4 ring-brand-500/20 dark:ring-cyan-400/20 shadow-[0_0_40px_rgba(99,102,241,0.25),0_20px_40px_-10px_rgba(0,0,0,0.12),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_0_50px_rgba(6,182,212,0.25),inset_0_1px_0_0_rgba(255,255,255,0.15)] -translate-y-2.5 z-20 scale-[1.01]"
                    : "bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C13] border border-slate-200/90 dark:border-white/[0.08] hover:border-brand-500/50 dark:hover:border-cyan-400/50 shadow-[0_4px_12px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:-translate-y-1.5"
                }`}
              >
                {/* Top Specular Shine Line */}
                <div
                  className={`absolute top-0 inset-x-8 h-[2.5px] bg-gradient-to-r ${
                    isSelected
                      ? "from-brand-500 via-cyan-400 to-indigo-500 opacity-100"
                      : "from-transparent via-brand-500/40 to-transparent opacity-60 group-hover:opacity-100"
                  } transition-opacity duration-300`}
                />

                {/* Selected Indicator Ribbon */}
                {isSelected && (
                  <div className="absolute top-0 right-8">
                    <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-b-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-cyan-600 text-white text-[10px] font-mono uppercase tracking-widest font-bold shadow-[0_4px_12px_rgba(6,182,212,0.4)] border border-t-0 border-white/25">
                      <Check size={12} className="stroke-[3]" /> Active Selection
                    </span>
                  </div>
                )}

                {tier.popular && !isSelected && (
                  <div className="absolute top-0 right-8">
                    <span className="px-3.5 py-1 rounded-b-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-[10px] font-mono uppercase tracking-widest font-bold shadow-md border border-t-0 border-white/20">
                      ★ Popular Pod
                    </span>
                  </div>
                )}

                {/* Top Header & Price Block */}
                <div className="space-y-6 pt-2">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? "bg-gradient-to-tr from-brand-600 to-cyan-500 text-white shadow-lg shadow-brand-500/30 scale-110"
                        : "bg-slate-100 dark:bg-white/[0.05] text-brand-600 dark:text-cyan-400 border border-slate-200/80 dark:border-white/[0.08]"
                    }`}>
                      <Icon size={22} />
                    </div>

                    <span className={`text-xs font-mono uppercase px-3 py-1 rounded-lg font-bold border transition-colors ${
                      isSelected
                        ? "bg-brand-50 dark:bg-cyan-500/15 border-brand-300 dark:border-cyan-400/40 text-brand-700 dark:text-cyan-300"
                        : "bg-slate-100 dark:bg-white/[0.04] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300"
                    }`}>
                      {tier.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-cyan-300 transition-colors">
                      {tier.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price Range Box */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? "bg-gradient-to-b from-brand-500/[0.08] to-transparent dark:from-cyan-500/10 dark:to-transparent border-brand-500/30 dark:border-cyan-400/30 shadow-inner"
                      : "bg-slate-50 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.05]"
                  }`}>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block mb-1">
                      Estimated Investment Range
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white font-mono tracking-tight">
                        {currency === "INR" ? tier.priceRange : tier.priceUsd}
                      </span>
                    </div>

                    <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-mono">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock size={13} className="text-indigo-500 dark:text-cyan-400" /> Turnaround:
                      </span>
                      <span className="font-bold text-slate-900 dark:text-slate-200">{tier.turnaround}</span>
                    </div>
                  </div>

                  {/* Ideal For Badge */}
                  <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-[#0c0f18] border border-slate-200/80 dark:border-white/[0.06] text-xs text-slate-700 dark:text-slate-300">
                    <span className="text-slate-950 dark:text-white font-bold block mb-0.5">Recommended For:</span>
                    <span className="text-slate-600 dark:text-slate-400">{tier.idealFor}</span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">
                      Scope & Capabilities:
                    </span>
                    {tier.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200">
                        <CheckCircle2
                          size={16}
                          className={`shrink-0 mt-0.5 transition-colors ${
                            isSelected
                              ? "text-brand-600 dark:text-cyan-400"
                              : "text-slate-400 dark:text-slate-500 group-hover:text-brand-500 dark:group-hover:text-cyan-400"
                          }`}
                        />
                        <span className="leading-relaxed">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA & Interactive Action */}
                <div className="pt-8 mt-8 border-t border-slate-200/80 dark:border-white/[0.08] space-y-3">
                  <Button
                    href={`/contact?model=${encodeURIComponent(tier.title)}&budget=${encodeURIComponent(tier.priceRange)}`}
                    variant={isSelected ? "primary" : tier.popular ? "primary" : "secondary"}
                    size="md"
                    rightIcon={<ArrowRight size={16} />}
                    className={`w-full justify-center transition-all duration-300 font-semibold ${
                      isSelected
                        ? "shadow-[0_4px_20px_rgba(99,102,241,0.4)] dark:shadow-[0_4px_20px_rgba(6,182,212,0.4)] scale-[1.02]"
                        : ""
                    }`}
                  >
                    {tier.ctaText} →
                  </Button>

                  <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 font-mono">
                    ⚡ Guaranteed 2-Hour Review SLA
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust & Assurance Strip */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-gradient-to-r dark:from-[#0E1119] dark:via-[#131726] dark:to-[#0E1119] border border-slate-200/90 dark:border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-cyan-500/15 text-brand-700 dark:text-cyan-300 flex items-center justify-center shrink-0 border border-brand-200 dark:border-cyan-500/30">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                Every Engagement Includes Full IP Code Ownership & NDA
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Mutual confidentiality agreement executed before deep architectural discovery. 100% intellectual property transfer upon delivery.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="shrink-0 text-xs font-mono font-bold text-brand-600 hover:text-brand-700 dark:text-cyan-400 dark:hover:text-cyan-300 flex items-center gap-1.5 hover:underline"
          >
            <span>Have a unique custom scope? Request Custom Quote</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
