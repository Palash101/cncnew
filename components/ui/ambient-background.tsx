"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Calm "corner light" background for a section.
 *
 * Two or three soft glows live in the section's corners and drift very slowly.
 * A radial mask keeps the centre of the section clear, so nothing ever sits
 * behind headings, cards or data — the light only frames the content.
 *
 * - Transform/opacity only (GPU-cheap), long durations, tiny travel.
 * - Completely still when the user prefers reduced motion.
 */
type Variant = "dark" | "ice" | "white";

type Orb = {
  className: string; // position + size + colour
  x: [number, number];
  y: [number, number];
  duration: number;
};

const ORBS: Record<Variant, Orb[]> = {
  dark: [
    { className: "-top-40 -left-40 h-[34rem] w-[34rem] bg-sky-500/20", x: [0, 50], y: [0, 30], duration: 22 },
    { className: "-right-40 -bottom-40 h-[32rem] w-[32rem] bg-blue-600/25", x: [0, -40], y: [0, -30], duration: 26 },
    { className: "top-1/3 -right-48 h-[22rem] w-[22rem] bg-cyan-400/10", x: [0, -30], y: [0, 40], duration: 30 },
  ],
  ice: [
    { className: "-top-40 -left-32 h-[32rem] w-[32rem] bg-sky-200/70", x: [0, 50], y: [0, 30], duration: 24 },
    { className: "-right-32 -bottom-40 h-[30rem] w-[30rem] bg-blue-100/80", x: [0, -40], y: [0, -30], duration: 28 },
  ],
  white: [
    { className: "-top-40 -right-32 h-[30rem] w-[30rem] bg-sky-100/80", x: [0, -40], y: [0, 30], duration: 26 },
    { className: "-bottom-40 -left-32 h-[28rem] w-[28rem] bg-sky-50", x: [0, 40], y: [0, -30], duration: 30 },
  ],
};

export default function AmbientBackground({ variant, className }: { variant: Variant; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-20 overflow-hidden",
        // Keep the middle of the section clear: glows only show toward the edges
        "[mask-image:radial-gradient(ellipse_60%_55%_at_50%_50%,transparent_40%,black_100%)]",
        className
      )}
    >
      {ORBS[variant].map((orb, i) => (
        <motion.div
          key={i}
          className={cn("absolute rounded-full blur-[100px] will-change-transform", orb.className)}
          animate={reduce ? undefined : { x: orb.x, y: orb.y, scale: [1, 1.08] }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
