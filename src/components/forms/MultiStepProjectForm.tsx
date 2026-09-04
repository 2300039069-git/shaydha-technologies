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

const budgetOptions = [
  "₹10K – ₹25K",
  "₹25K – ₹50K",
  "₹50K – ₹1L",
  "₹1L+",
  "Not sure yet",
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
            <h3 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
              What&apos;s your estimated budget?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              This helps us calibrate the optimal architecture and delivery speed for your requirements.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {budgetOptions.map((budget) => {
                const isSelected = formData.budget === budget;
                return (
                  <button
                    type="button"
                    key={budget}
                    onClick={() => setFormData({ ...formData, budget })}
                    className={`py-3.5 px-4 rounded-xl border text-center text-xs font-mono font-bold transition-all select-none ${
                      isSelected
                        ? "bg-brand-50 border-brand-500 text-brand-900 dark:bg-brand-600/20 dark:border-brand-400 dark:text-cyan-300 shadow-[0_4px_12px_rgba(99,102,241,0.2),inset_0_1px_0_0_rgba(255,255,255,0.8)] scale-[1.02]"
                        : "bg-slate-50/80 dark:bg-[#121522] border-slate-200/90 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/[0.18] shadow-[0_1px_2px_rgba(0,0,0,0.02),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                    }`}
                  >
                    {budget}
                  </button>
                );
              })}
            </div>

            {/* Target Timeline */}
            <div className="pt-4 space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-semibold">
                Target Launch Timeline:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {timelineOptions.map((t) => {
                  const isSelected = formData.timeline === t;
                  return (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setFormData({ ...formData, timeline: t })}
                      className={`p-3.5 rounded-xl border text-left text-xs transition-all select-none ${
                        isSelected
                          ? "bg-brand-50 border-brand-500 text-brand-950 font-bold dark:bg-brand-600/20 dark:border-brand-400 dark:text-white shadow-[0_4px_12px_rgba(99,102,241,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)]"
                          : "bg-slate-50/80 dark:bg-[#121522] border-slate-200/90 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/[0.18] shadow-[0_1px_2px_rgba(0,0,0,0.02),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
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
                placeholder="+91 98765 43210"
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
