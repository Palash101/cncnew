import { Plus_Jakarta_Sans } from "next/font/google";
import {
  HeartPulse,
  ShoppingCart,
  Landmark,
  GraduationCap,
  Factory,
  Store,
  Building2,
  Home,
  Truck,
  ArrowUpRight,
} from "lucide-react";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

interface IndustryItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const industries: IndustryItem[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    description:
      "It empowers healthcare providers and facilities with secure and compliant digital solutions elevating patient experience.",
    icon: HeartPulse,
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    description:
      "Crafting scalable ecommerce platforms that improves customer experiences effectively driving customer growth.",
    icon: ShoppingCart,
  },
  {
    id: "finance",
    title: "Finance",
    description:
      "Providing innovative opportunities for data-driven decisions in Fintech industries elevating operational efficiency and trust.",
    icon: Landmark,
  },
  {
    id: "edtech",
    title: "Ed-Tech",
    description:
      "Crafting unique learning platforms that allow accessible and engaging educational experiences.",
    icon: GraduationCap,
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description:
      "Enabling facilities to automate operations and create a streamlined approach to efficiency.",
    icon: Factory,
  },
  {
    id: "retail",
    title: "Retail",
    description:
      "Helping retail businesses advance customer engagement, streamline operations and accelerate growth.",
    icon: Store,
  },
  {
    id: "government-saas",
    title: "Government & SaaS",
    description:
      "Enhancing faster & efficient operations through automation solutions for SaaS businesses and government agencies.",
    icon: Building2,
  },
  {
    id: "realestate",
    title: "Real Estate",
    description:
      "Driving business growth with digital transformation solutions for real estate businesses with property management, transactions, and others.",
    icon: Home,
  },
  {
    id: "logistics",
    title: "Logistics",
    description:
      "It enhances visibility and efficiency while managing access control across modern supply chain ecosystems.",
    icon: Truck,
  },
];

export default function IndustriesSection() {
  return (
    <section className={`w-full bg-[#0B1739] py-20 sm:py-28 ${font.className}`}>
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Our expertise lies in top Industries & proven results
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-300 sm:text-lg">
            We provide a diverse range of solutions for distinct industries that amplify and boost business performance.
          </p>
        </div>

        {/* 3x3 Grid of Industry Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-7">
          {industries.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-700/50 bg-[#131F42] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-600 hover:bg-[#182752] hover:shadow-xl"
              >
                <div>
                  {/* Icon Badge */}
                  <div className="mb-6 inline-flex rounded-xl bg-[#1E2B58] p-3 text-sky-400 border border-slate-700/60 shadow-xs transition-colors group-hover:bg-sky-500 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-slate-300 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Explore More Action */}
                <div className="mt-7 pt-2">
                  <a
                    href={`#${item.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-200 transition-colors hover:text-sky-400"
                  >
                    <span>Explore More</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
