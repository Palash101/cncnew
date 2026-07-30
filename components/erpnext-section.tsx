"use client";

import {
  ShieldCheck,
  RefreshCw,
  Boxes,
  Database,
  Workflow,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const erpNextHighlights = [
  {
    icon: Boxes,
    title: "Custom Frappe Doctypes",
    desc: "Tailored business logic, Python controllers, and custom desk forms.",
  },
  {
    icon: RefreshCw,
    title: "Zero-Data-Loss Migration",
    desc: "Seamless upgrades from legacy ERPNext v12/13 to ERPNext v15.",
  },
  {
    icon: Database,
    title: "Accounting & Frappe HRMS",
    desc: "Automated general ledger, tax localization, payroll processing, and rosters.",
  },
  {
    icon: Workflow,
    title: "Webhooks & API Integration",
    desc: "Automated multi-level approval workflows, REST APIs, and external integrations.",
  },
];

const supportedModules = [
  "ERPNext 15 (Frappe UI)",
  "ERPNext 14 (Enterprise)",
  "Frappe HRMS Suite",
  "Custom Frappe Apps",
];

export default function ErpNextSection() {
  return (
    <section className="w-full bg-slate-950 py-10 sm:py-14 text-white">
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* Main Sleek Card */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/60 p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden">
          
          {/* Subtle Ambient Orbs */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-8 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md mb-3">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                <span>Open-Source Frappe Framework</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                ERPNext & Frappe Solutions
              </h2>

              <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-2xl">
                Open-source ERPNext implementations. We craft custom Frappe Doctypes, automate accounting & HRMS payroll workflows, and bridge third-party webhooks & REST endpoints seamlessly.
              </p>

              {/* Version Badges */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 mr-1">Supported Modules:</span>
                {supportedModules.map((ver) => (
                  <span
                    key={ver}
                    className="inline-flex items-center gap-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-1 text-[11px] font-semibold text-cyan-200"
                  >
                    <CheckCircle2 className="h-3 w-3 text-cyan-400 shrink-0" />
                    <span>{ver}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right Feature Showcase Box */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-full max-w-[260px] rounded-xl border border-cyan-500/30 bg-slate-900/80 p-4 text-center backdrop-blur-md">
                <div className="mx-auto flex flex-col items-center justify-center p-3 rounded-lg bg-cyan-950/90 text-white border border-cyan-500/30">
                  <div className="flex items-center gap-2 font-black text-xl tracking-wider text-cyan-300">
                    <Boxes className="h-6 w-6 text-cyan-400" />
                    <span>ERPNext</span>
                  </div>
                  <span className="mt-0.5 text-[9px] font-semibold text-cyan-200 uppercase tracking-widest">
                    Frappe Framework
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-cyan-500/20 flex items-center justify-center gap-1 text-[11px] font-bold text-cyan-300">
                  <span>Full Stack Customization</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-cyan-400" />
                </div>
              </div>
            </div>

          </div>

          {/* 4 Compact Capability Cards */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {erpNextHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-200 hover:border-cyan-500/50 hover:bg-slate-900"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 mb-2.5">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
