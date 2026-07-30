import Image from "next/image";
import {
  ShieldCheck,
  RefreshCw,
  Boxes,
  Database,
  Cpu,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const odooHighlights = [
  {
    icon: Boxes,
    title: "Custom Python & OWL Modules",
    desc: "Tailored business logic, interactive Kanban cards, and automated enterprise workflows.",
  },
  {
    icon: RefreshCw,
    title: "Zero-Downtime Migration",
    desc: "Seamless upgrades from legacy Odoo versions to Odoo 17 & 18 with full data integrity.",
  },
  {
    icon: Database,
    title: "Accounting & Multi-Currency",
    desc: "Automated general ledgers, bank reconciliation, tax localization, and custom financial reports.",
  },
  {
    icon: Cpu,
    title: "API & Gateway Integrations",
    desc: "Connect Odoo with Stripe, PayPal, WhatsApp API, FedEx, and custom REST/XML-RPC endpoints.",
  },
];

const supportedVersions = [
  "Odoo 18 (AI Assistant)",
  "Odoo 17 (OWL 2.0)",
  "Odoo 16 (LTS)",
  "Odoo 15 & Legacy",
];

export default function OdooSection() {
  return (
    <section className="w-full bg-slate-950 py-10 sm:py-14 text-white">
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* Main Sleek Card */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-purple-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950/60 p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden">
          
          {/* Subtle Ambient Orbs */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-3xl pointer-events-none" />

          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-8 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-300 backdrop-blur-md mb-3">
                <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />
                <span>Enterprise & Community Editions</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Odoo ERP & CRM Solutions
              </h2>

              <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-2xl">
                End-to-end Odoo development services. We design custom modules, automate accounting & supply chain workflows, and upgrade legacy databases smoothly to Odoo 17 & 18.
              </p>

              {/* Version Badges */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 mr-1">Supported Versions:</span>
                {supportedVersions.map((ver) => (
                  <span
                    key={ver}
                    className="inline-flex items-center gap-1 rounded-md bg-purple-950/80 border border-purple-500/30 px-2.5 py-1 text-[11px] font-semibold text-purple-200"
                  >
                    <CheckCircle2 className="h-3 w-3 text-purple-400 shrink-0" />
                    <span>{ver}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right Logo Box */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-full max-w-[260px] rounded-xl border border-purple-500/30 bg-slate-900/80 p-4 text-center backdrop-blur-md">
                <div className="mx-auto relative h-16 w-36 flex items-center justify-center">
                  <Image
                    src="/Odoo.png"
                    alt="Odoo ERP"
                    width={140}
                    height={50}
                    className="max-h-14 w-auto object-contain"
                    priority
                  />
                </div>
                <div className="mt-2 pt-2 border-t border-purple-500/20 flex items-center justify-center gap-1 text-[11px] font-bold text-purple-300">
                  <span>Full Suite Customization</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-purple-400" />
                </div>
              </div>
            </div>

          </div>

          {/* 4 Compact Capability Cards */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {odooHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-200 hover:border-purple-500/50 hover:bg-slate-900"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400 mb-2.5">
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
