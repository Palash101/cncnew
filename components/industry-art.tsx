/* ─────────────────────────────────────────────────────────────
   Industries section: one scene per industry, showing the technology
   we build for it (taken from each industry's description).
   Every scene is 200 wide with the data line at the same height, so scenes
   placed side by side with no gap form one connected system.
   Static SVG from fixed values; the parent's `group` hover lights the screens.
   ───────────────────────────────────────────────────────────── */

const SKY = "#38bdf8";
const ICE = "#bae6fd";
const WALL = "#0b2450";
const WALL_2 = "#103266";
const GLASS = "#1c4f8d";
const DEEP = "#071a3c";
const GROUND = 148;

/** Size of each drawing inside its scene; smaller = more space between neighbours */
const SCALE = 0.8;

const LIGHT = "transition-[fill] duration-500 group-hover:fill-[#2f7fc4]";

type Box = { x: number; y: number; w: number; h: number };

/** Desktop monitor; (x, y, w, h) is the outer screen, the stand reaches the line */
function Monitor({ x, y, w, h }: Box) {
  const cx = x + w / 2;
  return (
    <>
      <path d={`M${cx - 7} ${y + h}l-3 ${GROUND - y - h - 4}h20l-3 ${-(GROUND - y - h - 4)}z`} fill={WALL_2} />
      <path d={`M${cx - 20} ${GROUND}v-3q0-2 2-2h36q2 0 2 2v3z`} />
      <rect x={x} y={y} width={w} height={h} rx="5" fill={WALL_2} />
      <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} rx="2.5" fill={DEEP} strokeOpacity="0.45" />
      <path d={`M${x + 9} ${y + 9.5}h.01M${x + 13} ${y + 9.5}h.01M${x + 17} ${y + 9.5}h.01`} strokeWidth="2" />
      <path d={`M${x + 4} ${y + 14.5}h${w - 8}`} strokeOpacity="0.35" />
    </>
  );
}

/** Laptop; (x, y, w, h) is the screen, the keyboard deck sits on the line */
function Laptop({ x, y, w, h }: Box) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="4" fill={WALL_2} />
      <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} rx="2" fill={DEEP} strokeOpacity="0.45" />
      <path d={`M${x - 4} ${y + h}h${w + 8}l7 ${GROUND - y - h - 3}q0 3-3 3h${-(w + 16)}q-3 0-3-3z`} />
      <path d={`M${x + w / 2 - 12} ${GROUND - 5}h24`} strokeOpacity="0.6" />
      <path d={`M${x + 4} ${y + h + 5}h${w - 8}M${x + 1} ${y + h + 10}h${w - 2}`} strokeOpacity="0.5" strokeDasharray="4 2" />
    </>
  );
}

function Phone({ x, y, w, h }: Box) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={w * 0.18} fill={WALL_2} />
      <rect x={x + 3} y={y + 7} width={w - 6} height={h - 14} rx="1.5" fill={DEEP} strokeOpacity="0.45" />
      <path d={`M${x + w / 2 - 4} ${y + 3.6}h8`} strokeWidth="1.3" />
      <path d={`M${x + w / 2 - 5} ${y + h - 3.4}h10`} strokeOpacity="0.6" />
    </>
  );
}

function Rack({ x, y, w, h }: Box) {
  const units = Math.floor((h - 4) / 13);
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={WALL_2} />
      {Array.from({ length: units }, (_, i) => {
        const uy = y + 5 + i * 13;
        return (
          <g key={i}>
            <rect x={x + 4} y={uy} width={w - 8} height="9" rx="1.5" strokeOpacity="0.5" />
            <circle cx={x + 8.5} cy={uy + 4.5} r="1.4" fill={ICE} stroke="none" />
            <circle cx={x + 13} cy={uy + 4.5} r="1.4" fill={SKY} stroke="none" />
            <path d={`M${x + 18} ${uy + 4.5}h${w - 26}`} strokeOpacity="0.5" strokeDasharray="2 2" />
          </g>
        );
      })}
    </>
  );
}

const CLOUD = "a9 9 0 0 1 2-17.8a12 12 0 0 1 22.5-2.2a10 10 0 0 1 5.5 20z";

function Chip({ x, y, s }: { x: number; y: number; s: number }) {
  const pins = [0.25, 0.5, 0.75].map((f) => f * s);
  return (
    <>
      <path d={pins.map((p) => `M${x + p} ${y}v-5M${x + p} ${y + s}v5M${x} ${y + p}h-5M${x + s} ${y + p}h5`).join("")} strokeOpacity="0.7" />
      <rect x={x} y={y} width={s} height={s} rx="3" fill={WALL_2} />
      <rect x={x + 4} y={y + 4} width={s - 8} height={s - 8} rx="1.5" fill={DEEP} strokeOpacity="0.5" />
    </>
  );
}

function Shield({ x, y, check = true }: { x: number; y: number; check?: boolean }) {
  return (
    <>
      <path d={`M${x} ${y - 14}l12 4v9c0 8-5 12-12 15c-7-3-12-7-12-15v-9z`} fill={WALL_2} stroke={ICE} />
      {check && <path d={`M${x - 5} ${y - 1}l4 4l7-8`} fill="none" stroke={ICE} strokeWidth="1.5" />}
    </>
  );
}

const SCENES: Record<string, React.ReactNode> = {
  // secure, compliant patient platform
  healthcare: (
    <>
      <Monitor x={30} y={36} w={118} h={84} />
      <circle cx="47" cy="63" r="6.5" fill={GLASS} className={LIGHT} />
      <circle cx="47" cy="61" r="2.3" fill={ICE} stroke="none" />
      <path d="M43 67c1-3 7-3 8 0" fill="none" stroke={ICE} />
      <path d="M40 76h14M40 81h10" strokeOpacity="0.6" />
      <rect x="62" y="55" width="78" height="31" rx="2.5" strokeOpacity="0.5" />
      <path d="M65 72h14l3-4l4 10l6-19l5 18l3-5h37" fill="none" stroke={ICE} strokeWidth="1.5" />
      <rect x="40" y="92" width="28" height="20" rx="2" strokeOpacity="0.5" />
      <path d="M54 107l-6.5-6.5a3.8 3.8 0 0 1 6.5-3.4a3.8 3.8 0 0 1 6.5 3.4z" fill={SKY} stroke="none" />
      <rect x="73" y="92" width="28" height="20" rx="2" strokeOpacity="0.5" />
      <path d="M79 108v-5M84 108v-9M89 108v-6M94 108v-11" stroke={ICE} strokeWidth="2" />
      <rect x="106" y="92" width="34" height="20" rx="2" strokeOpacity="0.5" />
      <path d="M111 98h22M111 102.5h16M111 107h19" strokeOpacity="0.7" />
      <path d="M148 60c10 0 8-10 16-10" fill="none" strokeDasharray="2 3" />
      <Shield x={174} y={50} />
      <Phone x={156} y={92} w={28} h={56} />
      <path d="M161 118h4l2-4l3 8l3-6l1 2h4" fill="none" stroke={ICE} />
      <path d="M164 106h12M164 130h12M164 134h8" strokeOpacity="0.6" />
    </>
  ),
  // scalable ecommerce platform, customer growth
  ecommerce: (
    <>
      <Laptop x={28} y={50} w={110} h={76} />
      <path d="M36 61h16" stroke={ICE} strokeWidth="1.6" />
      <rect x="62" y="58" width="44" height="6" rx="3" strokeOpacity="0.5" />
      <path d="M119 57.5h2.5l2 5h6l1.5-4h-8" fill="none" stroke={ICE} />
      <circle cx="124.5" cy="64.8" r="0.9" fill={ICE} stroke="none" />
      <circle cx="129" cy="64.8" r="0.9" fill={ICE} stroke="none" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={36 + i * 24.5} y="70" width="20.5" height="46" rx="2" strokeOpacity="0.5" />
          <rect x={39 + i * 24.5} y="73" width="14.5" height="19" rx="1.5" fill={GLASS} stroke="none" className={LIGHT} />
          <path d={`M${39 + i * 24.5} 97h12M${39 + i * 24.5} 101h7`} strokeOpacity="0.6" />
          <rect x={39 + i * 24.5} y="106" width="14.5" height="6" rx="3" fill={i === 1 ? SKY : WALL_2} stroke="none" />
        </g>
      ))}
      <path d="M41 86l4-5l4 4l3-3M67 82a3 3 0 0 1 8 0l1 6h-10zM90 80l4-2l4 2v7h-8zM113 87v-8h9v8zM115 79v-1.5a2.5 2.5 0 0 1 5 0v1.5" fill="none" stroke={ICE} strokeOpacity="0.8" />
      {/* Scaling servers behind a growth line */}
      <Rack x={152} y={104} w={34} h={44} />
      <path d={`M150 92${CLOUD}`} fill={WALL_2} stroke={ICE} transform="translate(2 4)" />
      <path d="M167 90v-10m-4 4l4-4l4 4" fill="none" stroke={ICE} transform="translate(3 4)" />
      <path d="M38 38l26-8l22 5l28-15m-7 0h7v7" fill="none" stroke={ICE} strokeWidth="1.4" />
      {[[38, 38], [64, 30], [86, 35]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="2.2" fill={WALL_2} stroke={ICE} />
      ))}
    </>
  ),
  // data-driven fintech decisions, trust
  finance: (
    <>
      <Monitor x={34} y={50} w={124} h={74} />
      {[[46, 87, 10, 4, 4], [56, 81, 13, 5, 4], [66, 84, 10, 4, 5], [76, 78, 12, 5, 5], [86, 75, 14, 4, 4], [96, 78, 11, 4, 5], [106, 73, 13, 4, 4]].map(([x, y, h, a, b], i) => (
        <g key={x}>
          <path d={`M${x} ${y - a}v${h + a + b}`} strokeOpacity="0.7" />
          <rect x={x - 3} y={y} width="6" height={h} rx="0.8" fill={i % 3 === 2 ? WALL : SKY} />
        </g>
      ))}
      <path d="M42 106h70" strokeOpacity="0.4" />
      <path d="M42 100l14-5l12 2l14-8l12 3l16-10" fill="none" stroke={ICE} strokeWidth="1.3" />
      <circle cx="136" cy="82" r="11" fill={WALL} strokeWidth="4" strokeOpacity="0.35" />
      <path d="M136 71a11 11 0 0 1 9.5 16.5" fill="none" strokeWidth="4" stroke={ICE} strokeOpacity="1" strokeLinecap="butt" />
      <path d="M122 102h28M122 107h18M122 112h23" strokeOpacity="0.6" />
      <path d="M42 113h20M68 113h14M88 113h22" strokeOpacity="0.45" />
      {/* Ledger blocks */}
      {[40, 78, 116].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 20l12-6l12 6v13l-12 6l-12-6z`} fill={WALL_2} />
          <path d={`M${x} 20l12 6l12-6M${x + 12} 26v13`} strokeOpacity="0.6" />
          {i < 2 && <path d={`M${x + 25} 26.5h12`} stroke={ICE} strokeDasharray="3 2" />}
        </g>
      ))}
      <path d="M141 26.5h12" stroke={ICE} strokeDasharray="3 2" />
      <rect x="156" y="22" width="20" height="16" rx="2.5" fill={WALL_2} stroke={ICE} />
      <path d="M160 22v-4a6 6 0 0 1 12 0v4" fill="none" stroke={ICE} />
      <path d="M166 28v5" stroke={ICE} strokeWidth="1.8" />
    </>
  ),
  // battery management, fleet telemetry, IoT charging
  ev: (
    <>
      {/* Battery pack */}
      <path d="M28 148V92q0-4 4-4h74q4 0 4 4v56z" fill={WALL_2} />
      <path d="M42 88v-5h12v5M84 88v-5h12v5" />
      {[0, 1, 2, 3].map((c) =>
        [0, 1].map((r) => {
          const x = 34 + c * 18.5;
          const y = 95 + r * 25;
          const level = [[17, 13], [14, 17], [17, 10], [12, 16]][c][r];
          return (
            <g key={`${c}-${r}`}>
              <rect x={x} y={y} width="14.5" height="21" rx="2" fill={DEEP} strokeOpacity="0.6" />
              <rect x={x + 2} y={y + 19 - level} width="10.5" height={level} rx="1" fill={GLASS} stroke="none" className={LIGHT} />
              <path d={`M${x + 4} ${y + 19 - level + 3}h6.5`} stroke={ICE} strokeOpacity="0.7" />
            </g>
          );
        })
      )}
      {/* Management chip wired to the pack */}
      <path d="M48 83V72h9M90 83V72h-9" fill="none" stroke={ICE} strokeDasharray="3 2" />
      <Chip x={57} y={50} s={24} />
      <path d="M71 55l-6 8h4l-2 7l7-9h-4.5z" fill={ICE} stroke="none" />
      {/* Wireless telemetry */}
      <path d="M88 52q8-10 0-20M95 57q14-15 0-30M102 62q20-20 0-40" fill="none" strokeOpacity="0.55" transform="translate(-1 4)" />
      {/* Fleet dashboard */}
      <rect x="122" y="66" width="60" height="58" rx="5" fill={WALL_2} />
      <rect x="126" y="70" width="52" height="50" rx="2.5" fill={DEEP} strokeOpacity="0.45" />
      <path d="M147 124h10v20h-10zM138 148v-2q0-2 2-2h24q2 0 2 2v2z" fill={WALL_2} />
      <path d="M134 99a18 18 0 0 1 36 0" fill="none" strokeWidth="3.5" strokeOpacity="0.35" strokeLinecap="butt" />
      <path d="M134 99a18 18 0 0 1 27-15.6" fill="none" strokeWidth="3.5" stroke={ICE} strokeOpacity="1" strokeLinecap="butt" />
      <path d="M152 99l7-10" stroke={ICE} strokeWidth="1.6" />
      <circle cx="152" cy="99" r="2.5" fill={ICE} stroke="none" />
      <path d="M132 108h14M132 113h9M152 113v-4M157 113v-7M162 113v-5M167 113v-9M172 113v-6" strokeOpacity="0.8" strokeWidth="1.5" />
      <path d="M136 46h10m12 0h10" strokeDasharray="2 3" strokeOpacity="0.6" />
      {[130, 152, 174].map((x) => (
        <g key={x}>
          <circle cx={x} cy="46" r="6" fill={WALL_2} />
          <path d={`M${x + 1} 42l-3 5h2l-1 3l4-5h-2.5z`} fill={ICE} stroke="none" />
        </g>
      ))}
    </>
  ),
  // accessible, engaging learning platform
  edtech: (
    <>
      <Monitor x={34} y={38} w={132} h={84} />
      {/* Lesson player */}
      <rect x="42" y="57" width="72" height="44" rx="2.5" fill={WALL} strokeOpacity="0.5" />
      <path d="M42 92l18-15l12 9l14-13l28 20v8H42z" fill={GLASS} stroke="none" className={LIGHT} />
      <circle cx="78" cy="78" r="11" fill={DEEP} stroke={ICE} />
      <path d="M75 72.5l9 5.5l-9 5.5z" fill={ICE} stroke="none" />
      <path d="M42 108h72" strokeWidth="2.2" strokeOpacity="0.3" />
      <path d="M42 108h44" strokeWidth="2.2" stroke={ICE} />
      <circle cx="86" cy="108" r="3" fill={ICE} stroke="none" />
      <path d="M46 114h10M60 114h6" strokeOpacity="0.5" />
      <rect x="100" y="60.5" width="11" height="8" rx="1.5" fill={DEEP} strokeOpacity="0.7" />
      <path d="M105 63.5h-2v2h2M109 63.5h-2v2h2" fill="none" strokeWidth="0.9" stroke={ICE} />
      {/* Course modules */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="120" y={57 + i * 14} width="38" height="11" rx="2" strokeOpacity="0.5" fill={i === 2 ? WALL_2 : WALL} />
          <circle cx="126.5" cy={62.5 + i * 14} r="3.2" fill={i < 2 ? SKY : DEEP} stroke={i < 2 ? "none" : SKY} />
          {i < 2 && <path d={`M124.8 ${62.5 + i * 14}l1.3 1.4l2.3-2.7`} fill="none" stroke={DEEP} strokeOpacity="1" strokeWidth="1.2" />}
          <path d={`M133 ${62.5 + i * 14}h${[20, 16, 21, 13][i]}`} strokeOpacity="0.7" />
        </g>
      ))}
            {/* Live discussion */}
      <path d="M146 12h32q4 0 4 4v12q0 4-4 4h-14l-7 6v-6h-11q-4 0-4-4V16q0-4 4-4z" fill={WALL_2} stroke={ICE} />
      <path d="M150 19h24M150 25h16" stroke={ICE} />
      <path d="M24 20h30q4 0 4 4v7q0 4-4 4H42l-6 5v-5H24q-4 0-4-4v-7q0-4 4-4z" fill={WALL_2} />
      <path d="M27 27.5h.01M34 27.5h.01M41 27.5h.01M48 27.5h.01" stroke={ICE} strokeWidth="2.4" />
    </>
  ),
  // automation and streamlined operations
  manufacturing: (
    <>
      {/* Robot arm */}
      <path d="M26 148v-8h36v8z" fill={WALL_2} />
      <path d="M33 140l3-16h16l3 16z" />
      <path d="M40 122l14-42l11 4l-13 40z" fill={WALL_2} />
      <path d="M58 76l40-16l3.5 9L62 86z" fill={WALL_2} />
      <circle cx="45" cy="122" r="8" />
      <circle cx="45" cy="122" r="3" fill={ICE} stroke="none" />
      <circle cx="60" cy="81" r="7.5" />
      <circle cx="60" cy="81" r="2.8" fill={ICE} stroke="none" />
      <circle cx="99" cy="65" r="5.5" />
      <path d="M99 70v12M92 82h14M92 82v9l4 4M106 82v9l-4 4" fill="none" stroke={ICE} strokeWidth="1.5" />
      <rect x="93" y="97" width="12" height="12" rx="1" fill={GLASS} className={LIGHT} />
      {/* Conveyor with sensors */}
      <rect x="74" y="122" width="68" height="10" rx="5" fill={WALL_2} />
      {[80, 94, 108, 122, 136].map((x) => (
        <circle key={x} cx={x} cy="127" r="2.2" />
      ))}
      <path d="M82 132v16M134 132v16" />
      <rect x="114" y="110" width="12" height="12" rx="1" fill={GLASS} className={LIGHT} />
      <rect x="78" y="110" width="12" height="12" rx="1" fill={GLASS} className={LIGHT} />
      {/* Control screen */}
      <path d="M163 108h6v40h-6z" fill={WALL_2} />
      <rect x="132" y="42" width="56" height="66" rx="4" fill={WALL_2} />
      <rect x="136" y="46" width="48" height="58" rx="2" fill={DEEP} strokeOpacity="0.45" />
      <path d="M141 66a8 8 0 0 1 16 0M163 66a8 8 0 0 1 16 0" fill="none" strokeWidth="2.2" strokeOpacity="0.5" />
      <path d="M149 66l3-5M171 66l-4-4" stroke={ICE} />
      <path d="M141 82l6-5l6 3l6-6l7 4l13-9" fill="none" stroke={ICE} />
      <path d="M141 90h20M141 95h14" strokeOpacity="0.6" />
      <rect x="166" y="88" width="13" height="7" rx="3.5" fill={SKY} stroke="none" />
      <circle cx="175.5" cy="91.5" r="2.5" fill={DEEP} stroke="none" />
      <path d="M132 54h-14V40H78v22" fill="none" strokeDasharray="2 3" />
      {/* Logic chip on the link */}
      <Chip x={88} y={30} s={20} />
      <path d="M94 37l-2.5 3l2.5 3M102 37l2.5 3l-2.5 3" fill="none" stroke={ICE} />
    </>
  ),
  // customer engagement, streamlined operations
  retail: (
    <>
      {/* Point-of-sale terminal */}
      <path d="M32 118l6-34h40l6 34z" fill={WALL_2} />
      <path d="M37 113l4.7-24h32.6l4.7 24z" fill={DEEP} strokeOpacity="0.5" />
      <path d="M45 95h18M44 101h26M43 107h14" strokeOpacity="0.7" />
      <rect x="64" y="104" width="11" height="6" rx="3" fill={SKY} stroke="none" />
      <path d="M50 118h16v8H50z" />
      <path d="M22 148v-14q0-8 8-8h56q8 0 8 8v14z" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${34 + i * 10} 133.5h6M${34 + i * 10} 140h6`} strokeOpacity="0.7" strokeWidth="1.6" />
      ))}
      <path d="M76 133h11v9H76z" fill={GLASS} className={LIGHT} />
      <path d="M50 84V66h16v18" fill={WALL_2} />
      <path d="M54 71h8M54 75h5M54 79h8" strokeOpacity="0.6" />
      {/* Loyalty app */}
      <Phone x={102} y={54} w={46} h={94} />
      <circle cx="125" cy="77" r="11" fill={GLASS} className={LIGHT} />
      <path d="M125 70l2.2 4.5l5 .7l-3.6 3.5l.900 5l-4.5-2.4l-4.5 2.4l.900-5l-3.6-3.5l5-.7z" fill={ICE} stroke="none" />
      <path d="M111 96h28" strokeWidth="3" strokeOpacity="0.3" />
      <path d="M111 96h18" strokeWidth="3" stroke={ICE} />
      <rect x="110" y="104" width="30" height="13" rx="2.5" strokeOpacity="0.6" />
      <path d="M114 109h10M114 113h6" strokeOpacity="0.7" />
      <path d="M133 107.5v6M130 110.5h6" stroke={ICE} />
      <rect x="110" y="122" width="30" height="10" rx="5" fill={SKY} stroke="none" />
      {/* Engagement signals */}
      <path d="M156 48h24q4 0 4 4v10q0 4-4 4h-11l-7 6v-6h-6q-4 0-4-4V52q0-4 4-4z" fill={WALL_2} stroke={ICE} />
      <path d="M168 62l-6-6a3.5 3.5 0 0 1 6-3.2a3.5 3.5 0 0 1 6 3.2z" fill={ICE} stroke="none" />
      <path d="M104 24a7 7 0 0 1 14 0c0 8 3 9 3 12h-20c0-3 3-4 3-12zM108.5 38.5a2.6 2.6 0 0 0 5 0" fill={WALL_2} />
      <circle cx="119" cy="19" r="4" fill={SKY} stroke="none" />
      {/* Insight bars */}
      {[[158, 16], [167, 30], [176, 24], [185, 42]].map(([x, h]) => (
        <rect key={x} x={x - 3} y={GROUND - h} width="6" height={h} fill={GLASS} className={LIGHT} />
      ))}
      <path d="M156 124l11-12l9 4l10-18" fill="none" stroke={ICE} />
    </>
  ),
  // automation for SaaS businesses and agencies
  "government-saas": (
    <>
      <path d="M100 62v14M100 76H50v16M100 76h50v16M100 76v22" fill="none" strokeDasharray="2 3" />
      {/* Cloud service */}
      <path d="M72 62a15 15 0 0 1 3-29.6a20 20 0 0 1 37.5-3.7a17 17 0 0 1 12.5 33.3z" fill={WALL_2} stroke={ICE} />
      {/* Automation cycle inside the cloud */}
      <path d="M88 47a12 12 0 0 1 21-7.5m0 0v-6m0 6h-6M112 47a12 12 0 0 1-21 7.5m0 0v6m0-6h6" fill="none" stroke={ICE} strokeWidth="1.5" />
      <circle cx="100" cy="47" r="3" fill={ICE} stroke="none" />
      <Rack x={30} y={92} w={40} h={56} />
      <Rack x={130} y={92} w={40} h={56} />
      {/* Workflow window */}
      <rect x="78" y="98" width="44" height="42" rx="3" fill={WALL_2} />
      <rect x="81" y="101" width="38" height="36" rx="1.5" fill={DEEP} strokeOpacity="0.45" />
      <path d="M84.5 104.5h.01M88 104.5h.01" strokeWidth="1.8" />
      <rect x="85" y="110" width="11" height="8" rx="1.5" fill={GLASS} className={LIGHT} />
      <rect x="104" y="110" width="11" height="8" rx="1.5" fill={GLASS} className={LIGHT} />
      <rect x="94.5" y="125" width="11" height="8" rx="1.5" fill={SKY} stroke="none" />
      <path d="M96 114h8M90.5 118v4h9.5v3M109.5 118v4h-9.5" fill="none" stroke={ICE} />
      <path d="M96 140h8v8h-8z" />
      {/* Access and compliance */}
      <Shield x={40} y={44} />
      <path d="M54 46h14" strokeDasharray="2 3" />
      <rect x="152" y="32" width="28" height="22" rx="3" fill={WALL_2} />
      <path d="M152 39h28" strokeOpacity="0.6" />
      <path d="M158 46l3 3l5-6M170 46h5" fill="none" stroke={ICE} />
      <path d="M141 45h11" strokeDasharray="2 3" />
    </>
  ),
  // property management and transactions
  realestate: (
    <>
      <Laptop x={26} y={52} w={108} h={74} />
      {/* Floor plan */}
      <path d="M36 62h56v54H36z" fill={WALL} stroke={ICE} strokeOpacity="0.9" strokeWidth="1.4" />
      <path d="M36 84h22M66 84h26M64 62v14M64 84v12M64 104v12M36 100h16" stroke={ICE} strokeOpacity="0.7" />
      <path d="M58 84a8 8 0 0 1 8 8M64 96a8 8 0 0 0 -8 8" fill="none" strokeOpacity="0.5" />
      <rect x="40" y="66" width="14" height="10" rx="1.5" fill={GLASS} stroke="none" className={LIGHT} />
      <rect x="72" y="66" width="12" height="7" rx="1.5" fill={GLASS} stroke="none" className={LIGHT} />
      <rect x="72" y="92" width="14" height="16" rx="1.5" fill={GLASS} stroke="none" className={LIGHT} />
      <path d="M36 58.5h56M36 57v3M92 57v3" strokeOpacity="0.4" />
      {/* Unit list */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="98" y={62 + i * 18.5} width="28" height="15" rx="2" strokeOpacity="0.5" />
          <path d={`M101.5 ${71 + i * 18.5}l4-4l4 4v3h-8z`} fill={i === 1 ? SKY : GLASS} stroke="none" />
          <path d={`M113 ${68 + i * 18.5}h10M113 ${72 + i * 18.5}h6`} strokeOpacity="0.7" />
        </g>
      ))}
      {/* Digital contract */}
      <path d="M146 72h26l12 12v64h-38z" fill={WALL_2} />
      <path d="M172 72v12h12" />
      <path d="M152 92h26M152 99h26M152 106h18" strokeOpacity="0.6" />
      <path d="M152 124c4-9 7-9 6-2s4 4 6-1s4 1 8 0h5" fill="none" stroke={ICE} strokeWidth="1.4" />
      <path d="M152 130h26" strokeOpacity="0.5" />
      <circle cx="177" cy="139" r="8" fill={SKY} stroke={DEEP} strokeOpacity="1" />
      <path d="M173.5 139l2.5 2.5l4.5-5" fill="none" stroke={DEEP} strokeOpacity="1" strokeWidth="1.6" />
      {/* Secure digital key */}
      <path d="M80 52V36h26" fill="none" strokeDasharray="2 3" />
      <circle cx="116" cy="34" r="9" fill={WALL_2} stroke={ICE} />
      <circle cx="116" cy="34" r="3" fill={DEEP} stroke={ICE} />
      <path d="M125 34h30M145 34v7M152 34v6" stroke={ICE} strokeWidth="1.6" />
      <path d="M165 72V34h-6" fill="none" strokeDasharray="2 3" />
    </>
  ),
  // supply-chain visibility and access control
  logistics: (
    <>
      <Monitor x={20} y={40} w={116} h={82} />
      {/* Live map */}
      <path d="M28 70c14-6 22 4 34-2s20-8 34-3s20-2 32 1v48H28z" fill={WALL} strokeOpacity="0.3" />
      <path d="M28 92c18-8 30 6 48-2s30-4 52 2M60 57c-4 16 8 30 0 56M98 57c6 18-8 34 2 56" fill="none" strokeOpacity="0.3" />
      <path d="M40 102c10 4 14-18 28-14s16 10 26-4s14-10 20-8" fill="none" stroke={ICE} strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="40" cy="102" r="3.5" fill={DEEP} stroke={ICE} />
      <circle cx="68" cy="88" r="2.6" fill={ICE} stroke="none" />
      <circle cx="94" cy="84" r="2.6" fill={ICE} stroke="none" />
      <path d="M116 62c6 0 9 4 9 8c0 6-9 13-9 13s-9-7-9-13c0-4 3-8 9-8z" fill={SKY} stroke={DEEP} strokeOpacity="1" />
      <circle cx="116" cy="70" r="2.8" fill={DEEP} stroke="none" />
      <rect x="30" y="58" width="34" height="16" rx="2" fill={WALL_2} />
      <path d="M34 63h18M34 68h12" stroke={ICE} />
      <circle cx="58" cy="66" r="2" fill={ICE} stroke="none" />
      {/* Access control reader */}
      <rect x="148" y="62" width="36" height="60" rx="5" fill={WALL_2} />
      <rect x="152" y="66" width="28" height="30" rx="2.5" fill={DEEP} strokeOpacity="0.5" />
      <path d="M158 88c-1-12 2-17 8-17s9 5 8 14M162 90c-1-9 0-14 4-14s5 4 4 12M166 92c0-6 0-9 .200-12" fill="none" stroke={ICE} />
      {[0, 1, 2].map((c) => [0, 1].map((r) => <circle key={`${c}-${r}`} cx={158 + c * 8} cy={104 + r * 8} r="2" fill={GLASS} className={LIGHT} />))}
      <path d="M166 122v10" />
      {/* Tagged parcel */}
      <path d="M148 132h36v16h-36z" />
      <path d="M166 132v6M153 143h7" strokeOpacity="0.7" />
      <path d="M174 139a3.5 3.5 0 0 1 3.5 3.5M174 135.5a7 7 0 0 1 7 7" fill="none" stroke={ICE} />
      <circle cx="173.5" cy="143" r="1.4" fill={ICE} stroke="none" />
      {/* Satellite link */}
      <path d="M166 62V48M136 66h12" fill="none" strokeDasharray="2 3" />
      <rect x="159" y="26" width="14" height="14" rx="2" transform="rotate(45 166 33)" fill={WALL_2} stroke={ICE} />
      <path d="M152 19l8 8M180 47l-8-8M147 24l10-10l4 4l-10 10zM175 52l10-10l-4-4l-10 10z" fill={WALL} />
      <path d="M155 38a14 14 0 0 0 6 6M151 41a19 19 0 0 0 9 9" fill="none" strokeOpacity="0.6" />
    </>
  ),
};

const SPECKS = [[14, 22], [40, 10], [62, 26], [88, 8], [124, 16], [150, 8], [172, 24], [190, 12], [10, 62], [192, 78]];
const PLUSES = [[12, 44], [190, 44]];

export default function IndustryScene({ id, index }: { id: string; index: number }) {
  return (
    <svg viewBox="0 18 200 146" aria-hidden className="block h-auto w-full overflow-visible">
      <ellipse cx="100" cy="104" rx="78" ry="48" fill={SKY} fillOpacity="0.045" />
      {SPECKS.map(([x, y], i) => (
        <circle key={i} cx={(x + index * 37) % 200} cy={y} r={i % 3 ? 0.6 : 0.9} fill={ICE} fillOpacity="0.5" />
      ))}
      <path d={PLUSES.map(([x, y]) => `M${x - 2.5} ${y}h5M${x} ${y - 2.5}v5`).join("")} stroke={SKY} strokeOpacity="0.35" strokeWidth="0.8" />

      <g
        // shrink toward the bottom centre, so everything keeps standing on the line
        transform={`translate(${100 * (1 - SCALE)} ${GROUND * (1 - SCALE)}) scale(${SCALE})`}
        fill={WALL}
        stroke={SKY}
        strokeWidth="1.3"
        strokeOpacity="0.8"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="transition-[stroke-opacity] duration-500 group-hover:[stroke-opacity:1]"
      >
        {SCENES[id]}
      </g>

      {/* Data line: full width, so neighbouring systems join up */}
      <path d={`M-0.6 ${GROUND + 0.5}H200.6`} stroke={SKY} strokeOpacity="0.8" strokeWidth="1.2" />
      <path d={`M-0.6 ${GROUND + 10}H200.6`} stroke={SKY} strokeOpacity="0.35" strokeWidth="0.8" />
      <path d={`M16 ${GROUND + 10}h14M38 ${GROUND + 10}h6M52 ${GROUND + 10}h22M126 ${GROUND + 10}h8M142 ${GROUND + 10}h20M170 ${GROUND + 10}h10`} stroke={SKY} strokeOpacity="0.85" strokeWidth="2" strokeLinecap="round" />
      <path d={`M100 ${GROUND + 0.5}v6`} stroke={SKY} strokeOpacity="0.8" />
      <circle cx="100" cy={GROUND + 10} r="3.6" fill="#0B1739" stroke={ICE} strokeWidth="1.2" />
      <circle cx="100" cy={GROUND + 10} r="1.2" fill={ICE} />
    </svg>
  );
}
