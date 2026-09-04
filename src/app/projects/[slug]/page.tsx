import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { PROJECTS_DATA } from "@/data/projects";
import { Button } from "@/components/ui/Button";

interface CaseStudyProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return PROJECTS_DATA.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: CaseStudyProps): Metadata {
  const project = PROJECTS_DATA.find((p) => p.slug === params.slug);
  if (!project) return { title: "Case Study Not Found" };

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
  };
}

export default function ProjectCaseStudyPage({ params }: CaseStudyProps) {
  const project = PROJECTS_DATA.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24">
      {/* Back link & Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-500/10 dark:border dark:border-brand-500/30 dark:text-brand-300 font-semibold">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Calendar size={13} />
              {project.timeline}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.1]">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10">
          {project.metrics.map((metric, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] shadow-[0_2px_4px_rgba(0,0,0,0.02),0_10px_20px_-5px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1 font-mono">
                {metric.label}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-950 dark:text-white">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Full-width Cover Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative aspect-[21/9] sm:aspect-[16/8] w-full rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/[0.1] bg-slate-200 dark:bg-surface-300 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        </div>
      </section>

      {/* Case Study Details Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Narrative Column */}
          <div className="lg:col-span-8 space-y-14">
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 font-bold">
                01 — Project Overview
              </h2>
              <p className="text-base sm:text-lg text-slate-800 dark:text-slate-300 leading-relaxed font-normal">
                {project.overview}
              </p>
            </div>

            {/* Problem */}
            <div className="space-y-4 p-8 rounded-2xl bg-rose-50/70 dark:bg-[#151118] border border-rose-200/80 dark:border-rose-500/20 shadow-[0_2px_6px_rgba(0,0,0,0.02),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] relative overflow-hidden">
              <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-rose-600 dark:text-rose-400 font-bold">
                02 — The Challenge & Bottlenecks
              </h2>
              <p className="text-base text-slate-800 dark:text-slate-300 leading-relaxed font-normal">
                {project.problem}
              </p>
            </div>

            {/* Solution */}
            <div className="space-y-4 p-8 rounded-2xl bg-indigo-50/70 dark:bg-[#101426] border border-indigo-200/80 dark:border-brand-500/30 shadow-[0_2px_6px_rgba(0,0,0,0.02),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] relative overflow-hidden">
              <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500/50 dark:via-cyan-400/50 to-transparent" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-cyan-400 font-bold">
                03 — Engineering Solution
              </h2>
              <p className="text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h2 className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 font-bold">
                04 — Key Features & Systems Built
              </h2>
              <div className="space-y-3">
                {project.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-[#0E1018] border border-slate-200/90 dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                  >
                    <CheckCircle2 size={18} className="text-brand-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Measurable Results */}
            <div className="space-y-6">
              <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
                05 — Measurable Impact & Results
              </h2>
              <div className="space-y-3">
                {project.results.map((res, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/70 dark:bg-[#0C1513] border border-emerald-200/80 dark:border-emerald-500/25 shadow-[0_1px_3px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                  >
                    <TrendingUp size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{res}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Tech Stack Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] space-y-4 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_10px_20px_-5px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] relative overflow-hidden">
              <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                Architecture & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-3 py-1 rounded-md bg-brand-50 border border-brand-200 text-brand-700 dark:bg-brand-500/10 dark:border-brand-500/20 dark:text-brand-300 font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Client Context */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] space-y-3 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_10px_20px_-5px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] relative overflow-hidden">
              <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                Client & Sector
              </h3>
              <div>
                <p className="text-base font-bold text-slate-950 dark:text-white">{project.client}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Category: {project.category}
                </p>
              </div>
            </div>

            {/* Bottom Call to Action Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-white to-white dark:from-[#131726] dark:to-[#0A0C14] border border-brand-200/80 dark:border-brand-500/40 text-center space-y-4 shadow-[0_20px_40px_-10px_rgba(99,102,241,0.15),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.12)] relative overflow-hidden">
              <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                Have a similar project in mind?
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                Let&apos;s evaluate your requirements and engineer a high-performance solution tailored to your growth goals.
              </p>
              <Button
                href={`/contact?project=${encodeURIComponent(project.title)}`}
                variant="primary"
                size="md"
                rightIcon={<ArrowRight size={16} />}
                className="w-full justify-center"
              >
                Start a Conversation →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
