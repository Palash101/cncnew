"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Layers,
  Globe,
  Smartphone,
  Cpu,
  CheckCircle2,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: "web" | "mobile" | "odoo" | "cloud";
  categoryLabel: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  metrics?: string;
  demoUrl?: string;
  featured?: boolean;
}

const projectsData: Project[] = [
  {
    id: "proj-1",
    title: "Enterprise ERP & CRM Suite",
    category: "odoo",
    categoryLabel: "Odoo ERP",
    description:
      "Custom Odoo 18 implementation featuring automated accounting, multi-warehouse inventory tracking, and real-time sales reporting.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    techStack: ["Odoo 18", "Python", "PostgreSQL", "OWL Framework"],
    metrics: "45% Operational Efficiency Boost",
    demoUrl: "#",
    featured: true,
  },
  {
    id: "proj-2",
    title: "Next-Gen Fintech Trading Platform",
    category: "web",
    categoryLabel: "Web Application",
    description:
      "High-frequency web trading dashboard with real-time WebSocket market updates, interactive charts, and secure wallet management.",
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop",
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Node.js"],
    metrics: "1M+ Daily Transactions",
    demoUrl: "#",
    featured: true,
  },
  {
    id: "proj-3",
    title: "Smart Logistics & Fleet Tracker",
    category: "mobile",
    categoryLabel: "Mobile App",
    description:
      "Cross-platform mobile application providing real-time GPS fleet tracking, driver dispatch, and automated proof of delivery.",
    imageUrl:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1000&auto=format&fit=crop",
    techStack: ["Flutter", "Dart", "Firebase", "Google Maps API"],
    metrics: "50k+ Active Mobile Drivers",
    demoUrl: "#",
    featured: true,
  },
  {
    id: "proj-4",
    title: "AI Healthcare Diagnostics Portal",
    category: "cloud",
    categoryLabel: "Cloud & SaaS",
    description:
      "HIPAA-compliant AI diagnostic web platform analyzing patient scans, managing medical records, and scheduling telehealth visits.",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
    techStack: ["React", "Python", "FastAPI", "AWS Cloud"],
    metrics: "99.9% System Uptime",
    demoUrl: "#",
  },
  {
    id: "proj-5",
    title: "Omnichannel E-Commerce Platform",
    category: "web",
    categoryLabel: "Web Application",
    description:
      "Headless e-commerce storefront integrated with inventory management, custom payment gateways, and localized multi-language checkout.",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0a67daf40955?q=80&w=1000&auto=format&fit=crop",
    techStack: ["Next.js", "GraphQL", "Stripe API", "Tailwind CSS"],
    metrics: "3x Checkout Conversion Rate",
    demoUrl: "#",
  },
  {
    id: "proj-6",
    title: "Supply Chain & Order Management",
    category: "odoo",
    categoryLabel: "Odoo ERP",
    description:
      "Tailor-made Odoo module bridging global suppliers with local logistics centers for automated purchase orders and stock alerts.",
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
    techStack: ["Odoo 17", "Python", "XML-RPC", "Docker"],
    metrics: "30k+ Orders Managed Daily",
    demoUrl: "#",
  },
];

const categories = [
  { id: "all", label: "All Projects", icon: Layers },
  { id: "web", label: "Web Apps", icon: Globe },
  { id: "mobile", label: "Mobile Apps", icon: Smartphone },
  { id: "odoo", label: "Odoo ERP", icon: Cpu },
  { id: "cloud", label: "Cloud & SaaS", icon: Sparkles },
];

export default function ProjectsShowcase() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredProjects =
    activeTab === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeTab);

  return (
    <section className="w-full bg-slate-900 py-10 sm:py-14 md:py-16 text-white">
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-sky-400 mb-2.5 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            <span>Featured Portfolio</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Our Featured Projects
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Discover our portfolio of scalable web applications, mobile platforms, and customized Odoo ERP implementations built for global brands.
          </p>
        </div>

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
              className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-800/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/50 hover:bg-slate-800 hover:shadow-xl hover:shadow-sky-500/10"
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
