"use client";

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
  Layers,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Container,
  SectionHeader,
  Highlight,
  TopHairline,
  reveal,
  revealCard,
  SECTION_Y,
} from "@/components/ui/section";
import AmbientBackground from "@/components/ui/ambient-background";

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
  // First three = flagship AI capabilities (featured); the rest = supporting capabilities
  const [lead, ...featuredRest] = expertiseItems.slice(0, 3);
  const supporting = expertiseItems.slice(3);
  const LeadIcon = lead.icon;

  return (
    <section
      id="services"
      className={cn(
        "relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#0B1739_0%,#071028_55%,#050d24_100%)] text-white",
        SECTION_Y
      )}
    >
      <TopHairline />
      <AmbientBackground variant="dark" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-[#050d24]" />

      <Container>
        {/* Header: title left, intro line right */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <SectionHeader
            align="left"
            eyebrow="What We Do"
            eyebrowIcon={Layers}
            title={
              <>
                Deep Technical Expertise, <Highlight>Supporting Modern Systems</Highlight>
              </>
            }
          />
          <motion.p {...reveal(2)} className="max-w-md text-base leading-7 text-slate-400 lg:pb-2">
            {expertiseItems.length} capabilities, one engineering team — from intelligent systems to the cloud,
            data and security foundations they run on.
          </motion.p>
        </div>

        {/* ───── Featured bento ───── */}
        <div className="mt-14 grid gap-5 sm:mt-16 lg:grid-cols-12 lg:grid-rows-2">
          {/* Lead capability */}
          <motion.article
            {...revealCard(0)}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-sky-400/20 bg-[linear-gradient(160deg,rgba(22,115,184,0.22)_0%,rgba(8,18,48,0.9)_55%)] p-7 transition-colors duration-300 hover:border-sky-400/45 sm:p-9 lg:col-span-7 lg:row-span-2"
          >
            {/* Decorative concentric rings */}
            <div aria-hidden className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80">
              {[320, 240, 160].map((d) => (
                <span
                  key={d}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/10 transition-colors duration-500 group-hover:border-sky-300/20"
                  style={{ width: d, height: d }}
                />
              ))}
            </div>

            <div className="relative flex items-start justify-between">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-400/35 bg-sky-400/15 text-sky-200">
                <LeadIcon className="h-7 w-7" />
              </span>
              <span className="font-mono text-xs text-sky-300/70">01 / Core</span>
            </div>

            <div className="relative mt-16 lg:mt-0">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-[2rem]">{lead.title}</h3>
              <p className="mt-4 max-w-lg text-base leading-7 text-slate-300">{lead.description}</p>
            </div>
          </motion.article>

          {/* Two more featured */}
          {featuredRest.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.id}
                {...revealCard(i + 1)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-sky-400/35 hover:bg-white/[0.05] sm:p-7 lg:col-span-5"
              >
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/10 text-sky-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-white">{item.title}</h3>
                  <span className="ml-auto font-mono text-xs text-slate-500">0{i + 2}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-[15px]">{item.description}</p>
              </motion.article>
            );
          })}
        </div>

        {/* ───── Supporting capabilities: divider list, not cards ───── */}
        <div className="mt-14 grid gap-x-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {supporting.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.id}
                {...revealCard(i % 3)}
                className="group border-t border-white/10 py-7 transition-colors duration-300 hover:border-sky-400/50"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-sky-400 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <h3 className="text-lg font-semibold tracking-tight text-white">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
