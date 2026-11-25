/* TEMPORARY: colour-combination testing. Delete this folder once a combination is chosen. */

export type Palette = { id: string; name: string; base: string; primary: string; accent: string };

/** The site's own colours. Selecting it removes every override. */
export const ORIGINAL: Palette = { id: "original", name: "Ocean Blue (current)", base: "#0b1739", primary: "#1673b8", accent: "#3cc8f5" };

export const PALETTES: Palette[] = [
  ORIGINAL,
  { id: "navy-gold", name: "Navy & Gold", base: "#0b1a3d", primary: "#1f5fae", accent: "#f2b632" },
  { id: "emerald", name: "Emerald", base: "#05291f", primary: "#0d7d5a", accent: "#35dba0" },
  { id: "royal-violet", name: "Royal Violet", base: "#1b1040", primary: "#6a3fd0", accent: "#b79bff" },
  { id: "indigo-coral", name: "Indigo & Coral", base: "#15153f", primary: "#4a50cf", accent: "#ff8a6b" },
  { id: "teal-lime", name: "Teal & Lime", base: "#06282d", primary: "#0d7f88", accent: "#b4e146" },
  { id: "graphite-orange", name: "Graphite & Orange", base: "#1c1a19", primary: "#c0541a", accent: "#ffa64a" },
  { id: "burgundy-rose", name: "Burgundy & Rose", base: "#2c0d1e", primary: "#b1305f", accent: "#ff9bb3" },
  { id: "midnight-mint", name: "Midnight & Mint", base: "#0c1b3b", primary: "#147f8c", accent: "#56ecbb" },
  { id: "charcoal-electric", name: "Charcoal & Electric Blue", base: "#181a20", primary: "#2463eb", accent: "#5caaff" },
  { id: "forest-amber", name: "Forest & Amber", base: "#13281b", primary: "#3a7c40", accent: "#f0bf4c" },
];

export const CUSTOM_ID = "custom";
export const STORAGE_KEY = "cnc-theme-preview";
export const ENABLED_KEY = "cnc-theme-preview-on";

/** Hex → OKLCH chroma and hue */
function toChromaHue(hex: string): [number, number] {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [Math.hypot(A, B), ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360];
}

const round = (v: number) => String(Math.round(v * 1000) / 1000);

/** The variables theme-preview.css reads: hue shift and chroma factor for each colour family */
export function paletteVars(palette: Palette): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const family of ["base", "primary", "accent"] as const) {
    const [fromC, fromH] = toChromaHue(ORIGINAL[family]);
    const [toC, toH] = toChromaHue(palette[family]);
    vars[`--t-${family}-h`] = round(toH - fromH);
    vars[`--t-${family}-c`] = round(Math.min(1.5, toC / fromC));
  }
  // Decorative third colour: a neighbour of the primary
  vars["--t-tertiary"] = round((toChromaHue(palette.primary)[1] + 40) % 360);
  return vars;
}
