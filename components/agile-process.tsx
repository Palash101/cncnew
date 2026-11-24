"use client";

import { useState, useEffect, useRef } from "react";
import {
  Eye,
  CreditCard,
  Code2,
  CheckCheck,
  PackageCheck,
  ClipboardList,
  Workflow,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Container, SectionHeader, Highlight, reveal, revealBlock } from "@/components/ui/section";

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const steps: ProcessStep[] = [
  {
    id: "scoping",
    title: "Scoping",
    description:
      "We begin with in-depth discovery, defining requirements, module breakdown, and technical roadmap architecture.",
    icon: Eye,
  },
  {
    id: "cost-estimation",
    title: "Cost Estimation",
    description:
      "Get the complete project module wise cost breakdown with maintenance and support plan.",
    icon: CreditCard,
  },
  {
    id: "development",
    title: "Development",
    description:
      "Agile development sprints with clean code, scalable architecture, and continuous integration.",
    icon: Code2,
  },
  {
    id: "qa-testing",
    title: "QA & Testing",
    description:
      "Rigorous automated testing, security audits, and bug fixes to guarantee top-grade software delivery.",
    icon: CheckCheck,
  },
  {
    id: "deployment",
    title: "Deployment",
    description:
      "Automated zero-downtime deployment setup on secure cloud infrastructure environments.",
    icon: PackageCheck,
  },
  {
    id: "maintenance",
    title: "Maintenance",
    description:
      "Continuous 24/7 post-launch monitoring, performance tuning, regular security updates, and SLA support.",
    icon: ClipboardList,
  },
];

export default function AgileProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance every 4.5s; pauses while the user hovers or focuses the section
  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => setActiveStep((prev) => (prev + 1) % steps.length), 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  // Grow the stepper's progress line exactly to the active step's circle
  // (measured from the DOM, so it stays aligned while descriptions expand/collapse)
  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    const sync = () => {
      const item = list.querySelectorAll<HTMLLIElement>(":scope > li")[activeStep];
      if (!item) return;
      // circle centre = li top + button padding (8px) + half circle (20px); track starts at 20px
      fill.style.height = `${Math.max(0, item.offsetTop + 8 + 20 - 20)}px`;
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(list);
    return () => ro.disconnect();
  }, [activeStep]);
  const arc = (activeStep / steps.length) * 100; // % of the orbit ring completed
  const ActiveIcon = steps[activeStep].icon;

  return (
    <section
      id="agile"
      className="relative isolate -mt-10 w-full overflow-hidden bg-[linear-gradient(180deg,#e8f4fc_0%,#eff7fd_55%,#eaf4fb_100%)] pt-30 pb-20 text-[#0B1739] sm:-mt-12 sm:pt-40 sm:pb-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Background: fine grid + soft glows (same language as the hero) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(22,115,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,115,184,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_60%_at_75%_55%,black,transparent)]" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-sky-200/50 blur-[120px]" />
      </div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          {/* ───── Left: heading + stepper ───── */}
          <div>
            <SectionHeader
              tone="light"
              align="left"
              eyebrow="Our Process"
              eyebrowIcon={Workflow}
              title={
                <>
                  Our Agile Process. <Highlight tone="light">Simple, Seamless, Streamlined</Highlight>
                </>
              }
              description="We follow a structured and agile development approach with project management planner to ensure the successful delivery of every project, focusing on quality, cost-optimization, transparency, and client satisfaction."
            />

            <ol ref={listRef} className="relative mt-10 space-y-1" aria-label="Process stages">
              {/* Track + animated progress fill */}
              <span aria-hidden className="absolute top-5 bottom-5 left-[19px] w-px bg-slate-200" />
              <span
                ref={fillRef}
                aria-hidden
                className="absolute top-5 left-[19px] h-0 w-px bg-gradient-to-b from-[#1673b8] to-sky-400 transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              />

              {steps.map((step, idx) => {
                const isActive = idx === activeStep;
                const isDone = idx < activeStep;
                return (
                  <motion.li key={step.id} {...reveal(idx)} className="relative">
                    <button
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                        "flex w-full cursor-pointer items-start gap-4 rounded-xl py-2 pr-3 text-left transition-colors duration-300",
                        isActive ? "bg-white shadow-[0_10px_30px_-18px_rgba(11,23,57,0.35)] ring-1 ring-sky-100" : "hover:bg-white/60"
                      )}
                    >
                      <span
                        className={cn(
                          "relative z-10 ml-px inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300",
                          isActive && "border-[#0B1739] bg-[#0B1739] text-white shadow-[0_8px_20px_-6px_rgba(11,23,57,0.5)]",
                          isDone && "border-sky-300 bg-sky-50 text-[#1673b8]",
                          !isActive && !isDone && "border-slate-200 bg-white text-slate-400"
                        )}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 pt-2">
                        <span
                          className={cn(
                            "block text-base font-semibold tracking-tight transition-colors",
                            isActive ? "text-[#0B1739]" : "text-slate-500"
                          )}
                        >
                          {step.title}
                        </span>
                        {/* Description expands for the active step */}
                        <span
                          className={cn(
                            "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          )}
                        >
                          <span className="overflow-hidden">
                            <span className="block pt-1.5 pb-1 text-sm leading-relaxed text-slate-600">
                              {step.description}
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          {/* ───── Right: orbit diagram ───── */}
          <motion.div {...revealBlock(2)} className="flex justify-center">
            <div className="relative aspect-square w-full max-w-[460px]">
              {/* Ring + animated progress arc */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#cfe6f5" strokeWidth="0.4" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#agile-arc)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray={`${arc} 100`}
                  className="transition-[stroke-dasharray] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                />
                <circle cx="50" cy="50" r="28" fill="none" stroke="#e3f1fa" strokeWidth="0.3" strokeDasharray="1 1.5" />
                <defs>
                  <linearGradient id="agile-arc" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#1673b8" />
                    <stop offset="1" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Stage nodes, placed on the ring with percentages (no JS measuring) */}
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = idx === activeStep;
                const isDone = idx < activeStep;
                const angle = ((idx * 360) / steps.length - 90) * (Math.PI / 180);
                const left = 50 + 40 * Math.cos(angle);
                const top = 50 + 40 * Math.sin(angle);
                return (
                  <motion.button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    aria-label={step.title}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 + idx * 0.08 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: `${left}%`, top: `${top}%` }}
                  >
                    <span
                      className={cn(
                        "relative flex items-center justify-center rounded-2xl border transition-all duration-500",
                        isActive
                          ? "h-14 w-14 border-[#0B1739] bg-[#0B1739] text-white shadow-[0_14px_30px_-10px_rgba(11,23,57,0.55)] ring-4 ring-sky-200/70 sm:h-16 sm:w-16"
                          : isDone
                            ? "h-11 w-11 border-sky-200 bg-sky-50 text-[#1673b8] sm:h-12 sm:w-12"
                            : "h-11 w-11 border-slate-200 bg-white text-slate-500 shadow-sm hover:border-sky-300 hover:text-[#1673b8] sm:h-12 sm:w-12"
                      )}
                    >
                      <Icon className={isActive ? "h-6 w-6" : "h-5 w-5"} />
                    </span>
                  </motion.button>
                );
              })}

              {/* Centre: active stage */}
              <div className="absolute inset-[24%] flex flex-col items-center justify-center rounded-full bg-white/80 text-center shadow-[0_20px_50px_-24px_rgba(11,23,57,0.35)] ring-1 ring-sky-100 backdrop-blur-sm">
                <div key={steps[activeStep].id} className="animate-in fade-in zoom-in-95 px-4 duration-500">
                  <ActiveIcon className="mx-auto h-6 w-6 text-[#1673b8]" />
                  <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-slate-400 uppercase">
                    Stage {String(activeStep + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-lg font-semibold tracking-tight text-[#0B1739] sm:text-xl">
                    {steps[activeStep].title}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
