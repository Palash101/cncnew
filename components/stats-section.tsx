"use client";

import StatsBackground from "@/components/stats-background";
import { Eyebrow, Highlight, fadeUp, maskUp, zoomIn } from "@/components/ui/section";
import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "motion/react";
import { Award, Users, Laptop, Smartphone, Sparkles, type LucideIcon } from "lucide-react";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: LucideIcon;
  /** Icon colour + glow tint */
  tone: string;
  glow: string;
};

const STATS: Stat[] = [
  {
    value: 15,
    suffix: "+",
    label: "Years Experience",
    description: "Delivering top-tier software",
    icon: Award,
    tone: "text-sky-300 border-sky-400/30 bg-sky-400/10",
    glow: "bg-sky-400/25",
  },
  {
    value: 50,
    suffix: "+",
    label: "Global Clients",
    description: "Trusted partners worldwide",
    icon: Users,
    tone: "text-blue-300 border-blue-400/30 bg-blue-400/10",
    glow: "bg-blue-500/25",
  },
  {
    value: 50,
    suffix: "+",
    label: "Mobile Apps",
    description: "iOS & Android solutions",
    icon: Smartphone,
    tone: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10",
    glow: "bg-cyan-400/25",
  },
  {
    value: 100,
    suffix: "+",
    label: "Web Apps",
    description: "Scalable web platforms",
    icon: Laptop,
    tone: "text-indigo-300 border-indigo-400/30 bg-indigo-400/10",
    glow: "bg-indigo-500/25",
  },
];



/** Counts up from 0 once, the first time it scrolls into view */
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

export default function StatsSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#0B1739_0%,#071028_45%,#020617_100%)] pt-20 pb-24 text-white sm:pt-28 sm:pb-32">
      {/* ───────── Background: starfield, aurora, planet horizon, orbits ───────── */}
      <StatsBackground />

      {/* ───────── Content ───────── */}
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-6"
        >
          <Eyebrow icon={Sparkles}>Enterprise Global Network</Eyebrow>
        </motion.div>

        <motion.h2
          variants={maskUp}
          custom={1}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl text-[2rem] leading-[1.1] font-semibold tracking-[-0.035em] text-white sm:text-5xl md:text-[52px]"
        >
          Connecting Visionaries with Scalable{" "}
          <Highlight>Digital Excellence</Highlight>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8"
        >
          With years of deep technical mastery, Craft and Code bridges complex infrastructure with intuitive user
          experiences. We empower organizations globally through continuous digital transformation and resilient
          systems.
        </motion.p>

        {/* ───────── Stats panel ───────── */}
        <motion.div
          variants={zoomIn}
          custom={3}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative mt-14 w-full sm:mt-16"
        >
          {/* Gradient border */}
          <div className="rounded-3xl bg-gradient-to-b from-sky-300/30 via-white/10 to-white/5 p-px shadow-[0_30px_80px_-30px_rgba(14,165,233,0.45)]">
            <div className="grid grid-cols-2 overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#081230]/80 backdrop-blur-xl lg:grid-cols-4">
              {STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={[
                      "group relative px-5 py-8 text-left transition-colors duration-300 hover:bg-white/[0.03] sm:px-8 sm:py-10",
                      // Dividers: vertical between columns, horizontal between rows on mobile
                      i % 2 === 1 ? "border-l border-white/10" : "",
                      i >= 2 ? "border-t border-white/10 lg:border-t-0" : "",
                      i === 2 ? "lg:border-l" : "",
                    ].join(" ")}
                  >

                    <div className="relative flex items-center gap-3">
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110 ${stat.tone}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        0{i + 1}
                      </span>
                    </div>

                    <div className="relative mt-6 text-4xl leading-none font-bold tracking-[-0.04em] text-white sm:text-5xl lg:text-[56px]">
                      <CountUp to={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="relative mt-3 text-sm font-semibold text-sky-100 sm:text-base">{stat.label}</div>
                    <div className="relative mt-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
                      {stat.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
