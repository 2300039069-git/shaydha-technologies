"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";
import { LogoMark } from "@/components/brand/LogoMark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!passcode.trim()) {
      setError("Please enter the executive passcode.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid passcode.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden bg-slate-50 dark:bg-[#07080B] transition-colors duration-200">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-500/10 dark:bg-brand-500/15 blur-[160px] rounded-full pointer-events-none" />

      {/* Top Bar with Theme Toggle */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <LogoMark size={28} />
          <span className="text-sm font-bold tracking-wider font-mono text-slate-900 dark:text-white uppercase">
            SHAYDHA OPERATIONS
          </span>
        </div>
        <ThemeToggle />
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-12 z-10">
        <div className="bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.12] rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.1)] relative overflow-hidden space-y-8">
          {/* Top Hairline Shine */}
          <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent" />

          {/* Card Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-brand-50 to-slate-100 dark:from-brand-500/20 dark:to-white/[0.03] border border-brand-200 dark:border-brand-500/40 flex items-center justify-center mx-auto text-brand-600 dark:text-cyan-400 shadow-[0_2px_6px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
              <Lock size={26} />
            </div>

            <h1 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
              Executive Portal Access
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
              Authenticate with your administrative key to access client project inquiries and operational pipelines.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/30 text-xs text-red-600 dark:text-red-300 font-mono text-center">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 block font-semibold">
                Administrative Passcode
              </label>
              <div className="relative">
                <KeyRound
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                />
                <input
                  type="password"
                  required
                  autoFocus
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full text-sm pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#121522] border border-slate-200/90 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 tracking-wider shadow-inner"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              rightIcon={<ArrowRight size={16} />}
              className="w-full justify-center text-sm font-semibold shadow-glow mt-2"
            >
              Sign In to Command Center
            </Button>
          </form>

          {/* Passcode Hint Pill */}
          <div className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400">
            <span>Default Passcode:</span>
            <button
              type="button"
              onClick={() => setPasscode("shaydha2026")}
              className="font-bold text-brand-600 dark:text-cyan-300 hover:underline"
            >
              shaydha2026 (Fill)
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto w-full text-center text-xs text-slate-500 dark:text-slate-500 font-mono z-10">
        SHAYDHA TECHNOLOGIES • Internal Operations & Lead Management System
      </div>
    </div>
  );
}
