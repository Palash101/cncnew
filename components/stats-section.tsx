"use client";

import { useEffect, useRef } from "react";
import { animate, motion, MotionConfig, useInView } from "motion/react";
import { Award, Globe, Laptop, Smartphone, Users, type LucideIcon } from "lucide-react";
import StatsBackground from "@/components/stats-background";
import { cn } from "@/lib/utils";
import { Container, EASE, Eyebrow, Highlight, headingClass, reveal, revealHeading } from "@/components/ui/section";

type Stat = { value: number; label: string; description: string; icon: LucideIcon };

const STATS: Stat[] = [
  { value: 15, label: "Years Experience", description: "Delivering top-tier software", icon: Award },
  { value: 50, label: "Global Clients", description: "Trusted partners worldwide", icon: Users },
  { value: 50, label: "Mobile Apps", description: "iOS & Android solutions", icon: Smartphone },
  { value: 100, label: "Web Apps", description: "Scalable web platforms", icon: Laptop },
];

/** Counts up once, the first time it scrolls into view (static for reduced motion) */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (node.textContent = String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{to}</span>;
}

/**
 * Company introduction & statistics.
 * Colour-blocked split: statement on navy; the numbers sit on one huge brand-blue curve
 * (a planet's edge) that bleeds off the screen. Right half on desktop, lower half on phones.
 */
export default function StatsSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#0B1739_0%,#0d1f4a_100%)] text-white">
      <StatsBackground />

      <MotionConfig reducedMotion="user">
        {/* Desktop curve: a circle wider than the screen, its left edge touching the centre line */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: 140 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE }}
            className="absolute top-1/2 left-1/2 aspect-square w-[max(1400px,100vw)] -translate-y-1/2 rounded-full bg-[linear-gradient(100deg,#1673b8_0%,#1462a3_22%,#124f93_50%)] shadow-[-30px_0_90px_-20px_rgba(56,189,248,0.45),inset_2px_0_0_rgba(186,230,253,0.55)]"
          />
        </div>

        <Container>
          <div className="lg:grid lg:min-h-[640px] lg:grid-cols-2 lg:items-center">
            {/* Statement */}
            <div className="pt-20 pb-14 sm:pt-24 lg:py-24 lg:pr-12">
              <motion.div {...reveal(0)}>
                <Eyebrow icon={Globe}>Enterprise Global Network</Eyebrow>
              </motion.div>

              <motion.h2 {...revealHeading(1)} className={cn(headingClass("dark"), "mt-6")}>
                Connecting Visionaries with Scalable <Highlight>Digital Excellence</Highlight>
              </motion.h2>

              <motion.p {...reveal(2)} className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                With years of deep technical mastery, Craft and Code bridges complex infrastructure with intuitive user
                experiences. We empower organizations globally through continuous digital transformation and resilient
                systems.
              </motion.p>
            </div>

            {/* Numbers */}
            <div className="relative isolate pt-20 pb-16 lg:py-24 lg:pl-20">
              {/* Phone / tablet curve: full-bleed, rising from below */}
              <div
                aria-hidden
                className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 rounded-t-[50%_56px] bg-[linear-gradient(180deg,#1673b8_0%,#124f93_70%)] shadow-[0_-20px_60px_-20px_rgba(56,189,248,0.45),inset_0_2px_0_rgba(186,230,253,0.5)] lg:hidden"
              />

              <ul className="grid grid-cols-2">
                {STATS.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.li
                      key={stat.label}
                      {...reveal(i)}
                      className={cn(
                        "border-white/25",
                        i % 2 === 0 ? "pr-5 sm:pr-8" : "border-l pl-5 sm:pl-8",
                        i < 2 ? "pb-9 lg:pb-12" : "border-t pt-9 lg:pt-12"
                      )}
                    >
                      <Icon aria-hidden className="h-6 w-6 text-sky-200" strokeWidth={1.75} />
                      <p className="mt-4 text-5xl leading-none font-semibold tracking-[-0.04em] tabular-nums sm:text-6xl xl:text-7xl">
                        <CountUp to={stat.value} />
                        <span className="text-sky-200">+</span>
                      </p>
                      <p className="mt-4 text-base font-semibold sm:text-lg">{stat.label}</p>
                      <p className="mt-1 text-sm leading-relaxed text-sky-50">{stat.description}</p>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Container>
      </MotionConfig>
    </section>
  );
}
