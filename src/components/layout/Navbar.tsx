"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, MessageSquare } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SITE_CONFIG } from "@/config/site";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-white/90 dark:bg-[#08090D]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] shadow-sm dark:shadow-2xl dark:shadow-black/50"
            : "py-5 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Wordmark */}
            <Logo size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 dark:bg-surface-200/60 border border-slate-200 dark:border-white/[0.06] backdrop-blur-md px-4 py-1.5 rounded-full shadow-inner shadow-black/[0.02] dark:shadow-white/[0.02]">
              {SITE_CONFIG.nav.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-200 ${
                      isActive
                        ? "text-slate-900 dark:text-white bg-white dark:bg-white/[0.08] shadow-sm shadow-slate-300 dark:shadow-brand-500/20"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.03]"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-600 dark:bg-brand-400 shadow-[0_0_6px_rgba(99,102,241,0.8)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Theme Switcher & Let's Talk CTA */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Button
                href="/contact"
                variant="primary"
                size="sm"
                rightIcon={<ArrowUpRight size={15} />}
                className="font-semibold shadow-glow"
              >
                Let&apos;s Talk
              </Button>
            </div>

            {/* Mobile Controls: Theme Toggle & Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-white dark:bg-surface-200 border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white dark:bg-[#0C0E15] border-l border-slate-200 dark:border-white/[0.08] p-6 flex flex-col justify-between transition-transform duration-300 shadow-2xl ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="space-y-6 pt-16">
            <div className="pb-4 border-b border-slate-200 dark:border-white/[0.08]">
              <Logo size="sm" />
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                {SITE_CONFIG.tagline}
              </p>
            </div>

            <nav className="flex flex-col space-y-2">
              {SITE_CONFIG.nav.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-3 rounded-xl text-sm uppercase tracking-wider font-semibold transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-brand-50 text-brand-700 border border-brand-200 dark:bg-brand-500/15 dark:text-brand-300 dark:border-brand-500/30"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.04] dark:hover:text-white"
                    }`}
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight
                      size={16}
                      className={isActive ? "text-brand-600 dark:text-brand-400" : "text-slate-400 dark:text-slate-600"}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/[0.08]">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              className="w-full justify-center"
              rightIcon={<ArrowUpRight size={16} />}
            >
              Start a Project
            </Button>
            <Button
              href={SITE_CONFIG.whatsapp.getUrl()}
              external
              variant="whatsapp"
              size="md"
              className="w-full justify-center"
              leftIcon={<MessageSquare size={16} />}
            >
              Chat on WhatsApp
            </Button>
            <div className="text-center pt-2">
              <span className="text-[11px] text-slate-500">
                {SITE_CONFIG.contact.availability}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
