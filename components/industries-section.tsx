"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SectionHeader from "@/components/shared/section-header";
import { useQuoteModal } from "@/context/quote-modal-context";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { industries } from "@/lib/data/industries";

export default function IndustriesSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openQuoteModal } = useQuoteModal();

  // GSAP ScrollTrigger continuous progress tracking
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

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
    <div id="projects" ref={containerRef} className="relative h-[650vh] w-full bg-black scroll-mt-20">
      <section className="sticky top-0 h-screen w-full bg-black flex flex-col justify-center overflow-hidden text-white py-6 sm:py-10">
        <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8 w-full">
          <SectionHeader
            title="Our Industry Focus & Impact"
            description="Custom digital engineering solutions designed for global industry leaders."
            className="mb-6 sm:mb-10"
          />

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
