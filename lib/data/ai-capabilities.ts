import React from "react";
import { Bot, BrainCircuit, Zap } from "lucide-react";

export interface AiCapability {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  imageUrl?: string;
  isWisper?: boolean;
  description: string;
  highlights: string[];
  gradient: string;
  borderColor: string;
}

export const aiCapabilities: AiCapability[] = [
  {
    id: "llm-dev",
    icon: Bot,
    title: "Custom LLM & Chatbots",
    subtitle: "Enterprise Models",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop",
    description:
      "Train & deploy private conversational AI models on custom data with full enterprise data sovereignty.",
    highlights: [
      "Custom ChatGPT Chatbots",
      "Private Enterprise Sovereignty",
      "Multi-Turn Context & Memory",
    ],
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    borderColor: "hover:border-cyan-500/50",
  },
  {
    id: "fine-tuning",
    icon: BrainCircuit,
    title: "Fine-Tuning & RAG",
    subtitle: "Domain Intelligence",
    imageUrl:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop",
    description:
      "Fine-tune open-source models (LLaMA 3, DeepSeek) with QLoRA/LoRA techniques and vector RAG search.",
    highlights: [
      "QLoRA / LoRA Weight Adaptation",
      "Vector Search (Pinecone/Milvus)",
      "High Precision & Reduced Hallucinations",
    ],
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    borderColor: "hover:border-indigo-500/50",
  },
  {
    id: "wisper-agent",
    icon: Zap,
    title: "Wisper AI Agent",
    subtitle: "Voice & Audio Translation",
    isWisper: true,
    description:
      "Real-time voice changing, pitch modulation, and zero-latency audio translation for live video calls.",
    highlights: [
      "Live Video Call Translation",
      "Real-Time Voice Modulation",
      "Sub-120ms Latency Audio Stream",
    ],
    gradient: "from-sky-500/20 via-cyan-500/10 to-transparent",
    borderColor: "hover:border-sky-500/50",
  },
];
