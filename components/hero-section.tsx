"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import HeroBackground from "@/components/hero-background";
import RotatingText from "@/components/react-bits/RotatingText";
import { useThemeColor } from "@/components/theme-preview/theme-store"; // TEMPORARY: colour testing
import { Eyebrow } from "@/components/ui/section";
import { useQuoteModal } from "@/context/quote-modal-context";

const WORDS = ["Digital Reality", "Enterprise Solutions", "High-Impact Software", "Future Products"];

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { openQuoteModal } = useQuoteModal();
  const sectionRef = useRef<HTMLElement>(null);
  const [covered, setCovered] = useState(false);
  // WebGL needs plain hex values
  const night = useThemeColor("--c-night", "#050c20");
  const primary = useThemeColor("--c-brand", "#1673b8");
  const primaryLight = useThemeColor("--c-brand-400", "#3d97d4");
  const highlight = useThemeColor("--c-highlight", "#3cc8f5");

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
      className="sticky top-0 z-0 isolate flex min-h-[max(100svh,600px)] flex-col items-center justify-center overflow-hidden bg-c-night px-6 pt-[clamp(6.5rem,15svh,10rem)] pb-[clamp(6rem,15svh,10rem)] text-center text-white [--gap:clamp(1.25rem,3.4svh,2.5rem)]"
    >
      {/* Background: flowing light threads, fog and drifting specks in the brand colours */}
      <HeroBackground
        colors={{ night, brand: primary, soft: primaryLight, accent: highlight }}
        paused={covered}
      />

      <div className="animate-hero-rise">
        <Eyebrow>Design · Technology · Growth</Eyebrow>
      </div>

      <h1 className="animate-hero-rise mt-[var(--gap)] text-[clamp(1.5rem,min(8.4vw,12.5svh),6.75rem)] leading-[1.06] font-bold tracking-[-0.04em] [animation-delay:90ms]">
        <span className="block whitespace-nowrap">Transforming Ideas into</span>
        {/* Rotating second line (React Bits RotatingText) */}
        <RotatingText
          texts={WORDS}
          auto={!reduceMotion && !covered}
          rotationInterval={3200}
          staggerDuration={0.025}
          staggerFrom="first"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          mainClassName="justify-center whitespace-nowrap text-c-highlight"
          splitLevelClassName="overflow-hidden pb-[0.12em] -mb-[0.12em]"
        />
      </h1>

      <p className="animate-hero-rise mt-[var(--gap)] max-w-2xl text-base leading-7 text-slate-200 [animation-delay:180ms] sm:text-xl sm:leading-9">
        We design and build software that helps ambitious brands grow, backed by more than a decade of engineering
        experience.
      </p>

      <div className="animate-hero-rise mt-[calc(var(--gap)*1.3)] flex w-full flex-col items-center justify-center gap-3 [animation-delay:270ms] sm:w-auto sm:flex-row sm:gap-4">
        <button
          type="button"
          onClick={() => openQuoteModal()}
          className="group inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-semibold text-c-ink shadow-[0_12px_40px_-12px_color-mix(in_srgb,var(--c-highlight)_70%,transparent)] transition-[background-color,box-shadow] duration-300 hover:bg-c-wash-100 hover:shadow-[0_16px_50px_-10px_color-mix(in_srgb,var(--c-highlight)_85%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
        >
          Tell us about your idea
          <ArrowRight
            aria-hidden
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </button>
        <Link
          href="/#projects"
          className="inline-flex h-14 w-full items-center justify-center rounded-xl border border-white/30 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
        >
          View our work
        </Link>
      </div>

      <p className="animate-hero-rise mt-[var(--gap)] max-w-md text-sm leading-6 text-slate-200 [animation-delay:360ms]">
        Share your requirements and our lead technical architects will get back to you within 24 hours.
      </p>

      {/* Scroll cue: hidden on short screens, where the space belongs to the copy */}
      <a
        href="#about"
        aria-label="Scroll to the next section"
        className="animate-hero-rise absolute bottom-7 left-1/2 -ml-3 flex h-10 w-6 justify-center rounded-full border border-white/30 pt-2 [animation-delay:700ms] hover:border-white/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white [@media(max-height:700px)]:hidden"
      >
        <span className="animate-scroll-cue h-2 w-1 rounded-full bg-c-highlight" />
      </a>
    </section>
  );
}
