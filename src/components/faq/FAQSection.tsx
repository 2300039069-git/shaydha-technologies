"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import { FAQS_DATA } from "@/data/faqs";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/config/site";

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS_DATA[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 relative bg-white dark:bg-[#090B10] border-t border-slate-200 dark:border-white/[0.06] overflow-hidden transition-colors duration-200">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-brand-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-mono uppercase tracking-widest">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Clear Answers, Zero Guesswork
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Everything you need to know about partnering with SHAYDHA TECHNOLOGIES on your next digital build.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS_DATA.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.18] rounded-2xl overflow-hidden transition-all duration-250 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_6px_16px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left px-7 py-5 flex items-center justify-between gap-4 focus:outline-none select-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 flex items-center justify-center shrink-0 text-slate-500 dark:text-slate-400 transition-all duration-300 shadow-sm ${
                      isOpen ? "rotate-180 text-brand-600 dark:text-cyan-400 bg-brand-50 dark:bg-brand-500/20 border-brand-200 dark:border-brand-500/30" : ""
                    }`}
                  >
                    <ChevronDown size={17} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-7 pb-6 pt-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/[0.04]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 p-6 sm:p-7 rounded-2xl bg-white dark:bg-gradient-to-r dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.1] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-brand-50 to-slate-100 dark:from-brand-500/20 dark:to-white/[0.03] border border-brand-200 dark:border-brand-500/40 flex items-center justify-center text-brand-700 dark:text-cyan-400 shrink-0 shadow-[0_2px_6px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
              <HelpCircle size={22} />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white">Have a specific or technical question?</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Our engineering leads are ready to advise you.</p>
            </div>
          </div>
          <Button
            href={SITE_CONFIG.whatsapp.getUrl("Hi SHAYDHA, I have a question about your services.")}
            external
            variant="whatsapp"
            size="md"
            leftIcon={<MessageSquare size={16} />}
            className="shrink-0 relative z-10"
          >
            Ask on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};
