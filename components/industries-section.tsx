"use client";

import { ArrowUpRight, Building2 } from "lucide-react";
import { motion } from "motion/react";
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
      "It empowers healthcare providers and facilities with secure and compliant digital solutions elevating patient experience.",
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    description:
      "Crafting scalable ecommerce platforms that improves customer experiences effectively driving customer growth.",
  },
  {
    id: "finance",
    title: "Finance",
    description:
      "Providing innovative opportunities for data-driven decisions in Fintech industries elevating operational efficiency and trust.",
  },
  {
    id: "ev",
    title: "Electric Vehicles (EV)",
    description:
      "Building smart battery management systems, fleet telemetry analytics, and IoT charging station networks for the EV ecosystem.",
  },
  {
    id: "edtech",
    title: "Ed-Tech",
    description:
      "Crafting unique learning platforms that allow accessible and engaging educational experiences.",
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description:
      "Enabling facilities to automate operations and create a streamlined approach to efficiency.",
  },
  {
    id: "retail",
    title: "Retail",
    description:
      "Helping retail businesses advance customer engagement, streamline operations and accelerate growth.",
  },
  {
    id: "government-saas",
    title: "Government & SaaS",
    description:
      "Enhancing faster & efficient operations through automation solutions for SaaS businesses and government agencies.",
  },
  {
    id: "realestate",
    title: "Real Estate",
    description:
      "Driving business growth with digital transformation solutions for real estate businesses with property management, transactions, and others.",
  },
  {
    id: "logistics",
    title: "Logistics",
    description:
      "It enhances visibility and efficiency while managing access control across modern supply chain ecosystems.",
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
    card: "bg-white text-c-ink",
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
            We provide a diverse range of solutions for distinct industries that amplify and boost business
            performance.
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
                    "group flex h-full flex-col overflow-hidden rounded-2xl outline-offset-4 focus-visible:outline-2 focus-visible:outline-white",
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
    </section>
  );
}
