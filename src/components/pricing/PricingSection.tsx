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
  MessageSquare,
} from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  priceInr: string;
  priceUsd: string;
  subPeriod: string;
  stars: number;
  gradientHeader: string;
  accentColor: string;
  glowShadow: string;
  buttonBorder: string;
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
    id: "starter-mvp",
    name: "STARTER / MVP",
    badge: "QUICK LAUNCH",
    tagline: "Rapid Validation & Landing",
    priceInr: "₹10,000 – ₹25,000",
    priceUsd: "$149 – $349",
    subPeriod: "ESTIMATED MVP",
    stars: 3,
    gradientHeader: "bg-gradient-to-br from-[#d946ef] via-[#c026d3] to-[#9333ea]",
    accentColor: "#d946ef",
    glowShadow: "shadow-[0_15px_40px_rgba(217,70,239,0.22)]",
    buttonBorder: "border-[#d946ef] text-[#e879f9] hover:bg-[#d946ef] hover:text-white",
    turnaround: "1 - 2 Weeks Turnaround",
    ctaText: "BUY NOW",
    features: [
      { name: "High-Converting Responsive Web App", included: true },
      { name: "Next.js 14 & React Production Stack", included: true },
      { name: "Direct WhatsApp & Lead Capture Engine", included: true },
      { name: "SEO & Core Web Vitals Optimization", included: true },
      { name: "Cross-Platform iOS & Android Mobile Apps", included: false },
      { name: "Custom AI & RAG Agent Pipelines", included: false },
      { name: "Dedicated Senior Engineering Pod", included: false },
    ],
  },
  {
    id: "growth-platform",
    name: "GROWTH PLATFORM",
    badge: "★ MOST POPULAR",
    tagline: "Full-Stack Web & Portals",
    priceInr: "₹25,000 – ₹50,000",
    priceUsd: "$349 – $699",
    subPeriod: "ESTIMATED SPRINT",
    stars: 4,
    gradientHeader: "bg-gradient-to-br from-[#14b8a6] via-[#0d9488] to-[#0284c7]",
    accentColor: "#14b8a6",
    glowShadow: "shadow-[0_20px_50px_rgba(20,184,166,0.3)]",
    buttonBorder: "border-[#14b8a6] text-[#2dd4bf] hover:bg-[#14b8a6] hover:text-white",
    popular: true,
    turnaround: "2 - 4 Weeks Turnaround",
    ctaText: "BUY NOW",
    features: [
      { name: "Full-Stack Web App & Client Portal", included: true },
      { name: "Neon Cloud DB & Postgres Architecture", included: true },
      { name: "Automated AI Engineering Bot Integration", included: true },
      { name: "Payment Gateway & Authentication", included: true },
      { name: "Automated Customer Email Auto-Responder", included: true },
      { name: "Cross-Platform Mobile App (Add-on)", included: false },
      { name: "Multi-Tenant Enterprise Cloud Stack", included: false },
    ],
  },
  {
    id: "scale-mobile",
    name: "SCALE & MOBILE",
    badge: "HIGH VELOCITY",
    tagline: "Native Mobile & AI Integration",
    priceInr: "₹50,000 – ₹1,00,000",
    priceUsd: "$699 – $1,399",
    subPeriod: "ESTIMATED SPRINT",
    stars: 4,
    gradientHeader: "bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#4f46e5]",
    accentColor: "#6366f1",
    glowShadow: "shadow-[0_20px_50px_rgba(99,102,241,0.25)]",
    buttonBorder: "border-[#6366f1] text-[#a5b4fc] hover:bg-[#6366f1] hover:text-white",
    turnaround: "4 - 8 Weeks Turnaround",
    ctaText: "BUY NOW",
    features: [
      { name: "Native iOS & Android / Flutter Mobile App", included: true },
      { name: "High-Performance Cloud Backend APIs", included: true },
      { name: "Intelligent AI, OCR & LLM Pipelines", included: true },
      { name: "Real-Time Push Notifications & Sockets", included: true },
      { name: "Executive Analytics & Admin Dashboard", included: true },
      { name: "CI/CD Deployment & App Store Publishing", included: true },
      { name: "Multi-Tenant Enterprise Cloud Stack", included: false },
    ],
  },
  {
    id: "enterprise-custom",
    name: "ENTERPRISE CUSTOM",
    badge: "MISSION CRITICAL",
    tagline: "Custom Architecture & Pods",
    priceInr: "₹1,00,000+",
    priceUsd: "$1,499+",
    subPeriod: "CUSTOM ARCHITECTURE",
    stars: 5,
    gradientHeader: "bg-gradient-to-br from-[#fbbf24] via-[#f59e0b] to-[#ea580c]",
    accentColor: "#f59e0b",
    glowShadow: "shadow-[0_15px_40px_rgba(245,158,11,0.25)]",
    buttonBorder: "border-[#f59e0b] text-[#fcd34d] hover:bg-[#f59e0b] hover:text-slate-950",
    turnaround: "Custom Sprints / Retainer",
    ctaText: "BUY NOW",
    features: [
      { name: "Bespoke Multi-Tenant Cloud Architecture", included: true },
      { name: "Custom ERP, CRM & Operational Engines", included: true },
      { name: "Dedicated Solutions Architect & Tech Lead", included: true },
      { name: "Guaranteed 99.9% Uptime & 2-Hour Review SLA", included: true },
      { name: "100% Intellectual Property & NDA Guarantee", included: true },
      { name: "24/7 Incident Escalation & Maintenance", included: true },
      { name: "Automated Disaster Recovery & Backups", included: true },
    ],
  },
];

export const PricingSection: React.FC = () => {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("growth-platform");

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

        {/* Free Demo Highlight Callout Banner */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-teal-500/15 to-brand-500/15 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto shadow-lg">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold block">
                ✨ 100% FREE DEMO AVAILABLE ON ALL TIERS
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                Not sure which plan matches your project scope? Test-drive live interactive demos & review production architecture at zero cost.
              </p>
            </div>
          </div>
          <Link
            href="/contact?demo=true"
            className="shrink-0 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 whitespace-nowrap"
          >
            Book Free Demo →
          </Link>
        </div>

        {/* 4 Gradient Price Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch max-w-7xl mx-auto">
          {plans.map((plan) => {
            const isSelected = selectedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`group rounded-[28px] bg-[#111420] border transition-all duration-300 flex flex-col justify-between overflow-hidden relative cursor-pointer ${
                  isSelected
                    ? `border-2 border-white/40 ring-4 ring-white/10 ${plan.glowShadow} scale-[1.02] -translate-y-2 z-20`
                    : "border-white/[0.08] hover:border-white/25 hover:scale-[1.01] hover:-translate-y-1 shadow-2xl shadow-black/60"
                }`}
              >
                {/* Floating Top Badge */}
                <div className="absolute top-3 right-3 z-30">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider backdrop-blur-md shadow-lg border ${
                    plan.popular
                      ? "bg-slate-950/90 text-amber-300 border-amber-400/40"
                      : "bg-slate-950/80 text-white border-white/20"
                  }`}>
                    {plan.popular && <Flame size={11} className="text-amber-400 fill-amber-400" />}
                    {plan.badge}
                  </span>
                </div>

                {/* Top Section: Signature Gradient with Double Wave Cut */}
                <div className={`relative pt-7 pb-12 px-5 text-center ${plan.gradientHeader} overflow-hidden`}>
                  {/* Subtle Shimmer Texture */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />

                  {/* Plan Name */}
                  <h3 className="relative z-10 text-base sm:text-lg font-black uppercase tracking-[0.15em] text-slate-950 font-sans">
                    {plan.name}
                  </h3>

                  {/* 5-Star Rating Icons */}
                  <div className="relative z-10 flex items-center justify-center gap-1 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={`${
                          i < plan.stars
                            ? "text-slate-950 fill-slate-950"
                            : "text-slate-950/20 fill-slate-950/20"
                        } transition-transform group-hover:scale-110`}
                      />
                    ))}
                  </div>

                  {/* Big Bold Price */}
                  <div className="relative z-10 my-0.5">
                    <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono tracking-tight leading-tight">
                      {currency === "INR" ? plan.priceInr : plan.priceUsd}
                    </div>
                    <span className="block text-[10px] font-mono uppercase tracking-[0.2em] font-extrabold text-slate-950/80 mt-1">
                      {plan.subPeriod}
                    </span>
                  </div>

                  {/* Organic Layered Waves at bottom of Header */}
                  <div className="absolute -bottom-[1px] left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
                    {/* Shadow wave */}
                    <svg viewBox="0 0 500 90" preserveAspectRatio="none" className="w-full h-10 text-black/40 fill-current opacity-70">
                      <path d="M0,25 C130,80 340,5 500,60 L500,90 L0,90 Z"></path>
                    </svg>
                    {/* Body wave matching dark background #111420 */}
                    <svg viewBox="0 0 500 90" preserveAspectRatio="none" className="w-full h-10 text-[#111420] fill-current -mt-8">
                      <path d="M0,45 C150,90 350,15 500,60 L500,90 L0,90 Z"></path>
                    </svg>
                  </div>
                </div>

                {/* Bottom Section: Feature List & Action */}
                <div className="px-5 pt-3 pb-6 flex-1 flex flex-col justify-between space-y-5">
                  {/* Features List with Styled Circular Icons */}
                  <ul className="space-y-3 pt-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs">
                        {feature.included ? (
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 shadow-sm mt-0.5"
                            style={{ backgroundColor: `${plan.accentColor}25`, border: `1.5px solid ${plan.accentColor}` }}
                          >
                            <Check size={9} className="stroke-[3]" style={{ color: plan.accentColor }} />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shrink-0 opacity-40 mt-0.5">
                            <X size={9} className="text-slate-400 stroke-[2.5]" />
                          </div>
                        )}

                        <span
                          className={`leading-tight ${
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
                  <div className="pt-4 border-t border-white/[0.08] space-y-3">
                    <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400">
                      <Clock size={12} style={{ color: plan.accentColor }} />
                      <span className="font-semibold text-slate-300">{plan.turnaround}</span>
                    </div>

                    <Link
                      href={`/contact?model=${encodeURIComponent(plan.name)}&budget=${encodeURIComponent(
                        currency === "INR" ? plan.priceInr : plan.priceUsd
                      )}`}
                      className={`w-full py-3 px-4 rounded-full border-2 text-center text-xs font-black uppercase tracking-widest transition-all duration-300 block shadow-lg ${plan.buttonBorder} ${
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

        {/* 5th Option: Custom Consultation & Discovery Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-[28px] bg-gradient-to-r from-[#111420] via-[#161a2c] to-[#111420] border border-white/[0.1] flex flex-col lg:flex-row items-center justify-between gap-6 max-w-7xl mx-auto shadow-2xl relative overflow-hidden group">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-80 h-full bg-cyan-500/10 blur-[90px] pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
              <MessageSquare size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-white">
                  Custom Consultation & Architectural Discovery
                </h4>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  FREE DISCOVERY
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Need a specialized scope, hybrid multi-platform architecture, or internal enterprise migration? Discuss directly with our engineering leadership for a tailored milestone breakdown.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 shrink-0 w-full lg:w-auto">
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <Clock size={13} className="text-cyan-400" />
              <span>2-Hour Review SLA</span>
            </div>

            <Link
              href="/contact?budget=Not+sure+yet"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-widest transition-all duration-200 shadow-lg shadow-cyan-500/20 text-center hover:scale-105"
            >
              Request Custom Discovery →
            </Link>
          </div>
        </div>

        {/* Assurance Banner */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#0d0f18] border border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-teal-400 shrink-0" />
            <span className="text-xs text-slate-300">
              <strong className="text-white">Enterprise Guarantee:</strong> 100% intellectual property ownership transfer, NDA protection, and milestone-based releases.
            </span>
          </div>

          <Link
            href="/contact"
            className="shrink-0 text-xs font-mono font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1.5 hover:underline"
          >
            <span>Have specific questions? Chat with our team</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
};
