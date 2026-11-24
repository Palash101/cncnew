"use client";

import { TopHairline } from "@/components/ui/section";

/* ─────────────────────────────────────────────────────────────
   Stats section background: static and lightweight.
   Navy gradient, a faint grid and two soft glows; no animation.
   ───────────────────────────────────────────────────────────── */

export default function StatsBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Faint grid, fading out toward the edges */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(125,211,252,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(125,211,252,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />

      {/* Soft glows */}
      <div className="absolute -top-40 left-1/2 h-[26rem] w-[56rem] -translate-x-1/2 rounded-full bg-sky-500/15 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-[24rem] w-[34rem] translate-x-1/4 translate-y-1/3 rounded-full bg-cyan-400/10 blur-[120px]" />

      {/* Thin light line along the top edge */}
      <TopHairline />

    </div>
  );
}
