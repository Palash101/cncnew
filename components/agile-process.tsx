"use client";

import {
  Eye,
  CreditCard,
  Code2,
  CheckCheck,
  PackageCheck,
  ClipboardList,
  Workflow,
} from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Container,
  SectionHeader,
  Highlight,
  reveal,
} from "@/components/ui/section";
import AmbientBackground from "@/components/ui/ambient-background";

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

// ───────── Chevron pipeline (SVG viewBox 1200 × 96) ─────────
const VB_W = 1200;
const VB_H = 96;
const SEG = VB_W / steps.length; // 200 per stage
const NOTCH = 24; // arrow depth
const GAP = 6;

// Progressive tone: pale ice → brand blue → navy
const FILLS = [
  "var(--c-brand-100)",
  "var(--c-brand-200)",
  "var(--c-brand-300)",
  "var(--c-brand-400)",
  "var(--c-brand)",
  "var(--c-ink)",
];
const ON_DARK = [false, false, false, true, true, true];

/** Horizontal chevron polygon for stage i (first has a flat back, every other one a notch) */
function chevronPoints(i: number) {
  const x0 = i * SEG;
  const x1 = x0 + SEG - GAP;
  const mid = VB_H / 2;
  const back =
    i === 0
      ? [`${x0},0`, `${x0},${VB_H}`]
      : [`${x0},0`, `${x0 + NOTCH},${mid}`, `${x0},${VB_H}`];
  // clockwise: top-left → top-right → tip → bottom-right → bottom-left → (notch)
  const pts = [
    back[0],
    `${x1 - NOTCH},0`,
    `${x1},${mid}`,
    `${x1 - NOTCH},${VB_H}`,
    ...back.slice(1).reverse(),
  ];
  return pts.join(" ");
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "-100px" } as const;
const segDelay = (i: number) => 0.2 + i * 0.12;

export default function AgileProcess() {
  return (
    <section
      id="agile"
      className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,var(--c-wash-100)_0%,var(--c-wash-50)_55%,var(--c-wash-100)_100%)] py-20 text-c-ink sm:py-28"
    >
      <AmbientBackground variant="ice" />

      <MotionConfig reducedMotion="user">
        <Container>
          {/* ───── Split header ───── */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <SectionHeader
              tone="light"
              align="left"
              eyebrow="Our Process"
              eyebrowIcon={Workflow}
              title={
                <>
                  Our Agile Process.{" "}
                  <Highlight tone="light">
                    Simple, Seamless, Streamlined
                  </Highlight>
                </>
              }
            />
            <motion.p
              {...reveal(2)}
              className="max-w-md text-base leading-7 text-slate-600 lg:pb-2"
            >
              We follow a structured and agile development approach with project
              management planner to ensure the successful delivery of every
              project, focusing on quality, cost-optimization, transparency, and
              client satisfaction.
            </motion.p>
          </div>

          {/* ───── Desktop: horizontal chevron pipeline ───── */}
          <div className="mt-14 hidden sm:mt-16 lg:block">
            {/* Pipeline band */}
            <div
              className="relative"
              style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
            >
              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="absolute inset-0 h-full w-full drop-shadow-[0_14px_24px_color-mix(in_srgb,var(--c-ink)_12%,transparent)]"
                aria-hidden
              >
                {steps.map((step, i) => (
                  <motion.polygon
                    key={step.id}
                    points={chevronPoints(i)}
                    fill={FILLS[i]}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT}
                    transition={{
                      duration: 0.6,
                      ease: EASE_OUT,
                      delay: segDelay(i),
                    }}
                  />
                ))}
              </svg>

              {/* Icon + step label inside each chevron */}
              <div className="absolute inset-0 grid grid-cols-6" aria-hidden>
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={VIEWPORT}
                      transition={{ duration: 0.5, delay: segDelay(i) + 0.25 }}
                      className={cn(
                        "flex items-center justify-center gap-2.5 pr-4",
                        i > 0 && "pl-5",
                        ON_DARK[i] ? "text-white" : "text-c-ink",
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="font-mono text-sm font-semibold tracking-wide">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Stage text, one column per chevron */}
            <ol
              className="mt-9 grid grid-cols-6 gap-6"
              aria-label="Process stages"
            >
              {steps.map((step, i) => (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{
                    duration: 0.6,
                    ease: EASE_OUT,
                    delay: segDelay(i) + 0.35,
                  }}
                >
                  <span
                    aria-hidden
                    className="block h-1 w-8 rounded-full"
                    style={{ backgroundColor: FILLS[Math.max(i, 2)] }}
                  />
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-c-ink xl:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* ───── Mobile & tablet: vertical chevron pipeline ───── */}
          <ol
            className="mt-12 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:hidden"
            aria-label="Process stages"
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{
                    duration: 0.6,
                    ease: EASE_OUT,
                    delay: 0.1 + (i % 2) * 0.1,
                  }}
                  className="flex gap-5 py-3"
                >
                  {/* Down-pointing chevron badge */}
                  <span
                    className="relative h-[4.5rem] w-14 shrink-0"
                    aria-hidden
                  >
                    <svg
                      viewBox="0 0 56 72"
                      className="absolute inset-0 h-full w-full drop-shadow-[0_8px_14px_color-mix(in_srgb,var(--c-ink)_12%,transparent)]"
                    >
                      <polygon
                        points={
                          i === 0
                            ? "0,0 56,0 56,56 28,72 0,56"
                            : "0,0 28,14 56,0 56,56 28,72 0,56"
                        }
                        fill={FILLS[i]}
                      />
                    </svg>
                    <span
                      className={cn(
                        "absolute inset-x-0 top-[38%] flex -translate-y-1/2 flex-col items-center gap-0.5",
                        ON_DARK[i] ? "text-white" : "text-c-ink",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-mono text-[11px] font-semibold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                  </span>
                  <div className="min-w-0 pt-1">
                    <h3 className="text-lg font-semibold tracking-tight text-c-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </Container>
      </MotionConfig>
    </section>
  );
}
