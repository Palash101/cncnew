"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles, Layers, Globe, Smartphone, Cpu, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Container,
  Highlight,
  reveal,
  subheadingClass,
  revealHeading,
  revealCard,
  showcaseCard,
} from "@/components/ui/section";

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
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1000&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a67daf40955?q=80&w=1000&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
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
    activeTab === "all" ? projectsData : projectsData.filter((p) => p.category === activeTab);

  return (
    <div className="w-full text-c-ink">
      <Container>
        {/* Sub-header + filters on one line (desktop) */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <motion.h3 {...revealHeading(0)} className={subheadingClass("light")}>
              Our <Highlight tone="light">Featured Projects</Highlight>
            </motion.h3>
            <motion.p {...reveal(1)} className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Discover our portfolio of scalable web applications, mobile platforms, and customized Odoo ERP
              implementations built for global brands.
            </motion.p>
          </div>

          <motion.div {...reveal(2)} className="flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
            {categories.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors duration-200 sm:text-sm",
                    isActive
                      ? "border-c-ink bg-c-ink text-white shadow-[0_8px_20px_-10px_color-mix(in_srgb,var(--c-ink)_60%,transparent)]"
                      : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-c-ink"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Project grid — consistent card dimensions */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, i) => (
            <motion.article
              key={project.id}
              {...revealCard(i % 3)}
              className={showcaseCard}
            >
              {/* Preview */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] motion-reduce:transition-none"
                />
                {/* Soft bottom shade so the image sits cleanly on the white card */}
                <div className="absolute inset-0 bg-gradient-to-t from-c-ink/25 via-transparent to-transparent" />

                <span className="absolute top-3.5 left-3.5 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-c-ink uppercase shadow-sm backdrop-blur-sm">
                  {project.categoryLabel}
                </span>
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                {project.metrics && (
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-c-brand">
                    <CircleCheck className="h-3.5 w-3.5 shrink-0" />
                    {project.metrics}
                  </p>
                )}
                <h4 className="mt-2.5 text-lg leading-snug font-semibold tracking-tight text-c-ink">{project.title}</h4>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{project.description}</p>

                <div className="mt-5 mb-5 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-slate-200/80 pt-4">
                  <span className="text-xs font-medium text-slate-500">Case Study & Code</span>
                  <a
                    href={project.demoUrl || "#"}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-c-brand transition-colors hover:text-c-ink"
                  >
                    View Project
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </div>
  );
}
