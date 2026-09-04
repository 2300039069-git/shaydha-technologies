import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and client data handling principles of SHAYDHA TECHNOLOGIES.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="space-y-4 mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Legal & Trust
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 font-mono">
          Last updated: September 2026
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-[#0D0F17] border border-slate-200 dark:border-white/[0.08] p-8 sm:p-12 rounded-3xl shadow-sm">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Information We Collect</h2>
          <p>
            When you contact SHAYDHA TECHNOLOGIES through our website, project planner, or chat widget, we collect information including your name, email address, phone/WhatsApp number, organization name, and project requirements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. How We Use Information</h2>
          <p>
            The information you provide is solely used to evaluate your software requirements, prepare itemized proposals, coordinate engineering sprints, and maintain professional communication regarding your project.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Non-Disclosure & Data Security</h2>
          <p>
            We adhere to strict confidentiality principles. We will never sell, rent, or lease your personal or company information to third parties. All communication, software blueprints, and technical documents are treated with utmost confidentiality.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. Contacting Us</h2>
          <p>
            For any questions regarding our privacy practices, you can reach our team directly at{" "}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=shaydhatechnologies@gmail.com&su=Privacy%20Inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 dark:text-brand-400 hover:underline font-medium"
            >
              shaydhatechnologies@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
