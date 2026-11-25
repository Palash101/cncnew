/* ─────────────────────────────────────────────────────────────
   Background of the lead "What We Do" card (01 Artificial Intelligence):
   a fine circuit board. A processor sits in the card's free upper-right
   area with hairline traces running out of it. It is absolutely positioned
   (takes no layout space) and masked out where the text is.
   Static SVG from fixed values: server and client render the same.
   ───────────────────────────────────────────────────────────── */

const SKY = "var(--c-highlight-mid)";
const ICE = "var(--c-highlight-200)";

const CX = 445;
const CY = 140;
const HALF = 50; // half the chip's size
const PINS = [-3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3.5];
const PITCH = 11;

const r1 = (n: number) => Math.round(n * 10) / 10;

type Trace = { d: string; pad?: [number, number] };

/** Horizontal trace: leaves the chip, fans out at 45°, then runs straight to `end` (with a pad unless it exits). */
function side(i: number, dir: 1 | -1, spread: number, end: number, pad: boolean): Trace {
  const y = CY + i * PITCH;
  const ty = CY + i * PITCH * spread;
  const x0 = CX + dir * (HALF + 7);
  const xb = CX + dir * (HALF + 14 + (3.5 - Math.abs(i)) * 8);
  const xe = xb + dir * Math.abs(ty - y);
  return { d: `M${x0} ${r1(y)}H${r1(xb)}L${r1(xe)} ${r1(ty)}H${end}`, pad: pad ? [end, r1(ty)] : undefined };
}

/** Vertical version of the same fan-out. */
function column(i: number, dir: 1 | -1, spread: number, end: number, pad: boolean): Trace {
  const x = CX + i * PITCH;
  const tx = CX + i * PITCH * spread;
  const y0 = CY + dir * (HALF + 7);
  const yb = CY + dir * (HALF + 10 + (3.5 - Math.abs(i)) * 4);
  const ye = yb + dir * Math.abs(tx - x);
  return { d: `M${r1(x)} ${y0}V${r1(yb)}L${r1(tx)} ${r1(ye)}V${end}`, pad: pad ? [r1(tx), end] : undefined };
}

/** Right-hand trace that turns and runs down the card's right margin. */
function downRight(k: number): Trace {
  const t = side(0.5 + k, 1, 2.2, 0, false);
  const ty = r1(CY + (0.5 + k) * PITCH * 2.2);
  const x = 628 - k * 12;
  return { d: t.d.replace(/H0$/, `H${x - 10}L${x} ${r1(ty + 10)}V460`) };
}

const LEFT_ENDS = [214, 132, 254, 60, 168, 286, 104, 232];
const TOP_ENDS = [22, 0, 40, 0, 28, 0, 46, 14];
const BOTTOM_ENDS = [262, 300, 238, 320, 252, 290, 244, 310];
const RIGHT_ENDS = [584, 618, 572, 640];

const TRACES: Trace[] = [
  ...PINS.map((i, n) => side(i, -1, 2.35, LEFT_ENDS[n], true)),
  ...PINS.map((i, n) => column(i, -1, 1.5, TOP_ENDS[n], TOP_ENDS[n] > 0)),
  ...PINS.map((i, n) => column(i, 1, 2.1, BOTTOM_ENDS[n], true)),
  ...PINS.slice(0, 4).map((i, n) => side(i, 1, 1.85, RIGHT_ENDS[n], RIGHT_ENDS[n] < 640)),
  ...[0, 1, 2, 3].map(downRight),
];
const ALL_TRACES = TRACES.map((t) => t.d).join("");
const PADS = TRACES.flatMap((t) => (t.pad ? [t.pad] : []));

// Three traces that carry a small travelling light
const LIVE = [TRACES[3].d, TRACES[6].d, TRACES[28].d];

const CHIP_PINS = PINS.map((i) => {
  const o = i * PITCH;
  return (
    `M${r1(CX + o)} ${CY - HALF}v-7M${r1(CX + o)} ${CY + HALF}v7` +
    `M${CX - HALF} ${r1(CY + o)}h-7M${CX + HALF} ${r1(CY + o)}h7`
  );
}).join("");

// Miniature network printed on the processor
const CORE = [3, 4, 4, 2].map((count, l) =>
  Array.from({ length: count }, (_, i) => ({ x: CX - 24 + l * 16, y: r1(CY + (i - (count - 1) / 2) * 13) }))
);
const CORE_LINKS = CORE.slice(0, -1)
  .flatMap((layer, l) => layer.flatMap((a) => CORE[l + 1].map((b) => `M${a.x} ${a.y}L${b.x} ${b.y}`)))
  .join("");

// Small parts placed on the board
const MINI_CHIPS = [
  { x: 178, y: 18, w: 44, h: 22 },
  { x: 290, y: 22, w: 30, h: 18 },
  { x: 30, y: 196, w: 34, h: 22 },
];
const RESISTORS = [[120, 34], [252, 46], [84, 122], [300, 244], [150, 238]];
const VIAS = [[258, 16], [340, 52], [18, 150], [112, 176], [200, 214], [330, 262], [566, 250], [604, 104], [350, 12], [92, 246]];
const SPECKS = [[148, 60], [276, 62], [60, 96], [230, 72], [36, 244], [240, 250], [372, 246], [532, 238], [536, 18], [128, 206], [318, 80], [66, 166]];

export function CircuitBackground({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 460"
      preserveAspectRatio="xMaxYMin slice"
      aria-hidden
      className={className}
    >
      <defs>
        <radialGradient id="exp-chip-glow">
          <stop offset="0" stopColor={SKY} stopOpacity="0.4" />
          <stop offset="1" stopColor={SKY} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="exp-chip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--c-deep-500)" />
          <stop offset="1" stopColor="var(--c-deep-800)" />
        </linearGradient>
      </defs>

      {/* Board: traces, pads, small parts */}
      <g fill="none" stroke={SKY}>
        <path d={ALL_TRACES} strokeOpacity="0.36" strokeWidth="0.9" strokeLinejoin="round" />
        {PADS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" strokeOpacity="0.7" strokeWidth="0.9" fill="var(--c-deep-900)" />
        ))}
        {VIAS.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="3.6" strokeOpacity="0.35" strokeWidth="0.8" />
            <circle cx={x} cy={y} r="1.2" fill={SKY} fillOpacity="0.6" stroke="none" />
          </g>
        ))}
        {RESISTORS.map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x - 9} ${y}h5M${x + 4} ${y}h5M${x - 4} ${y - 2.5}h8v5h-8z`} strokeOpacity="0.5" strokeWidth="0.8" />
        ))}
        {MINI_CHIPS.map(({ x, y, w, h }) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width={w} height={h} rx="2.5" fill="var(--c-deep-700)" strokeOpacity="0.55" strokeWidth="0.8" />
            <path
              d={Array.from({ length: Math.floor((w - 4) / 6) }, (_, n) => `M${x + 5 + n * 6} ${y}v-4M${x + 5 + n * 6} ${y + h}v4`).join("")}
              strokeOpacity="0.5"
              strokeWidth="0.8"
            />
            <path d={`M${x + 6} ${y + h / 2}h${w - 16}`} strokeOpacity="0.4" strokeWidth="0.8" strokeDasharray="3 2" />
          </g>
        ))}
      </g>
      {SPECKS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="0.9" fill={ICE} fillOpacity="0.55" />
      ))}

      {/* Small lights travelling out of the processor */}
      <g className="motion-reduce:hidden">
        {LIVE.map((d, n) => (
          <circle key={d} r="1.8" fill={ICE}>
            <animateMotion path={d} dur={`${5 + n}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      {/* Processor */}
      <circle cx={CX} cy={CY} r="125" fill="url(#exp-chip-glow)" />
      <path d={CHIP_PINS} stroke={ICE} strokeOpacity="0.7" strokeWidth="2" />
      <rect x={CX - HALF} y={CY - HALF} width={HALF * 2} height={HALF * 2} rx="9" fill="url(#exp-chip)" stroke={SKY} strokeOpacity="0.9" strokeWidth="1.2" />
      <rect x={CX - 38} y={CY - 38} width="76" height="76" rx="5" fill="var(--c-deep-900)" stroke={SKY} strokeOpacity="0.5" strokeWidth="0.8" />
      <circle cx={CX - 43} cy={CY + 43} r="2" fill={ICE} fillOpacity="0.8" />
      <path d={CORE_LINKS} stroke={SKY} strokeOpacity="0.45" strokeWidth="0.6" fill="none" />
      {CORE.flat().map((n) => (
        <circle key={`${n.x}-${n.y}`} cx={n.x} cy={n.y} r="2.4" fill={ICE} />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Cards 02 and 03: same fine-line language, smaller scale.
   Each drawing is a fixed 102 × 52, on the title's row between the title and
   the number, with clear space on every side. A strip runs along the bottom
   margin. All absolute: no layout space, nothing behind text.
   Hidden on phones and from 1024-1151px, where the title needs the room.
   ───────────────────────────────────────────────────────────── */

const TILE = "var(--c-deep-700)";
const CORNER =
  "pointer-events-none absolute top-6 right-[68px] hidden [&_*]:[vector-effect:non-scaling-stroke] opacity-80 transition-opacity duration-500 group-hover:opacity-100 sm:block lg:hidden min-[72rem]:block";

const GEN_SPECKS = [
  [24, 20], [27, 58], [31, 38], [34, 72], [37, 12], [41, 50], [44, 28], [48, 66], [50, 16], [54, 42],
  [57, 58], [60, 26], [64, 70], [66, 36], [70, 18], [72, 50], [76, 62], [78, 30], [82, 44], [85, 56],
];

function GenerativeCorner() {
  return (
    <svg width="102" height="52" viewBox="20 4 162 82" aria-hidden className={CORNER}>
      <g fill="none" stroke={SKY} strokeWidth="0.9">
        {/* Specks drawn into the page */}
        <path d="M44 28C70 24 84 30 108 30M41 50C66 52 84 44 108 44M48 66C72 68 86 58 108 58" strokeOpacity="0.35" />
      </g>
      {GEN_SPECKS.map(([x, y], i) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r1(1.2 + i * 0.04)} fill={i % 3 ? SKY : ICE} fillOpacity={r1(0.35 + i * 0.03)} />
      ))}

      {/* The generated page */}
      <circle cx="138" cy="45" r="40" fill={SKY} fillOpacity="0.08" />
      <rect x="108" y="14" width="60" height="60" rx="5" fill={TILE} stroke={SKY} strokeOpacity="0.8" strokeWidth="0.9" />
      <rect x="114" y="20" width="26" height="19" rx="2" fill="var(--c-deep-600)" stroke={SKY} strokeOpacity="0.5" strokeWidth="0.7" />
      <path d="M116 36l6-8l5 6l3-4l7 6z" fill={SKY} fillOpacity="0.75" />
      <circle cx="133" cy="25.5" r="2" fill={ICE} />
      <path d="M146 23h16M146 29h12M146 35h14M114 47h48M114 54h42M114 61h30" stroke={SKY} strokeOpacity="0.8" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M149 57.5v7" stroke="#ffffff" strokeWidth="1" />

      {/* Small four-point sparks */}
      {[
        [98, 16, 4],
        [176, 44, 4.5],
        [92, 76, 3],
      ].map(([x, y, s]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x} ${y - s}L${x + s * 0.25} ${y - s * 0.25}L${x + s} ${y}L${x + s * 0.25} ${y + s * 0.25}L${x} ${y + s}L${x - s * 0.25} ${y + s * 0.25}L${x - s} ${y}L${x - s * 0.25} ${y - s * 0.25}Z`}
          fill={ICE}
          fillOpacity="0.85"
        />
      ))}
    </svg>
  );
}

const AGENTS = [
  [44, 18],
  [34, 44],
  [44, 70],
];

function AgenticCorner() {
  return (
    <svg width="102" height="52" viewBox="20 4 162 82" aria-hidden className={CORNER}>
      <g fill="none" stroke={SKY} strokeWidth="0.9">
        {/* Agents reporting in */}
        <path d="M56 18H74C92 18 92 34 112 38M46 44H112M56 70H74C92 70 92 54 112 50" strokeOpacity="0.5" />
        {/* Supervision rings */}
        <circle cx="136" cy="44" r="34" strokeOpacity="0.4" strokeWidth="0.7" strokeDasharray="2 4" />
        <circle cx="136" cy="44" r="25" strokeOpacity="0.55" strokeWidth="0.8" />
      </g>
      {[
        [76, 18.2],
        [80, 44],
        [76, 69.8],
      ].map(([x, y]) => (
        <circle key={y} cx={x} cy={y} r="1.8" fill={ICE} />
      ))}

      {/* Mini agents */}
      {AGENTS.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <path d={`M${x} ${y - 8}v-4`} stroke={SKY} strokeOpacity="0.8" strokeWidth="0.9" />
          <circle cx={x} cy={y - 12.5} r="1.2" fill={ICE} />
          <rect x={x - 12} y={y - 8} width="24" height="16" rx="4.5" fill={TILE} stroke={SKY} strokeOpacity="0.8" strokeWidth="0.9" />
          <circle cx={x - 4.5} cy={y - 0.5} r="1.6" fill={ICE} />
          <circle cx={x + 4.5} cy={y - 0.5} r="1.6" fill={ICE} />
        </g>
      ))}

      {/* Human check */}
      <circle cx="136" cy="45" r="40" fill={SKY} fillOpacity="0.08" />
      <path d="M136 28l13 4.5v10.5c0 9-5.5 14.5-13 17.5c-7.5-3-13-8.5-13-17.5V32.5z" fill="var(--c-deep-600)" stroke={ICE} strokeOpacity="0.9" strokeWidth="1" strokeLinejoin="round" />
      <path d="M130 44l4.5 4.5l8-9" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {[
        [136, 10],
        [102, 44],
        [136, 78],
        [170, 44],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.4" fill={SKY} />
      ))}
      {[
        [96, 10],
        [94, 80],
        [176, 60],
        [180, 32],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="0.9" fill={ICE} fillOpacity="0.6" />
      ))}
    </svg>
  );
}

// Bottom-margin strips, tiled so they never stretch
const STRIPS = {
  words: { w: 96, d: "M2 6h13M20 6h6M31 6h20M56 6h3M64 6h11M80 6h9" },
  steps: {
    w: 72,
    d: "M5 6h9M19 6h9M33 6h9M50 6h10M65 6h7M0 6h1M16.5 3.5a2.5 2.5 0 1 0 .01 0M30.5 3.5a2.5 2.5 0 1 0 .01 0M46 2l4 4l-4 4l-4-4zM62.5 3.5a2.5 2.5 0 1 0 .01 0M3 4a2 2 0 1 0 .01 0",
  },
} as const;

function BottomStrip({ kind }: { kind: keyof typeof STRIPS }) {
  const { w, d } = STRIPS[kind];
  const FADE = "pointer-events-none absolute opacity-35 transition-opacity duration-500 group-hover:opacity-80";
  return (
    <div aria-hidden className={`${FADE} inset-x-6 bottom-2 [mask-image:linear-gradient(to_right,black_40%,transparent)] sm:inset-x-7`}>
      <svg width="100%" height="12" className="block">
        <defs>
          <pattern id={`exp-strip-${kind}`} width={w} height="12" patternUnits="userSpaceOnUse">
            <path d={d} fill="none" stroke={SKY} strokeWidth="1" strokeLinecap="round" />
          </pattern>
        </defs>
        <rect width="100%" height="12" fill={`url(#exp-strip-${kind})`} />
      </svg>
    </div>
  );
}

export function GenerativeBackground() {
  return (
    <>
      <GenerativeCorner />
      <BottomStrip kind="words" />
    </>
  );
}

export function AgenticBackground() {
  return (
    <>
      <AgenticCorner />
      <BottomStrip kind="steps" />
    </>
  );
}
