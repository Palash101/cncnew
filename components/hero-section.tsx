"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { useQuoteModal } from "@/context/quote-modal-context";

const WORDS = [
  "DIGITAL REALITY",
  "ENTERPRISE SOLUTIONS",
  "HIGH-IMPACT SOFTWARE",
  "FUTURE PRODUCTS",
];

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function HeroSection() {
  const { openQuoteModal } = useQuoteModal();
  const sectionRef = useRef<HTMLElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const lenis = useLenis();

  // Animated Vanta clouds background (lazy-loaded so it never blocks first paint)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let effect: { destroy: () => void } | null = null;

    const load = async () => {
      const [{ default: CLOUDS }, THREE] = await Promise.all([
        import("vanta/dist/vanta.clouds.min"),
        import("three"),
      ]);
      if (cancelled || !cloudsRef.current) return;

      effect = CLOUDS({
        el: cloudsRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
      });
    };

    void load();
    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, []);

  // Rotating headline word
  useEffect(() => {
    const id = window.setInterval(
      () => setWordIndex((i) => (i + 1) % WORDS.length),
      3400,
    );
    return () => window.clearInterval(id);
  }, []);

  const scrollToNext = () => {
    const el = sectionRef.current;
    if (!el) return;
    // Hero is sticky, so scroll until the next section fully covers it
    const top = (el.parentElement?.offsetTop ?? 0) + el.offsetHeight;
    if (lenis) lenis.scrollTo(top, { duration: 1.2 });
    else window.scrollTo({ top, behavior: "smooth" });
  };

  const prevIndex = (wordIndex - 1 + WORDS.length) % WORDS.length;

  // The section is sticky (background stays put); only the text scrolls away
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 700], [0, -260]);
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const contentScale = useTransform(scrollY, [0, 700], [1, 0.94]);
  const cueOpacity = useTransform(scrollY, [0, 120], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="sticky top-0 z-0 isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#effaff] px-6 pt-28 pb-28 text-center text-[#0B1739]"
    >
      {/* ───────── Background: Vanta clouds ───────── */}
      <div ref={cloudsRef} aria-hidden className="absolute inset-0 -z-10" />

      {/* ───────── Content (scroll-linked: moves up + fades while background stays) ───────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative flex w-full max-w-6xl flex-col items-center will-change-transform"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative flex w-full max-w-6xl flex-col items-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-300/50 bg-white/50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-sky-800 shadow-sm backdrop-blur-sm sm:text-[11px]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500 shadow-[0_0_10px_#38bdf8]" />
            Design · Technology · Growth
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.04em] text-[#0B1739] sm:text-6xl md:text-7xl lg:text-[88px]"
          >
            <span className="block">Transforming Ideas into</span>

            {/* All words share one grid cell, so the layout never jumps */}
            <span className="mt-2 grid text-[1.9rem] tracking-[-0.03em] sm:mt-3 sm:text-5xl md:text-6xl lg:text-[72px]">
              {WORDS.map((word, i) => {
                const isActive = i === wordIndex;
                return (
                  <motion.span
                    key={word}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? "0%" : i === prevIndex ? "-40%" : "40%",
                      filter: isActive ? "blur(0px)" : "blur(6px)",
                    }}
                    transition={{ duration: 0.55, ease: EASE }}
                    aria-hidden={!isActive}
                    className={cn(
                      "bg-gradient-to-r from-[#1673b8] via-[#26a9dc] to-[#1673b8] bg-clip-text pb-2 text-transparent [grid-area:1/1]",
                      !isActive && "pointer-events-none select-none",
                    )}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg md:text-xl md:leading-8"
          >
            Accelerating growth for ambitious brands with technology, experience
            &amp; innovation for over a decade.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="group inline-flex h-14 w-full cursor-pointer items-center justify-center rounded-xl bg-[#0B1739] px-7 text-base font-semibold text-white shadow-[0_14px_30px_rgba(11,23,57,0.2)] transition-all hover:-translate-y-1 hover:bg-[#152752] hover:shadow-[0_18px_36px_rgba(11,23,57,0.25)] sm:w-auto"
            >
              Tell us about your idea
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              href="/#projects"
              className="inline-flex h-14 w-full items-center justify-center rounded-xl border border-[#0B1739]/20 bg-white/50 px-7 text-base font-semibold text-[#0B1739] backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/85 sm:w-auto"
            >
              View our work
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: cueOpacity }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <motion.button
          type="button"
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex cursor-pointer flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500 transition-colors hover:text-[#0B1739]"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-sky-600" />
        </motion.button>
      </motion.div>
    </section>
  );
}
