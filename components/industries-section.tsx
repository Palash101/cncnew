"use client";

import { ArrowUpRight, Building2 } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Container,
  SectionHeader,
  Highlight,
  TopHairline,
  reveal,
  SECTION_Y,
} from "@/components/ui/section";
import AmbientBackground from "@/components/ui/ambient-background";
import IndustryScene from "@/components/industry-art";

interface IndustryItem {
  id: string;
  title: string;
  description: string;
}

const industries: IndustryItem[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    description:
      "Secure, compliant digital solutions that help healthcare providers and facilities deliver a better patient experience.",
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    description:
      "Scalable e-commerce platforms that give shoppers a smoother experience and help your customer base grow.",
  },
  {
    id: "finance",
    title: "Finance",
    description:
      "Fintech solutions that support data-driven decisions, improve operational efficiency and build trust with your customers.",
  },
  {
    id: "ev",
    title: "Electric Vehicles (EV)",
    description:
      "Smart battery management systems, fleet telemetry analytics and IoT charging station networks for the EV ecosystem.",
  },
  {
    id: "edtech",
    title: "Ed-Tech",
    description:
      "Learning platforms that make education accessible and keep students engaged from start to finish.",
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description:
      "Automation solutions that streamline plant operations and help facilities run more efficiently.",
  },
  {
    id: "retail",
    title: "Retail",
    description:
      "Tools that help retail businesses engage their customers, streamline operations and grow faster.",
  },
  {
    id: "government-saas",
    title: "Government & SaaS",
    description:
      "Automation solutions that make operations faster and more efficient for SaaS businesses and government agencies.",
  },
  {
    id: "realestate",
    title: "Real Estate",
    description:
      "Digital solutions for real estate businesses, covering property management, transactions and the day-to-day work around them.",
  },
  {
    id: "logistics",
    title: "Logistics",
    description:
      "Supply chain solutions that improve visibility, efficiency and access control across modern logistics networks.",
  },
];

// Two card colours, alternating: dark with light text, light with dark text
const TONES = {
  dark: {
    card: "border border-sky-400/30 bg-c-deep-800 text-white",
    picture: "bg-c-deep-700",
    description: "text-slate-200",
    link: "text-c-highlight",
    art: undefined,
  },
  light: {
    card: "border border-transparent bg-white text-c-ink",
    picture: "bg-c-brand-100",
    description: "text-slate-700",
    link: "text-c-brand",
    // Recolours the illustration for a light background
    art: {
      "--art-line": "var(--c-brand)",
      "--art-detail": "var(--c-ink)",
      "--art-wall": "var(--c-wash-100)",
      "--art-wall-2": "#ffffff",
      "--art-glass": "var(--c-brand-200)",
      "--art-screen": "#ffffff",
      "--art-lit": "var(--c-brand-300)",
    } as React.CSSProperties,
  },
};

/**
 * Wide cards put the picture beside the text.
 * Tablet: rows of 2 and 1. Desktop: rows of 3 and 2. Both keep the two colours alternating.
 */
function layout(i: number) {
  const tabletWide = i % 3 === 2 || i === industries.length - 1;
  const desktopWide = i % 5 >= 3;
  return {
    cell: cn(tabletWide && "sm:col-span-2", desktopWide ? "lg:col-span-3" : "lg:col-span-2"),
    card: cn(tabletWide && "sm:flex-row", desktopWide ? "lg:flex-row" : "lg:flex-col"),
    picture: cn(tabletWide && "sm:w-1/2 sm:shrink-0", desktopWide ? "lg:w-1/2 lg:shrink-0" : "lg:w-full"),
    text: cn(tabletWide && "sm:justify-center sm:p-8", "lg:p-6"),
    scene: desktopWide ? "lg:aspect-[152/130]" : undefined,
  };
}

export default function IndustriesSection() {
  return (
    <section
      id="industries"
      data-header="dark"
      className={cn(
        // Continues the dark block from "What We Do"
        "relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,var(--c-night)_0%,var(--c-ink)_30%,var(--c-panel)_100%)] text-white",
        SECTION_Y
      )}
    >
      <TopHairline />
      <AmbientBackground variant="dark" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-c-night to-transparent" />

      <MotionConfig reducedMotion="user">
      <Container>
        {/* Split header */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <SectionHeader
            align="left"
            eyebrow="Industries"
            eyebrowIcon={Building2}
            title={
              <>
                Our Expertise Lies In Top Industries & <Highlight>Proven Results</Highlight>
              </>
            }
          />
          <motion.p {...reveal(2)} className="max-w-md text-base leading-7 text-slate-300 lg:pb-2">
            We build software for the industries where reliability counts, from healthcare and finance to
            manufacturing, retail and logistics. Each solution is shaped around how the sector actually works, so it
            improves daily operations and delivers results you can measure.
          </motion.p>
        </div>

        <ul className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {industries.map((item, i) => {
            const tone = i % 2 === 0 ? TONES.dark : TONES.light;
            const shape = layout(i);
            return (
              <motion.li key={item.id} {...reveal(i % 3)} className={shape.cell}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-2xl outline-offset-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-white motion-safe:hover:-translate-y-1",
                    shape.card,
                    tone.card
                  )}
                >
                  <span style={tone.art} className={cn("flex items-end", shape.picture, tone.picture)}>
                    <IndustryScene id={item.id} index={i} className={shape.scene} />
                  </span>

                  <span className={cn("flex flex-1 flex-col p-6", shape.text)}>
                    <span className="text-xl leading-tight font-semibold tracking-[-0.02em]">{item.title}</span>
                    <span className={cn("mt-2.5 text-[15px] leading-relaxed", tone.description)}>{item.description}</span>
                    <span className={cn("mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold", tone.link)}>
                      Explore More
                      <ArrowUpRight
                        aria-hidden
                        className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                      />
                    </span>
                  </span>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </Container>
      </MotionConfig>
    </section>
  );
}
