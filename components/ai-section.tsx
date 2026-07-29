"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { motion } from "motion/react";
import {
  Bot,
  BrainCircuit,
  Mic,
  Languages,
  Sparkles,
  Sliders,
  Volume2,
  Video,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

interface AiCapability {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  imageUrl: string;
  description: string;
  highlights: string[];
  gradient: string;
  borderColor: string;
}

const aiCapabilities: AiCapability[] = [
  {
    id: "llm-dev",
    icon: Bot,
    title: "Custom LLM & Conversational Models",
    subtitle: "ChatGPT-like Enterprise Models",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1000&auto=format&fit=crop",
    description:
      "We design, train, and deploy private conversational AI models built on your custom data. Keep full data sovereignty with offline enterprise LLMs.",
    highlights: [
      "Custom ChatGPT-like Chatbots",
      "Private Enterprise Data Sovereignty",
      "Multi-Turn Context & Memory",
    ],
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    borderColor: "hover:border-cyan-500/50",
  },
  {
    id: "fine-tuning",
    icon: BrainCircuit,
    title: "Model Fine-Tuning & RAG Pipelines",
    subtitle: "Domain-Specific Intelligence",
    imageUrl:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    description:
      "Fine-tune open-source models (LLaMA 3, DeepSeek, Mistral) using QLoRA/LoRA techniques combined with advanced RAG vector search.",
    highlights: [
      "QLoRA / LoRA Weight Adaptation",
      "Vector Search (Pinecone/Milvus RAG)",
      "High Precision & Reduced Hallucinations",
    ],
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    borderColor: "hover:border-indigo-500/50",
  },
];

export default function AiSection() {
  const [activeWisperTab, setActiveWisperTab] = useState<"translation" | "voice">("translation");

  return (
    <section className={`relative w-full bg-slate-950 py-10 sm:py-14 md:py-16 overflow-hidden text-white ${font.className}`}>
      {/* Background Animated Glows & Mesh Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute bottom-1/3 -right-32 h-64 w-64 rounded-full bg-indigo-500/20 blur-[120px]" />
        <div className="absolute top-2/3 left-1/3 h-64 w-64 rounded-full bg-purple-500/15 blur-[110px]" />

        {/* Futuristic SVG Cyber Grid */}
        <svg className="absolute inset-0 h-full w-full stroke-cyan-500/10 [mask-image:radial-gradient(100%_100%_at_top_center,white_40%,transparent_90%)]">
          <defs>
            <pattern id="ai-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ai-grid)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300 backdrop-blur-md mb-2.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Next-Gen AI & LLM Solutions</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight"
          >
            Pioneering Artificial{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Intelligence Solutions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal"
          >
            From custom ChatGPT-like conversational models and fine-tuned LLM architectures to our flagship Wisper AI voice transformation agent, we deliver cutting-edge AI systems.
          </motion.p>
        </div>

        {/* AI Capabilities Cards (LLM Dev & Fine-Tuning) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-8 sm:mb-12">
          {aiCapabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 ${item.borderColor} hover:shadow-xl hover:shadow-cyan-500/10`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Card Image Banner */}
                  <div className="relative h-28 sm:h-32 w-full rounded-xl overflow-hidden border border-slate-800/80 mb-3.5 bg-slate-950">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="rounded-full bg-slate-950/90 border border-slate-700/80 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-300 backdrop-blur-md">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-col gap-1.5">
                    {item.highlights.map((point) => (
                      <div key={point} className="flex items-center gap-2 text-xs font-medium text-slate-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Product Banner: WISPER AI AGENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/80 p-5 sm:p-7 md:p-8 shadow-xl overflow-hidden"
        >
          {/* Ambient Lighting Orbs inside Banner */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            
            {/* Wisper Info */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-500/20 px-3 py-0.5 text-[11px] font-bold text-cyan-300 mb-2.5 backdrop-blur-md">
                <Zap className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400" />
                <span>Featured AI Innovation</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Wisper AI Agent
              </h3>

              <p className="mt-1 text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Real-Time Voice Transformation & Video Call Audio Translation
              </p>

              <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Wisper is our proprietary AI voice agent designed for zero-latency audio translation in live video meetings and real-time voice changing & pitch modulation.
              </p>

              {/* Wisper Tab Switches */}
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveWisperTab("translation")}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    activeWisperTab === "translation"
                      ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700"
                  }`}
                >
                  <Languages className="h-3.5 w-3.5" />
                  <span>Video Call Audio Translation</span>
                </button>

                <button
                  onClick={() => setActiveWisperTab("voice")}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    activeWisperTab === "voice"
                      ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700"
                  }`}
                >
                  <Sliders className="h-3.5 w-3.5" />
                  <span>Voice Changer Engine</span>
                </button>
              </div>

              {/* Dynamic Detail Text based on active Tab */}
              <div className="mt-3.5 rounded-xl border border-slate-800 bg-slate-900/80 p-3 sm:p-4 backdrop-blur-md">
                {activeWisperTab === "translation" ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                      <Video className="h-3.5 w-3.5" />
                      <span>Live Video Call Translation</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                      Instant speech-to-speech multi-language translation during live Google Meet, Zoom, or WebRTC calls with synchronized lip sync and tone preservation.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                      <Mic className="h-3.5 w-3.5" />
                      <span>AI Voice Changer & Modulation</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                      Transform pitch, timbre, accent, and identity on live microphone streams for gaming, anonymous communication, and customer service bots.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Animated Visual Widget */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md rounded-xl border border-cyan-500/30 bg-slate-900/90 p-4 shadow-xl relative">
                
                {/* Simulated Live Audio Stream Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
                    </span>
                    <span className="text-[11px] font-bold text-cyan-300 tracking-wider uppercase">
                      Wisper Agent Active
                    </span>
                  </div>

                  <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                    Latency &lt; 120ms
                  </span>
                </div>

                {/* Animated Waveform Animation */}
                <div className="my-4 flex items-center justify-center gap-1.5 h-12 bg-slate-950/80 rounded-lg px-3 border border-slate-800">
                  {[40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 75, 50, 85, 40].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.08,
                      }}
                      className="w-1 rounded-full bg-gradient-to-t from-cyan-500 to-indigo-400"
                    />
                  ))}
                </div>

                {/* Feature Chips */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800 text-left">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-300">
                      <Volume2 className="h-3 w-3 text-cyan-400 shrink-0" />
                      <span className="truncate">Natural Voice Synthesis</span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800 text-left">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-300">
                      <ShieldCheck className="h-3 w-3 text-cyan-400 shrink-0" />
                      <span className="truncate">End-to-End Encryption</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
