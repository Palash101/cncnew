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
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE, delay: i * 0.1 },
  }),
};

/** Headings: text rises out of a mask ("wipe-up" reveal) */
export const maskUp: Variants = {
  // Not a full 100% clip: a zero-height box never counts as "in view", so the heading would stay hidden
  hidden: { opacity: 0, y: 36, clipPath: "inset(0% 0% 80% 0%)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    clipPath: "inset(-20% -10% -25% -10%)",
    transition: { duration: 0.95, ease: EASE, delay: i * 0.1 },
  }),
};

/** Cards: rise, un-blur and settle, staggered by index */
export const cardUp: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.96, filter: "blur(6px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE, delay: i * 0.12 },
  }),
};

/** Large blocks (panels, diagrams, CTA boxes): soft zoom-in */
export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.1 },
  }),
};

const inView = { once: true, margin: "-80px" } as const;

/** Standard reveal props for whileInView animations */
export const reveal = (i = 0) => ({
  variants: fadeUp,
  custom: i,
  initial: "hidden" as const,
  whileInView: "show" as const,
  viewport: inView,
});

export const revealHeading = (i = 0) => ({ ...reveal(i), variants: maskUp });
export const revealCard = (i = 0) => ({ ...reveal(i), variants: cardUp, viewport: { once: true, margin: "-40px" } });
export const revealBlock = (i = 0) => ({ ...reveal(i), variants: zoomIn });

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
        "relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] backdrop-blur-md sm:text-[11px]",
        tone === "dark"
          ? "border-sky-400/30 bg-sky-400/10 text-sky-200"
          : "border-sky-300/60 bg-white/70 text-sky-800 shadow-sm",
        className
      )}
    >
      {Icon ? (
        <Icon className={cn("h-3.5 w-3.5", tone === "dark" ? "text-sky-400" : "text-sky-500")} />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-sky-500 shadow-[0_0_10px_var(--c-highlight-mid)]" />
      )}
      {children}
      {/* Light sheen passing over the badge */}
      <span
        aria-hidden
        className={cn(
          "animate-badge-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent to-transparent",
          tone === "dark" ? "via-white/25" : "via-white/80"
        )}
      />
    </span>
  );
}

/** Gradient-highlighted words inside a heading */
export function Highlight({ children, tone = "dark" }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <span
      className={cn(
        "animate-text-shimmer bg-clip-text text-transparent",
        tone === "dark"
          ? "bg-gradient-to-r from-sky-300 via-blue-400 to-sky-300"
          : "bg-gradient-to-r from-c-brand via-c-highlight-mid to-c-brand"
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
    tone === "dark" ? "text-white" : "text-c-ink"
  );

/** Smaller heading for sub-sections inside a section */
export const subheadingClass = (tone: Tone = "dark") =>
  cn(
    "text-2xl leading-tight font-semibold tracking-[-0.03em] sm:text-3xl",
    tone === "dark" ? "text-white" : "text-c-ink"
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
      <motion.h2 {...revealHeading(1)} className={cn(headingClass(tone), centered ? "max-w-4xl" : "max-w-3xl")}>
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
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110",
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
    "card-sheen group relative rounded-2xl border transition-all duration-300 ease-out",
    tone === "dark"
      ? "border-white/10 bg-white/[0.03] hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/[0.06] hover:shadow-[0_20px_50px_-24px_color-mix(in_srgb,var(--c-glow)_45%,transparent)]"
      : "card-sheen-light border-slate-200/80 bg-white shadow-[0_8px_30px_-18px_color-mix(in_srgb,var(--c-ink)_15%,transparent)] hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_20px_45px_-20px_color-mix(in_srgb,var(--c-brand)_30%,transparent)]"
  );

/** Thin line along a section's top edge, with a short light beam travelling across it */
export function TopHairline({ tone = "dark" }: { tone?: Tone }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-transparent to-transparent",
          tone === "dark" ? "via-sky-300/30" : "via-sky-400/40"
        )}
      />
      <div
        className={cn(
          "animate-line-sweep absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent to-transparent",
          tone === "dark" ? "via-sky-200" : "via-c-brand"
        )}
      />
    </div>
  );
}

/** Shared light card surface for the AI + project showcase */
export const showcaseCard =
  "group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_14px_40px_-26px_color-mix(in_srgb,var(--c-ink)_35%,transparent)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_28px_60px_-30px_color-mix(in_srgb,var(--c-brand)_45%,transparent)] motion-reduce:hover:translate-y-0";
