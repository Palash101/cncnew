"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import Aurora from "@/components/react-bits/Aurora";
import { useThemeColor } from "@/components/theme-preview/theme-store"; // TEMPORARY: colour testing
import { useQuoteModal } from "@/context/quote-modal-context";

export default function HeroSection() {
  const { openQuoteModal } = useQuoteModal();
  const sectionRef = useRef<HTMLElement>(null);
  const [covered, setCovered] = useState(false);
  // WebGL needs plain hex values
  const primary = useThemeColor("--c-brand", "#1673b8");
  const primaryLight = useThemeColor("--c-brand-400", "#3d97d4");

  // The hero is sticky. When it is taller than the screen (small phones) it scrolls
  // to its end first, so nothing is covered before it has been seen.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const pin = () => {
      section.style.top = `${Math.min(0, window.innerHeight - section.offsetHeight)}px`;
    };
    const observer = new ResizeObserver(pin);
    observer.observe(section);
    window.addEventListener("resize", pin);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", pin);
    };
  }, []);

  // Pause the background once the next section fully covers the hero
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setCovered(y >= (sectionRef.current?.offsetHeight ?? Infinity));
  });

  return (
    <section
      ref={sectionRef}
      id="top"
      data-header="dark"
      className="sticky top-0 z-0 isolate flex min-h-[max(100svh,600px)] flex-col items-center justify-center overflow-hidden bg-c-night px-6 pt-32 pb-36 text-center text-white"
    >
      {/* Background: one slow glow rising from the bottom edge (React Bits Aurora) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Aurora
          colorStops={[primary, primaryLight, primary]} // one colour family, so the blend never turns muddy
          direction="bottom"
          height={0.24}
          amplitude={0.6}
          blend={0.7}
          speed={0.45}
          glow={0.4}
          opacity={0.6}
          mouseInteraction={false}
          dpr={1}
          paused={covered}
        />
      </div>

      <p className="text-sm font-semibold text-c-highlight-200 sm:text-base">Design · Technology · Growth</p>

      <h1 className="mt-5 text-[clamp(1.5rem,min(8.4vw,12svh),5.25rem)] leading-[1.06] font-bold tracking-[-0.04em]">
        <span className="block whitespace-nowrap">Transforming Ideas into</span>
        <span className="block text-c-highlight">Digital Reality</span>
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
        Accelerating growth for ambitious brands with technology, experience &amp; innovation for over a decade.
      </p>

      <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
        <button
          type="button"
          onClick={() => openQuoteModal()}
          className="inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-7 text-base font-semibold text-c-ink hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
        >
          Tell us about your idea
          <ArrowRight aria-hidden className="h-5 w-5" />
        </button>
        <Link
          href="/#projects"
          className="inline-flex h-13 w-full items-center justify-center rounded-xl border border-white/30 px-7 text-base font-semibold text-white hover:border-white/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
        >
          View our work
        </Link>
      </div>

      <p className="mt-6 max-w-md text-sm leading-6 text-slate-100">
        Share your requirements and our lead technical architects will get back to you within 24 hours.
      </p>
    </section>
  );
}
