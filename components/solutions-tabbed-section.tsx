"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FolderKanban, Sparkles, Bot } from "lucide-react";
// import OdooSection from "@/components/odoo-section";
// import ErpNextSection from "@/components/erpnext-section";
import AiSection from "@/components/ai-section";
import ProjectsShowcase from "@/components/projects-showcase";
import { cn } from "@/lib/utils";
import { Container, SectionHeader, Highlight, reveal } from "@/components/ui/section";
import AmbientBackground from "@/components/ui/ambient-background";

type TabOption = "ai" | "projects";

const TABS: { id: TabOption; label: string; icon: React.ElementType }[] = [
  { id: "ai", label: "AI Solutions", icon: Bot },
  { id: "projects", label: "Featured Projects", icon: FolderKanban },
];

export default function SolutionsTabbedSection() {
  const [activeTab, setActiveTab] = useState<TabOption>("ai");

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
      className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#eef6fc_0%,#f5f9fd_100%)] py-20 text-[#0B1739] sm:py-28"
    >
      <div id="work" />
      {/* Ambient glows */}
      <AmbientBackground variant="ice" />

      <Container>
        <SectionHeader
          tone="light"
          eyebrow="Innovations & Portfolio"
          eyebrowIcon={Sparkles}
          title={
            <>
              Explore AI Solutions & <Highlight tone="light">Project Portfolios</Highlight>
            </>
          }
          description="Switch between our Next-Gen Artificial Intelligence capabilities and full-stack project showcases below."
        />

        {/* Tabs */}
        <motion.div {...reveal(3)} className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Solutions"
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1.5 shadow-[0_10px_30px_-18px_rgba(11,23,57,0.35)]"
          >
            {TABS.map((tab) => {
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
                    "relative inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 sm:px-7",
                    isActive ? "text-white" : "text-slate-500 hover:text-[#0B1739]"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="solutions-tab"
                      className="absolute inset-0 rounded-full bg-[#0B1739] shadow-[0_8px_20px_-8px_rgba(11,23,57,0.6)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Icon className="relative h-4 w-4" />
                  <span className="relative">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </Container>

      {/* Active panel */}
      <div className="mt-14 w-full sm:mt-16">
        {activeTab === "ai" && <AiSection />}
        {activeTab === "projects" && <ProjectsShowcase />}
        {/* {activeTab === "erp" && <OdooSection />} */}
      </div>
    </section>
  );
}
