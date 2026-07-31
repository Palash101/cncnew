import React from "react";
import {
  Cpu,
  Sparkles,
  Bot,
  Network,
  Scan,
  Cloud,
  Search,
  ShieldCheck,
  Radio,
} from "lucide-react";

export interface ExpertiseItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  image: string;
}

export const expertiseItems: ExpertiseItem[] = [
  {
    id: "ai",
    icon: Cpu,
    title: "Artificial Intelligence",
    description:
      "AI only creates value when it fits into how an organization actually works. We help enterprises apply intelligence in ways that improve decisions, reduce manual effort, and support operations at scale.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gen-ai",
    icon: Sparkles,
    title: "Generative AI",
    description:
      "Gen AI is most useful when it becomes part of everyday work. We integrate it into internal knowledge systems, customer interactions, and operational tools, with the controls and governance enterprises expect.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "agentic-ai",
    icon: Bot,
    title: "Agentic AI",
    description:
      "We work with organizations exploring autonomous systems, helping them introduce AI agents that can take action across processes while remaining transparent, supervised, and accountable.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ml",
    icon: Network,
    title: "Machine Learning",
    description:
      "ML in enterprise environments is less about experimentation and more about reliability. We develop models that adapt over time and continue to perform as data, demand, and conditions change.",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cv",
    icon: Scan,
    title: "Computer Vision",
    description:
      "In environments where speed and accuracy matter, vision-based systems can remove friction. We apply computer vision to automate inspection, monitoring, and visual analysis across real operational settings.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud",
    description:
      "Cloud modernization is not a lift-and-shift exercise. We help enterprises rethink how applications and infrastructure are structured so systems remain secure, resilient, and ready to scale over time.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "data-science",
    icon: Search,
    title: "Data Science and Analytics",
    description:
      "Data only becomes useful when teams can rely on it. We design data foundations that support analytics and insight across functions, without adding complexity or dependency.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cybersecurity",
    icon: ShieldCheck,
    title: "Cybersecurity",
    description:
      "Security is treated as a design constraint, not a checklist item. Our systems account for governance, compliance, and risk from the earliest architectural decisions.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "iot",
    icon: Radio,
    title: "IoT",
    description:
      "Connected devices generate value only when their data is usable. We help organizations bring physical systems into their digital landscape, improving visibility and control across operations.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
];
