"use client";

import { TopHairline } from "@/components/ui/section";
import AmbientBackground from "@/components/ui/ambient-background";

/* ─────────────────────────────────────────────────────────────
   Stats section background: the shared slow corner light.
   No grid, no heavy motion.
   ───────────────────────────────────────────────────────────── */

export default function StatsBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <AmbientBackground variant="dark" />

      {/* Thin light line along the top edge */}
      <TopHairline />
    </div>
  );
}
