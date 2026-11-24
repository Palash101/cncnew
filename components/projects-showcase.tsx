"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles, Layers, Globe, Smartphone, Cpu, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, Highlight, cardClass, reveal, subheadingClass } from "@/components/ui/section";

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
    <div className="w-full text-white">
      <Container>
        {/* Sub-header */}
        <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
          <motion.h3 {...reveal(0)} className={subheadingClass("dark")}>
            Our <Highlight>Featured Projects</Highlight>
          </motion.h3>
          <motion.p {...reveal(1)} className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Discover our portfolio of scalable web applications, mobile platforms, and customized Odoo ERP
            implementations built for global brands.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm",
                  isActive
                    ? "border-white bg-white text-[#0B1739] shadow-[0_8px_24px_-8px_rgba(56,189,248,0.6)]"
                    : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:text-white"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={cn(cardClass("dark"), "flex flex-col justify-between overflow-hidden")}
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-[#030a1f]">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030a1f] via-[#030a1f]/20 to-transparent" />

                  <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-[#030a1f]/80 px-2.5 py-0.5 text-[11px] font-semibold text-sky-200 backdrop-blur-md">
                    {project.categoryLabel}
                  </span>

                  {project.metrics && (
                    <span className="absolute bottom-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-lg border border-sky-400/30 bg-[#030a1f]/80 px-2.5 py-1 text-[11px] font-semibold text-sky-100 backdrop-blur-md">
                      <CircleCheck className="h-3.5 w-3.5 shrink-0 text-sky-400" />
                      <span className="truncate">{project.metrics}</span>
                    </span>
                  )}
                </div>

                <div className="p-5 sm:p-6">
                  <h4 className="text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-sky-200">
                    {project.title}
                  </h4>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">{project.description}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-white/10 px-5 pt-4 pb-5 sm:px-6">
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Case Study & Code</span>
                  <a
                    href={project.demoUrl || "#"}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-sky-300 transition-colors hover:text-sky-200"
                  >
                    View Project
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
