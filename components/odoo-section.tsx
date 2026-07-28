import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  RefreshCw,
  Boxes,
  Database,
  Cpu,
  CheckCircle2,
} from "lucide-react";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

interface OdooVersion {
  version: string;
  badge: string;
  badgeColor: string;
  headline: string;
  description: string;
  features: string[];
}

const odooVersions: OdooVersion[] = [
  {
    version: "Odoo 18",
    badge: "Latest Release",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
    headline: "AI & Smart Automation",
    description:
      "Next-generation UI overhaul, embedded AI assistant, enhanced WhatsApp integration, and optimized POS engine.",
    features: ["Embedded AI Workflows", "New Web Client UX", "Advanced Automation Rules"],
  },
  {
    version: "Odoo 17",
    badge: "Stable & Enterprise",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    headline: "Lightning-Fast Performance",
    description:
      "Modernized search view, interactive draggable components, enhanced inventory, and streamlined accounting UI.",
    features: ["OWL 2.0 Framework", "Interactive Kanban Cards", "Fast Stock Operations"],
  },
  {
    version: "Odoo 16",
    badge: "LTS Supported",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    headline: "High Performance & Stability",
    description:
      "Refactored backend architecture, built-in spreadsheet editor, dark mode, and improved email marketing.",
    features: ["Built-in Spreadsheet", "Dark Mode UI", "Optimized DB Queries"],
  },
  {
    version: "Odoo 15 & Legacy",
    badge: "Upgrade Ready",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
    headline: "Seamless Migration Path",
    description:
      "Full maintenance, security patching, and end-to-end data upgrade path to Odoo 17/18 without downtime.",
    features: ["Zero-Data-Loss Migration", "Legacy Code Porting", "Custom Module Refactoring"],
  },
];

interface OdooService {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const odooServices: OdooService[] = [
  {
    icon: Boxes,
    title: "Custom Module Development",
    description:
      "Tailor-made Python & OWL modules developed to fit your specific business rules and operational workflows.",
  },
  {
    icon: RefreshCw,
    title: "Version Upgrade & Migration",
    description:
      "Seamless migration of custom modules, database scripts, and historical records to the latest Odoo release.",
  },
  {
    icon: Database,
    title: "ERP & Financial Accounting",
    description:
      "Automated bank reconciliation, multi-currency invoicing, tax localization, and custom financial reports.",
  },
  {
    icon: Cpu,
    title: "API & Third-Party Integration",
    description:
      "Connect Odoo with Stripe, PayPal, WhatsApp API, FedEx, Salesforce, and custom REST/XML-RPC endpoints.",
  },
];

export default function OdooSection() {
  return (
    <section className={`w-full bg-gradient-to-b from-slate-50 via-purple-50/30 to-white py-14 sm:py-20 md:py-24 ${font.className}`}>
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Brand Feature Card */}
        <div className="rounded-2xl sm:rounded-3xl border border-purple-200/80 bg-white p-6 sm:p-10 md:p-12 shadow-sm relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-100/60 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-100/40 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Odoo ERP & CRM Solutions
              </h2>

              <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
                Streamline operations with customized Odoo implementations. From core accounting and inventory to advanced custom Python modules, we deliver robust solutions across all major Odoo versions.
              </p>

              {/* Badges / Quick Highlights */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                  <ShieldCheck className="h-4 w-4 text-purple-600" />
                  Community Edition
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                  <Zap className="h-4 w-4 text-purple-600" />
                  Enterprise Edition
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                  <Layers className="h-4 w-4 text-purple-600" />
                  Odoo.sh & On-Premise
                </span>
              </div>
            </div>

            {/* Right Logo Showcase */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group w-full max-w-[340px] sm:max-w-[380px] rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50/80 to-white p-6 sm:p-8 text-center shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="mx-auto relative h-20 sm:h-24 w-48 sm:w-56 flex items-center justify-center">
                  <Image
                    src="/Odoo.png"
                    alt="Odoo Logo"
                    width={220}
                    height={90}
                    className="max-h-20 sm:max-h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-purple-100/80 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-purple-900">
                  <span>Official Version Support</span>
                  <ArrowUpRight className="h-4 w-4 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Odoo Versions Supported Section */}
        <div className="mt-12 sm:mt-16">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900">
              Supported Odoo Versions
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
              Whether you are launching on the newest release or upgrading legacy systems, we support the full Odoo ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {odooVersions.map((item) => (
              <div
                key={item.version}
                className="flex flex-col justify-between rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs transition-all duration-200 hover:border-purple-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                      {item.version}
                    </h4>
                    <span
                      className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-purple-800 mb-1">
                    {item.headline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col gap-1.5">
                  {item.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-slate-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Odoo Services Grid */}
        <div className="mt-12 sm:mt-16 rounded-2xl bg-slate-900 text-white p-6 sm:p-10 md:p-12">
          <div className="max-w-2xl text-left mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
              Our Odoo Capabilities
            </h3>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-400">
              End-to-end development services to customize, integrate, and optimize your ERP software.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {odooServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="rounded-xl border border-slate-800 bg-slate-800/50 p-5 transition-all duration-200 hover:border-purple-500/50 hover:bg-slate-800"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600/20 text-purple-400 mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white mb-2">
                    {service.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {service.description}
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
