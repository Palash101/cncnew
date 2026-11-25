/* ─────────────────────────────────────────────────────────────
   Illustrated street for the Industries section: one scene per industry.
   Every scene is 200 × 164 with the road at the same height, so scenes
   placed side by side with no gap form one continuous street.
   Static SVG from fixed values; the parent's `group` hover lights the windows.
   ───────────────────────────────────────────────────────────── */

const SKY = "#38bdf8";
const ICE = "#bae6fd";
const WALL = "#0b2450";
const WALL_2 = "#103266";
const GLASS = "#1c4f8d";
const GROUND = 148;

const LIGHT = "transition-[fill] duration-500 group-hover:fill-[#bae6fd]";

type WinProps = { x: number; y: number; cols: number; rows: number; dx?: number; dy?: number; w?: number; h?: number };

function Windows({ x, y, cols, rows, dx = 12, dy = 13, w = 6, h = 7 }: WinProps) {
  return (
    <g stroke="none" fill={GLASS}>
      {Array.from({ length: cols * rows }, (_, i) => (
        <rect key={i} x={x + (i % cols) * dx} y={y + Math.floor(i / cols) * dy} width={w} height={h} rx="0.8" className={LIGHT} />
      ))}
    </g>
  );
}

function Tree({ x, s = 1 }: { x: number; s?: number }) {
  return (
    <g strokeOpacity="0.55">
      <path d={`M${x} ${GROUND}v${-12 * s}`} />
      <ellipse cx={x} cy={GROUND - 19 * s} rx={6.5 * s} ry={9 * s} />
      <path d={`M${x} ${GROUND - 12 * s}v${-8 * s}M${x} ${GROUND - 15 * s}l${3 * s} ${-3 * s}`} strokeOpacity="0.4" />
    </g>
  );
}

function Lamp({ x }: { x: number }) {
  return (
    <g strokeOpacity="0.6">
      <path d={`M${x} ${GROUND}v-34q0-5 5-5h4`} fill="none" />
      <circle cx={x + 10} cy={GROUND - 37} r="2" fill={ICE} stroke="none" />
      <circle cx={x + 10} cy={GROUND - 37} r="6" fill={SKY} fillOpacity="0.15" stroke="none" />
    </g>
  );
}

const SCENES: Record<string, React.ReactNode> = {
  healthcare: (
    <>
      <Tree x={22} />
      <Tree x={182} s={0.85} />
      <rect x="36" y="88" width="30" height="60" />
      <rect x="134" y="88" width="30" height="60" />
      <Windows x={42} y={96} cols={2} rows={3} />
      <Windows x={140} y={96} cols={2} rows={3} />
      <rect x="64" y="52" width="72" height="96" fill={WALL_2} />
      <path d="M60 52h80" />
      <Windows x={72} y={80} cols={2} rows={4} />
      <Windows x={110} y={80} cols={2} rows={4} />
      {/* Cross sign and pulse */}
      <circle cx="100" cy="40" r="15" fill={WALL} />
      <path d="M97 32h6v5h5v6h-5v5h-6v-5h-5v-6h5z" fill={ICE} stroke="none" />
      <path d="M68 68h18l4-6l6 12l5-9l3 3h28" fill="none" stroke={ICE} strokeWidth="1.3" />
      <rect x="90" y="122" width="20" height="26" fill={WALL} />
      <path d="M100 122v26M84 120h32l-4-6H88z" />
      <path d="M97 135h1.5M101.5 135h1.5" stroke={ICE} />
    </>
  ),
  ecommerce: (
    <>
      <Lamp x={16} />
      {/* Phone as a shopfront */}
      <rect x="66" y="26" width="68" height="122" rx="9" fill={WALL_2} />
      <rect x="71" y="36" width="58" height="103" rx="3" fill={WALL} />
      <path d="M92 31h16" strokeWidth="1.6" />
      <path d="M71 44h58v9a5.8 5.8 0 0 1-11.6 0a5.8 5.8 0 0 1-11.6 0a5.8 5.8 0 0 1-11.6 0a5.8 5.8 0 0 1-11.6 0a5.8 5.8 0 0 1-11.6 0z" fill={WALL_2} />
      <path d="M82.6 44v9M94.2 44v9M105.8 44v9M117.4 44v9" strokeOpacity="0.5" />
      {[[77, 68], [102, 68], [77, 94], [102, 94]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="21" height="21" rx="2.5" strokeOpacity="0.5" />
          <rect x={x + 5} y={y + 4} width="11" height="8" rx="1.5" fill={GLASS} stroke="none" className={LIGHT} />
          <path d={`M${x + 4} ${y + 16}h9`} strokeOpacity="0.6" />
        </g>
      ))}
      <rect x="77" y="121" width="46" height="12" rx="6" fill={SKY} stroke="none" />
      <path d="M86 127h22M111.5 124.5l3 2.5l-3 2.5" fill="none" stroke="#06224a" strokeWidth="1.6" strokeOpacity="1" />
      {/* Parcels */}
      <rect x="28" y="124" width="28" height="24" rx="1.5" />
      <path d="M42 124v8l-3-2l-3 2M28 124h28" />
      <rect x="32" y="106" width="20" height="18" rx="1.5" fill={WALL_2} />
      <path d="M42 106v18M46 119h3" strokeOpacity="0.6" />
      <rect x="146" y="120" width="32" height="28" rx="1.5" />
      <path d="M162 120v9M146 120h32M168 142h6" strokeOpacity="0.7" />
      <path d="M162 84c7 0 11 5 11 11c0 7-11 17-11 17s-11-10-11-17c0-6 4-11 11-11z" fill={WALL_2} />
      <circle cx="162" cy="95" r="3.6" fill={ICE} stroke="none" />
    </>
  ),
  finance: (
    <>
      <Tree x={20} s={0.9} />
      <rect x="38" y="142" width="124" height="6" />
      <rect x="44" y="136" width="112" height="6" />
      <rect x="50" y="78" width="100" height="58" fill={WALL_2} />
      <path d="M42 78L100 42L158 78z" />
      <rect x="46" y="78" width="108" height="8" />
      {[54, 73, 92, 111, 130].map((x) => (
        <g key={x}>
          <rect x={x} y="90" width="13" height="46" />
          <path d={`M${x + 4.5} 92v42M${x + 8.5} 92v42`} strokeOpacity="0.4" />
          <path d={`M${x - 1} 90h15M${x - 1} 136h15`} />
        </g>
      ))}
      <circle cx="100" cy="64" r="9" fill={WALL_2} />
      <path d="M103.5 60.5h-5a2 2 0 0 0 0 3.8h3a2 2 0 0 1 0 3.8h-5M100 58.5v11" fill="none" stroke={ICE} />
      <path d="M50 82h100" strokeOpacity="0.5" strokeDasharray="2 3" />
      {/* Market bars */}
      {[[168, 14], [176, 24], [184, 36]].map(([x, h]) => (
        <rect key={x} x={x} y={GROUND - h} width="6" height={h} fill={GLASS} className={LIGHT} />
      ))}
      <path d="M166 124l9-9l7-1l11-14m-5 0h5v5" fill="none" stroke={ICE} />
    </>
  ),
  ev: (
    <>
      {/* Solar canopy */}
      <path d="M26 70L174 56v7L26 77z" fill={WALL_2} />
      <path d="M50 67.7v7M75 65.4v7M100 63v7M125 60.7v7M150 58.3v7" strokeOpacity="0.5" />
      <path d="M166 63.7V148M34 76.3V148" />
      <path d="M166 74l-10-9M34 86l10-11" strokeOpacity="0.5" />
      {/* Charger */}
      <rect x="44" y="86" width="26" height="62" rx="4" fill={WALL_2} />
      <rect x="49" y="92" width="16" height="13" rx="1.5" fill={GLASS} stroke="none" className={LIGHT} />
      <path d="M58.5 110l-6 10h5l-2 9l7-11h-5l2-8z" fill={ICE} stroke="none" />
      <path d="M41 148h32" strokeWidth="1.6" />
      <path d="M70 100c9 0 11 4 11 14s3 12 10 11" fill="none" stroke={ICE} />
      {/* Car */}
      <path d="M88 140v-13c0-5 3-7 8-8l10-2l12-13c2-2 4-3 7-3h17c4 0 7 1 9 4l9 13c4 1 6 4 6 8v14z" />
      <path d="M111 117l10-11c1-1 2-2 4-2h7v13zM136 104h5c3 0 5 1 6 3l7 10h-18z" fill={GLASS} className={LIGHT} />
      <path d="M134 120v18M138 123h5M160 125h6M88 127h6" strokeOpacity="0.7" />
      {[106, 150].map((x) => (
        <g key={x}>
          <circle cx={x} cy="139" r="9" fill="#071a3c" />
          <circle cx={x} cy="139" r="4" fill={WALL_2} />
          <path d={`M${x} 135v8M${x - 4} 139h8`} strokeOpacity="0.6" />
        </g>
      ))}
    </>
  ),
  edtech: (
    <>
      <Tree x={22} s={0.9} />
      <Tree x={180} />
      <path d="M36 92h128v56H36z" />
      <path d="M32 92h136l-8-9H40z" fill={WALL_2} />
      <Windows x={44} y={101} cols={3} rows={2} dx={13} dy={19} w={8} h={11} />
      <Windows x={122} y={101} cols={3} rows={2} dx={13} dy={19} w={8} h={11} />
      <path d="M80 148V70h40v78z" fill={WALL_2} />
      <path d="M76 70h48L100 50z" />
      <circle cx="100" cy="84" r="8" />
      <path d="M100 79v5l3.5 2" fill="none" stroke={ICE} />
      {/* Graduation cap on the roof */}
      <path d="M100 30l24 9l-24 9l-24-9z" fill={WALL_2} stroke={ICE} />
      <path d="M86 43v7c8 5 20 5 28 0v-7M124 39v10" fill="none" stroke={ICE} />
      <circle cx="124" cy="51" r="1.8" fill={ICE} stroke="none" />
      {/* Open book above the door */}
      <path d="M100 103c-4-3-9-3-13-2v11c4-1 9-1 13 2c4-3 9-3 13-2v-11c-4-1-9-1-13 2zM100 103v11" />
      <path d="M90 148v-20a10 10 0 0 1 20 0v20z" fill={WALL} />
      <path d="M100 119v29" />
    </>
  ),
  manufacturing: (
    <>
      <Lamp x={10} />
      {/* Chimneys and smoke */}
      <path d="M138 100l3-58h10l3 58z" fill={WALL_2} />
      <path d="M140.4 54h11.2M139.9 62h12.2" strokeOpacity="0.6" />
      <path d="M158 100l2-42h8l2 42z" fill={WALL_2} />
      <path d="M146 37c-5-4 2-8-2-13M150 35c6-3 1-9 7-12M164 52c-4-4 3-7 0-12" fill="none" strokeOpacity="0.5" />
      {/* Saw-tooth halls */}
      <path d="M34 148V96l28-18v18l28-18v18l28-18v18h56v52z" />
      <path d="M38 98l20-13v13zM66 98l20-13v13zM94 98l20-13v13z" fill={GLASS} strokeOpacity="0.5" className={LIGHT} />
      <path d="M34 106h140" strokeOpacity="0.5" />
      <Windows x={126} y={112} cols={4} rows={2} dx={11} dy={12} />
      {/* Gears */}
      <circle cx="54" cy="125" r="9" fill={WALL_2} strokeWidth="3" strokeDasharray="3.53 3.53" strokeLinecap="butt" />
      <circle cx="54" cy="125" r="8" fill={WALL_2} />
      <circle cx="54" cy="125" r="3" />
      <circle cx="70" cy="132" r="6" fill={WALL_2} strokeWidth="2.5" strokeDasharray="2.35 2.35" strokeLinecap="butt" />
      <circle cx="70" cy="132" r="5" fill={WALL_2} />
      {/* Robot arm over a conveyor */}
      <path d="M84 138h36" />
      {[88, 97, 106, 115].map((x) => (
        <circle key={x} cx={x} cy="142" r="3" />
      ))}
      <rect x="104" y="128" width="11" height="10" fill={GLASS} className={LIGHT} />
      <path d="M86 138v-14l11-10l11 5v6" fill="none" stroke={ICE} strokeWidth="1.5" />
      <circle cx="86" cy="124" r="2.2" fill={ICE} stroke="none" />
      <circle cx="97" cy="114" r="2.2" fill={ICE} stroke="none" />
    </>
  ),
  retail: (
    <>
      <Tree x={18} s={0.95} />
      <Lamp x={178} />
      <rect x="36" y="58" width="128" height="90" />
      <rect x="32" y="52" width="136" height="8" fill={WALL_2} />
      {/* Sign */}
      <rect x="62" y="64" width="76" height="16" rx="3" fill={WALL_2} />
      <path d="M72 72h30M107 72h8M120 72h9" stroke={ICE} strokeWidth="1.6" />
      {/* Awning */}
      <path d="M40 86h120l6 14H34z" fill={WALL_2} />
      <path d="M34 100a8.25 6 0 0 0 16.5 0a8.25 6 0 0 0 16.5 0a8.25 6 0 0 0 16.5 0a8.25 6 0 0 0 16.5 0a8.25 6 0 0 0 16.5 0a8.25 6 0 0 0 16.5 0a8.25 6 0 0 0 16.5 0a8.25 6 0 0 0 16.5 0" fill={WALL_2} />
      <path d="M55 86l-4.5 14M70 86l-3 14M85 86l-1.5 14M100 86v14M115 86l1.5 14M130 86l3 14M145 86l4.5 14" strokeOpacity="0.5" />
      {/* Display windows */}
      <rect x="42" y="112" width="38" height="30" fill={GLASS} className={LIGHT} />
      <rect x="120" y="112" width="38" height="30" fill={GLASS} className={LIGHT} />
      <path d="M50 142v-14h14v14zM53.5 128c0-7 7-7 7 0" fill={WALL} />
      <path d="M70 142v-9h6v9z" fill={WALL} />
      <path d="M128 122l5-3c2 3 6 3 8 0l5 3l-2 6l-3-1v13h-8v-13l-3 1z" fill={WALL} />
      <path d="M150 142v-11l3-3l3 3v11z" fill={WALL} />
      <path d="M86 148v-36h28v36M100 112v36M96 130v5M104 130v5" />
    </>
  ),
  "government-saas": (
    <>
      <Tree x={18} s={0.85} />
      <Tree x={184} s={0.85} />
      <rect x="30" y="104" width="140" height="44" />
      <rect x="66" y="92" width="68" height="56" fill={WALL_2} />
      <path d="M62 92h76L100 78z" />
      {[70, 82, 94, 106, 118].map((x) => (
        <path key={x} d={`M${x} 96v44h8v-44z`} fill={WALL} strokeOpacity="0.75" />
      ))}
      <path d="M62 141h76M58 145h84" />
      <Windows x={37} y={112} cols={2} rows={2} dx={13} dy={16} w={8} h={10} />
      <Windows x={142} y={112} cols={2} rows={2} dx={13} dy={16} w={8} h={10} />
      {/* Dome */}
      <rect x="82" y="66" width="36" height="12" fill={WALL_2} />
      <path d="M82 66c0-24 36-24 36 0z" />
      <path d="M100 48v18M91 51c-2 4-3 9-3 15M109 51c2 4 3 9 3 15" strokeOpacity="0.5" />
      <path d="M97 48v-6h6v6M100 42v-8" />
      <path d="M100 34h9l-2.5 2.5l2.5 2.5h-9" fill={ICE} stroke="none" />
      {/* Cloud service linked to the building */}
      <path d="M140 58a9 9 0 0 1 2-17.8a12 12 0 0 1 22.5-2.2a10 10 0 0 1 5.5 20z" fill={WALL_2} stroke={ICE} />
      <path d="M148 49h5M157 49h5M152 44h6" stroke={ICE} />
      <path d="M154 58v14h-18v12" fill="none" strokeDasharray="2 3" />
      <circle cx="136" cy="86" r="2" fill={ICE} stroke="none" />
      {/* Same link on the left: shield */}
      <path d="M46 40l12 4v9c0 8-5 12-12 15c-7-3-12-7-12-15v-9z" fill={WALL_2} stroke={ICE} />
      <path d="M41 53l4 4l7-8" fill="none" stroke={ICE} strokeWidth="1.5" />
      <path d="M46 68v10h18v8" fill="none" strokeDasharray="2 3" />
      <circle cx="64" cy="88" r="2" fill={ICE} stroke="none" />
    </>
  ),
  realestate: (
    <>
      {/* Tower */}
      <rect x="34" y="34" width="52" height="114" fill={WALL_2} />
      <path d="M34 34h52M42 34v-7h14v7M74 34V22" />
      <circle cx="74" cy="21" r="1.6" fill={ICE} stroke="none" />
      <Windows x={41} y={43} cols={3} rows={6} dx={14} dy={15} w={9} h={8} />
      <path d="M38 53.5h44M38 68.5h44M38 83.5h44M38 98.5h44M38 113.5h44M38 128.5h44" strokeOpacity="0.35" />
      {/* House */}
      <path d="M98 148V106l34-26l34 26v42z" />
      <path d="M90 112l42-33l42 33" fill="none" strokeWidth="1.6" />
      <path d="M152 94V82h9v19" fill={WALL_2} />
      <circle cx="132" cy="100" r="5.5" fill={GLASS} className={LIGHT} />
      <path d="M132 94.5v11M126.5 100h11" strokeOpacity="0.6" />
      <rect x="105" y="116" width="17" height="15" fill={GLASS} className={LIGHT} />
      <path d="M113.5 116v15M105 123.5h17" strokeOpacity="0.6" />
      <path d="M138 148v-30h18v30z" fill={WALL_2} />
      <circle cx="152" cy="134" r="1.3" fill={ICE} stroke="none" />
      {/* Location pin over the house */}
      <path d="M132 34c9 0 14 6 14 13c0 9-14 22-14 22s-14-13-14-22c0-7 5-13 14-13z" fill={WALL_2} stroke={ICE} />
      <path d="M125 48l7-6l7 6M127 47v7h10v-7" fill="none" stroke={ICE} />
      <Tree x={184} s={0.95} />
    </>
  ),
  logistics: (
    <>
      {/* Warehouse */}
      <path d="M22 148V78l46-18l46 18v70z" />
      <path d="M18 80l50-20l50 20" fill="none" strokeWidth="1.6" />
      <circle cx="68" cy="78" r="5" fill={GLASS} className={LIGHT} />
      <rect x="30" y="100" width="32" height="48" fill={WALL_2} />
      <path d="M30 108h32M30 116h32M30 124h32M30 132h32M30 140h32" strokeOpacity="0.5" />
      <rect x="70" y="104" width="18" height="16" fill={GLASS} className={LIGHT} />
      <path d="M70 93h18M46 93h10" strokeOpacity="0.7" />
      <rect x="12" y="132" width="16" height="16" rx="1" fill={WALL_2} />
      <path d="M20 132v6" />
      {/* Route overhead */}
      <path d="M96 48c20-18 50-18 70 4" fill="none" strokeDasharray="2.5 4" />
      <circle cx="96" cy="48" r="3" fill={ICE} stroke="none" />
      <path d="M167 40c6 0 9 4 9 8c0 6-9 14-9 14s-9-8-9-14c0-4 3-8 9-8z" fill={WALL_2} stroke={ICE} />
      <circle cx="167" cy="48.5" r="2.6" fill={ICE} stroke="none" />
      {/* Truck */}
      <g className="transition-[translate] duration-700 ease-out motion-safe:group-hover:translate-x-1.5">
        <rect x="86" y="96" width="62" height="42" rx="2" fill={WALL_2} />
        <path d="M96 106h30M96 113h18" stroke={ICE} strokeWidth="1.4" />
        <path d="M134 104v26" strokeOpacity="0.4" />
        <path d="M148 110h17c3 0 5 1 7 4l8 11v13h-32z" />
        <path d="M154 115h10c2 0 3 1 4 2l5 8h-19z" fill={GLASS} className={LIGHT} />
        <path d="M82 138h102M176 130h4" />
        <path d="M68 118h12M72 125h8M64 132h16" strokeOpacity="0.45" />
        {[102, 118, 164].map((x) => (
          <g key={x}>
            <circle cx={x} cy="140" r="8" fill="#071a3c" />
            <circle cx={x} cy="140" r="3.2" fill={WALL_2} />
          </g>
        ))}
      </g>
    </>
  ),
};

/** Far-away skyline behind the scenes; seeded by position so neighbours differ */
function distantBlocks(index: number) {
  let s = 4211 + index * 977;
  const rand = () => (s = (s * 16807) % 2147483647) / 2147483647;
  let d = `M0 ${GROUND}`;
  let x = 0;
  while (x < 200) {
    const w = Math.min(200 - x, 12 + Math.round(rand() * 16));
    const top = GROUND - 26 - Math.round(rand() * 46);
    d += `V${top}H${x + w}`;
    x += w;
  }
  return `${d}V${GROUND}Z`;
}

const STARS = [[14, 22], [40, 12], [62, 30], [88, 8], [124, 18], [150, 10], [172, 30], [190, 14], [30, 48], [186, 56]];

export default function IndustryScene({ id, index }: { id: string; index: number }) {
  return (
    <svg viewBox="0 0 200 164" aria-hidden className="block h-auto w-full overflow-visible">
      {STARS.map(([x, y], i) => (
        <circle key={i} cx={(x + index * 37) % 200} cy={y} r={i % 3 ? 0.6 : 0.9} fill={ICE} fillOpacity="0.55" />
      ))}
      <path d={distantBlocks(index)} fill="#123a72" fillOpacity="0.28" />

      <g
        fill={WALL}
        stroke={SKY}
        strokeWidth="1.1"
        strokeOpacity="0.8"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="transition-[stroke-opacity] duration-500 group-hover:[stroke-opacity:1]"
      >
        {SCENES[id]}
      </g>

      {/* Road: full width, so neighbouring scenes join up */}
      <path d={`M-0.6 ${GROUND + 0.5}H200.6`} stroke={SKY} strokeOpacity="0.8" strokeWidth="1.2" />
      <path d={`M-0.6 ${GROUND + 8}H200.6`} stroke={SKY} strokeOpacity="0.5" strokeWidth="1" strokeDasharray="12 8" />
      <path d={`M-0.6 ${GROUND + 15}H200.6`} stroke={SKY} strokeOpacity="0.3" strokeWidth="0.8" />
    </svg>
  );
}
