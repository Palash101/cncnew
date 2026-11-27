"use client";

import Image from "next/image";
import { motion, MotionConfig, useReducedMotion } from "motion/react";
import { Bot, BrainCircuit, Zap, CircleCheck } from "lucide-react";
import { Container, revealCard } from "@/components/ui/section";

interface AiCapability {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  imageUrl?: string;
  description: string;
  highlights: string[];
}

export const aiCapabilities: AiCapability[] = [
  {
    id: "llm-dev",
    icon: Bot,
    title: "Custom LLM & Chatbots",
    subtitle: "Enterprise Models",
    imageUrl: "https://images.unsplash.com/photo-1676299081847-824916de030a?q=80&w=1200&auto=format&fit=crop",
    description:
      "We train and deploy private conversational AI models on your own data, so sensitive information stays under your control.",
    highlights: ["Custom ChatGPT Chatbots", "Full Data Sovereignty", "Multi-Turn Context & Memory"],
  },
  {
    id: "fine-tuning",
    icon: BrainCircuit,
    title: "Fine-Tuning & RAG",
    subtitle: "Domain Intelligence",
    description:
      "We fine-tune open-source models like LLaMA 3 and DeepSeek using QLoRA/LoRA, and ground their answers with vector search.",
    highlights: [
      "QLoRA / LoRA Weight Adaptation",
      "Vector Search (Pinecone/Milvus)",
      "Higher Precision, Fewer Hallucinations",
    ],
  },
  {
    id: "wisper-agent",
    icon: Zap,
    title: "Wisper AI Agent",
    subtitle: "Voice & Audio Translation",
    description:
      "Real-time voice changing, pitch modulation and low-latency audio translation for live video calls.",
    highlights: ["Live Video Call Translation", "Real-Time Voice Modulation", "Sub-120ms Latency Audio Stream"],
  },
];

const WAVE = [40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 75, 50, 85, 40, 65, 30, 70];

/* ── Fine-Tuning & RAG picture: a vector search, drawn instead of a stock photo ── */

const SPACE = 240; // the drawing is a 240 × 240 square, cropped to fit the panel
const MIDDLE = SPACE / 2;
const fraction = (value: number) => value - Math.floor(value);
// Evenly scattered, repeatable points: the stored documents as embeddings
const EMBEDDINGS = Array.from({ length: 46 }, (_, i) => {
  const x = Math.round(fraction((i + 1) * 0.7548776662) * SPACE);
  const y = Math.round(fraction((i + 1) * 0.569840291) * SPACE);
  return { x, y, distance: Math.hypot(x - MIDDLE, y - MIDDLE) };
})
  .filter((point) => point.distance >= 24)
  .sort((a, b) => a.distance - b.distance);
const TOP_K = 4;
const RETRIEVED = EMBEDDINGS.slice(0, TOP_K);
const STORED = EMBEDDINGS.slice(TOP_K);
const REACH = RETRIEVED[TOP_K - 1].distance + 9;
const CYCLE = { duration: 4.6, repeat: Infinity, ease: "easeInOut" as const, times: [0, 0.22, 0.8, 1] };

/**
 * A query lands in the middle of the embedding space, the search radius sweeps round it and
 * the four nearest documents are pulled in. That is what retrieval-augmented generation does,
 * and it stays on brand in every colour combination, which a photo cannot.
 * Reduced motion: the finished retrieval is shown, without the loop.
 */
function RetrievalVisual({ caption }: { caption: string }) {
  const still = useReducedMotion();

  return (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,color-mix(in_srgb,var(--c-highlight-mid)_26%,transparent),transparent_68%)] bg-c-deep-800">
      <svg
        aria-hidden
        viewBox={`0 0 ${SPACE} ${SPACE}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] motion-reduce:transition-none"
      >
        <defs>
          <pattern id="rag-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" className="stroke-white/[0.06]" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={SPACE} height={SPACE} fill="url(#rag-grid)" />

        {STORED.map((point) => (
          <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r="1.8" className="fill-white/30" />
        ))}

        {/* Search radius */}
        <motion.circle
          cx={MIDDLE}
          cy={MIDDLE}
          r={REACH}
          fill="none"
          strokeWidth="1"
          strokeDasharray="3 5"
          className="stroke-c-highlight/45"
          animate={{ rotate: 360 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        />

        {RETRIEVED.map((point, i) => (
          <g key={`${point.x}-${point.y}`}>
            <motion.line
              x1={MIDDLE}
              y1={MIDDLE}
              x2={point.x}
              y2={point.y}
              strokeWidth="1.2"
              strokeLinecap="round"
              className="stroke-c-highlight"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={still ? { pathLength: 1, opacity: 0.8 } : { pathLength: [0, 1, 1, 0], opacity: [0, 0.85, 0.85, 0] }}
              transition={still ? { duration: 0.6 } : { ...CYCLE, delay: i * 0.14 }}
            />
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="7"
              className="fill-c-highlight"
              initial={{ opacity: 0 }}
              animate={still ? { opacity: 0.22 } : { opacity: [0, 0.28, 0.28, 0] }}
              transition={still ? { duration: 0.6 } : { ...CYCLE, delay: 0.3 + i * 0.14 }}
            />
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="3"
              className="fill-c-highlight"
              initial={{ opacity: 0.4 }}
              animate={still ? { opacity: 1 } : { opacity: [0.4, 1, 1, 0.4] }}
              transition={still ? { duration: 0.6 } : { ...CYCLE, delay: 0.3 + i * 0.14 }}
            />
          </g>
        ))}

        {/* The query */}
        <motion.circle
          cx={MIDDLE}
          cy={MIDDLE}
          fill="none"
          strokeWidth="1.2"
          className="stroke-c-highlight"
          initial={{ r: 6, opacity: 0 }}
          animate={still ? { r: 6, opacity: 0 } : { r: [6, 22], opacity: [0.7, 0] }}
          transition={still ? { duration: 0 } : { duration: 2.3, repeat: Infinity, ease: "easeOut" }}
        />
        <circle cx={MIDDLE} cy={MIDDLE} r="9" className="fill-c-highlight/25" />
        <circle cx={MIDDLE} cy={MIDDLE} r="4.5" className="fill-white" />
      </svg>

      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-c-night/60 px-1.5 py-1 font-mono text-[10px] leading-none whitespace-nowrap text-slate-200 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-c-highlight" />
        {caption}
      </span>
    </div>
  );
}

function Highlights({ items, dark }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((point) => (
        <li key={point} className={dark ? "flex items-center gap-2 text-sm text-slate-200" : "flex items-center gap-2 text-sm text-slate-700"}>
          <CircleCheck aria-hidden className={dark ? "h-4 w-4 shrink-0 text-c-highlight" : "h-4 w-4 shrink-0 text-c-brand"} />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * AI bento: one lead capability (photo, dark) beside two stacked cards
 * that alternate light / dark, matching the Expertise and Industries sections.
 */
export default function AiSection() {
  const [lead, tuning, wisper] = aiCapabilities;
  const LeadIcon = lead.icon;
  const TuningIcon = tuning.icon;
  const WisperIcon = wisper.icon;

  return (
    <MotionConfig reducedMotion="user">
      <Container>
        <div className="grid gap-5 lg:grid-cols-12 lg:grid-rows-2">
          {/* 01 — Lead: full-bleed photo under a navy wash */}
          <motion.article
            {...revealCard(0)}
            className="group relative isolate flex min-h-[460px] flex-col justify-between overflow-hidden rounded-2xl bg-c-ink p-7 text-white sm:p-9 lg:col-span-7 lg:row-span-2"
          >
            <Image
              src={lead.imageUrl!}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 680px"
              className="-z-10 object-cover opacity-55 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--c-night)_15%,color-mix(in_srgb,var(--c-ink)_80%,transparent)_55%,color-mix(in_srgb,var(--c-ink)_20%,transparent))]"
            />

            <div className="flex items-start justify-between">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-400/40 bg-c-deep-600/80 text-sky-200 backdrop-blur-sm">
                <LeadIcon className="h-7 w-7" />
              </span>
              <span className="font-mono text-xs text-sky-300/80">01 / {lead.subtitle}</span>
            </div>

            <div className="mt-24">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] sm:text-[2rem]">{lead.title}</h3>
              <p className="mt-4 max-w-lg text-base leading-7 text-slate-300">{lead.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {lead.highlights.map((point) => (
                  <li
                    key={point}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-sky-100 backdrop-blur-sm"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>

          {/* 02 — Light card, a drawn vector search beside the text */}
          <motion.article
            {...revealCard(1)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_14px_40px_-26px_color-mix(in_srgb,var(--c-ink)_35%,transparent)] sm:flex-row lg:col-span-5"
          >
            <div className="relative aspect-[16/10] shrink-0 overflow-hidden sm:aspect-auto sm:w-2/5 lg:w-[36%]">
              <RetrievalVisual caption={tuning.subtitle} />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-c-brand">
                  <TuningIcon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-c-ink">{tuning.title}</h3>
                <span className="ml-auto font-mono text-xs text-slate-400">02</span>
              </div>
              <p className="mt-3 mb-5 text-sm leading-relaxed text-slate-600">{tuning.description}</p>
              <div className="mt-auto border-t border-slate-200/80 pt-4">
                <Highlights items={tuning.highlights} />
              </div>
            </div>
          </motion.article>

          {/* 03 — Dark card with a live waveform */}
          <motion.article
            {...revealCard(2)}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-sky-400/25 bg-[radial-gradient(ellipse_at_80%_20%,color-mix(in_srgb,var(--c-highlight-mid)_20%,transparent),transparent_60%)] bg-c-deep-800 p-6 text-white lg:col-span-5"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/10 text-sky-300">
                <WisperIcon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold tracking-tight">{wisper.title}</h3>
              <span className="ml-auto font-mono text-xs text-slate-400">03</span>
            </div>

            <div className="mt-5 flex items-center gap-4 rounded-xl border border-white/10 bg-c-night/50 px-4 py-3">
              <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-bold tracking-wider text-sky-300 uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-sky-400/70 motion-reduce:hidden" />
                  <span className="relative h-2 w-2 rounded-full bg-sky-400" />
                </span>
                Live
              </span>
              <div aria-hidden className="flex h-9 flex-1 items-center justify-center gap-1">
                {WAVE.map((h, i) => (
                  <motion.span
                    key={i}
                    style={{ height: `${h}%` }}
                    animate={{ scaleY: [1, 0.35, 1] }}
                    transition={{ duration: 1.1 + (i % 4) * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }}
                    className="w-1 rounded-full bg-gradient-to-t from-sky-500 to-blue-300"
                  />
                ))}
              </div>
              <span className="shrink-0 rounded-md bg-white/10 px-2 py-0.5 font-mono text-[11px] text-slate-200">&lt;120ms</span>
            </div>

            <p className="mt-4 mb-5 text-sm leading-relaxed text-slate-300">{wisper.description}</p>
            <div className="mt-auto border-t border-white/10 pt-4">
              <Highlights items={wisper.highlights} dark />
            </div>
          </motion.article>
        </div>
      </Container>
    </MotionConfig>
  );
}
