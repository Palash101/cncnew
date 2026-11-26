"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ArrowRight, ArrowUpRight, Sparkles, Layers, Globe, Smartphone, Cpu, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, EASE, reveal, showcaseCard } from "@/components/ui/section";
import { useQuoteModal } from "@/context/quote-modal-context";

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

export const projectsData: Project[] = [
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
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop",
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
] as const;

type CategoryId = (typeof categories)[number]["id"];

/** Shared enter / exit for cards when the filter changes */
const cardMotion = {
  layout: true,
  initial: { opacity: 0, y: 24, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
} as const;

function TechList({ items, dark }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((tech) => (
        <li
          key={tech}
          className={cn(
            "rounded-md border px-2 py-0.5 text-[11px] font-medium",
            dark ? "border-white/15 bg-white/5 text-slate-200" : "border-slate-200 bg-slate-50 text-slate-600"
          )}
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

/** The link covers the whole card (after:inset-0), so the full card is clickable */
function ProjectLink({ project, dark }: { project: Project; dark?: boolean }) {
  return (
    <a
      href={project.demoUrl || "#"}
      className={cn(
        "inline-flex items-center gap-1 text-sm font-semibold transition-colors after:absolute after:inset-0",
        dark ? "text-c-highlight hover:text-white" : "text-c-brand hover:text-c-ink"
      )}
    >
      View Project
      <span className="sr-only">: {project.title}</span>
      <ArrowUpRight
        aria-hidden
        className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
      />
    </a>
  );
}

/** First project of the current filter: wide, dark, picture beside the text */
function SpotlightCard({ project }: { project: Project }) {
  return (
    <motion.article
      {...cardMotion}
      transition={{ duration: 0.6, ease: EASE }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-sky-400/25 bg-c-deep-800 text-white md:col-span-2 md:flex-row lg:col-span-3"
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden md:aspect-auto md:w-1/2 lg:w-7/12">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
        />
        <span className="absolute top-4 left-4 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-c-ink uppercase shadow-sm">
          {project.categoryLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8 lg:p-10">
        <span className="font-mono text-xs text-sky-300/80">01 / Spotlight</span>
        <h4 className="mt-3 text-2xl leading-tight font-semibold tracking-[-0.03em] sm:text-[1.75rem]">{project.title}</h4>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{project.description}</p>

        {project.metrics && (
          <p className="mt-6 flex items-center gap-3 rounded-xl border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm font-semibold text-sky-100">
            <TrendingUp aria-hidden className="h-5 w-5 shrink-0 text-c-highlight" />
            {project.metrics}
          </p>
        )}

        <div className="mt-6">
          <TechList items={project.techStack} dark />
        </div>
        <div className="mt-auto pt-7">
          <ProjectLink project={project} dark />
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      {...cardMotion}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
      className={cn(showcaseCard, "relative")}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] motion-reduce:transition-none"
        />
        <span className="absolute top-3.5 left-3.5 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-c-ink uppercase shadow-sm">
          {project.categoryLabel}
        </span>
        {project.metrics && (
          <span className="absolute inset-x-3.5 bottom-3.5 flex items-center gap-1.5 rounded-lg bg-c-ink/85 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm">
            <TrendingUp aria-hidden className="h-3.5 w-3.5 shrink-0 text-c-highlight" />
            {project.metrics}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h4 className="text-lg leading-snug font-semibold tracking-tight text-c-ink">{project.title}</h4>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{project.description}</p>
        <div className="mt-5 mb-5">
          <TechList items={project.techStack} />
        </div>
        <div className="mt-auto border-t border-slate-200/80 pt-4">
          <ProjectLink project={project} />
        </div>
      </div>
    </motion.article>
  );
}

// Spans that let the closing card fill whatever is left of the last row
const CTA_SPAN_MD = ["md:col-span-2", "md:col-span-1"];
const CTA_SPAN_LG = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-1"];

/** Closes the grid: fills the empty slots of the last row with a call to action */
function ProjectCta({ after }: { after: number }) {
  const { openQuoteModal } = useQuoteModal();
  return (
    <motion.div
      {...cardMotion}
      transition={{ duration: 0.6, ease: EASE }}
      className={cn(
        "relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-sky-300 bg-[linear-gradient(160deg,var(--c-brand-100),var(--c-wash-25))] p-6 sm:p-8",
        CTA_SPAN_MD[after % 2],
        CTA_SPAN_LG[after % 3]
      )}
    >
      <span className="font-mono text-xs text-c-brand">Next / Yours</span>
      <div>
        <h4 className="text-2xl leading-tight font-semibold tracking-[-0.03em] text-c-ink">
          Have a project in mind?
        </h4>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          Share your requirements and our lead technical architects will get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => openQuoteModal()}
          className="mt-6 inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-c-ink px-5 text-sm font-semibold text-white hover:bg-c-ink-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c-brand"
        >
          Start a project
          <ArrowRight aria-hidden className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

export default function ProjectsShowcase() {
  const [activeTab, setActiveTab] = useState<CategoryId>("all");

  const filteredProjects =
    activeTab === "all" ? projectsData : projectsData.filter((p) => p.category === activeTab);
  const [spotlight, ...rest] = filteredProjects;

  return (
    <div className="w-full text-c-ink">
      <Container>
        {/* Category filter: one scrollable row on phones */}
        <motion.div
          {...reveal(0)}
          role="group"
          aria-label="Filter projects by category"
          className="-mx-6 mb-8 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {categories.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const count =
              tab.id === "all" ? projectsData.length : projectsData.filter((p) => p.category === tab.id).length;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c-brand sm:text-sm",
                  isActive
                    ? "border-c-ink bg-c-ink text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-c-ink"
                )}
              >
                <Icon aria-hidden className="h-3.5 w-3.5" />
                {tab.label}
                <span className={cn("font-mono text-[11px]", isActive ? "text-sky-300" : "text-slate-400")}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        <MotionConfig reducedMotion="user">
          <motion.div {...reveal(1)} className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {spotlight && <SpotlightCard key={spotlight.id} project={spotlight} />}
              {rest.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
              <ProjectCta key="cta" after={rest.length} />
            </AnimatePresence>
          </motion.div>
        </MotionConfig>
      </Container>
    </div>
  );
}

