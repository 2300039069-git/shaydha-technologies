import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, MessageSquare, MapPin, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SITE_CONFIG } from "@/config/site";
import { SERVICES_DATA } from "@/data/services";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-100 dark:bg-[#06070A] border-t border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 overflow-hidden transition-colors duration-200">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-200 dark:border-white/[0.08]">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-5 space-y-6">
            <Logo size="lg" />
            <p className="text-base text-slate-800 dark:text-slate-300 font-medium max-w-sm">
              {SITE_CONFIG.tagline}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              SHAYDHA TECHNOLOGIES crafts bespoke digital architecture, enterprise software, AI integrations, and mobile solutions for organizations demanding precision, performance, and scale.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for New Projects</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 dark:text-white font-bold">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SITE_CONFIG.nav.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-brand-600 dark:text-brand-400"
                    />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200 text-xs text-slate-500"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 dark:text-white font-bold">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <Link
                    href="/services"
                    className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Communication Channels */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 dark:text-white font-bold">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={SITE_CONFIG.email.getGmailUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors"
                  title="Open directly in Gmail Web"
                >
                  <Mail size={15} className="text-brand-600 dark:text-brand-400 shrink-0" />
                  <span className="truncate">{SITE_CONFIG.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.whatsapp.getUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  <MessageSquare size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>WhatsApp: {SITE_CONFIG.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneClean}`}
                  className="flex items-center gap-2.5 text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  <Phone size={15} className="text-brand-600 dark:text-brand-400 shrink-0" />
                  <span>{SITE_CONFIG.contact.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-500 pt-1">
                <MapPin size={15} className="text-slate-400 shrink-0 mt-0.5" />
                <span className="text-xs">{SITE_CONFIG.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SHAYDHA TECHNOLOGIES. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <div className="flex items-center gap-1 text-slate-500">
              <ShieldCheck size={14} className="text-brand-600 dark:text-brand-400" />
              <span>Enterprise Grade</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
