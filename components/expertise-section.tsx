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
  IconTile,
  TopHairline,
  cardClass,
  reveal,
  SECTION_Y,
} from "@/components/ui/section";

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
    <section id="services" className={cn("relative isolate w-full overflow-hidden bg-[#020617] text-white", SECTION_Y)}>
      <TopHairline />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[24rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
      </div>

      <Container>
        <SectionHeader
          eyebrow="What We Do"
          eyebrowIcon={Layers}
          title={
            <>
              Deep Technical Expertise, <Highlight>Supporting Modern Systems</Highlight>
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {expertiseItems.map((item, i) => (
            <motion.div
              key={item.id}
              {...reveal(i % 3)}
              className={cn(cardClass("dark"), "flex flex-col p-6 sm:p-7")}
            >
              <IconTile icon={item.icon} tone="dark" />
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-white sm:text-xl">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
