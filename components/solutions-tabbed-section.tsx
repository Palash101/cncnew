"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { FolderKanban, Sparkles, Bot } from "lucide-react";
import AiSection, { aiCapabilities } from "@/components/ai-section";
import ProjectsShowcase, { projectsData } from "@/components/projects-showcase";
import { cn } from "@/lib/utils";
import { Container, SectionHeader, Highlight, TopHairline, reveal, EASE, SECTION_Y } from "@/components/ui/section";
import AmbientBackground from "@/components/ui/ambient-background";

type TabOption = "ai" | "projects";

const TABS: { id: TabOption; label: string; icon: React.ElementType; count: number; blurb: string }[] = [
  {
    id: "ai",
    label: "AI Solutions",
    icon: Bot,
    count: aiCapabilities.length,
    blurb:
      "Private language models, domain-tuned intelligence and real-time voice agents, built around enterprise data and ready for production.",
  },
  {
    id: "projects",
    label: "Featured Projects",
    icon: FolderKanban,
    count: projectsData.length,
    blurb:
      "Scalable web applications, mobile platforms and customized Odoo ERP implementations built for brands around the world.",
  },
];

export default function SolutionsTabbedSection() {
  const [activeTab, setActiveTab] = useState<TabOption>("ai");
  const active = TABS.find((t) => t.id === activeTab)!;

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#projects" || hash === "#core" || hash === "#work") {
        setActiveTab("projects");
      } else if (hash === "#ai") {
        setActiveTab("ai");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <section
      id="projects"
      data-header="light"
      className={cn(
        "relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,var(--c-wash-50)_0%,var(--c-wash-25)_100%)] text-c-ink",
        SECTION_Y
      )}
    >
      <div id="work" />
      <TopHairline tone="light" />
      <AmbientBackground variant="ice" />

      <MotionConfig reducedMotion="user">
      <Container>
        {/* Split header: title left, tab-specific intro right */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <SectionHeader
            tone="light"
            align="left"
            eyebrow="Innovations & Portfolio"
            eyebrowIcon={Sparkles}
            title={
              <>
                Explore AI Solutions & <Highlight tone="light">Project Portfolios</Highlight>
              </>
            }
          />
          <motion.div {...reveal(2)} className="lg:pb-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="max-w-md text-base leading-7 text-slate-600"
              >
                {active.blurb}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Underline tabs */}
        <motion.div
          {...reveal(3)}
          role="tablist"
          aria-label="Innovations and portfolio"
          className="mt-12 flex gap-6 border-b border-slate-200 sm:mt-14 sm:gap-10"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative -mb-px inline-flex cursor-pointer items-center gap-2 pb-4 text-sm font-semibold whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c-brand sm:text-base",
                  isActive ? "text-c-ink" : "text-slate-500 hover:text-c-ink"
                )}
              >
                <Icon aria-hidden className={cn("h-4 w-4 sm:h-5 sm:w-5", isActive && "text-c-brand")} />
                {tab.label}
                <span
                  className={cn(
                    "rounded-md px-1.5 py-0.5 font-mono text-[11px] leading-none transition-colors",
                    isActive ? "bg-c-ink text-white" : "bg-slate-200/70 text-slate-500"
                  )}
                >
                  {String(tab.count).padStart(2, "0")}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="solutions-tab-underline"
                    className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-c-brand"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>
      </Container>
      </MotionConfig>

      {/* Active panel */}
      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="mt-10 w-full sm:mt-12"
      >
        {activeTab === "ai" && <AiSection />}
        {activeTab === "projects" && <ProjectsShowcase />}
      </div>
    </section>
  );
}
