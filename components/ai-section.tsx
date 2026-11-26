"use client";

import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
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
      "Train & deploy private conversational AI models on custom data with full enterprise data sovereignty.",
    highlights: ["Custom ChatGPT Chatbots", "Private Enterprise Sovereignty", "Multi-Turn Context & Memory"],
  },
  {
    id: "fine-tuning",
    icon: BrainCircuit,
    title: "Fine-Tuning & RAG",
    subtitle: "Domain Intelligence",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop",
    description:
      "Fine-tune open-source models (LLaMA 3, DeepSeek) with QLoRA/LoRA techniques and vector RAG search.",
    highlights: [
      "QLoRA / LoRA Weight Adaptation",
      "Vector Search (Pinecone/Milvus)",
      "High Precision & Reduced Hallucinations",
    ],
  },
  {
    id: "wisper-agent",
    icon: Zap,
    title: "Wisper AI Agent",
    subtitle: "Voice & Audio Translation",
    description:
      "Real-time voice changing, pitch modulation, and zero-latency audio translation for live video calls.",
    highlights: ["Live Video Call Translation", "Real-Time Voice Modulation", "Sub-120ms Latency Audio Stream"],
  },
];

const WAVE = [40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 75, 50, 85, 40, 65, 30, 70];

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

          {/* 02 — Light card, picture beside the text */}
          <motion.article
            {...revealCard(1)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_14px_40px_-26px_color-mix(in_srgb,var(--c-ink)_35%,transparent)] sm:flex-row lg:col-span-5"
          >
            <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-c-brand-100 sm:aspect-auto sm:w-2/5 lg:w-[30%]">
              <Image
                src={tuning.imageUrl!}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 240px"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] motion-reduce:transition-none"
              />
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
