"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
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
// How far in from each edge the lattice fades out (share of width / height)
const FADE_X = 0.11;
const FADE_Y = 0.13;

type Slot = { x: number; y: number; opacity: number };

function honeycomb(width: number) {
  const cell = width < 480 ? 76 : width < 900 ? 92 : width < 1700 ? 104 : 116; // height of one hexagon
  const radius = cell / SQRT3;
  const stepX = radius * 1.5;
  const height = (ROWS + 0.5) * cell;
  // Whole cells only, with the half cells left over on both sides shared equally
  const columns = Math.max(1, Math.floor((width - radius) / stepX));
  const offset = (width - (columns + 1) * stepX) / 2;
  const edge = (at: number, size: number, share: number) => Math.min(1, Math.min(at, size - at) / (size * share));
  const slots: Slot[] = [];
  for (let i = 1; i <= columns; i++) {
    for (let row = 0; row < ROWS; row++) {
      const x = offset + i * stepX;
      const y = (i % 2 === 1 ? cell / 2 : cell) + row * cell;
      // Marks follow the fade of the lattice, but never so far that a name becomes unreadable
      const opacity = 0.55 + 0.45 * edge(x, width, FADE_X) * edge(y, height, FADE_Y);
      slots.push({ x, y, opacity });
    }
  }
  // Cells closest to the middle first: a single category gathers there
  const centred = slots
    .map((slot, index) => ({ index, distance: Math.hypot(slot.x - width / 2, (slot.y - height / 2) * 1.35) }))
    .sort((a, b) => a.distance - b.distance)
    .map((entry) => entry.index);
  // The canvas starts two columns early (keeps the odd / even column pattern) so it covers both edges
  return { cell, radius, slots, centred, height, canvasLeft: offset - 2 * stepX };
}

/**
 * Which technology each cell holds (index into TECHNOLOGIES); null = an empty cell.
 * `zone` = the cells that may be used, `pool` = the technologies to show.
 */
function firstFill(slotCount: number, zone: number[], pool: number[]) {
  const fill: (number | null)[] = Array(slotCount).fill(null);
  // Most cells lit, but always some empty ones so marks have somewhere to move to
  const everything = pool.length === TECHNOLOGIES.length;
  const lit = Math.max(1, Math.min(pool.length, everything ? Math.min(24, Math.round(zone.length * 0.62)) : zone.length - 2));
  // Spread the first marks evenly instead of bunching them together
  for (let n = 0; n < lit; n++) fill[zone[Math.floor(((n + 0.5) * zone.length) / lit)]] = pool[n];
  return { fill, next: lit % pool.length };
}

/** Flat-top hexagon, slightly smaller than its cell: the plate that marks a lit cell */
const PLATE = "25,5 75,5 96,43.3 75,81.6 25,81.6 4,43.3";

/** The marks: every beat one goes dark and another lights up in a different empty cell */
function Marks({
  slots,
  zone,
  pool,
  cell,
  radius,
  still,
}: {
  slots: Slot[];
  zone: number[];
  pool: number[];
  cell: number;
  radius: number;
  still: boolean;
}) {
  const [state, setState] = useState(() => firstFill(slots.length, zone, pool));
  const live = useRef(state);

  useEffect(() => {
    live.current = state;
  }, [state]);

  useEffect(() => {
    const beat = window.setInterval(
      () => {
        const { fill, next } = live.current;
        const lit = zone.filter((slot) => fill[slot] !== null);
        const empty = zone.filter((slot) => fill[slot] === null);
        if (!lit.length || !empty.length) return;
        const leaving = lit[Math.floor(Math.random() * lit.length)];
        const arriving = empty[Math.floor(Math.random() * empty.length)];
        const updated = [...fill];
        updated[leaving] = null;
        if (lit.length >= pool.length) {
          // Everything is already on screen: the mark just moves to another cell
          updated[arriving] = fill[leaving];
          setState({ fill: updated, next });
          return;
        }
        // Next technology in line that is not already on screen, so every one gets its turn
        let turn = next;
        while (fill.includes(pool[turn])) turn = (turn + 1) % pool.length;
        updated[arriving] = pool[turn];
        setState({ fill: updated, next: (turn + 1) % pool.length });
      },
      still ? 2600 : 850,
    );
    return () => window.clearInterval(beat);
  }, [still, zone, pool]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 text-c-brand">
      {slots.map((slot, i) => {
        const tech = state.fill[i] === null ? null : TECHNOLOGIES[state.fill[i] as number];
        return (
          <div
            key={i}
            style={{ left: slot.x, top: slot.y, width: radius * 2, height: cell, opacity: slot.opacity }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <AnimatePresence>
              {tech && (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0 }}
                  // A tube striking: on, dip, on. Leaving is the same in reverse
                  animate={{ opacity: still ? 1 : [0, 1, 0.2, 1, 0.65, 1] }}
                  exit={{ opacity: still ? 0 : [1, 0.25, 0.8, 0], transition: { duration: still ? 0.8 : 0.6, ease: "linear" } }}
                  // Lights up only once the mark that went dark has gone, so a mark that moves is never seen twice
                  transition={{ duration: still ? 0.8 : 0.75, ease: "linear", delay: still ? 0.8 : 0.6 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-1.5"
                >
                  {/* Lit cell: a tinted plate with a brighter rim, so it reads as switched on */}
                  <svg viewBox="0 0 100 86.6" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
                    <polygon
                      points={PLATE}
                      vectorEffect="non-scaling-stroke"
                      className="fill-c-brand/[0.07] stroke-c-brand/50 [filter:drop-shadow(0_0_5px_color-mix(in_srgb,var(--c-highlight)_70%,transparent))]"
                      strokeWidth={1}
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="relative flex flex-col items-center gap-1.5 [filter:drop-shadow(0_0_5px_color-mix(in_srgb,var(--c-highlight)_90%,transparent))_drop-shadow(0_0_14px_color-mix(in_srgb,var(--c-highlight)_55%,transparent))]">
                    <Mark name={tech.name} className={cell < 90 ? "h-6 w-6" : "h-8 w-8"} />
                    <span className="text-center text-[9px] leading-none font-semibold tracking-[0.06em] whitespace-nowrap uppercase sm:text-[10px]">
                      {tech.name}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

const ALL = TECHNOLOGIES.map((_, index) => index);
const FILTERS = [
  { id: "all", title: "All", pool: ALL },
  ...ORDER.flatMap((id) => {
    const category = techCategories.find((c) => c.id === id);
    if (!category) return [];
    return [{ id, title: category.title, pool: category.items.map((item) => TECHNOLOGIES.indexOf(item)) }];
  }),
];

/**
 * Technology stack: one neon honeycomb at the site's content width, with no panel or
 * background of its own.
 * React Bits ShapeGrid draws the hexagon lattice in the brand colour: faint lines, cells that
 * flare up on their own and a glowing trail under the cursor. The technologies are one-colour
 * marks with their names inside the cells, in the same colour as the light; a lit cell also gets
 * a tinted plate. Only some cells are lit at a time; every beat one mark flickers out and the
 * next technology flickers on in another empty cell, so the whole list passes through.
 * The row of filters narrows the comb to one category, gathered in the middle.
 * Reduced motion: the lattice holds still and marks change with a slow plain fade.
 * The full list is always present as text for screen readers.
 */
export default function TechStack() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [filterId, setFilterId] = useState("all");
  const neon = useSyncExternalStore(watchNeon, readNeon, () => FALLBACK_RGB);
  const still = useSyncExternalStore(watchMotion, prefersStill, () => false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const comb = useMemo(() => honeycomb(width || 1088), [width]);
  const filter = FILTERS.find((entry) => entry.id === filterId) ?? FILTERS[0];
  const zone = useMemo(
    () =>
      filter.id === "all"
        ? comb.slots.map((_, index) => index)
        : comb.centred.slice(0, Math.min(comb.slots.length, filter.pool.length + 6)),
    [comb, filter],
  );

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

          {/* Narrow the comb to one category */}
          <motion.div
            {...reveal(3)}
            role="group"
            aria-label="Filter technologies by category"
            // Phones: one row that scrolls sideways. Wider screens: the row simply wraps
            className="-mx-6 mt-6 flex gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] sm:mx-0 sm:mt-8 sm:flex-wrap sm:gap-2.5 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {FILTERS.map((entry) => {
              const active = entry.id === filter.id;
              return (
                <button
                  key={entry.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilterId(entry.id)}
                  className={cn(
                    "inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] leading-none font-semibold whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c-brand sm:px-4 sm:text-sm",
                    active
                      ? "border-c-brand bg-c-brand text-white shadow-[0_8px_22px_-10px_var(--c-brand)]"
                      : "border-c-brand/20 text-slate-600 hover:border-c-brand/50 hover:text-c-ink",
                  )}
                >
                  {entry.title}
                  <span className={cn("font-mono text-[11px]", active ? "text-white/75" : "text-c-brand")}>
                    {String(entry.pool.length).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Lattice at the site's content width (same container as every other section), no panel or background of its own */}
          <motion.div {...reveal(1)} className="mt-5 sm:mt-7">
            <div ref={stageRef} style={{ height: comb.height }} className="relative w-full">
              {/* The lattice dissolves toward all four edges; the corners fade twice, so they go first */}
              <div className="absolute inset-0 overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_11%,black_89%,transparent),linear-gradient(to_bottom,transparent,black_13%,black_87%,transparent)] [-webkit-mask-composite:source-in]">
                <div className="absolute inset-y-0" style={{ left: comb.canvasLeft, right: comb.canvasLeft }}>
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
                </div>
              </div>
              {width > 0 && (
                <Marks
                  key={`${comb.slots.length}-${filter.id}`}
                  slots={comb.slots}
                  zone={zone}
                  pool={filter.pool}
                  cell={comb.cell}
                  radius={comb.radius}
                  still={still}
                />
              )}
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
