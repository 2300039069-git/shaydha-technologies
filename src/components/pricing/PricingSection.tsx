"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Star,
  Layers,
  Clock,
  Flame,
  BadgePercent,
} from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  priceInr: string;
  priceUsd: string;
  subPeriod: string;
  stars: number;
  gradientHeader: string;
  waveFillDark: string;
  waveFillLight: string;
  accentColor: string;
  glowShadow: string;
  buttonBorder: string;
  buttonText: string;
  buttonHoverBg: string;
  popular?: boolean;
  features: {
    name: string;
    included: boolean;
  }[];
  turnaround: string;
  ctaText: string;
}

const plans: PricingPlan[] = [
  {
    id: "basic-sprint",
    name: "BASIC",
    tagline: "MVP & Rapid Launch",
    priceInr: "₹15,000",
    priceUsd: "$199",
    subPeriod: "ESTIMATED STARTING",
    stars: 3,
    gradientHeader: "bg-gradient-to-br from-[#d946ef] via-[#c026d3] to-[#9333ea]",
    waveFillDark: "#10131f",
    waveFillLight: "#ffffff",
    accentColor: "#d946ef",
    glowShadow: "shadow-[0_15px_40px_rgba(217,70,239,0.22)]",
    buttonBorder: "border-[#d946ef] text-[#e879f9] hover:bg-[#d946ef] hover:text-white",
    buttonText: "text-fuchsia-400 dark:text-fuchsia-300",
    buttonHoverBg: "hover:bg-fuchsia-600 hover:text-white",
    turnaround: "1 - 2 Weeks Turnaround",
    ctaText: "BUY NOW",
    features: [
      { name: "High-Converting Responsive Web App", included: true },
      { name: "Full Next.js 14 & React Production Stack", included: true },
      { name: "Direct WhatsApp & Gmail Web Redirection", included: true },
      { name: "SEO & Core Web Vitals Optimization", included: true },
      { name: "Cross-Platform iOS & Android Mobile Apps", included: false },
      { name: "Bespoke AI / RAG Document Extraction", included: false },
      { name: "Dedicated Senior Engineering Pod", included: false },
    ],
  },
  {
    id: "standard-growth",
    name: "STANDARD",
    badge: "★ POPULAR CHOICE",
    tagline: "Full-Stack Growth & Portals",
    priceInr: "₹35,000",
    priceUsd: "$499",
    subPeriod: "ESTIMATED SPRINT",
    stars: 4,
    gradientHeader: "bg-gradient-to-br from-[#14b8a6] via-[#0d9488] to-[#0284c7]",
    waveFillDark: "#10131f",
    waveFillLight: "#ffffff",
    accentColor: "#14b8a6",
    glowShadow: "shadow-[0_20px_50px_rgba(20,184,166,0.3)]",
    buttonBorder: "border-[#14b8a6] text-[#2dd4bf] hover:bg-[#14b8a6] hover:text-white",
    buttonText: "text-teal-400 dark:text-teal-300",
    buttonHoverBg: "hover:bg-teal-600 hover:text-white",
    popular: true,
    turnaround: "2 - 4 Weeks Turnaround",
    ctaText: "BUY NOW",
    features: [
      { name: "Full-Stack Web App & Client Portal", included: true },
      { name: "Executive Admin Dashboard (Neon Cloud DB)", included: true },
      { name: "Automated Engineering Concierge Bot", included: true },
      { name: "Payment Gateway & Authentication", included: true },
      { name: "Automated Customer Email Auto-Responder", included: true },
      { name: "Cross-Platform Mobile App (Optional Add-on)", included: true },
      { name: "Multi-Tenant Enterprise Cloud Infrastructure", included: false },
    ],
  },
  {
    id: "premium-enterprise",
    name: "PREMIUM",
    badge: "ENTERPRISE",
    tagline: "Mission Critical & Custom Pods",
    priceInr: "₹75,000+",
    priceUsd: "$999+",
    subPeriod: "CUSTOM ARCHITECTURE",
    stars: 5,
    gradientHeader: "bg-gradient-to-br from-[#fbbf24] via-[#f59e0b] to-[#ea580c]",
    waveFillDark: "#10131f",
    waveFillLight: "#ffffff",
    accentColor: "#f59e0b",
    glowShadow: "shadow-[0_15px_40px_rgba(245,158,11,0.25)]",
    buttonBorder: "border-[#f59e0b] text-[#fcd34d] hover:bg-[#f59e0b] hover:text-slate-950",
    buttonText: "text-amber-400 dark:text-amber-300",
    buttonHoverBg: "hover:bg-amber-500 hover:text-slate-950",
    turnaround: "Custom Sprints / Retainer",
    ctaText: "BUY NOW",
    features: [
      { name: "Bespoke System Architecture & ERP Engines", included: true },
      { name: "iOS & Android Native / Flutter Mobile Builds", included: true },
      { name: "Custom AI, OCR & LLM Agent Pipelines", included: true },
      { name: "Guaranteed 99.9% Uptime & 2-Hour Review SLA", included: true },
      { name: "100% Intellectual Property & NDA Guarantee", included: true },
      { name: "Dedicated Solutions Architect & Tech Lead", included: true },
      { name: "24/7 Incident Escalation & Maintenance", included: true },
    ],
  },
];

export const PricingSection: React.FC = () => {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("standard-growth");

  return (
    <section id="pricing" className="py-24 relative bg-slate-950 dark:bg-[#07080B] text-white overflow-hidden transition-colors duration-200">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-r from-fuchsia-600/10 via-teal-500/10 to-amber-500/10 blur-[180px] pointer-events-none" />
      <div className="absolute -bottom-10 right-1/4 w-[400px] h-[250px] bg-teal-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-xs font-mono uppercase tracking-[0.2em] text-cyan-300 shadow-inner">
            <Sparkles size={14} className="text-cyan-400" />
            <span>GRADIENT PRICE LIST COLLECTION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Choose Your Engineering Plan
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            High-velocity software engineering tailored to your product milestones. Select your target scope below to review features and turnaround times.
          </p>

          {/* Currency Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex items-center p-1 rounded-2xl bg-[#121522] border border-white/10 text-xs font-mono shadow-inner">
              <button
                onClick={() => setCurrency("INR")}
                className={`px-4 py-1.5 rounded-xl font-bold transition-all ${
                  currency === "INR"
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md scale-105"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                ₹ INR Pricing
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-4 py-1.5 rounded-xl font-bold transition-all ${
                  currency === "USD"
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md scale-105"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                $ USD Pricing
              </button>
            </div>
          </div>
        </div>

        {/* 3 Gradient Price Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan) => {
            const isSelected = selectedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`group rounded-[32px] bg-[#111420] border transition-all duration-300 flex flex-col justify-between overflow-hidden relative cursor-pointer ${
                  isSelected
                    ? `border-2 border-white/40 ring-4 ring-white/10 ${plan.glowShadow} scale-[1.02] -translate-y-2 z-20`
                    : "border-white/[0.08] hover:border-white/25 hover:scale-[1.01] hover:-translate-y-1 shadow-2xl shadow-black/60"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-3 right-3 z-30">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950/80 text-white text-[10px] font-mono font-black uppercase tracking-widest border border-white/20 shadow-lg backdrop-blur-md">
                      <Flame size={12} className="text-teal-400 fill-teal-400" />
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Top Section: Signature Gradient with Double Wave Cut */}
                <div className={`relative pt-8 pb-14 px-6 text-center ${plan.gradientHeader} overflow-hidden`}>
                  {/* Subtle Shimmer Texture */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />

                  {/* Plan Name */}
                  <h3 className="relative z-10 text-xl font-black uppercase tracking-[0.2em] text-slate-950 font-sans">
                    {plan.name}
                  </h3>

                  {/* 5-Star Rating Icons */}
                  <div className="relative z-10 flex items-center justify-center gap-1.5 my-2.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < plan.stars
                            ? "text-slate-950 fill-slate-950"
                            : "text-slate-950/25 fill-slate-950/25"
                        } transition-transform group-hover:scale-110`}
                      />
                    ))}
                  </div>

                  {/* Big Bold Price */}
                  <div className="relative z-10 my-1">
                    <div className="text-4xl sm:text-5xl font-black text-slate-950 font-sans tracking-tight">
                      {currency === "INR" ? plan.priceInr : plan.priceUsd}
                    </div>
                    <span className="block text-[11px] font-mono uppercase tracking-[0.2em] font-extrabold text-slate-950/80 mt-1">
                      {plan.subPeriod}
                    </span>
                  </div>

                  {/* Organic Layered Waves at bottom of Header */}
                  <div className="absolute -bottom-[1px] left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
                    {/* Shadow wave */}
                    <svg viewBox="0 0 500 90" preserveAspectRatio="none" className="w-full h-12 text-black/40 fill-current opacity-70">
                      <path d="M0,25 C130,80 340,5 500,60 L500,90 L0,90 Z"></path>
                    </svg>
                    {/* Body wave matching dark background #111420 */}
                    <svg viewBox="0 0 500 90" preserveAspectRatio="none" className="w-full h-12 text-[#111420] fill-current -mt-10">
                      <path d="M0,45 C150,90 350,15 500,60 L500,90 L0,90 Z"></path>
                    </svg>
                  </div>
                </div>

                {/* Bottom Section: Feature List & Action */}
                <div className="px-6 sm:px-8 pt-4 pb-8 flex-1 flex flex-col justify-between space-y-6">
                  {/* Features List with Styled Circular Icons */}
                  <ul className="space-y-3.5 pt-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs sm:text-sm">
                        {feature.included ? (
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-sm"
                            style={{ backgroundColor: `${plan.accentColor}25`, border: `1.5px solid ${plan.accentColor}` }}
                          >
                            <Check size={11} className="stroke-[3]" style={{ color: plan.accentColor }} />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shrink-0 opacity-40">
                            <X size={11} className="text-slate-400 stroke-[2.5]" />
                          </div>
                        )}

                        <span
                          className={`leading-snug ${
                            feature.included
                              ? "text-slate-200 font-medium"
                              : "text-slate-500 line-through opacity-50"
                          }`}
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Card Bottom: Turnaround & BUY NOW Button */}
                  <div className="pt-6 border-t border-white/[0.08] space-y-3">
                    <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400">
                      <Clock size={12} className="text-cyan-400" />
                      <span>{plan.turnaround}</span>
                    </div>

                    <Link
                      href={`/contact?model=${encodeURIComponent(plan.name)}&budget=${encodeURIComponent(
                        currency === "INR" ? plan.priceInr : plan.priceUsd
                      )}`}
                      className={`w-full py-3.5 px-6 rounded-full border-2 text-center text-xs sm:text-sm font-black uppercase tracking-widest transition-all duration-300 block shadow-lg ${plan.buttonBorder} ${
                        isSelected ? "bg-white text-slate-950 shadow-white/20 scale-[1.02]" : ""
                      }`}
                    >
                      {plan.ctaText}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Assurance Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-[#111420] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-300 flex items-center justify-center shrink-0">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Guaranteed 2-Hour Review SLA & 100% Code Ownership
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Every project includes full intellectual property transfer, NDA protection, and post-launch bug warranty.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="shrink-0 text-xs font-mono font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1.5 hover:underline"
          >
            <span>Have custom requirements? Discuss with Founders</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
