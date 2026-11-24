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
  IconTile,
  TopHairline,
  cardClass,
  SECTION_Y,
  revealCard,
} from "@/components/ui/section";

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
        "relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#020617_0%,#0B1739_18%,#0B1739_100%)] text-white",
        SECTION_Y
      )}
    >
      <TopHairline />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-40 h-[30rem] w-[30rem] rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-blue-600/15 blur-[120px]" />
      </div>

      <Container>
        <SectionHeader
          eyebrow="Industries"
          eyebrowIcon={Building2}
          title={
            <>
              Our Expertise Lies In Top Industries & <Highlight>Proven Results</Highlight>
            </>
          }
          description="We provide a diverse range of solutions for distinct industries that amplify and boost business performance."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {industries.map((item, i) => (
            <motion.div
              key={item.id}
              {...revealCard(i % 3)}
              className={cn(cardClass("dark"), "flex flex-col justify-between p-6 sm:p-7")}
            >
              <div>
                <IconTile icon={item.icon} tone="dark" />
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white sm:text-xl">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{item.description}</p>
              </div>

              <a
                href={`#${item.id}`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 transition-colors hover:text-sky-200"
              >
                Explore More
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
