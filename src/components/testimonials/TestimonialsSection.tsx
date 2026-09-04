import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/data/testimonials";

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 relative bg-slate-50 dark:bg-[#090B10] border-t border-slate-200 dark:border-white/[0.06] overflow-hidden transition-colors duration-200">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[300px] bg-brand-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-mono uppercase tracking-widest">
            Client Perspectives
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Built on Trust & Craft
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            What founders, product heads, and technology leaders say about building with SHAYDHA TECHNOLOGIES.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] hover:border-brand-500/40 dark:hover:border-brand-400/40 rounded-2xl p-8 sm:p-9 transition-all duration-300 shadow-[0_2px_6px_rgba(0,0,0,0.02),0_12px_24px_-4px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between relative group overflow-hidden"
            >
              {/* Top Hairline Shine */}
              <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-4 relative z-10">
                {/* 5 Star Rating */}
                <div className="flex items-center gap-1.5 text-amber-400 drop-shadow-sm">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={17} fill="currentColor" stroke="none" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-normal italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/[0.06] flex items-center gap-4 relative z-10">
                {t.avatarUrl && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-slate-200/80 dark:border-white/10 shrink-0 shadow-sm">
                    <Image
                      src={t.avatarUrl}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-slate-950 dark:text-white font-sans">{t.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {t.role} • <span className="text-brand-600 dark:text-brand-400 font-semibold">{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
