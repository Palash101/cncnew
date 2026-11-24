/* ─────────────────────────────────────────────────────────────
   Stats section background: starfield, aurora, a glowing planet
   horizon with city lights, and orbit / connection arcs with
   travelling light pulses. Drawn entirely in code (no images) and
   deterministic, so server and client render identically.
   ───────────────────────────────────────────────────────────── */

// Small seeded PRNG so the "random" city lights are identical on server + client
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const PLANET = { cx: 600, cy: 1640, r: 1080 }; // planet top sits at y = 560 (viewBox 1200×800)

const CITY_LIGHTS = (() => {
  const rand = seeded(42);
  const pts: { x: number; y: number; r: number; o: number }[] = [];
  for (let i = 0; i < 140; i++) {
    const x = 80 + rand() * 1040;
    const dx = x - PLANET.cx;
    const surfaceY = PLANET.cy - Math.sqrt(PLANET.r * PLANET.r - dx * dx);
    const y = surfaceY + 6 + Math.pow(rand(), 1.8) * 200;
    pts.push({
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      r: Math.round((0.6 + rand() * 1.4) * 100) / 100,
      o: Math.round((0.25 + rand() * 0.6) * 100) / 100,
    });
  }
  return pts;
})();

const ellipsePath = (cx: number, cy: number, rx: number, ry: number) =>
  `M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`;

const ORBITS = [
  { d: ellipsePath(600, 600, 720, 170), rotate: -7, dur: 18 },
  { d: ellipsePath(600, 600, 540, 120), rotate: 5, dur: 14 },
];

// Connection arcs between points on the horizon
const LINKS = [
  { d: "M 300 640 Q 470 420 640 572", dur: 6 },
  { d: "M 560 566 Q 760 360 930 640", dur: 7.5 },
  { d: "M 410 600 Q 600 470 820 596", dur: 5.5 },
];

export default function StatsBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Starfield (two layers, twinkling at different rates) */}
      <div className="animate-twinkle absolute inset-0 bg-[radial-gradient(1px_1px_at_20px_30px,rgba(255,255,255,0.9),transparent),radial-gradient(1px_1px_at_140px_90px,rgba(186,230,253,0.8),transparent),radial-gradient(1.5px_1.5px_at_90px_160px,rgba(255,255,255,0.7),transparent),radial-gradient(1px_1px_at_200px_200px,rgba(255,255,255,0.6),transparent)] bg-[size:240px_240px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="animate-twinkle-slow absolute inset-0 bg-[radial-gradient(1px_1px_at_60px_120px,rgba(255,255,255,0.8),transparent),radial-gradient(1.5px_1.5px_at_260px_40px,rgba(125,211,252,0.9),transparent),radial-gradient(1px_1px_at_330px_260px,rgba(255,255,255,0.7),transparent)] bg-[size:380px_380px] [mask-image:linear-gradient(to_bottom,black,transparent_65%)]" />

      {/* Aurora */}
      <div className="animate-aurora absolute -top-40 left-[10%] h-[30rem] w-[42rem] rounded-full bg-sky-500/20 blur-[120px]" />
      <div className="animate-aurora-slow absolute -top-32 right-[5%] h-[26rem] w-[36rem] rounded-full bg-indigo-500/20 blur-[120px]" />

      {/* Planet, orbits and network */}
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="stats-planet" cx="0.5" cy="0" r="0.55">
            <stop offset="0" stopColor="#14336e" />
            <stop offset="0.35" stopColor="#0a1a40" />
            <stop offset="1" stopColor="#020617" />
          </radialGradient>
          <linearGradient id="stats-rim" x1="0" x2="1">
            <stop offset="0" stopColor="#7dd3fc" stopOpacity="0" />
            <stop offset="0.5" stopColor="#bae6fd" stopOpacity="1" />
            <stop offset="1" stopColor="#7dd3fc" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="stats-orbit" x1="0" x2="1">
            <stop offset="0" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="0.5" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="stats-link" x1="0" x2="1">
            <stop offset="0" stopColor="#7dd3fc" stopOpacity="0.05" />
            <stop offset="0.5" stopColor="#7dd3fc" stopOpacity="0.6" />
            <stop offset="1" stopColor="#7dd3fc" stopOpacity="0.05" />
          </linearGradient>
          <filter id="stats-blur-lg" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
          <filter id="stats-blur-sm">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
          <clipPath id="stats-planet-clip">
            <circle cx={PLANET.cx} cy={PLANET.cy} r={PLANET.r} />
          </clipPath>
        </defs>

        {/* Orbits with travelling satellites */}
        {ORBITS.map((o, i) => (
          <g key={i} transform={`rotate(${o.rotate} 600 600)`}>
            <path d={o.d} fill="none" stroke="url(#stats-orbit)" strokeWidth="1" />
            <g className="motion-reduce:hidden">
              <circle r="8" fill="#38bdf8" opacity="0.35" filter="url(#stats-blur-sm)">
                <animateMotion dur={`${o.dur}s`} repeatCount="indefinite" path={o.d} />
              </circle>
              <circle r="2.5" fill="#e0f2fe">
                <animateMotion dur={`${o.dur}s`} repeatCount="indefinite" path={o.d} />
              </circle>
            </g>
          </g>
        ))}

        {/* Atmosphere glow */}
        <circle
          cx={PLANET.cx}
          cy={PLANET.cy}
          r={PLANET.r + 8}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="60"
          opacity="0.35"
          filter="url(#stats-blur-lg)"
        />

        {/* Planet body */}
        <circle cx={PLANET.cx} cy={PLANET.cy} r={PLANET.r} fill="url(#stats-planet)" />

        {/* Surface: meridians, latitude lines, city lights */}
        <g clipPath="url(#stats-planet-clip)">
          {[0.15, 0.35, 0.55, 0.75, 0.95].map((k) => (
            <ellipse
              key={`m${k}`}
              cx={PLANET.cx}
              cy={PLANET.cy}
              rx={PLANET.r * k}
              ry={PLANET.r}
              fill="none"
              stroke="#7dd3fc"
              strokeOpacity="0.07"
            />
          ))}
          {[40, 110, 200].map((dy) => (
            <ellipse
              key={`l${dy}`}
              cx={PLANET.cx}
              cy={PLANET.cy - PLANET.r + dy + 900}
              rx={PLANET.r}
              ry={900}
              fill="none"
              stroke="#7dd3fc"
              strokeOpacity="0.06"
            />
          ))}
          {CITY_LIGHTS.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="#bae6fd" opacity={p.o} />
          ))}
        </g>

        {/* Bright rim */}
        <circle cx={PLANET.cx} cy={PLANET.cy} r={PLANET.r} fill="none" stroke="url(#stats-rim)" strokeWidth="1.5" />

        {/* Connection arcs with travelling pulses */}
        {LINKS.map((l, i) => (
          <g key={i}>
            <path d={l.d} fill="none" stroke="url(#stats-link)" strokeWidth="1" strokeDasharray="3 5" />
            <g className="motion-reduce:hidden">
              <circle r="7" fill="#38bdf8" opacity="0.4" filter="url(#stats-blur-sm)">
                <animateMotion dur={`${l.dur}s`} begin={`${i * 1.3}s`} repeatCount="indefinite" path={l.d} />
              </circle>
              <circle r="2.2" fill="#f0f9ff">
                <animateMotion dur={`${l.dur}s`} begin={`${i * 1.3}s`} repeatCount="indefinite" path={l.d} />
              </circle>
            </g>
          </g>
        ))}
      </svg>

      {/* Readability: soften the area behind the heading */}
      <div className="absolute inset-x-0 top-0 h-[55%] bg-[radial-gradient(ellipse_60%_70%_at_50%_30%,rgba(11,23,57,0.55),transparent_75%)]" />

      {/* Thin light line along the top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/50 to-transparent" />

      {/* Fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#020617]" />
    </div>
  );
}
