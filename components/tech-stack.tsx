"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Cpu } from "lucide-react";
import {
  IconBrandAndroid,
  IconBrandAngular,
  IconBrandApple,
  IconBrandAws,
  IconBrandAzure,
  IconBrandBitbucket,
  IconBrandCSharp,
  IconBrandCss3,
  IconBrandDocker,
  IconBrandFlutter,
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandGolang,
  IconBrandGoogle,
  IconBrandHtml5,
  IconBrandKotlin,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandPhp,
  IconBrandPython,
  IconBrandReact,
  IconBrandReactNative,
  IconBrandVue,
  IconBrandWebflow,
  IconBrandWordpress,
  type Icon,
} from "@tabler/icons-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import ShapeGrid from "@/components/react-bits/ShapeGrid";
import {
  Container,
  Eyebrow,
  Highlight,
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

// One continuous sequence: what people touch first, what everything runs on last
const ORDER = ["frontend", "mobile", "backend", "cloud"];
const TECHNOLOGIES = ORDER.flatMap((id) => techCategories.find((c) => c.id === id)?.items ?? []);

/**
 * One-colour marks. Most are outline brand icons; the four brands the icon set lacks use the
 * project's own logo file as a silhouette (those files have transparent backgrounds).
 */
const MARKS: Record<string, Icon | string> = {
  "React Js": IconBrandReact,
  "Next Js": IconBrandNextjs,
  "Vue JS": IconBrandVue,
  "Angular Js": IconBrandAngular,
  HTML5: IconBrandHtml5,
  "CSS 3": IconBrandCss3,
  Wordpress: IconBrandWordpress,
  Webflow: IconBrandWebflow,
  "Node Js": IconBrandNodejs,
  ".Net": "/backend/dot net.webp",
  Java: "/backend/java.png",
  Python: IconBrandPython,
  "C#": IconBrandCSharp,
  PHP: IconBrandPhp,
  "Go-Lang": IconBrandGolang,
  Odoo: "/Odoo.png",
  iOS: IconBrandApple,
  Android: IconBrandAndroid,
  Flutter: IconBrandFlutter,
  Kotlin: IconBrandKotlin,
  "React Native": IconBrandReactNative,
  Azure: IconBrandAzure,
  AWS: IconBrandAws,
  "Google Cloud": IconBrandGoogle,
  Docker: IconBrandDocker,
  Bitbucket: IconBrandBitbucket,
  Github: IconBrandGithub,
  Gitlab: IconBrandGitlab,
  Sharepoint: "/cloud devops/SharePoint_.webp",
};

function Mark({ name, className }: { name: string; className?: string }) {
  const mark = MARKS[name];
  if (typeof mark === "string") {
    const image = `url("${encodeURI(mark)}")`;
    return (
      <span
        className={cn("block bg-current", className)}
        style={{ maskImage: image, WebkitMaskImage: image, maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center" }}
      />
    );
  }
  const Glyph = mark;
  return <Glyph className={className} stroke={1.5} />;
}

/* ── the neon colour as plain numbers (the canvas cannot read CSS variables) ── */

const FALLBACK_RGB = "22, 115, 184";
let cachedKey = "";
let cachedRgb = FALLBACK_RGB;

function readNeon() {
  const root = document.documentElement;
  const key = `${root.dataset.palette ?? ""}|${root.getAttribute("style") ?? ""}`;
  if (key === cachedKey) return cachedRgb;
  cachedKey = key;
  const probe = document.createElement("span");
  probe.style.color = "var(--c-brand)";
  document.body.appendChild(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  const context = document.createElement("canvas").getContext("2d");
  if (context) {
    context.fillStyle = color;
    context.fillRect(0, 0, 1, 1);
    cachedRgb = Array.from(context.getImageData(0, 0, 1, 1).data.slice(0, 3)).join(", ");
  }
  return cachedRgb;
}

// The colour-testing panel announces palette changes with this event
const watchNeon = (onChange: () => void) => {
  window.addEventListener("cnc-theme-preview", onChange);
  return () => window.removeEventListener("cnc-theme-preview", onChange);
};

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const prefersStill = () => window.matchMedia(MOTION_QUERY).matches;
const watchMotion = (onChange: () => void) => {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/* ── honeycomb geometry: identical to ShapeGrid's hexagon layout, so marks land in its cells ── */

const SQRT3 = Math.sqrt(3);
const ROWS = 4;

type Slot = { x: number; y: number };

function honeycomb(width: number) {
  const cell = width < 480 ? 76 : width < 900 ? 92 : width < 1700 ? 104 : 116; // height of one hexagon
  const radius = cell / SQRT3;
  const stepX = radius * 1.5;
  const slots: Slot[] = [];
  // Whole cells only: skip the half cells on the left and right edges
  for (let i = 1; i * stepX + radius <= width; i++) {
    for (let row = 0; row < ROWS; row++) {
      slots.push({ x: i * stepX, y: (i % 2 === 1 ? cell / 2 : cell) + row * cell });
    }
  }
  return { cell, slots, height: (ROWS + 0.5) * cell };
}

/** Which technology (by index) each cell holds; null = an empty cell */
function firstFill(slotCount: number) {
  const fill: (number | null)[] = Array(slotCount).fill(null);
  // Most cells lit, but never the whole list: some cells stay empty and the marks keep changing
  const lit = Math.min(24, Math.max(3, Math.round(slotCount * 0.62)));
  // Spread the first marks evenly instead of bunching them in the first columns
  for (let n = 0; n < lit; n++) fill[Math.floor(((n + 0.5) * slotCount) / lit)] = n;
  return { fill, next: lit % TECHNOLOGIES.length };
}

/** The marks: every beat one goes dark and another lights up in a different empty cell */
function Marks({ slots, cell, still }: { slots: Slot[]; cell: number; still: boolean }) {
  const [state, setState] = useState(() => firstFill(slots.length));
  const live = useRef(state);

  useEffect(() => {
    live.current = state;
  }, [state]);

  useEffect(() => {
    const beat = window.setInterval(
      () => {
        const { fill, next } = live.current;
        const lit = fill.flatMap((tech, slot) => (tech === null ? [] : [slot]));
        const empty = fill.flatMap((tech, slot) => (tech === null ? [slot] : []));
        if (!lit.length || !empty.length) return;
        const leaving = lit[Math.floor(Math.random() * lit.length)];
        const arriving = empty[Math.floor(Math.random() * empty.length)];
        // Next technology in line that is not already on screen, so every one gets its turn
        let tech = next;
        while (fill.includes(tech)) tech = (tech + 1) % TECHNOLOGIES.length;
        const updated = [...fill];
        updated[leaving] = null;
        updated[arriving] = tech;
        setState({ fill: updated, next: (tech + 1) % TECHNOLOGIES.length });
      },
      still ? 2600 : 850,
    );
    return () => window.clearInterval(beat);
  }, [still]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 text-c-brand">
      {slots.map((slot, i) => {
        const tech = state.fill[i] === null ? null : TECHNOLOGIES[state.fill[i] as number];
        return (
          <div
            key={i}
            style={{ left: slot.x, top: slot.y, width: cell * 0.86 }}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 justify-center"
          >
            <AnimatePresence>
              {tech && (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0 }}
                  // A tube striking: on, dip, on. Leaving is the same in reverse
                  animate={{ opacity: still ? 1 : [0, 1, 0.2, 1, 0.65, 1] }}
                  exit={{ opacity: still ? 0 : [1, 0.25, 0.8, 0] }}
                  transition={{ duration: still ? 0.8 : 0.75, ease: "linear" }}
                  className="absolute top-1/2 flex -translate-y-1/2 flex-col items-center gap-1.5 [filter:drop-shadow(0_0_5px_color-mix(in_srgb,var(--c-highlight)_90%,transparent))_drop-shadow(0_0_14px_color-mix(in_srgb,var(--c-highlight)_55%,transparent))]"
                >
                  <Mark name={tech.name} className={cell < 90 ? "h-6 w-6" : "h-8 w-8"} />
                  <span className="text-center text-[9px] leading-none font-semibold tracking-[0.06em] whitespace-nowrap uppercase sm:text-[10px]">
                    {tech.name}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Technology stack: one neon honeycomb at the site's content width, with no panel or
 * background of its own.
 * React Bits ShapeGrid draws the hexagon lattice in the brand colour: faint lines, cells that
 * flare up on their own and a glowing trail under the cursor. The technologies are one-colour
 * marks with their names inside the cells, in the same colour as the light. Only some cells are lit
 * at a time; every beat one mark flickers out and the next technology flickers on in another
 * empty cell, so the whole list passes through.
 * Reduced motion: the lattice holds still and marks change with a slow plain fade.
 * The full list is always present as text for screen readers.
 */
export default function TechStack() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const neon = useSyncExternalStore(watchNeon, readNeon, () => FALLBACK_RGB);
  const still = useSyncExternalStore(watchMotion, prefersStill, () => false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const comb = honeycomb(width || 1088);

  return (
    <section id="technology" data-header="light" className="relative w-full overflow-hidden bg-white pt-20 pb-10 text-c-ink sm:pt-28 sm:pb-14">
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


          {/* Lattice at the site's content width (same container as every other section), no panel or background of its own */}
          <motion.div {...reveal(1)} className="mt-10 sm:mt-14">
            <div
                ref={stageRef}
                style={{ height: comb.height }}
                // Lattice and marks dissolve toward all four edges; the corners fade twice, so they go first
                className="relative w-full overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_11%,black_89%,transparent),linear-gradient(to_bottom,transparent,black_13%,black_87%,transparent)] [-webkit-mask-composite:source-in]"
              >
              <ShapeGrid
                shape="hexagon"
                cellSize={comb.cell}
                direction="none"
                lineWidth={1}
                lineColor={`rgba(${neon}, 0.22)`}
                hoverColor={`rgb(${neon})`}
                hoverFillColor={`rgba(${neon}, 0.1)`}
                fillOpacity={0.5}
                glow={1}
                twinkle={0.9}
                trail={0.6}
                  intro
                clickCascade
                backgroundColor="transparent"
              />
              {width > 0 && <Marks key={comb.slots.length} slots={comb.slots} cell={comb.cell} still={still} />}
            </div>
          </motion.div>

          <ul className="sr-only">
            {TECHNOLOGIES.map((tech) => (
              <li key={tech.name}>{tech.name}</li>
            ))}
          </ul>
        </Container>
      </MotionConfig>
    </section>
  );
}
