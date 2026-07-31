import {
  Sparkles,
  Layers,
  Globe,
  Smartphone,
  Cpu,
} from "lucide-react";

export interface Project {
  id: string;
  title: string;
  category: "web" | "mobile" | "odoo" | "cloud";
  categoryLabel: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  metrics?: string;
  demoUrl?: string;
  featured?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "proj-1",
    title: "Enterprise ERP & CRM Suite",
    category: "odoo",
    categoryLabel: "Odoo ERP",
    description:
      "Custom Odoo 18 implementation featuring automated accounting, multi-warehouse inventory tracking, and real-time sales reporting.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    techStack: ["Odoo 18", "Python", "PostgreSQL", "OWL Framework"],
    metrics: "45% Operational Efficiency Boost",
    demoUrl: "#",
    featured: true,
  },
  {
    id: "proj-2",
    title: "Next-Gen Fintech Trading Platform",
    category: "web",
    categoryLabel: "Web Application",
    description:
      "High-frequency web trading dashboard with real-time WebSocket market updates, interactive charts, and secure wallet management.",
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop",
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Node.js"],
    metrics: "1M+ Daily Transactions",
    demoUrl: "#",
    featured: true,
  },
  {
    id: "proj-3",
    title: "Smart Logistics & Fleet Tracker",
    category: "mobile",
    categoryLabel: "Mobile App",
    description:
      "Cross-platform mobile application providing real-time GPS fleet tracking, driver dispatch, and automated proof of delivery.",
    imageUrl:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1000&auto=format&fit=crop",
    techStack: ["Flutter", "Dart", "Firebase", "Google Maps API"],
    metrics: "50k+ Active Mobile Drivers",
    demoUrl: "#",
    featured: true,
  },
  {
    id: "proj-4",
    title: "AI Healthcare Diagnostics Portal",
    category: "cloud",
    categoryLabel: "Cloud & SaaS",
    description:
      "HIPAA-compliant AI diagnostic web platform analyzing patient scans, managing medical records, and scheduling telehealth visits.",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
    techStack: ["React", "Python", "FastAPI", "AWS Cloud"],
    metrics: "99.9% System Uptime",
    demoUrl: "#",
  },
  {
    id: "proj-5",
    title: "Omnichannel E-Commerce Platform",
    category: "web",
    categoryLabel: "Web Application",
    description:
      "Headless e-commerce storefront integrated with inventory management, custom payment gateways, and localized multi-language checkout.",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0a67daf40955?q=80&w=1000&auto=format&fit=crop",
    techStack: ["Next.js", "GraphQL", "Stripe API", "Tailwind CSS"],
    metrics: "3x Checkout Conversion Rate",
    demoUrl: "#",
  },
  {
    id: "proj-6",
    title: "Supply Chain & Order Management",
    category: "odoo",
    categoryLabel: "Odoo ERP",
    description:
      "Tailor-made Odoo module bridging global suppliers with local logistics centers for automated purchase orders and stock alerts.",
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
    techStack: ["Odoo 17", "Python", "XML-RPC", "Docker"],
    metrics: "30k+ Orders Managed Daily",
    demoUrl: "#",
  },
];

export const categories = [
  { id: "all", label: "All Projects", icon: Layers },
  { id: "web", label: "Web Apps", icon: Globe },
  { id: "mobile", label: "Mobile Apps", icon: Smartphone },
  { id: "odoo", label: "Odoo ERP", icon: Cpu },
  { id: "cloud", label: "Cloud & SaaS", icon: Sparkles },
];
