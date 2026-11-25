/* TEMPORARY: colour-combination testing. Delete this folder once a combination is chosen. */
"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Palette as PaletteIcon, X } from "lucide-react";
import { CUSTOM_ID, ORIGINAL, PALETTES, type Palette } from "./palettes";
import { applyPalette, usePalette, usePreviewEnabled } from "./theme-store";

const FAMILIES = [
  { key: "base", label: "Dark" },
  { key: "primary", label: "Main" },
  { key: "accent", label: "Accent" },
] as const;

function Swatches({ palette }: { palette: Palette }) {
  return (
    <span aria-hidden className="flex shrink-0 overflow-hidden rounded-md ring-1 ring-black/10">
      {FAMILIES.map(({ key }) => (
        <span key={key} className="h-6 w-5" style={{ backgroundColor: palette[key] }} />
      ))}
    </span>
  );
}

/** Floating panel to try colour combinations on the live site. Its own colours stay neutral. */
export default function ThemePreview() {
  const enabled = usePreviewEnabled();
  const current = usePalette();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!enabled) return null;

  const step = (by: number) => {
    const index = PALETTES.findIndex((p) => p.id === current.id);
    applyPalette(PALETTES[(Math.max(index, 0) + by + PALETTES.length) % PALETTES.length]);
  };

  const setCustom = (key: (typeof FAMILIES)[number]["key"], value: string) =>
    applyPalette({ ...current, id: CUSTOM_ID, name: "My own colours", [key]: value });

  const iconButton =
    "flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-neutral-900";

  return (
    <div className="fixed right-4 bottom-4 z-[80] flex flex-col items-end gap-3 text-neutral-900 sm:right-6 sm:bottom-6">
      {open && (
        <div
          role="dialog"
          aria-label="Test colour combinations"
          data-lenis-prevent
          className="max-h-[min(34rem,calc(100svh-7rem))] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-2xl bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-black/10"
        >
          <div className="flex items-center justify-between pl-2">
            <p className="text-sm font-semibold">Colour combinations</p>
            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className={iconButton}>
              <X className="h-4 w-4" />
            </button>
          </div>

          <ul className="mt-1">
            {PALETTES.map((palette) => {
              const selected = palette.id === current.id;
              return (
                <li key={palette.id}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => applyPalette(palette)}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-left text-sm font-medium focus-visible:outline-2 focus-visible:outline-neutral-900 ${selected ? "bg-neutral-100" : "hover:bg-neutral-50"}`}
                  >
                    <Swatches palette={palette} />
                    <span className="flex-1">{palette.name}</span>
                    {selected && <Check aria-hidden className="h-4 w-4" />}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-2 border-t border-neutral-200 px-2 pt-3 pb-1">
            <p className="text-sm font-semibold">Mix your own</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {FAMILIES.map(({ key, label }) => (
                <label key={key} className="flex flex-col gap-1 text-xs font-medium text-neutral-600">
                  {label}
                  <input
                    type="color"
                    value={current[key]}
                    onChange={(event) => setCustom(key, event.target.value)}
                    className="h-9 w-full cursor-pointer rounded-md border border-neutral-300 bg-white p-0.5"
                  />
                  <span className="font-mono text-[11px] text-neutral-500">{current[key]}</span>
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={() => applyPalette(ORIGINAL)}
              className="mt-3 h-9 w-full cursor-pointer rounded-lg border border-neutral-300 text-sm font-medium hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-neutral-900"
            >
              Reset to current colours
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-1 rounded-xl bg-white p-1 shadow-[0_10px_30px_rgba(0,0,0,0.3)] ring-1 ring-black/10">
        <button type="button" aria-label="Previous combination" onClick={() => step(-1)} className={iconButton}>
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex h-9 cursor-pointer items-center gap-2.5 rounded-lg px-2 text-sm font-semibold hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-neutral-900"
        >
          <PaletteIcon aria-hidden className="h-4 w-4" />
          <Swatches palette={current} />
          <span className="hidden sm:inline">{current.name}</span>
          <span className="sr-only sm:hidden">{current.name}</span>
        </button>
        <button type="button" aria-label="Next combination" onClick={() => step(1)} className={iconButton}>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
