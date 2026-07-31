"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import { projectsData, categories } from "@/lib/data/projects";
import SectionHeader from "@/components/shared/section-header";

export default function ProjectsShowcase() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredProjects =
    activeTab === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeTab);

  return (
    <section className="w-full bg-slate-900 py-10 sm:py-14 md:py-16 text-white">
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Featured Portfolio"
          eyebrowIcon={Sparkles}
          title="Our Featured Projects"
          description="Discover our portfolio of scalable web applications, mobile platforms, and customized Odoo ERP implementations built for global brands."
          className="max-w-2xl mb-6 sm:mb-8"
          titleClassName="font-extrabold"
        />

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
          {categories.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-sky-500 text-white shadow-md shadow-sky-500/25 scale-105"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-800/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-800 hover:shadow-xl"
            >
              <div>
                {/* Project Image & Badge Container */}
                <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

                  {/* Category Pill */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="inline-flex items-center rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-2.5 py-0.5 text-[11px] font-semibold text-sky-300">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Metric Badge */}
                  {project.metrics && (
                    <div className="absolute bottom-2 left-2.5 right-2.5 z-10">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-sky-950/80 backdrop-blur-md border border-sky-500/30 px-2 py-0.5 text-[10px] font-semibold text-sky-200">
                        <CheckCircle2 className="h-3 w-3 text-sky-400 shrink-0" />
                        <span className="truncate">{project.metrics}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Info Content */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed line-clamp-2 font-normal">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Footer Tech Stack & Action Button */}
              <div className="px-4 pb-4 pt-2 border-t border-slate-700/50 flex flex-col gap-3">
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block rounded-md bg-slate-900/80 border border-slate-700/60 px-2 py-0.5 text-[10px] font-semibold text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Details / Live Link */}
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-[11px] font-semibold text-slate-400">
                    Case Study & Code
                  </span>
                  <a
                    href={project.demoUrl || "#"}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
