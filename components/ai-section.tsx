"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Bot, BrainCircuit, Zap, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, Highlight, IconTile, cardClass, reveal, subheadingClass } from "@/components/ui/section";

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
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop",
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
    <div className="w-full text-white">
      <Container>
        {/* Sub-header */}
        <motion.h3 {...reveal(0)} className={cn(subheadingClass("dark"), "mb-8 text-center sm:mb-10")}>
          Pioneering Artificial <Highlight>Intelligence Projects</Highlight>
        </motion.h3>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {aiCapabilities.map((item, idx) => {
            return (
              <motion.div
                key={item.id}
                {...reveal(idx)}
                className={cn(cardClass("dark"), "flex flex-col justify-between overflow-hidden p-5 sm:p-6")}
              >
                <div>
                  {/* Banner: image or live waveform */}
                  {item.isWisper ? (
                    <div className="relative mb-5 flex h-36 w-full flex-col justify-between overflow-hidden rounded-xl border border-sky-400/20 bg-[#030a1f] p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-sky-300 uppercase">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
                          </span>
                          Wisper Engine Active
                        </span>
                        <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                          &lt;120ms
                        </span>
                      </div>

                      <div className="my-auto flex h-14 items-center justify-center gap-1">
                        {[40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 75, 50, 85].map((h, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] }}
                            transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse", delay: i * 0.08 }}
                            className="w-1 rounded-full bg-gradient-to-t from-sky-500 to-blue-300"
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="relative mb-5 h-36 w-full overflow-hidden rounded-xl border border-white/10 bg-[#030a1f]">
                      <Image
                        src={item.imageUrl || ""}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030a1f] via-[#030a1f]/30 to-transparent" />
                      <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-[#030a1f]/80 px-2.5 py-0.5 text-[11px] font-semibold text-sky-200 backdrop-blur-md">
                        {item.subtitle}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <IconTile icon={item.icon} tone="dark" className="h-10 w-10" />
                    <h4 className="text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-sky-200">
                      {item.title}
                    </h4>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
                </div>

                <ul className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-4">
                  {item.highlights.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-slate-300">
                      <CircleCheck className="h-4 w-4 shrink-0 text-sky-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
