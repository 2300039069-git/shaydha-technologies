import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing technology services provided by SHAYDHA TECHNOLOGIES.",
};

export default function TermsOfServicePage() {
  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="space-y-4 mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Governance & Standards
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500 font-mono">
          Last updated: September 2026
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-[#0D0F17] border border-slate-200 dark:border-white/[0.08] p-8 sm:p-12 rounded-3xl shadow-sm">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Engagement Scope</h2>
          <p>
            All technology development, UI/UX design, custom software engineering, and AI consulting services provided by SHAYDHA TECHNOLOGIES are governed by individually executed Statements of Work (SOW) and Master Services Agreements (MSA).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Intellectual Property Rights</h2>
          <p>
            Upon full settlement of agreed project milestone invoices, all custom source code, design files, architectures, and intellectual assets created specifically for the client transfer entirely to the client, unless explicitly defined otherwise in the SOW.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Warranty & Maintenance</h2>
          <p>
            Every software product released includes a 30-day post-launch warranty period during which bugs or defects directly relating to the agreed specification are resolved at zero additional charge. Ongoing support is provided via dedicated SLA agreements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. Governing Law</h2>
          <p>
            These terms and related software agreements are governed in accordance with the laws of India.
          </p>
        </section>
      </div>
    </div>
  );
}
