"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Bot, BrainCircuit, Zap, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Container,
  Highlight,
  subheadingClass,
  revealCard,
  revealHeading,
  showcaseCard,
} from "@/components/ui/section";

interface AiCapability {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  imageUrl?: string;
  isWisper?: boolean;
  description: string;
  highlights: string[];
}

const aiCapabilities: AiCapability[] = [
  {
    id: "llm-dev",
    icon: Bot,
    title: "Custom LLM & Chatbots",
    subtitle: "Enterprise Models",
    imageUrl: "https://images.unsplash.com/photo-1676299081847-824916de030a?q=80&w=800&auto=format&fit=crop",
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
    isWisper: true,
    description:
      "Real-time voice changing, pitch modulation, and zero-latency audio translation for live video calls.",
    highlights: ["Live Video Call Translation", "Real-Time Voice Modulation", "Sub-120ms Latency Audio Stream"],
  },
];

export default function AiSection() {
  return (
    <div className="w-full text-[#0B1739]">
      <Container>
        {/* Sub-header */}
        <motion.h3 {...revealHeading(0)} className={cn(subheadingClass("light"), "mb-8 text-center sm:mb-10")}>
          Pioneering Artificial <Highlight tone="light">Intelligence Projects</Highlight>
        </motion.h3>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {aiCapabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.article key={item.id} {...revealCard(idx)} className={showcaseCard}>
                {/* Preview: image, or a "live engine" screen for Wisper */}
                {item.isWisper ? (
                  <div className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden bg-[radial-gradient(ellipse_at_50%_65%,rgba(56,189,248,0.18),transparent_70%),#0B1739] p-5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-sky-300 uppercase">
                        <span className="h-2 w-2 rounded-full bg-sky-400" />
                        Wisper Engine Active
                      </span>
                      <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-medium text-slate-200">
                        &lt;120ms
                      </span>
                    </div>
                    <div className="my-auto flex h-20 items-center justify-center gap-1.5">
                      {[40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 75, 50, 85].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className="w-1 origin-bottom rounded-full bg-gradient-to-t from-sky-500 to-blue-300 transition-transform duration-500 group-hover:scale-y-110"
                        />
                      ))}
                    </div>
                    <span className="self-start rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-sky-100">
                      {item.subtitle}
                    </span>
                  </div>
                ) : (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={item.imageUrl || ""}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] motion-reduce:transition-none"
                    />
                    <span className="absolute top-3.5 left-3.5 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#0B1739] shadow-sm backdrop-blur-sm">
                      {item.subtitle}
                    </span>
                  </div>
                )}

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-[#1673b8]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h4 className="text-lg font-semibold tracking-tight text-[#0B1739]">{item.title}</h4>
                  </div>

                  <p className="mt-3 mb-auto text-sm leading-relaxed text-slate-600">{item.description}</p>

                  <ul className="mt-5 flex flex-col gap-2 border-t border-slate-200/80 pt-4">
                    {item.highlights.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-slate-700">
                        <CircleCheck className="h-4 w-4 shrink-0 text-[#1673b8]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
