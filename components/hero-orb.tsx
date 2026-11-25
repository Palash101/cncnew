"use client";

import { motion } from "motion/react";
import Orb from "@/components/react-bits/Orb";
import { useThemeColor } from "@/components/theme-preview/theme-store"; // TEMPORARY: colour testing
import { EASE } from "@/components/ui/section";

// The code mark from the logo (C<>DE), drawn stroke by stroke
const STROKES = ["M40 14 12 42l28 28", "M100 14l28 28-28 28", "M80 6 60 78"];

/** A calm glowing ring around a code mark. Decorative. */
export default function HeroOrb({ paused }: { paused: boolean }) {
  // WebGL needs plain hex values
  const primary = useThemeColor("--c-brand", "#1673b8");
  const accent = useThemeColor("--c-highlight", "#3cc8f5");
  const deep = useThemeColor("--c-deep-700", "#0d2a58");
  const background = useThemeColor("--c-night", "#050c20");

  return (
    <div aria-hidden className="relative aspect-square w-[min(68vw,300px)] lg:w-[min(100%,56svh,460px)]">
      {/* Larger than the box so the glow is never cut off */}
      <div className="pointer-events-none absolute inset-[-22%]">
        <Orb
          colors={[primary, accent, deep]}
          backgroundColor={background}
          size={0.92}
          glow={1.1}
          speed={0.8}
          hoverIntensity={0.35}
          clickPulse={false}
          dpr={1}
          paused={paused}
        />
      </div>

      <svg
        viewBox="0 0 140 84"
        fill="none"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 m-auto w-[34%] stroke-c-highlight-soft [filter:drop-shadow(0_0_14px_color-mix(in_srgb,var(--c-highlight)_70%,transparent))]"
      >
        {STROKES.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.7 + i * 0.25, ease: EASE, opacity: { duration: 0.2, delay: 0.7 + i * 0.25 } }}
          />
        ))}
      </svg>
    </div>
  );
}
