import React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/config/site";

export const CTASection: React.FC = () => {
  return (
    <section className="py-28 relative bg-slate-50 dark:bg-[#07080B] overflow-hidden transition-colors duration-200">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-brand-600/10 via-cyan-600/10 to-brand-700/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-b from-white via-slate-50/70 to-slate-100/90 dark:from-[#111422] dark:via-[#0E1019] dark:to-[#0A0C13] border border-slate-200/90 dark:border-white/[0.12] rounded-3xl p-8 sm:p-14 lg:p-16 text-center space-y-8 shadow-[0_20px_50px_-10px_rgba(99,102,241,0.15),0_10px_30px_rgba(0,0,0,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.12)] relative overflow-hidden">
          {/* Subtle top border illumination */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-brand-500 dark:via-cyan-400 to-transparent opacity-80" />

          {/* Free Demo Availability Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-teal-500/15 to-cyan-500/15 border border-amber-400/40 text-slate-900 dark:text-amber-300 text-xs font-mono uppercase tracking-widest shadow-sm font-bold">
            <Sparkles size={14} className="text-amber-400 animate-pulse" />
            <span>100% Free Live Demo & Architecture Walkthrough</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight max-w-3xl mx-auto leading-tight">
            See Our Caliber in Action. Book Your Free Live Demo.
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Tell us what you&apos;re building. We&apos;ll set up a 100% free interactive demo walkthrough and deliver an itemized production blueprint with timelines and estimates within 24 hours.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Free Demo Primary CTA */}
            <Link
              href="/contact?demo=true"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-400/20 hover:scale-105 transition-all"
            >
              <Sparkles size={16} />
              <span>Book 100% Free Demo →</span>
            </Link>

            {/* Start a Project Form */}
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight size={18} />}
              className="w-full sm:w-auto font-semibold shadow-glow px-8"
            >
              Start a Project
            </Button>

            {/* WhatsApp Direct Action */}
            <Button
              href={SITE_CONFIG.whatsapp.getUrl("Hi SHAYDHA Technologies, I would like to request a free live demo for my project.")}
              external
              variant="whatsapp"
              size="lg"
              leftIcon={<MessageSquare size={18} />}
              className="w-full sm:w-auto px-7"
            >
              WhatsApp Demo
            </Button>
          </div>

          {/* Trust Guarantee Note */}
          <div className="pt-6 border-t border-slate-200/80 dark:border-white/[0.06] flex flex-wrap items-center justify-center gap-6 text-xs text-slate-700 dark:text-slate-300 font-mono font-medium">
            <span>✓ 100% Free Demo Walkthrough</span>
            <span>✓ Rapid 24-Hour Blueprint</span>
            <span>✓ Strict NDA Protection</span>
            <span>✓ Zero Obligation</span>
          </div>
        </div>
      </div>
    </section>
  );
};
