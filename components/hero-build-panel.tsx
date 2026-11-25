"use client";

import { useEffect, useState, type Ref } from "react";
import Image from "next/image";
import {
  Check,
  ClipboardList,
  Code2,
  CreditCard,
  CheckCheck,
  Eye,
  PackageCheck,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import DecryptedText from "@/components/react-bits/DecryptedText";
import LogoLoop, { type LogoItem } from "@/components/react-bits/LogoLoop";
import { EASE } from "@/components/ui/section";
import { cn } from "@/lib/utils";

// Same stages as the Agile Process section
const STAGES: { title: string; note: string; icon: LucideIcon }[] = [
  { title: "Scoping", note: "Requirements and technical roadmap", icon: Eye },
  { title: "Cost Estimation", note: "Module-wise cost breakdown", icon: CreditCard },
  { title: "Development", note: "Agile sprints, clean code", icon: Code2 },
  { title: "QA & Testing", note: "Automated tests, security audits", icon: CheckCheck },
  { title: "Deployment", note: "Zero-downtime cloud setup", icon: PackageCheck },
  { title: "Maintenance", note: "24/7 monitoring and SLA support", icon: ClipboardList },
];

// Same logos as the Tech Stack section
const LOGOS: LogoItem[] = [
  ["React Js", "/frontend/react.png"],
  ["Python", "/backend/python.webp"],
  ["AWS", "/cloud devops/aws-icon.webp"],
  ["Flutter", "/mobile framework/flutter.png"],
  ["Odoo", "/Odoo.png"],
  ["Node Js", "/backend/Node.js_.webp"],
  ["Azure", "/cloud devops/azure.png"],
  ["Kotlin", "/mobile framework/Kotlin_icon.webp"],
  ["Java", "/backend/java.png"],
  ["Github", "/cloud devops/github.png"],
].map(([title, src]) => ({
  title,
  ariaLabel: title,
  node: (
    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-2">
      <Image src={src} alt="" width={40} height={40} className="h-full w-full object-contain" />
    </span>
  ),
}));

const STEP_MS = 1700;
const START_MS = 2400; // the beam needs this long to land
const ROW = 46; // row height in px, also drives the progress line

/**
 * The glass panel the light beam lands on: an idea enters at the top and runs
 * through our delivery process, one stage at a time.
 */
export default function HeroBuildPanel({ ref, paused }: { ref?: Ref<HTMLDivElement>; paused: boolean }) {
  const reduceMotion = useReducedMotion();
  // -1 = waiting for the beam, STAGES.length = everything shipped
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (paused) return;
    if (reduceMotion) {
      // No cycling: show the finished process (set after hydration so server and client markup match)
      const id = window.setTimeout(() => setActive(STAGES.length), 0);
      return () => window.clearTimeout(id);
    }
    const wait = active === -1 ? START_MS : active === STAGES.length ? STEP_MS * 1.6 : STEP_MS;
    const id = window.setTimeout(() => setActive((i) => (i >= STAGES.length ? 0 : i + 1)), wait);
    return () => window.clearTimeout(id);
  }, [active, paused, reduceMotion]);

  const done = Math.max(0, active);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-t-[28px] border border-b-0 border-sky-300/25 bg-[#071229] px-5 pt-5 pb-5 text-left sm:px-7 sm:pt-6"
    >
      {/* Light soaking in from the beam above */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(60,200,245,0.22),transparent)]"
      />

      <div className="relative flex items-baseline justify-between gap-4">
        <p className="text-base font-semibold text-white sm:text-lg">From idea to launch</p>
        <p aria-hidden className="text-sm font-medium text-sky-200 tabular-nums">
          {done} / {STAGES.length}
        </p>
      </div>

      <ol className="relative mt-3">
        {/* Progress line behind the icons */}
        <span
          aria-hidden
          className="absolute top-[23px] left-[15px] w-0.5 bg-white/10"
          style={{ height: ROW * (STAGES.length - 1) }}
        />
        <motion.span
          aria-hidden
          className="absolute top-[23px] left-[15px] w-0.5 origin-top bg-[#3cc8f5] shadow-[0_0_12px_#3cc8f5]"
          style={{ height: ROW * (STAGES.length - 1) }}
          initial={false}
          animate={{ scaleY: Math.min(1, Math.max(0, active) / (STAGES.length - 1)) }}
          transition={{ duration: active <= 0 ? 0.3 : 0.7, ease: EASE }}
        />

        {STAGES.map((stage, i) => {
          const isDone = i < active;
          const isActive = i === active;
          const Icon = isDone ? Check : stage.icon;
          return (
            <li key={stage.title} className="relative flex items-center gap-3.5" style={{ height: ROW }}>
              <span
                className={cn(
                  "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
                  isDone && "border-[#3cc8f5] bg-[#3cc8f5] text-[#071229]",
                  isActive &&
                    "border-[#3cc8f5] bg-[#0d2a4a] text-[#8fe3ff] shadow-[0_0_18px_rgba(60,200,245,0.7)]",
                  !isDone && !isActive && "border-white/15 bg-[#0b1a36] text-slate-400",
                )}
              >
                <Icon aria-hidden className="h-4 w-4" strokeWidth={2.25} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col sm:max-lg:flex-row sm:max-lg:items-center sm:max-lg:gap-4 xl:flex-row xl:items-center xl:gap-4">
                <span
                  className={cn(
                    "shrink-0 text-sm font-semibold transition-colors duration-500 sm:text-[15px]",
                    isDone || isActive ? "text-white" : "text-slate-400",
                  )}
                >
                  {isActive ? (
                    <DecryptedText
                      text={stage.title}
                      animateOn="view"
                      sequential
                      speed={38}
                      encryptedClassName="text-[#3cc8f5]"
                    />
                  ) : (
                    stage.title
                  )}
                </span>
                <span
                  className={cn(
                    "truncate text-[13px] leading-tight sm:max-lg:ml-auto sm:max-lg:text-right xl:ml-auto xl:text-right",
                    isActive ? "text-sky-200" : "hidden text-slate-400 sm:max-lg:block xl:block",
                  )}
                >
                  {stage.note}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="relative mt-3 border-t border-white/10 pt-4">
        <LogoLoop
          logos={LOGOS}
          speed={paused ? 0 : 36}
          logoHeight={44}
          gap={14}
          fadeOut
          fadeOutColor="#071229"
          ariaLabel="Technologies we work with"
        />
      </div>
    </div>
  );
}
