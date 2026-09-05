import React from "react";
import type { Metadata } from "next";
import { Mail, Phone, MessageSquare, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { MultiStepProjectForm } from "@/components/forms/MultiStepProjectForm";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us & Start a Project",
  description:
    "Reach SHAYDHA TECHNOLOGIES directly via WhatsApp, email, or our interactive multi-step project planner to discuss timelines, pricing, and technical architecture.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Header Banner */}
      <section className="py-16 relative bg-white dark:bg-[#07080B] border-b border-slate-200 dark:border-white/[0.06] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-mono uppercase tracking-widest">
            Direct Communication
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Let&apos;s Talk
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Whether you have a fully scoped product brief or an early-stage concept, we are ready to analyze your requirements and provide clear technical direction.
          </p>
        </div>
      </section>

      {/* Main Grid: Multi-step Form & Direct Contact Channels */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Communication Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Highlight Box */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-emerald-50/90 via-emerald-50/50 to-white dark:from-[#0D2219] dark:to-[#0A140F] border border-emerald-300/90 dark:border-emerald-500/40 space-y-4 shadow-[0_4px_20px_rgba(16,185,129,0.12),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] relative overflow-hidden">
              <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
              <div className="flex items-center gap-3">
                <div className="w-13 h-13 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center p-3 shadow-sm border border-emerald-200 dark:border-emerald-500/30">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">Prefer WhatsApp?</h3>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono font-semibold">
                    Instant Messaging Available
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                Connect directly with our engineering founders on WhatsApp for immediate feedback, preliminary scope advice, and quick calls.
              </p>

              <Button
                href={SITE_CONFIG.whatsapp.getUrl()}
                external
                variant="whatsapp"
                size="md"
                className="w-full justify-center shadow-lg"
                rightIcon={<ArrowRight size={16} />}
              >
                Chat With Us on WhatsApp →
              </Button>
            </div>

            {/* Email & Phone Cards */}
            <div className="p-8 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] space-y-6 shadow-[0_2px_6px_rgba(0,0,0,0.02),0_12px_28px_-6px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] relative overflow-hidden">
              <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                Direct Channels
              </h3>

              <div className="space-y-4">
                <a
                  href={SITE_CONFIG.email.getGmailUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/80 hover:bg-slate-100/90 dark:bg-[#141828] dark:hover:bg-[#1A2035] border border-slate-200/90 dark:border-white/[0.08] transition-colors group shadow-sm"
                  title="Open directly in Gmail Web"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-500/15 text-brand-700 dark:text-brand-400 flex items-center justify-center shrink-0 border border-brand-200 dark:border-brand-500/30">
                    <Mail size={18} />
                  </div>
                  <div className="truncate flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">Official Email</span>
                      <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold">Open in Gmail ↗</span>
                    </div>
                    <span className="text-sm font-bold text-slate-950 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300 transition-colors">
                      {SITE_CONFIG.contact.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.contact.phoneClean}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/80 hover:bg-slate-100/90 dark:bg-[#141828] dark:hover:bg-[#1A2035] border border-slate-200/90 dark:border-white/[0.08] transition-colors group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-200 dark:border-cyan-500/30">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">Telephone</span>
                    <span className="text-sm font-bold text-slate-950 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-300 transition-colors">
                      {SITE_CONFIG.contact.phone}
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/60 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.05]">
                  <div className="w-10 h-10 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-400 flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">Working Hours</span>
                    <span className="text-sm font-bold text-slate-950 dark:text-white">
                      {SITE_CONFIG.contact.workingHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality & NDA Guarantee */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0E1119] border border-slate-200/90 dark:border-white/[0.08] flex items-center gap-4 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
              <ShieldCheck size={28} className="text-brand-600 dark:text-cyan-400 shrink-0" />
              <span>
                All intellectual property, concepts, and communication are protected under mutual non-disclosure (NDA).
              </span>
            </div>
          </div>

          {/* Right Column: Multi-Step Project Enquiry Form */}
          <div className="lg:col-span-7">
            <MultiStepProjectForm />
          </div>
        </div>
      </div>
    </div>
  );
}
