"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Monitor, Server, Smartphone, Cloud, Cpu, type LucideIcon } from "lucide-react";
import { techCategories } from "@/components/tech-marks";
import {
  Container,
  Eyebrow,
  Highlight,
  TopHairline,
  descriptionClass,
  headingClass,
  reveal,
  revealHeading,
} from "@/components/ui/section";
import { cn } from "@/lib/utils";

// The stack, top to bottom: what people touch first, what everything runs on last.
// Same pale-to-navy progression as the process section; the last layer meets the footer.
const LAYERS: {
  id: string;
  icon: LucideIcon;
  header: "light" | "dark";
  surface: string;
  tile: string;
  muted: string;
}[] = [
  {
    id: "frontend",
    icon: Monitor,
    header: "light",
    surface: "bg-c-brand-100 text-c-ink",
    tile: "bg-c-brand text-white",
    muted: "text-slate-700",
  },
  {
    id: "mobile",
    icon: Smartphone,
    header: "light",
    surface: "bg-c-brand-200 text-c-ink",
    tile: "bg-c-brand text-white",
    muted: "text-slate-700",
  },
  {
    id: "backend",
    icon: Server,
    header: "dark",
    surface: "bg-c-brand text-white",
    tile: "bg-white text-c-brand",
    muted: "text-white",
  },
  {
    id: "cloud",
    icon: Cloud,
    header: "dark",
    surface: "bg-c-ink text-white",
    tile: "bg-c-highlight text-c-ink",
    muted: "text-slate-300",
  },
];

/**
 * Technology stack: one full-width sheet per group, each in its own colour, with every
 * technology shown as its logo on a white tile. The list itself lives in tech-marks.tsx,
 * shared with the header menu.
 */
export default function TechStack() {
  return (
    <section id="technology" data-blend-footer data-header="light" className="relative isolate w-full overflow-hidden bg-white text-c-ink">
      <TopHairline tone="light" />

      <Container className="pt-20 pb-14 sm:pt-28 sm:pb-16">
        <motion.div {...reveal(0)} className="mb-6">
          <Eyebrow icon={Cpu} tone="light">
            Technology
          </Eyebrow>
        </motion.div>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <motion.h2 {...revealHeading(1)} className={headingClass("light")}>
            Our <Highlight tone="light">Technology Stack</Highlight>
          </motion.h2>
          <motion.p {...reveal(2)} className={cn(descriptionClass("light"), "max-w-xl")}>
            The modern, proven technologies we use to build and run enterprise applications.
          </motion.p>
        </div>
      </Container>

      {/* Each layer is a full-width sheet that overlaps the one above it */}
      {LAYERS.map((layer, i) => {
        const category = techCategories.find((c) => c.id === layer.id);
        if (!category) return null;
        const Icon = layer.icon;
        const last = i === LAYERS.length - 1;
        return (
          <div
            key={layer.id}
            data-header={layer.header}
            className={cn(
              "relative rounded-t-[28px] shadow-[0_-18px_40px_-24px_color-mix(in_srgb,var(--c-ink)_45%,transparent)] sm:rounded-t-[40px]",
              i > 0 && "-mt-8 sm:-mt-10",
              layer.surface,
              last && "isolate",
            )}
          >
            {/* The footer's top glow starts here, so the last sheet and the footer read as one surface.
                Same size and colour as the glow in footer.tsx, placed so the two halves meet at the seam. */}
            {last && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-t-[inherit]"
              >
                <div className="absolute -bottom-64 left-1/2 h-[26rem] w-[56rem] -translate-x-1/2 rounded-full bg-sky-500/15 blur-[120px]" />
              </div>
            )}
            <Container className={cn("pt-9 sm:pt-12", last ? "pb-14 sm:pb-20" : "pb-[4.25rem] sm:pb-[5.5rem]")}>
              <motion.div
                {...reveal(0)}
                className="grid gap-7 lg:grid-cols-[14.5rem_minmax(0,1fr)] lg:items-center lg:gap-12"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={cn("inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", layer.tile)}
                  >
                    <Icon aria-hidden className="h-6 w-6" strokeWidth={1.9} />
                  </span>
                  <div>
                    <h3 className="text-xl leading-tight font-semibold tracking-[-0.02em]">{category.title}</h3>
                    <p className={cn("mt-1 text-sm", layer.muted)}>{category.items.length} technologies</p>
                  </div>
                </div>

                <ul className="grid grid-cols-4 gap-x-2 gap-y-6 md:grid-cols-8 md:gap-x-3">
                  {category.items.map((tech) => (
                    <li key={tech.name} className="flex flex-col items-center gap-2.5">
                      <span className="flex h-15 w-15 items-center justify-center overflow-hidden rounded-2xl bg-white p-3 shadow-[0_8px_20px_-10px_color-mix(in_srgb,var(--c-ink)_50%,transparent)] sm:h-[4.25rem] sm:w-[4.25rem] sm:p-3.5">
                        <Image
                          src={tech.image}
                          alt=""
                          width={48}
                          height={48}
                          className={cn(
                            "h-full w-full object-contain",
                            tech.boxed && "contrast-[1.28]",
                            tech.boxed === true && "scale-125",
                          )}
                        />
                      </span>
                      <span className="text-center text-xs leading-tight font-medium sm:text-[13px]">{tech.name}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Container>
            {/* Same content-width rule the footer uses between its own blocks */}
            {last && (
              <Container>
                <div aria-hidden className="border-t border-white/10" />
              </Container>
            )}
          </div>
        );
      })}
    </section>
  );
}
