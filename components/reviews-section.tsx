"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MessageSquareQuote, Quote, Star } from "lucide-react";
import { motion, MotionConfig, useInView, useReducedMotion } from "motion/react";
import AmbientBackground from "@/components/ui/ambient-background";
import { Container, Highlight, SECTION_Y, SectionHeader, TopHairline, reveal } from "@/components/ui/section";
import { cn } from "@/lib/utils";

interface Review {
  name: string;
  /** Whole stars, 1 to 5 */
  rating: number;
  text: string;
  /** What was built for them */
  project: string;
}

// Client reviews from the previous site, in the clients' own words: one entry per review, one per name.
const REVIEWS: Review[] = [
  {
    name: "Fox Services",
    rating: 5,
    project: "iOS App Design & Development",
    text: "Craft and Code, with their stellar app design and development for iPhone, has truly impressed me. As a client, I worked closely with them, and the experience was exceptional. The team, led by Abhilash Sharma, demonstrated creativity, technical prowess, and a commitment to delivering a top-notch iOS app. Craft and Code is my trusted partner for future projects.",
  },
  {
    name: "James Smith",
    rating: 5,
    project: "React Web Design",
    text: "Craft and Code delivered a superb web design on React, surpassing my expectations as a client. Their design expertise, attention to detail, and seamless communication made the process enjoyable. I highly recommend Craft and Code for React web design.",
  },
  {
    name: "Abhishek Sharma",
    rating: 5,
    project: "Laravel Web Development",
    text: "Craft and Code exceeded my expectations as a client seeking web development services. Collaborating on a Laravel project was seamless, thanks to their skilled team. Their commitment to quality, clear communication, and timely deliveries made the experience exceptionally positive. Craft and Code is my go-to for top-notch web development.",
  },
];

const AVERAGE = REVIEWS.reduce((sum, review) => sum + review.rating, 0) / REVIEWS.length;
// Time (ms) each position stays before the slider moves on by itself
const AUTOPLAY = 5500;

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span role="img" aria-label={`${rating} out of 5 stars`} className={cn("inline-flex gap-1", className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          strokeWidth={1.5}
          className={cn("h-4 w-4", i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-white/25")}
        />
      ))}
    </span>
  );
}

/**
 * Client reviews, on the dark surface.
 * One row of cards that slides sideways: three on desktop, two on tablets, one (with the next
 * peeking in) on phones. It is a native scroll-snap row, so swiping and trackpads just work;
 * the arrows and dots move it by one card. It also moves on by itself while it is on screen,
 * and waits while the pointer or keyboard focus is on it.
 * Reduced motion: it never moves by itself.
 */
export default function ReviewsSection() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  const inView = useInView(trackRef, { margin: "-80px" });
  const [index, setIndex] = useState(0);
  // Last position the row can scroll to (cards minus the ones already visible)
  const [last, setLast] = useState(REVIEWS.length - 1);
  const [paused, setPaused] = useState(false);

  /** Distance (px) from one card to the next */
  const step = () => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return 0;
    return card.offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0);
  };

  const measure = useCallback(() => {
    const track = trackRef.current;
    const distance = step();
    if (!track || !distance) return;
    const end = track.scrollWidth - track.clientWidth;
    const lastIndex = Math.max(0, Math.ceil((end - 2) / distance));
    setLast(lastIndex);
    setIndex(track.scrollLeft >= end - 2 ? lastIndex : Math.min(lastIndex, Math.round(track.scrollLeft / distance)));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  const goTo = useCallback((target: number) => {
    trackRef.current?.scrollTo({ left: target * step(), behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (reduceMotion || paused || !inView || last === 0) return;
    const timer = setInterval(() => goTo(index >= last ? 0 : index + 1), AUTOPLAY);
    return () => clearInterval(timer);
  }, [reduceMotion, paused, inView, index, last, goTo]);

  const arrowClass =
    "inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-c-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-default disabled:opacity-35 disabled:hover:border-white/15 disabled:hover:bg-white/[0.04] disabled:hover:text-white";

  return (
    <section
      id="reviews"
      data-header="dark"
      className={cn(
        "relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,var(--c-night)_0%,var(--c-ink)_45%,var(--c-panel)_100%)] text-white",
        SECTION_Y,
      )}
    >
      <TopHairline />
      <AmbientBackground variant="dark" />

      <MotionConfig reducedMotion="user">
        <Container>
          {/* Split header: title left, overall rating and arrows right */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <SectionHeader
              align="left"
              eyebrow="Client Reviews"
              eyebrowIcon={MessageSquareQuote}
              title={
                <>
                  What Our Clients Say About <Highlight>Working With Us</Highlight>
                </>
              }
            />

            <motion.div {...reveal(2)} className="flex items-end justify-between gap-6 lg:pb-2">
              <div>
                <p className="flex items-baseline gap-2">
                  <span className="text-5xl leading-none font-semibold tracking-[-0.04em] tabular-nums">
                    {AVERAGE.toFixed(1)}
                  </span>
                  <span className="text-base text-slate-400">/ 5</span>
                </p>
                <Stars rating={AVERAGE} className="mt-3" />
                <p className="mt-2 text-sm text-slate-300">Average from {REVIEWS.length} client reviews</p>
              </div>

              {/* Arrows and dots only show when some cards are off screen */}
              <div className={cn("flex shrink-0 gap-2.5", last === 0 && "hidden")}>
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  disabled={index === 0}
                  aria-label="Previous reviews"
                  className={arrowClass}
                >
                  <ArrowLeft aria-hidden className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  disabled={index >= last}
                  aria-label="Next reviews"
                  className={arrowClass}
                >
                  <ArrowRight aria-hidden className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* The row. Vertical padding leaves room for the cards' hover lift inside the scroll area. */}
          <motion.div
            {...reveal(3)}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="mt-10 sm:mt-12"
          >
            <ul
              ref={trackRef}
              onScroll={measure}
              aria-label="Client reviews"
              className="-my-3 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {REVIEWS.map((review, i) => (
                <li
                  key={review.name}
                  className="w-[86%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
                >
                  <figure className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-sky-400/20 bg-c-deep-800 p-6 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-sky-400/50 motion-safe:hover:-translate-y-1 sm:p-7">
                    {/* Soft light in the corner, brighter on hover */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-sky-500/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60"
                    />

                    <div className="relative flex items-center justify-between">
                      <Stars rating={review.rating} />
                      <span className="font-mono text-xs text-sky-300/80">
                        {String(i + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
                      </span>
                    </div>

                    <Quote
                      aria-hidden
                      strokeWidth={1.5}
                      className="relative mt-6 h-8 w-8 text-c-highlight transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:scale-110"
                    />

                    <blockquote className="relative mt-4 flex-1 text-base leading-7 text-slate-200">
                      {review.text}
                    </blockquote>

                    <figcaption className="relative mt-7 flex items-center gap-3.5 border-t border-white/10 pt-5">
                      <span
                        aria-hidden
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--c-brand),var(--c-highlight))] text-sm font-semibold text-white"
                      >
                        {initials(review.name)}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[15px] font-semibold">{review.name}</span>
                        <span className="block truncate text-sm text-slate-400">{review.project}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>

            {/* Dots: one per position */}
            <div className={cn("mt-8 flex items-center justify-center gap-2", last === 0 && "hidden")}>
              {Array.from({ length: last + 1 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to review position ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group/dot inline-flex h-6 cursor-pointer items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      i === index ? "w-8 bg-c-highlight" : "w-1.5 bg-white/25 group-hover/dot:bg-white/60",
                    )}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </Container>
      </MotionConfig>
    </section>
  );
}
