"use client";

import { useState, useEffect } from "react";
import {
  FolderKanban,
  Sparkles,
  Bot,
} from "lucide-react";
// import OdooSection from "@/components/odoo-section";
// import ErpNextSection from "@/components/erpnext-section";
import AiSection from "@/components/ai-section";
import ProjectsShowcase from "@/components/projects-showcase";

type TabOption = "ai" | "projects";

export default function SolutionsTabbedSection() {
  const [activeTab, setActiveTab] = useState<TabOption>("ai");

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#projects" || hash === "#core") {
        setActiveTab("projects");
      } else if (hash === "#ai" || hash === "#work") {
        setActiveTab("ai");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <section id="work" className="w-full bg-slate-950 pt-14 sm:pt-20 text-white">
      {/* Master Section Header & Main Tabs Control */}
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Category Pill Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-4 backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-sky-400" />
          <span>Innovations & Portfolio</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight tracking-normal">
          Explore AI Solutions & Project <span className="tracking-wide">Portfolios</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Switch between our Next-Gen Artificial Intelligence capabilities and full-stack project showcases below.
        </p>

        {/* Tabs Bar: AI Solutions vs Featured Projects */}
        <div className="mt-8 sm:mt-10 flex justify-center pb-6">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/90 p-2 backdrop-blur-xl shadow-xl">
            
            {/* AI Solutions Tab */}
            <button
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-2.5 rounded-xl px-5 sm:px-8 py-3 text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "ai"
                  ? "bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-lg shadow-cyan-600/30 scale-102"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/80"
              }`}
            >
              <Bot className="h-5 w-5" />
              <span>AI Solutions</span>
            </button>

            {/* Featured Projects Tab */}
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2.5 rounded-xl px-5 sm:px-8 py-3 text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "projects"
                  ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg shadow-sky-600/30 scale-102"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/80"
              }`}
            >
              <FolderKanban className="h-5 w-5" />
              <span>Featured Projects</span>
            </button>

            {/* ERP Section (Commented Out) */}
            {/* 
            <button
              onClick={() => setActiveTab("erp")}
              className="..."
            >
              <Boxes className="h-5 w-5" />
              <span>ERP Solutions</span>
            </button>
            */}

          </div>
        </div>
      </div>

      {/* Render Active Component based on Selected Tab */}
      <div className="w-full transition-all duration-300">
        {activeTab === "ai" && <AiSection />}
        {activeTab === "projects" && <ProjectsShowcase />}
        
        {/* Commented Out ERP Section */}
        {/* {activeTab === "erp" && <OdooSection />} */}
      </div>
    </section>
  );
}
