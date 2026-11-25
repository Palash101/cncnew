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

export default function IndustriesSection() {
  return (
    <section
      id="industries"
      className={cn(
        // Continues the dark block from "What We Do"
        "relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#050d24_0%,#0B1739_30%,#081230_100%)] text-white",
        SECTION_Y
      )}
    >
      <TopHairline />
      <AmbientBackground variant="dark" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[#050d24] to-transparent" />

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

        {/* Illustrated street: scenes touch, so each row shares one continuous road */}
        <ul className="mt-14 grid grid-cols-2 gap-y-14 sm:mt-16 sm:gap-y-16 lg:grid-cols-5">
          {industries.map((item, i) => (
            <motion.li key={item.id} {...reveal(i % 5)}>
              <a href={`#${item.id}`} className="group flex h-full flex-col rounded-lg outline-offset-4">
                <IndustryScene id={item.id} index={i} />

                <span className="flex flex-1 flex-col pt-6 pr-5 sm:pr-8">
                  <span className="text-base font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-sky-200 sm:text-lg">
                    {item.title}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-sky-300 transition-colors duration-300 group-hover:text-white">
                    Explore More
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                    />
                  </span>
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
