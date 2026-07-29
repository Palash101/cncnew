"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import {
  Cpu,
  Sparkles,
  Bot,
  Network,
  Scan,
  Cloud,
  Search,
  ShieldCheck,
  Radio,
} from "lucide-react";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface ExpertiseItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const expertiseItems: ExpertiseItem[] = [
  {
    id: "ai",
    icon: Cpu,
    title: "Artificial Intelligence",
    description:
      "AI only creates value when it fits into how an organization actually works. We help enterprises apply intelligence in ways that improve decisions, reduce manual effort, and support operations at scale.",
  },
  {
    id: "gen-ai",
    icon: Sparkles,
    title: "Generative AI",
    description:
      "Gen AI is most useful when it becomes part of everyday work. We integrate it into internal knowledge systems, customer interactions, and operational tools, with the controls and governance enterprises expect.",
  },
  {
    id: "agentic-ai",
    icon: Bot,
    title: "Agentic AI",
    description:
      "We work with organizations exploring autonomous systems, helping them introduce AI agents that can take action across processes while remaining transparent, supervised, and accountable.",
  },
  {
    id: "ml",
    icon: Network,
    title: "Machine Learning",
    description:
      "ML in enterprise environments is less about experimentation and more about reliability. We develop models that adapt over time and continue to perform as data, demand, and conditions change.",
  },
  {
    id: "cv",
    icon: Scan,
    title: "Computer Vision",
    description:
      "In environments where speed and accuracy matter, vision-based systems can remove friction. We apply computer vision to automate inspection, monitoring, and visual analysis across real operational settings.",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud",
    description:
      "Cloud modernization is not a lift-and-shift exercise. We help enterprises rethink how applications and infrastructure are structured so systems remain secure, resilient, and ready to scale over time.",
  },
  {
    id: "data-science",
    icon: Search,
    title: "Data Science and Analytics",
    description:
      "Data only becomes useful when teams can rely on it. We design data foundations that support analytics and insight across functions, without adding complexity or dependency.",
  },
  {
    id: "cybersecurity",
    icon: ShieldCheck,
    title: "Cybersecurity",
    description:
      "Security is treated as a design constraint, not a checklist item. Our systems account for governance, compliance, and risk from the earliest architectural decisions.",
  },
  {
    id: "iot",
    icon: Radio,
    title: "IoT",
    description:
      "Connected devices generate value only when their data is usable. We help organizations bring physical systems into their digital landscape, improving visibility and control across operations.",
  },
];

export default function ExpertiseSection() {
  return (
    <section className={`w-full bg-black py-16 sm:py-24 md:py-28 text-white ${font.className}`}>
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight sm:leading-tight">
            Deep Technical Expertise, <br className="hidden sm:inline" />
            Supporting Modern Systems
          </h2>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-12 sm:gap-y-14">
          {expertiseItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex flex-col text-left group">
                {/* Icon with subtle blue accent */}
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:border-sky-400/40 group-hover:bg-sky-500/20 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
