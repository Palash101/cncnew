"use client";

import { motion, type Variants } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared section primitives so every section on the site uses the same
 * container width, spacing, eyebrow badge, heading scale and colours.
 *
 * Tone:
 *  - "dark"  → navy / slate-950 sections (white text, sky accents)
 *  - "light" → white / sky-50 sections (navy text, brand-blue accents)
 */
export type Tone = "dark" | "light";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.1 },
  }),
};

/** Standard reveal props for whileInView animations */
export const reveal = (i = 0) => ({
  variants: fadeUp,
  custom: i,
  initial: "hidden" as const,
  whileInView: "show" as const,
  viewport: { once: true, margin: "-80px" },
});

/** Standard vertical rhythm for top-level sections */
export const SECTION_Y = "py-20 sm:py-28";

/** Same content width + gutters as the navbar and hero */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-6 sm:px-8", className)}>{children}</div>;
}

export function Eyebrow({
  icon: Icon,
  children,
  tone = "dark",
  className,
}: {
  icon?: LucideIcon;
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] backdrop-blur-md sm:text-[11px]",
        tone === "dark"
          ? "border-sky-400/30 bg-sky-400/10 text-sky-200"
          : "border-sky-300/60 bg-white/70 text-sky-800 shadow-sm",
        className
      )}
    >
      {Icon ? (
        <Icon className={cn("h-3.5 w-3.5", tone === "dark" ? "text-sky-400" : "text-sky-500")} />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-sky-500 shadow-[0_0_10px_#38bdf8]" />
      )}
      {children}
    </span>
  );
}

/** Gradient-highlighted words inside a heading */
export function Highlight({ children, tone = "dark" }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        tone === "dark"
          ? "bg-gradient-to-r from-sky-300 via-sky-400 to-blue-400"
          : "bg-gradient-to-r from-[#1673b8] via-[#26a9dc] to-[#1673b8]"
      )}
    >
      {children}
    </span>
  );
}

/** Heading scale shared by every section */
export const headingClass = (tone: Tone = "dark") =>
  cn(
    "text-[2rem] leading-[1.1] font-semibold tracking-[-0.035em] sm:text-5xl md:text-[52px]",
    tone === "dark" ? "text-white" : "text-[#0B1739]"
  );

/** Smaller heading for sub-sections inside a section */
export const subheadingClass = (tone: Tone = "dark") =>
  cn(
    "text-2xl leading-tight font-semibold tracking-[-0.03em] sm:text-3xl",
    tone === "dark" ? "text-white" : "text-[#0B1739]"
  );

export const descriptionClass = (tone: Tone = "dark") =>
  cn("text-base leading-7 sm:text-lg sm:leading-8", tone === "dark" ? "text-slate-300" : "text-slate-600");

export function SectionHeader({
  eyebrow,
  eyebrowIcon,
  title,
  description,
  tone = "dark",
  align = "center",
  className,
}: {
  eyebrow?: React.ReactNode;
  eyebrowIcon?: LucideIcon;
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: Tone;
  align?: "center" | "left";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={cn("flex flex-col", centered ? "items-center text-center" : "items-start text-left", className)}>
      {eyebrow && (
        <motion.div {...reveal(0)} className="mb-6">
          <Eyebrow icon={eyebrowIcon} tone={tone}>
            {eyebrow}
          </Eyebrow>
        </motion.div>
      )}
      <motion.h2 {...reveal(1)} className={cn(headingClass(tone), centered ? "max-w-4xl" : "max-w-3xl")}>
        {title}
      </motion.h2>
      {description && (
        <motion.p {...reveal(2)} className={cn("mt-6", descriptionClass(tone), centered ? "max-w-3xl" : "max-w-xl")}>
          {description}
        </motion.p>
      )}
    </div>
  );
}

/** Icon tile used on cards (matches the stats section) */
export function IconTile({
  icon: Icon,
  tone = "dark",
  className,
}: {
  icon: React.ElementType;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300",
        tone === "dark"
          ? "border-sky-400/30 bg-sky-400/10 text-sky-300 group-hover:border-sky-400/60 group-hover:bg-sky-400/20"
          : "border-sky-200 bg-sky-50 text-sky-600 group-hover:border-sky-300 group-hover:bg-sky-100",
        className
      )}
    >
      <Icon className="h-5 w-5" />
    </span>
  );
}

/** Card surface classes */
export const cardClass = (tone: Tone = "dark") =>
  cn(
    "group relative rounded-2xl border transition-all duration-300",
    tone === "dark"
      ? "border-white/10 bg-white/[0.03] hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/[0.06] hover:shadow-[0_24px_60px_-24px_rgba(14,165,233,0.35)]"
      : "border-slate-200/80 bg-white shadow-[0_10px_40px_-18px_rgba(11,23,57,0.18)] hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_22px_50px_-20px_rgba(22,115,184,0.35)]"
  );

/** Thin glowing line along the top edge of dark sections */
export function TopHairline() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/30 to-transparent"
    />
  );
}
