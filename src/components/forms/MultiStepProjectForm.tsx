"use client";

import React, { useState } from "react";
import {
  Globe,
  Smartphone,
  Sparkles,
  Cpu,
  ShoppingBag,
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Send,
  MessageSquare,
  Zap,
  ShieldCheck,
  Clock,
  Check,
  Star,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/config/site";

const projectTypes = [
  { id: "Website", label: "Website / Web App", icon: Globe, desc: "High-performance marketing or web application" },
  { id: "Mobile App", label: "Mobile App", icon: Smartphone, desc: "iOS & Android native or cross-platform application" },
  { id: "AI Solution", label: "AI Solution", icon: Sparkles, desc: "RAG, intelligent document processing & LLM agents" },
  { id: "Custom Software", label: "Custom Software", icon: Cpu, desc: "Internal ERP, automated workflows & bespoke platforms" },
  { id: "E-Commerce", label: "E-Commerce", icon: ShoppingBag, desc: "Headless store, checkout flows & payment gateways" },
  { id: "Other", label: "Other / Consultation", icon: Layers, desc: "Architectural audit, migration or specialized build" },
];

const budgetTierCards = [
  {
    id: "₹10K – ₹25K",
    label: "Starter / MVP",
    range: "₹10,000 – ₹25,000",
    badge: "Quick Launch",
    stars: 3,
    gradientHeader: "bg-gradient-to-br from-[#d946ef] via-[#c026d3] to-[#9333ea]",
    accentColor: "#d946ef",
    activeBorder: "border-[#d946ef]",
    activeRing: "ring-[#d946ef]/30 shadow-[0_0_25px_rgba(217,70,239,0.22)]",
    icon: Zap,
    desc: "Validation prototypes, fast landing pages & single MVPs",
    turnaround: "1 - 2 weeks",
  },
  {
    id: "₹25K – ₹50K",
    label: "Growth Platform",
    range: "₹25,000 – ₹50,000",
    badge: "★ Most Popular",
    stars: 4,
    gradientHeader: "bg-gradient-to-br from-[#14b8a6] via-[#0d9488] to-[#0284c7]",
    accentColor: "#14b8a6",
    activeBorder: "border-[#14b8a6]",
    activeRing: "ring-[#14b8a6]/30 shadow-[0_0_25px_rgba(20,184,166,0.3)]",
    icon: Sparkles,
    desc: "Full-stack web apps, customer portals, custom API & database workflows",
    turnaround: "2 - 4 weeks",
    popular: true,
  },
  {
    id: "₹50K – ₹1L",
    label: "Scale & Mobile",
    range: "₹50,000 – ₹1,00,000",
    badge: "High Velocity",
    stars: 4,
    gradientHeader: "bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#4f46e5]",
    accentColor: "#6366f1",
    activeBorder: "border-[#6366f1]",
    activeRing: "ring-[#6366f1]/30 shadow-[0_0_25px_rgba(99,102,241,0.25)]",
    icon: Layers,
    desc: "Cross-platform iOS/Android apps, intelligent AI/RAG integrations",
    turnaround: "4 - 8 weeks",
  },
  {
    id: "₹1L+",
    label: "Enterprise Custom",
    range: "₹1,00,000+",
    badge: "Mission Critical",
    stars: 5,
    gradientHeader: "bg-gradient-to-br from-[#fbbf24] via-[#f59e0b] to-[#ea580c]",
    accentColor: "#f59e0b",
    activeBorder: "border-[#f59e0b]",
    activeRing: "ring-[#f59e0b]/30 shadow-[0_0_25px_rgba(245,158,11,0.25)]",
    icon: ShieldCheck,
    desc: "Multi-tenant cloud platforms, custom ERPs, 24/7 dedicated engineering pods",
    turnaround: "Custom Sprints",
  },
  {
    id: "Not sure yet",
    label: "Custom Consultation",
    range: "Flexible / Tailored",
    badge: "Free Discovery",
    stars: 5,
    gradientHeader: "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900",
    accentColor: "#38bdf8",
    activeBorder: "border-sky-400",
    activeRing: "ring-sky-400/30",
    icon: MessageSquare,
    desc: "Discuss your project with our engineering directors for a custom breakdown",
    turnaround: "2-Hour Review SLA",
  },
];

const timelineOptions = [
  "Immediately (< 2 weeks)",
  "Within 1 month",
  "1 - 3 months",
  "Flexible / Planning phase",
];

export const MultiStepProjectForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: "Website",
    message: "",
    budget: "₹25K – ₹50K",
    timeline: "Within 1 month",
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNext = () => {
    setErrorMessage("");
    if (currentStep === 1 && !formData.projectType) {
      setErrorMessage("Please select what you would like to build.");
      return;
    }
    if (currentStep === 2 && formData.message.trim().length < 10) {
      setErrorMessage("Please provide a brief description (at least 10 characters) of your project.");
      return;
    }
    if (currentStep === 3 && !formData.budget) {
      setErrorMessage("Please select an estimated budget range.");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setErrorMessage("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage("Please enter both your name and work email.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(SITE_CONFIG.api.getUrl("/api/project-request"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit project request.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try contacting us on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setIsSubmitted(false);
    setFormData({
      projectType: "Website",
      message: "",
      budget: "₹25K – ₹50K",
      timeline: "Within 1 month",
      name: "",
      email: "",
      phone: "",
      company: "",
    });
  };

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-[#0E1119] border border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl dark:shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(52,211,153,0.3)]">
          <CheckCircle2 size={36} />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Thank you! Your project request has been received.
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Our engineering team will review your requirements and reach out to{" "}
            <span className="text-brand-600 dark:text-brand-400 font-mono font-bold">{formData.email}</span> shortly.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-surface-100/60 border border-slate-200 dark:border-white/[0.06] max-w-md mx-auto text-left text-xs text-slate-600 dark:text-slate-400 space-y-1">
          <div className="flex justify-between">
            <span>Project:</span>
            <span className="text-slate-900 dark:text-white font-medium">{formData.projectType}</span>
          </div>
          <div className="flex justify-between">
            <span>Budget Range:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">{formData.budget}</span>
          </div>
          <div className="flex justify-between">
            <span>Target Timeline:</span>
            <span className="text-slate-900 dark:text-white font-medium">{formData.timeline}</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href={SITE_CONFIG.whatsapp.getUrl(`Hi SHAYDHA, I just submitted a project request for ${formData.projectType}.`)}
            external
            variant="whatsapp"
            size="md"
            leftIcon={<MessageSquare size={16} />}
          >
            Chat on WhatsApp
          </Button>
          <Button
            onClick={resetForm}
            variant="outline"
            size="md"
            className="border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-300"
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.1] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] relative overflow-hidden transition-all duration-300">
      {/* Top Hairline Shine */}
      <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500/50 dark:via-cyan-400/50 to-transparent" />

      {/* Top Progress Tracker */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
          <span className="uppercase text-brand-600 dark:text-cyan-400 font-bold">
            Step 0{currentStep} of 04
          </span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {currentStep === 1 && "Project Category"}
            {currentStep === 2 && "Project Scope"}
            {currentStep === 3 && "Estimated Budget"}
            {currentStep === 4 && "Contact Details"}
          </span>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((stepIdx) => (
            <div
              key={stepIdx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentStep >= stepIdx
                  ? "bg-gradient-to-r from-brand-600 to-cyan-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                  : "bg-slate-100 dark:bg-white/[0.08]"
              }`}
            />
          ))}
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/30 text-xs text-red-600 dark:text-red-300">
          {errorMessage}
        </div>
      )}

      {/* Step 1: What do you want to build? */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
              What do you want to build?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Select the primary category that best matches your initiative.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {projectTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = formData.projectType === type.id;

              return (
                <button
                  type="button"
                  key={type.id}
                  onClick={() => setFormData({ ...formData, projectType: type.id })}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 group select-none ${
                    isSelected
                      ? "bg-brand-50/80 border-brand-500 text-slate-950 dark:bg-brand-600/20 dark:border-brand-400 dark:text-white shadow-[0_4px_14px_rgba(99,102,241,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)]"
                      : "bg-slate-50/70 dark:bg-[#121522] border-slate-200/90 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.18] text-slate-700 dark:text-slate-300 shadow-[0_1px_3px_rgba(0,0,0,0.02),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] hover:-translate-y-0.5"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-sm ${
                      isSelected
                        ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md"
                        : "bg-white dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white border border-slate-200/80 dark:border-white/10"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-950 dark:text-white">{type.label}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-normal">
                      {type.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              onClick={handleNext}
              variant="primary"
              size="md"
              rightIcon={<ArrowRight size={16} />}
            >
              Continue to Details
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Tell us about your project */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
              Tell us about your project
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Describe your vision, key features, target audience, or current operational hurdles.
            </p>
          </div>

          <div>
            <textarea
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="e.g. We need a high-performance web platform that integrates real-time reservation locks, connects to Razorpay/Stripe, and has an intuitive admin dashboard for inventory management..."
              className="w-full text-sm p-4 rounded-2xl bg-slate-50 dark:bg-[#08090D] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 placeholder:text-slate-400 dark:placeholder:text-slate-500 leading-relaxed resize-y min-h-[140px]"
            />
            <p className="text-xs text-slate-500 mt-2 font-mono">
              The more detail you provide, the more accurate our preliminary architectural estimate will be.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button
              onClick={handlePrev}
              variant="secondary"
              size="md"
              leftIcon={<ArrowLeft size={16} />}
              className="bg-slate-100 dark:bg-surface-100 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-border-subtle"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              variant="primary"
              size="md"
              rightIcon={<ArrowRight size={16} />}
            >
              Next: Budget & Timeline
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: What's your estimated budget? */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 dark:bg-brand-500/15 border border-brand-500/20 text-brand-700 dark:text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2">
              <Sparkles size={13} className="text-brand-600 dark:text-cyan-400" />
              <span>Investment & Architecture Calibration</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
              Select Your Target Budget Range
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Select the tier that best reflects your project scope. Our engineering team calibrates the optimal stack and delivery velocity for your ROI.
            </p>
          </div>

          <div className="space-y-6">
            {/* 4 Gradient Wave Budget Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {budgetTierCards.slice(0, 4).map((tier) => {
                const isSelected = formData.budget === tier.id;
                return (
                  <button
                    type="button"
                    key={tier.id}
                    onClick={() => setFormData({ ...formData, budget: tier.id })}
                    className={`rounded-[26px] bg-white dark:bg-[#111420] border text-left transition-all duration-300 select-none relative overflow-hidden flex flex-col justify-between group cursor-pointer ${
                      isSelected
                        ? `border-2 ${tier.activeBorder} ring-4 ${tier.activeRing} shadow-xl scale-[1.01] -translate-y-1 z-10`
                        : "border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 hover:-translate-y-0.5 shadow-sm dark:shadow-md"
                    }`}
                  >
                    {/* Top Gradient Header with Double Wave Cutout */}
                    <div className={`relative pt-5 pb-10 px-5 text-center ${tier.gradientHeader} overflow-hidden`}>
                      {/* Subtle Shimmer Texture */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/15 pointer-events-none" />

                      {/* Header Top Row: Floating Badge + Radio Checkmark */}
                      <div className="relative z-10 flex items-center justify-between mb-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-black tracking-wider bg-slate-950/80 text-white border border-white/20 backdrop-blur-md shadow-sm">
                          {tier.popular && <Flame size={11} className="text-amber-300 fill-amber-300" />}
                          {tier.badge}
                        </span>

                        {/* Selection Radio Circle */}
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-slate-950 text-white ring-2 ring-white/60 shadow-md scale-110"
                            : "bg-slate-950/30 border-2 border-slate-950/40"
                        }`}>
                          {isSelected && <Check size={12} className="stroke-[3]" />}
                        </div>
                      </div>

                      {/* Tier Name */}
                      <h4 className="relative z-10 text-base font-black uppercase tracking-[0.15em] text-slate-950 font-sans">
                        {tier.label}
                      </h4>

                      {/* Star Rating */}
                      <div className="relative z-10 flex items-center justify-center gap-1 my-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={`${
                              i < tier.stars
                                ? "text-slate-950 fill-slate-950"
                                : "text-slate-950/20 fill-slate-950/20"
                            } transition-transform group-hover:scale-110`}
                          />
                        ))}
                      </div>

                      {/* Big Bold Price Range */}
                      <div className="relative z-10 text-xl sm:text-2xl font-black text-slate-950 font-mono tracking-tight">
                        {tier.range}
                      </div>

                      {/* Organic Layered Double Wave */}
                      <div className="absolute -bottom-[1px] left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
                        {/* Shadow wave */}
                        <svg viewBox="0 0 500 90" preserveAspectRatio="none" className="w-full h-8 text-black/30 fill-current opacity-60">
                          <path d="M0,25 C130,80 340,5 500,60 L500,90 L0,90 Z"></path>
                        </svg>
                        {/* Body wave matching card body */}
                        <svg viewBox="0 0 500 90" preserveAspectRatio="none" className="w-full h-8 text-white dark:text-[#111420] fill-current -mt-7">
                          <path d="M0,45 C150,90 350,15 500,60 L500,90 L0,90 Z"></path>
                        </svg>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-4 sm:p-5 pt-2 flex-1 flex flex-col justify-between space-y-3 bg-white dark:bg-[#111420]">
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {tier.desc}
                      </p>

                      {/* SLA Turnaround Footer */}
                      <div className="pt-2.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Clock size={12} style={{ color: tier.accentColor }} /> SLA Turnaround:
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.05] border border-slate-200/60 dark:border-white/[0.06]">
                          {tier.turnaround}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 5th Option: Custom Consultation / Discovery Banner */}
            {budgetTierCards[4] && (
              <button
                type="button"
                onClick={() => setFormData({ ...formData, budget: budgetTierCards[4].id })}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 select-none flex items-center justify-between gap-4 group ${
                  formData.budget === budgetTierCards[4].id
                    ? "bg-brand-50/80 border-2 border-brand-500 ring-4 ring-brand-500/20 dark:bg-brand-600/20 dark:border-cyan-400 dark:ring-cyan-400/20 shadow-md"
                    : "bg-slate-50/70 dark:bg-[#111420] border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 text-slate-700 dark:text-cyan-400">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-950 dark:text-white">{budgetTierCards[4].label}</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-bold">
                        {budgetTierCards[4].badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {budgetTierCards[4].desc}
                    </p>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  formData.budget === budgetTierCards[4].id
                    ? "bg-brand-600 dark:bg-cyan-500 text-white ring-2 ring-brand-400/40 shadow-sm scale-110"
                    : "border-2 border-slate-300 dark:border-white/20"
                }`}>
                  {formData.budget === budgetTierCards[4].id && <Check size={12} className="stroke-[3]" />}
                </div>
              </button>
            )}

            {/* Target Timeline Section */}
            <div className="pt-2 space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-bold">
                Target Launch Timeline:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {timelineOptions.map((t) => {
                  const isSelected = formData.timeline === t;
                  return (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setFormData({ ...formData, timeline: t })}
                      className={`p-3 rounded-xl border text-center text-xs transition-all select-none font-semibold ${
                        isSelected
                          ? "bg-brand-50 border-brand-500 text-brand-950 dark:bg-brand-600/25 dark:border-cyan-400 dark:text-cyan-200 shadow-sm scale-105"
                          : "bg-slate-50/80 dark:bg-[#121522] border-slate-200/90 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/[0.18]"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button
              onClick={handlePrev}
              variant="secondary"
              size="md"
              leftIcon={<ArrowLeft size={16} />}
              className="bg-slate-100 dark:bg-surface-100 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-border-subtle"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              variant="primary"
              size="md"
              rightIcon={<ArrowRight size={16} />}
              className="shadow-glow"
            >
              Next: Contact Details
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Contact Information & Send Request */}
      {currentStep === 4 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
              Where should we send your proposal?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Provide your details so our engineering leads can reach out directly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1.5">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Vikram Malhotra"
                className="w-full text-sm px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#08090D] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1.5">
                Work Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="vikram@company.com"
                className="w-full text-sm px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#08090D] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1.5">
                Phone / WhatsApp Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 75698 02300"
                className="w-full text-sm px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#08090D] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1.5">
                Company / Project Name
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Apex Media Network"
                className="w-full text-sm px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#08090D] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Review Summary Tag */}
          <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] text-xs text-slate-700 dark:text-slate-400 flex flex-wrap items-center gap-3">
            <span>Building: <strong className="text-slate-900 dark:text-white">{formData.projectType}</strong></span>
            <span>•</span>
            <span>Budget: <strong className="text-emerald-700 dark:text-emerald-400 font-mono">{formData.budget}</strong></span>
            <span>•</span>
            <span>Timeline: <strong className="text-slate-900 dark:text-white">{formData.timeline}</strong></span>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button
              type="button"
              onClick={handlePrev}
              variant="secondary"
              size="md"
              leftIcon={<ArrowLeft size={16} />}
              className="bg-slate-100 dark:bg-surface-100 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-border-subtle"
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              rightIcon={<Send size={16} />}
              className="font-semibold shadow-glow px-8"
            >
              Send Project Request →
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
