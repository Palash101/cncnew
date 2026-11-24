"use client";

import {
  HeartPulse,
  ShoppingCart,
  Landmark,
  GraduationCap,
  Factory,
  Store,
  Building2,
  Home,
  Truck,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Container,
  SectionHeader,
  Highlight,
  TopHairline,
  reveal,
  revealBlock,
  SECTION_Y,
} from "@/components/ui/section";
import AmbientBackground from "@/components/ui/ambient-background";

interface IndustryItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const industries: IndustryItem[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    description:
      "It empowers healthcare providers and facilities with secure and compliant digital solutions elevating patient experience.",
    icon: HeartPulse,
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    description:
      "Crafting scalable ecommerce platforms that improves customer experiences effectively driving customer growth.",
    icon: ShoppingCart,
  },
  {
    id: "finance",
    title: "Finance",
    description:
      "Providing innovative opportunities for data-driven decisions in Fintech industries elevating operational efficiency and trust.",
    icon: Landmark,
  },
  {
    id: "ev",
    title: "Electric Vehicles (EV)",
    description:
      "Building smart battery management systems, fleet telemetry analytics, and IoT charging station networks for the EV ecosystem.",
    icon: Zap,
  },
  {
    id: "edtech",
    title: "Ed-Tech",
    description:
      "Crafting unique learning platforms that allow accessible and engaging educational experiences.",
    icon: GraduationCap,
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description:
      "Enabling facilities to automate operations and create a streamlined approach to efficiency.",
    icon: Factory,
  },
  {
    id: "retail",
    title: "Retail",
    description:
      "Helping retail businesses advance customer engagement, streamline operations and accelerate growth.",
    icon: Store,
  },
  {
    id: "government-saas",
    title: "Government & SaaS",
    description:
      "Enhancing faster & efficient operations through automation solutions for SaaS businesses and government agencies.",
    icon: Building2,
  },
  {
    id: "realestate",
    title: "Real Estate",
    description:
      "Driving business growth with digital transformation solutions for real estate businesses with property management, transactions, and others.",
    icon: Home,
  },
  {
    id: "logistics",
    title: "Logistics",
    description:
      "It enhances visibility and efficiency while managing access control across modern supply chain ecosystems.",
    icon: Truck,
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

        {/* Directory panel */}
        <motion.div
          {...revealBlock(1)}
          className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-[#06102b]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_30px_70px_-40px_rgba(14,165,233,0.45)] sm:mt-16"
        >
          <ul className="grid md:grid-cols-2">
            {industries.map((item, i) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.id}
                  className={cn(
                    "border-white/10",
                    i > 0 && "border-t",
                    i === 1 && "md:border-t-0",
                    i % 2 === 1 && "md:border-l"
                  )}
                >
                  <a
                    href={`#${item.id}`}
                    aria-label={`Explore ${item.title}`}
                    className="group relative flex h-full gap-5 p-6 transition-colors duration-300 hover:bg-white/[0.04] sm:p-7"
                  >
                    {/* Left accent bar */}
                    <span
                      aria-hidden
                      className="absolute inset-y-6 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-sky-400 transition-transform duration-300 group-hover:scale-y-100"
                    />

                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-sky-300 transition-colors duration-300 group-hover:border-sky-400/40 group-hover:bg-sky-400/10">
                      <Icon className="h-5 w-5" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-lg font-semibold tracking-tight text-white">{item.title}</span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-300" />
                      </span>
                      <span className="mt-2 block text-sm leading-relaxed text-slate-400">{item.description}</span>
                      <span className="mt-3 inline-block text-xs font-semibold tracking-wide text-sky-300/80 uppercase transition-colors group-hover:text-sky-200">
                        Explore More
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
