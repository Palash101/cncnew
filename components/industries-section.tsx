"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useQuoteModal } from "@/context/quote-modal-context";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface IndustryItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const industries: IndustryItem[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    description:
      "We engineer secure, HIPAA-compliant digital healthcare platforms, telemedicine mobile apps, patient portals, and automated EHR integration systems.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ecommerce",
    title: "eCommerce",
    description:
      "Crafting scalable omnichannel ecommerce platforms, headless checkout experiences, inventory management systems, and personalized shopping AI.",
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "finance",
    title: "Banking & Finance",
    description:
      "Providing high-frequency payment gateways, data-driven Fintech analytics, digital wallet ecosystems, and core banking ledger integrations.",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ev",
    title: "Electric Vehicles (EV)",
    description:
      "Building smart battery management systems, fleet telemetry analytics, real-time IoT charging station networks, and connected vehicle applications.",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "saas",
    title: "SaaS & Enterprise",
    description:
      "Enhancing enterprise operations through custom multi-tenant SaaS architecture, cloud workflow automation, and scalable API platforms.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "social-media",
    title: "Social Media",
    description:
      "We develop social media platforms that enhance community building with AI-Powered Content Moderation, predictive trend analysis, and real-time messaging.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "on-demand",
    title: "On-Demand & Delivery",
    description:
      "Developing real-time order tracking, multi-vendor dispatch engines, driver route optimization, and instant delivery marketplace platforms.",
    image:
      "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "education",
    title: "Education & Ed-Tech",
    description:
      "Crafting unique learning platforms, AI-driven adaptive assessment engines, virtual classrooms, and enterprise LMS integrations.",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "realestate",
    title: "Real Estate",
    description:
      "Driving business growth with digital transformation solutions for real estate businesses with property management, 3D tours, and transaction portals.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
  },
];

export default function IndustriesSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openQuoteModal } = useQuoteModal();

  // GSAP ScrollTrigger continuous progress tracking
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Continuous progress index (0.0 to industries.length - 1)
  const progressIndex = scrollProgress * (industries.length - 1);
  const activeStep = Math.min(
    industries.length - 1,
    Math.max(0, Math.round(progressIndex))
  );
  const activeIndustry = industries[activeStep];

  return (
    <div id="industries" ref={containerRef} className="relative h-[650vh] w-full bg-black">
      <section className="sticky top-0 h-screen w-full bg-black flex flex-col justify-center overflow-hidden text-white py-6 sm:py-10">
        <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8 w-full">
          {/* Section Title */}
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-wide text-white">
              Our Industry Focus & Impact
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Custom digital engineering solutions designed for global industry leaders.
            </p>
          </div>

          {/* 3-Column Interactive Layout: Left Title Track, Center Image, Right Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Continuous Sliding Track of Titles (Left-most) */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start justify-center h-[320px] sm:h-[380px] overflow-hidden relative order-1">
              {/* Radial gradient mask for smooth fading at top and bottom */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black via-black/85 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/85 to-transparent z-10" />

              {/* Continuous Sliding Track */}
              <div
                className="flex flex-col items-center lg:items-start gap-4 transform-gpu"
                style={{
                  transform: `translate3d(0, ${164 - progressIndex * 52}px, 0)`,
                  willChange: "transform",
                }}
              >
                {industries.map((item, idx) => {
                  const distance = Math.abs(idx - progressIndex);
                  const isActive = activeStep === idx;
                  const scale = Math.max(0.85, 1.15 - distance * 0.25);
                  const opacity = Math.max(0.3, 1 - distance * 0.45);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (containerRef.current) {
                          const targetScroll =
                            containerRef.current.offsetTop +
                            (idx / (industries.length - 1)) *
                              (containerRef.current.offsetHeight - window.innerHeight);
                          window.scrollTo({ top: targetScroll, behavior: "smooth" });
                        }
                      }}
                      className="whitespace-nowrap cursor-pointer font-bold h-9 flex items-center justify-center lg:justify-start transition-colors duration-300 origin-center lg:origin-left"
                      style={{
                        transform: `scale(${scale})`,
                        opacity: opacity,
                      }}
                    >
                      <span
                        className={
                          isActive
                            ? "text-xl sm:text-2xl md:text-3xl text-white drop-shadow-[0_0_15px_rgba(56,189,248,0.7)]"
                            : "text-base sm:text-lg text-slate-400"
                        }
                      >
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Center Column: Active Industry Feature Image (Center) */}
            <div className="lg:col-span-4 flex justify-center order-2">
              <div className="relative w-full max-w-[340px] sm:max-w-[420px] h-[230px] sm:h-[300px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-sky-500/10 bg-slate-900 transform-gpu">
                {industries.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      activeStep === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-400/30 px-3 py-1 text-xs font-bold text-sky-300">
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Active Industry Description & Know More CTA (Right-most) */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 order-3">
              <div
                key={activeIndustry.id}
                className="animate-in fade-in slide-in-from-bottom-2 duration-400 space-y-4"
              >
                <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal max-w-md">
                  {activeIndustry.description}
                </p>

                <div>
                  <button
                    type="button"
                    onClick={() => openQuoteModal()}
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 hover:bg-white hover:text-black px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all cursor-pointer group shadow-lg"
                  >
                    <span>Know More</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
