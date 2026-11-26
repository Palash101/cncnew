"use client";

import { Layers } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Accent,
  Container,
  Eyebrow,
  SECTION_Y,
  headingClass,
  monoLabel,
  reveal,
  revealHeading,
} from "@/components/ui/section";
import { AgenticBackground, CircuitBackground, GenerativeBackground } from "@/components/expertise-art";

interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
}

const expertiseItems: ExpertiseItem[] = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    description:
      "AI only creates value when it fits into how an organization actually works. We help enterprises apply intelligence in ways that improve decisions, reduce manual effort, and support operations at scale.",
  },
  {
    id: "gen-ai",
    title: "Generative AI",
    description:
      "Gen AI is most useful when it becomes part of everyday work. We integrate it into internal knowledge systems, customer interactions, and operational tools, with the controls and governance enterprises expect.",
  },
  {
    id: "agentic-ai",
    title: "Agentic AI",
    description:
      "We work with organizations exploring autonomous systems, helping them introduce AI agents that can take action across processes while remaining transparent, supervised, and accountable.",
  },
  {
    id: "ml",
    title: "Machine Learning",
    description:
      "ML in enterprise environments is less about experimentation and more about reliability. We develop models that adapt over time and continue to perform as data, demand, and conditions change.",
  },
  {
    id: "cv",
    title: "Computer Vision",
    description:
      "In environments where speed and accuracy matter, vision-based systems can remove friction. We apply computer vision to automate inspection, monitoring, and visual analysis across real operational settings.",
  },
  {
    id: "cloud",
    title: "Cloud",
    description:
      "Cloud modernization is not a lift-and-shift exercise. We help enterprises rethink how applications and infrastructure are structured so systems remain secure, resilient, and ready to scale over time.",
  },
  {
    id: "data-science",
    title: "Data Science and Analytics",
    description:
      "Data only becomes useful when teams can rely on it. We design data foundations that support analytics and insight across functions, without adding complexity or dependency.",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description:
      "Security is treated as a design constraint, not a checklist item. Our systems account for governance, compliance, and risk from the earliest architectural decisions.",
  },
  {
    id: "iot",
    title: "IoT",
    description:
      "Connected devices generate value only when their data is usable. We help organizations bring physical systems into their digital landscape, improving visibility and control across operations.",
  },
];

// Background drawings for 02 and 03, in order
const FEATURED_BACKGROUNDS = [GenerativeBackground, AgenticBackground];

const number = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Technical expertise, on white.
 * The heading stays pinned in a narrow left column while the capabilities scroll past on
 * the right: the three AI practices share one charcoal panel (Artificial Intelligence
 * leads, with the circuit drawing), and the six foundations follow as a ruled index.
 */
export default function ExpertiseSection() {
  const [lead, ...featuredRest] = expertiseItems.slice(0, 3);
  const supporting = expertiseItems.slice(3);

  return (
    <section id="services" data-header="light" className={cn("relative w-full bg-white text-c-ink", SECTION_Y)}>
      <MotionConfig reducedMotion="user">
      <Container>
        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12">
          {/* Heading column */}
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <motion.div {...reveal(0)}>
              <Eyebrow icon={Layers} tone="light">
                What We Do
              </Eyebrow>
            </motion.div>
            <motion.h2 {...revealHeading(1)} className={cn(headingClass("light"), "mt-6 lg:text-[2.75rem]")}>
              Deep Technical Expertise, <Accent tone="light">Supporting Modern Systems</Accent>
            </motion.h2>
            <motion.p {...reveal(2)} className="mt-6 max-w-md text-base leading-7 text-c-ink/70">
              {expertiseItems.length} capabilities, one engineering team — from intelligent systems to the cloud,
              data and security foundations they run on.
            </motion.p>
          </div>

          <div className="lg:col-span-8">
            {/* ───── The AI practice ───── */}
            <motion.div {...reveal(1)} className="overflow-hidden rounded-2xl bg-c-ink text-white">
              <article className="group relative flex min-h-[25rem] flex-col justify-between p-7 sm:min-h-[27rem] sm:p-10">
                {/* Drawing: takes no space, and is masked out where the text is */}
                <CircuitBackground className="pointer-events-none absolute inset-0 h-full w-full opacity-80 [mask-image:linear-gradient(to_bottom,black_30%,transparent_56%),linear-gradient(to_left,black_0%,transparent_6%)] lg:[mask-image:linear-gradient(to_bottom,black_34%,transparent_58%),linear-gradient(to_left,black_3%,transparent_12%)]" />

                <p className={cn(monoLabel, "relative text-c-highlight-200")}>{number(0)} / Core</p>
                <div className="relative mt-48 sm:mt-0">
                  <h3 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.03em] sm:text-4xl">{lead.title}</h3>
                  <p className="mt-4 max-w-lg text-base leading-7 text-white/75">{lead.description}</p>
                </div>
              </article>

              <div className="grid border-t border-white/10 md:grid-cols-2">
                {featuredRest.map((item, i) => {
                  const Background = FEATURED_BACKGROUNDS[i];
                  return (
                    <article
                      key={item.id}
                      className={cn(
                        "group relative p-7 pb-9 sm:px-10",
                        i > 0 && "border-t border-white/10 md:border-t-0 md:border-l",
                      )}
                    >
                      <Background />
                      <div className="relative flex items-baseline justify-between gap-4">
                        <h3 className="text-xl font-semibold tracking-[-0.02em]">{item.title}</h3>
                        <span className={cn(monoLabel, "text-white/50")}>{number(i + 1)}</span>
                      </div>
                      <p className="relative mt-4 text-[15px] leading-relaxed text-white/70">{item.description}</p>
                    </article>
                  );
                })}
              </div>
            </motion.div>

            {/* ───── Foundations: ruled index ───── */}
            <div className="mt-6 grid gap-x-8 sm:mt-10 sm:grid-cols-2">
              {supporting.map((item, i) => (
                <motion.article
                  key={item.id}
                  {...reveal(i % 2)}
                  className="group border-t border-c-ink/15 py-7 transition-colors duration-300 hover:border-c-brand"
                >
                  <div className="flex items-baseline gap-4">
                    <span className={cn(monoLabel, "w-5 shrink-0 text-c-ink/45 transition-colors duration-300 group-hover:text-c-brand")}>
                      {number(i + 3)}
                    </span>
                    <h3 className="text-xl font-semibold tracking-[-0.02em]">{item.title}</h3>
                  </div>
                  <p className="mt-3 pl-9 text-[15px] leading-relaxed text-c-ink/70">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </Container>
      </MotionConfig>
    </section>
  );
}
