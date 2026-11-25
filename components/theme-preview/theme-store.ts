/* TEMPORARY: colour-combination testing. Delete this folder once a combination is chosen. */
"use client";

import { useSyncExternalStore } from "react";
import { CUSTOM_ID, ENABLED_KEY, ORIGINAL, PALETTES, STORAGE_KEY, paletteVars, type Palette } from "./palettes";

const EVENT = "cnc-theme-preview";

export function applyPalette(palette: Palette) {
  const root = document.documentElement;
  Object.keys(paletteVars(ORIGINAL)).forEach((name) => root.style.removeProperty(name));
  if (palette.id === ORIGINAL.id) {
    delete root.dataset.palette;
  } else {
    Object.entries(paletteVars(palette)).forEach(([name, value]) => root.style.setProperty(name, value));
    root.dataset.palette = palette.id;
  }
  try {
    // `vars` lets the inline script restore the colours before first paint
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ palette, vars: paletteVars(palette) }));
  } catch {
    /* private mode: the choice just isn't remembered */
  }
  snapshot = palette;
  window.dispatchEvent(new Event(EVENT));
}

/* ── current palette ── */

let snapshot: Palette | null = null;

function readPalette(): Palette {
  if (snapshot) return snapshot;
  snapshot = ORIGINAL;
  if (document.documentElement.dataset.palette) {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null")?.palette as Palette | undefined;
      // Presets are read from the list so edits to it take effect; custom ones come from storage
      if (saved) snapshot = saved.id === CUSTOM_ID ? saved : (PALETTES.find((p) => p.id === saved.id) ?? ORIGINAL);
    } catch {
      /* keep the original */
    }
  }
  return snapshot;
}

const subscribe = (callback: () => void) => {
  window.addEventListener(EVENT, callback);
  return () => window.removeEventListener(EVENT, callback);
};

export const usePalette = () => useSyncExternalStore(subscribe, readPalette, () => ORIGINAL);

/* ── is the panel switched on? (always in development, via ?colors in production) ── */

const readEnabled = () => {
  if (process.env.NODE_ENV === "development") return true;
  try {
    return localStorage.getItem(ENABLED_KEY) === "1";
  } catch {
    return false;
  }
};

export const usePreviewEnabled = () => useSyncExternalStore(subscribe, readEnabled, () => false);

/* ── resolved colours for canvas / WebGL components, which cannot read CSS variables ── */

const resolved = new Map<string, string>();

function resolveColor(name: string, fallback: string): string {
  const id = document.documentElement.dataset.palette;
  if (!id) return fallback;
  const palette = readPalette();
  const key = [name, palette.base, palette.primary, palette.accent].join("|");
  const cached = resolved.get(key);
  if (cached) return cached;

  const probe = document.createElement("span");
  probe.style.color = `var(${name})`;
  document.body.appendChild(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();

  const context = document.createElement("canvas").getContext("2d");
  if (!context) return fallback;
  context.fillStyle = fallback;
  context.fillStyle = color;
  context.fillRect(0, 0, 1, 1);
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
  const hex = `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  resolved.set(key, hex);
  return hex;
}

/** A brand colour as a plain hex string; `fallback` is its value in the current design */
export const useThemeColor = (name: string, fallback: string) =>
  useSyncExternalStore(
    subscribe,
    () => resolveColor(name, fallback),
    () => fallback,
  );
