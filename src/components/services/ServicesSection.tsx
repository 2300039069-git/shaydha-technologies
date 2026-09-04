"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Cpu,
  Sparkles,
  Palette,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  X,
  LucideIcon,
} from "lucide-react";
import { SERVICES_DATA } from "@/data/services";
import { ServiceItem } from "@/types";
import { Button } from "@/components/ui/Button";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Cpu,
  Sparkles,
  Palette,
  ShoppingBag,
};

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-24 relative bg-slate-50 dark:bg-[#07080B] overflow-hidden transition-colors duration-200">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-mono uppercase tracking-widest">
            Capabilities & Focus
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            What We Build
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Technology solutions designed around your business, your customers, and your goals.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Cpu;

            return (
              <div
                key={service.id}
                className="group relative bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C13] border border-slate-200/90 dark:border-white/[0.08] hover:border-brand-500/50 dark:hover:border-brand-400/50 rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between shadow-[0_2px_4px_rgba(0,0,0,0.02),0_10px_20px_-5px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-[0_20px_35px_-10px_rgba(99,102,241,0.12),0_1px_3px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(99,102,241,0.15)] hover:-translate-y-1 cursor-pointer overflow-hidden"
                onClick={() => setSelectedService(service)}
              >
                {/* Top Subtle Hairline Shine */}
                <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500/50 dark:via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-6 relative z-10">
                  {/* Icon & Index Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-brand-50/80 to-slate-100/90 dark:from-brand-500/15 dark:to-white/[0.03] border border-brand-200/80 dark:border-brand-500/30 flex items-center justify-center text-brand-600 dark:text-cyan-400 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300 p-3.5 shadow-[0_2px_6px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                      <IconComponent size={26} />
                    </div>
                    <span className="text-xs font-mono font-semibold tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100/90 dark:bg-white/[0.04] px-2.5 py-1 rounded-md border border-slate-200/80 dark:border-white/[0.06] shadow-sm">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2.5">
                    <h3 className="text-xl font-bold text-slate-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Tech stack pills preview */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {service.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.technologies.length > 3 && (
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.03] text-slate-500 border border-transparent">
                        +{service.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Explore Service Trigger */}
                <div className="pt-8 relative z-10">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
                    <span>Explore Service</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white dark:bg-gradient-to-r dark:from-[#111422] dark:to-[#0A0C13] border border-slate-200/90 dark:border-white/[0.1] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
          <div className="relative z-10">
            <h4 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">Need a customized engineering solution?</h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              We design specialized workflows, custom APIs, and tailored enterprise architectures.
            </p>
          </div>
          <Button
            href="/contact"
            variant="primary"
            size="md"
            rightIcon={<ArrowRight size={15} />}
            className="shrink-0 relative z-10"
          >
            Discuss Your Architecture
          </Button>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedService(null)}
          />

          <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-[#0E1017] border border-slate-200 dark:border-white/[0.12] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-6 border-b border-slate-200 dark:border-white/[0.08]">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400">
                  Engineering Scope
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-surface-100 border border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-6 space-y-6">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedService.fullDescription}
              </p>

              {/* Key Features */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                  Core Capabilities
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedService.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-white/[0.02] p-2.5 rounded-lg border border-slate-200 dark:border-white/[0.04]"
                    >
                      <CheckCircle2 size={16} className="text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                  Primary Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-brand-50 border border-brand-200 text-brand-700 dark:bg-brand-500/10 dark:border-brand-500/20 dark:text-brand-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-600 dark:text-slate-400">
                Ready to engineer this service for your business?
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  href={`/contact?service=${encodeURIComponent(selectedService.title)}`}
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowRight size={15} />}
                  className="w-full sm:w-auto"
                >
                  Start This Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
