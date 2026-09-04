"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { InteractiveHeroCanvas } from "./InteractiveHeroCanvas";
import { SITE_CONFIG } from "@/config/site";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 dark:bg-brand-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 dark:bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-mesh-pattern bg-[size:32px_32px] opacity-10 dark:opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Availability Badge */}
            <div className="inline-flex items-center">
              <Badge variant="success" size="md" dot className="border-emerald-500/30 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300 shadow-sm">
                {SITE_CONFIG.contact.availability}
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.1rem] font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1]">
              We Build Digital{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-600 dark:from-white dark:via-brand-200 dark:to-brand-400">
                Experiences
              </span>{" "}
              That Move Businesses Forward.
            </h1>

            {/* Supporting Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed font-normal mx-auto lg:mx-0">
              <span className="font-semibold text-slate-950 dark:text-white">SHAYDHA TECHNOLOGIES</span> helps businesses transform ideas into powerful websites, applications, and digital products designed to perform, scale, and grow.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={18} />}
                className="w-full sm:w-auto font-semibold shadow-glow px-8"
              >
                Start a Project
              </Button>
              <Button
                href="#work"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto px-7 bg-white dark:bg-surface-100 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-border-subtle shadow-sm"
              >
                Explore Our Work
              </Button>
            </div>

            {/* Trust Statement & Capabilities Bar */}
            <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08]">
              <p className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-3">
                Core Specializations
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5 hover:text-slate-950 dark:hover:text-white transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  Web Development
                </span>
                <span className="flex items-center gap-1.5 hover:text-slate-950 dark:hover:text-white transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  Mobile Apps
                </span>
                <span className="flex items-center gap-1.5 hover:text-slate-950 dark:hover:text-white transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  Custom Software
                </span>
                <span className="flex items-center gap-1.5 hover:text-slate-950 dark:hover:text-white transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  AI Solutions
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Abstract Interactive 3D Digital Architecture */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <InteractiveHeroCanvas />
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="hidden lg:flex justify-center items-center pt-8">
        <a
          href="#services"
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors uppercase tracking-widest font-mono"
          aria-label="Scroll to services"
        >
          <span>Scroll to Discover</span>
          <ArrowDown size={14} className="animate-bounce text-brand-600 dark:text-brand-400" />
        </a>
      </div>
    </section>
  );
};
