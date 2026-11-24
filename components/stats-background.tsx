"use client";

import { TopHairline } from "@/components/ui/section";
import AmbientBackground from "@/components/ui/ambient-background";

/* ─────────────────────────────────────────────────────────────
   Stats section background: a slow navy mesh gradient with one
   restrained cyan light. No grid, no heavy motion.
   ───────────────────────────────────────────────────────────── */

export default function StatsBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <AmbientBackground variant="dark" />

      {/* Subtle cyan light behind the dashboard */}
      <div className="absolute right-0 bottom-0 h-[24rem] w-[34rem] translate-x-1/4 translate-y-1/3 rounded-full bg-cyan-400/10 blur-[120px]" />

      {/* Thin light line along the top edge */}
      <TopHairline />
    </div>
  );
}
