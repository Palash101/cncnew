"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import HeroOrb from "@/components/hero-orb";
import DecryptedText from "@/components/react-bits/DecryptedText";
import Magnet from "@/components/react-bits/Magnet";
import RotatingText from "@/components/react-bits/RotatingText";
import ShinyText from "@/components/react-bits/ShinyText";
import StarBorder from "@/components/react-bits/StarBorder";
import { useThemeColor } from "@/components/theme-preview/theme-store"; // TEMPORARY: colour testing
import { EASE } from "@/components/ui/section";
import { useQuoteModal } from "@/context/quote-modal-context";

const WORDS = ["Digital Reality", "Enterprise Solutions", "High-Impact Software", "Future Products"];

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
  // Canvas components need plain hex values
  const highlightColor = useThemeColor("--c-highlight", "#3cc8f5");
  const badgeColor = useThemeColor("--c-highlight-200", "#b9dcf2");
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [covered, setCovered] = useState(false);

  // How far the hero is taller than the screen (phones): it scrolls that far before pinning
  const overflow = useMotionValue(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const measure = () => {
      const extra = Math.max(0, section.offsetHeight - window.innerHeight);
      overflow.set(extra);
      section.style.top = `${-extra}px`;
    };
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [overflow]);

  // The hero is sticky: only the copy moves away while the next section slides over it
  const { scrollY } = useScroll();
  const pinnedScroll = useTransform([scrollY, overflow], ([y, extra]: number[]) => Math.max(0, y - extra));
  const contentY = useTransform(pinnedScroll, [0, 700], [0, -220]);
  const contentOpacity = useTransform(pinnedScroll, [0, 450], [1, 0]);

  // Stop all hero animation once the next section fully covers it
  useMotionValueEvent(scrollY, "change", (y) => {
    setCovered(y >= (sectionRef.current?.offsetHeight ?? Infinity));
  });

  return (
    <section
      ref={sectionRef}
      id="top"
      className="sticky top-0 z-0 isolate flex min-h-[max(100svh,640px)] flex-col overflow-hidden bg-c-night text-white"
    >
      {/* Soft light behind the orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_88%,color-mix(in_srgb,var(--c-brand)_32%,transparent),transparent_46%)] lg:bg-[radial-gradient(circle_at_76%_52%,color-mix(in_srgb,var(--c-brand)_34%,transparent),transparent_44%)]"
      />

      <div className="mx-auto grid w-full max-w-[1248px] flex-1 grid-cols-1 px-6 lg:grid-cols-[minmax(0,1.16fr)_minmax(0,0.84fr)] lg:gap-12">
        {/* ───────── Copy (scroll-linked: moves up + fades) ───────── */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="flex flex-col justify-center pt-32 pb-10 will-change-transform lg:pt-28 lg:pb-16"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.p
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-2 text-sm font-semibold"
            >
              <span className="h-2 w-2 rounded-full bg-c-highlight shadow-[0_0_10px_var(--c-highlight)]" />
              <ShinyText text="Design · Technology · Growth" color={badgeColor} shineColor="#ffffff" speed={3} />
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-[clamp(1.25rem,min(8.1vw,11svh),3.5rem)] leading-[1.08] font-bold tracking-[-0.045em] lg:text-[min(4.7vw,10.5svh,3.95rem)]"
            >
              <span className="block whitespace-nowrap">
                <DecryptedText
                  text="Transforming Ideas into"
                  animateOn="view"
                  sequential
                  speed={42}
                  encryptedClassName="text-c-highlight"
                />
              </span>
              <RotatingText
                texts={WORDS}
                effect="blur"
                splitBy="characters"
                staggerDuration={0.012}
                transition={{ duration: 0.35, ease: EASE }}
                rotationInterval={3400}
                auto={!covered && !reduceMotion}
                mainClassName="justify-center whitespace-nowrap pb-[0.12em] text-c-highlight lg:justify-start"
              />
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8"
            >
              Accelerating growth for ambitious brands with technology, experience &amp; innovation for over a
              decade.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
            >
              <Magnet wrapperClassName="w-full sm:w-auto" padding={60} maxOffset={10}>
                <StarBorder
                  onClick={() => openQuoteModal()}
                  color="#ffffff"
                  trailColor={highlightColor}
                  backgroundColor="var(--c-highlight)"
                  borderColor="rgba(255,255,255,0.45)"
                  textColor="var(--c-panel)"
                  radius={14}
                  thickness={1.5}
                  className="group h-14 w-full px-7! text-base font-bold! whitespace-nowrap sm:w-auto"
                >
                  Tell us about your idea
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </StarBorder>
              </Magnet>
              <Link
                href="/#projects"
                className="group inline-flex h-14 w-full items-center justify-center rounded-[14px] border border-white/25 bg-white/5 px-7 text-base font-bold whitespace-nowrap text-white transition-colors hover:border-white/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              >
                View our work
                <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-0.5" />
              </Link>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-6 max-w-sm text-sm leading-6 text-slate-300">
              Share your requirements and our lead technical architects will get back to you within 24 hours.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* ───────── Orb ───────── */}
        <div className="flex items-center justify-center pb-14 lg:pt-20 lg:pb-0">
          <HeroOrb paused={covered} />
        </div>
      </div>
    </section>
  );
}
