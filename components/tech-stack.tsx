"use client";

import Image from "next/image";
import { Cpu } from "lucide-react";
import { motion, MotionConfig, type Variants } from "motion/react";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import {
  Container,
  EASE,
  Eyebrow,
  Highlight,
  SECTION_Y,
  descriptionClass,
  headingClass,
  reveal,
  revealHeading,
} from "@/components/ui/section";
import { cn } from "@/lib/utils";

interface TechItem {
  name: string;
  image: string;
  /** The file has a light-grey box and wide margins baked in: lift the grey to white and enlarge the mark ("clean" = no enlarging) */
  boxed?: true | "clean";
}

interface CategoryRow {
  id: string;
  title: string;
  items: TechItem[];
}

const techCategories: CategoryRow[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    items: [
      { name: "React Js", image: "/frontend/react.png" },
      { name: "Next Js", image: "/frontend/nextjs.png" },
      { name: "Vue JS", image: "/frontend/vue.webp", boxed: true },
      { name: "Angular Js", image: "/frontend/angular.png" },
      { name: "HTML5", image: "/frontend/html.png" },
      { name: "CSS 3", image: "/frontend/css.png" },
      { name: "Wordpress", image: "/frontend/wordpress.png" },
      { name: "Webflow", image: "/frontend/webflow.png" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    items: [
      { name: "Node Js", image: "/backend/Node.js_.webp" },
      { name: ".Net", image: "/backend/dot net.webp" },
      { name: "Java", image: "/backend/java.png" },
      { name: "Python", image: "/backend/python.webp" },
      { name: "C#", image: "/backend/c sharp.png" },
      { name: "PHP", image: "/backend/php.png" },
      { name: "Go-Lang", image: "/backend/Go_Logo_B.webp" },
      { name: "Odoo", image: "/Odoo.png" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Frameworks",
    items: [
      { name: "iOS", image: "/mobile framework/ios.webp" },
      { name: "Android", image: "/mobile framework/android.png" },
      { name: "Flutter", image: "/mobile framework/flutter.png" },
      { name: "Kotlin", image: "/mobile framework/Kotlin_icon.webp" },
      { name: "React Native", image: "/mobile framework/react native.png", boxed: "clean" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    items: [
      { name: "Azure", image: "/cloud devops/azure.png" },
      { name: "AWS", image: "/cloud devops/aws-icon.webp" },
      { name: "Google Cloud", image: "/cloud devops/google cloud.webp", boxed: true },
      { name: "Docker", image: "/cloud devops/docker.png", boxed: true },
      { name: "Bitbucket", image: "/cloud devops/bit bucket.png" },
      { name: "Github", image: "/cloud devops/github.png" },
      { name: "Gitlab", image: "/cloud devops/git lab.png" },
      { name: "Sharepoint", image: "/cloud devops/SharePoint_.webp" },
    ],
  },
];

// One continuous field, read left to right: what people touch first, what everything runs on last
const ORDER = ["frontend", "mobile", "backend", "cloud"];
const TECHNOLOGIES = ORDER.flatMap((id) => techCategories.find((c) => c.id === id)?.items ?? []);

const field: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.028, delayChildren: 0.15 } },
};
const mark: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

// The surface behind the cells is what shows through the 1px gaps: those are the grid lines
const LINES = {
  "--spotlight-card-surface": "color-mix(in srgb, var(--c-ink) 13%, #fff)",
  "--spotlight-card-border": "color-mix(in srgb, var(--c-ink) 14%, #fff)",
  "--spotlight-card-shadow": "0 30px 60px -44px color-mix(in srgb, var(--c-ink) 45%, transparent)",
} as React.CSSProperties;

/**
 * Technology stack, on white: one connected field instead of a panel per discipline.
 * Every logo sits in the same ruled grid (10 × 3 on desktop down to 3 × 10 on phones, so all
 * of them are always on screen), and the last cell closes the grid with the total.
 *
 * Motion (React Bits SpotlightCard): a soft brand-coloured light lives in the grid lines.
 * It drifts slowly on its own, follows the cursor on pointer devices, and stays still for
 * reduced motion. The logos themselves never move after their staggered entrance, except a
 * small lift on hover. Cells stay pure white: several logo files have a white box baked in,
 * which would show on any tinted cell.
 */
export default function TechStack() {
  return (
    <section id="technology" data-header="light" className={cn("relative w-full bg-white text-c-ink", SECTION_Y)}>
      <MotionConfig reducedMotion="user">
        <Container>
          <motion.div {...reveal(0)}>
            <Eyebrow icon={Cpu} tone="light">
              Technology
            </Eyebrow>
          </motion.div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <motion.h2 {...revealHeading(1)} className={headingClass("light")}>
              Our <Highlight tone="light">Technology Stack</Highlight>
            </motion.h2>
            <motion.p {...reveal(2)} className={cn(descriptionClass("light"), "max-w-xl")}>
              Empowering enterprise applications with modern, battle-tested technologies.
            </motion.p>
          </div>

          <motion.div {...reveal(1)} className="mt-12 sm:mt-16">
            <SpotlightCard
              theme="light"
              spotlightColor="var(--c-brand)"
              spotlightSize={380}
              softness={0.85}
              intensity={0.9}
              borderGlow={0.9}
              proximity={120}
              smoothing={0.45}
              ambient
              flare={false}
              style={LINES}
              className="rounded-2xl p-0 sm:rounded-3xl"
            >
              <motion.ul
                variants={field}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-3 gap-px sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10"
              >
                {TECHNOLOGIES.map((tech) => (
                  <li key={tech.name} className="group flex h-28 items-center justify-center bg-white sm:h-32">
                    <motion.div variants={mark} className="flex flex-col items-center gap-3 px-1">
                      <span className="flex h-10 w-10 items-center justify-center overflow-hidden transition-transform duration-300 ease-out motion-safe:group-hover:scale-110 sm:h-11 sm:w-11">
                        <Image
                          src={tech.image}
                          alt=""
                          width={44}
                          height={44}
                          className={cn(
                            "h-full w-full object-contain",
                            tech.boxed && "contrast-[1.28]",
                            tech.boxed === true && "scale-125",
                          )}
                        />
                      </span>
                      <span className="text-center text-[13px] leading-tight font-medium text-c-ink/70 transition-colors duration-300 group-hover:text-c-ink">
                        {tech.name}
                      </span>
                    </motion.div>
                  </li>
                ))}

                {/* Closing cell: completes the last row */}
                <li className="flex h-28 items-center justify-center bg-c-ink text-white sm:h-32">
                  <motion.div variants={mark} className="flex flex-col items-center gap-1.5">
                    <span className="text-[2rem] leading-none font-semibold tracking-[-0.04em] tabular-nums sm:text-4xl">
                      {TECHNOLOGIES.length}
                    </span>
                    <span className="text-[13px] leading-tight font-medium text-c-highlight-200">technologies</span>
                  </motion.div>
                </li>
              </motion.ul>
            </SpotlightCard>
          </motion.div>
        </Container>
      </MotionConfig>
    </section>
  );
}
