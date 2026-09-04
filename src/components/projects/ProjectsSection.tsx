"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS_DATA } from "@/data/projects";
import { ProjectCategory } from "@/types";
import { Button } from "@/components/ui/Button";

const categories: ProjectCategory[] = [
  "All",
  "Web",
  "Mobile",
  "AI",
  "Software",
  "E-Commerce",
];

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-24 relative bg-slate-50 dark:bg-[#07080B] overflow-hidden transition-colors duration-200">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-mono uppercase tracking-widest">
              Proven Track Record
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Selected Work
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
              Explore flagship platforms, high-concurrency systems, and intelligent applications built by SHAYDHA TECHNOLOGIES.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-200/70 dark:bg-surface-200/80 border border-slate-300/70 dark:border-white/[0.08] backdrop-blur-md shadow-inner">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-brand-600 text-white shadow-sm shadow-brand-500/30 font-semibold"
                    : "text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group relative bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.09] hover:border-brand-500/50 dark:hover:border-brand-400/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_2px_6px_rgba(0,0,0,0.02),0_12px_24px_-6px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
            >
              {/* Top Hairline Shine */}
              <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500/50 dark:via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

              {/* Image Preview Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200 dark:bg-surface-300 border-b border-slate-100 dark:border-white/[0.06]">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Top Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-slate-900/80 dark:bg-black/75 border border-white/20 text-white backdrop-blur-md shadow-md">
                    {project.category}
                  </span>
                </div>

                {/* Top Right Arrow Indicator */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 dark:bg-black/75 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all backdrop-blur-md shadow-md">
                  <ArrowUpRight size={16} className="text-brand-300" />
                </div>
              </div>

              {/* Project Card Content */}
              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <span className="font-semibold text-brand-600 dark:text-brand-400">{project.client}</span>
                    <span>{project.timeline}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal">
                    {project.summary}
                  </p>
                </div>

                {/* Metrics Highlights */}
                <div className="grid grid-cols-2 gap-3 py-3.5 border-y border-slate-200/80 dark:border-white/[0.06] my-2 bg-slate-50/50 dark:bg-white/[0.01] px-3 rounded-xl">
                  {project.metrics.slice(0, 2).map((m, i) => (
                    <div key={i}>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">{m.label}</span>
                      <span className="text-base font-bold font-mono text-slate-950 dark:text-white">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills and View Action */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.06] shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:text-brand-700 dark:group-hover:text-brand-300 inline-flex items-center gap-1">
                    <span>Case Study</span>
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All Projects Footer CTA */}
        <div className="mt-14 text-center">
          <Button
            href="/projects"
            variant="outline"
            size="md"
            rightIcon={<ArrowUpRight size={16} />}
            className="border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.04]"
          >
            View Full Portfolio Archive
          </Button>
        </div>
      </div>
    </section>
  );
};
