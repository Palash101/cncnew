"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "motion/react";
import { Award, Users, Laptop, Smartphone, Sparkles, type LucideIcon } from "lucide-react";
import StatsBackground from "@/components/stats-background";
import {
  Container,
  Eyebrow,
  Highlight,
  headingClass,
  reveal,
  revealBlock,
  revealHeading,
} from "@/components/ui/section";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

const STATS: Stat[] = [
  { value: 15, suffix: "+", label: "Years Experience", description: "Delivering top-tier software", icon: Award },
  { value: 50, suffix: "+", label: "Global Clients", description: "Trusted partners worldwide", icon: Users },
  { value: 50, suffix: "+", label: "Mobile Apps", description: "iOS & Android solutions", icon: Smartphone },
  { value: 100, suffix: "+", label: "Web Apps", description: "Scalable web platforms", icon: Laptop },
];

/** Counts up once, the first time it scrolls into view (static for reduced motion) */
function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (node.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {to}
      {suffix}
    </span>
  );
}

/**
 * Section 1 — Company introduction & statistics.
 * Editorial split: statement on the left, a "dashboard" of key numbers on the right.
 */
export default function StatsSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#0B1739_0%,#071028_55%,#020617_100%)] py-20 text-white sm:py-24 lg:py-28">
      <StatsBackground />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          {/* ───── Statement ───── */}
          <div>
            <motion.div {...reveal(0)}>
              <Eyebrow icon={Sparkles}>Enterprise Global Network</Eyebrow>
            </motion.div>

            <motion.h2 {...revealHeading(1)} className={`${headingClass("dark")} mt-6`}>
              Connecting Visionaries with Scalable <Highlight>Digital Excellence</Highlight>
            </motion.h2>

            <motion.p {...reveal(2)} className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              With years of deep technical mastery, Craft and Code bridges complex infrastructure with intuitive user
              experiences. We empower organizations globally through continuous digital transformation and resilient
              systems.
            </motion.p>
          </div>

          {/* ───── Dashboard ───── */}
          <motion.div {...revealBlock(2)} className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-cyan-300/15 bg-[#071230]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_30px_80px_-40px_rgba(34,211,238,0.45)]">
              <span aria-hidden className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-3.5 sm:px-6">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-slate-400 uppercase">
                  Craft and Code — at a glance
                </span>
                <span className="flex gap-1.5" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-sky-400/70" />
                </span>
              </div>

              {/* 2 × 2 metrics */}
              <div className="grid grid-cols-2">
                {STATS.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      {...reveal(3 + i)}
                      className={[
                        "group relative p-5 transition-colors duration-300 hover:bg-white/[0.03] sm:p-7",
                        i % 2 === 1 ? "border-l border-white/10" : "",
                        i >= 2 ? "border-t border-white/10" : "",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-sky-400/25 bg-sky-400/10 text-sky-300 transition-colors duration-300 group-hover:border-sky-400/50">
                          <Icon className="h-[18px] w-[18px]" />
                        </span>
                        <span className="font-mono text-[11px] text-slate-500">0{i + 1}</span>
                      </div>

                      <p className="mt-6 bg-gradient-to-b from-white to-sky-100 bg-clip-text text-[2.75rem] leading-none font-semibold tracking-[-0.045em] text-transparent sm:text-[64px]">
                        <CountUp to={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="mt-3 text-sm font-semibold text-sky-100 sm:text-base">{stat.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400 sm:text-sm">{stat.description}</p>

                      {/* Accent rule */}
                      <span
                        aria-hidden
                        className="absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan-300 to-transparent transition-transform duration-500 group-hover:scale-x-100 sm:inset-x-7"
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
