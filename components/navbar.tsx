"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { useQuoteModal } from "@/context/quote-modal-context";

const NAV_LINKS = [
  { href: "/#services", id: "services", label: "Services" },
  { href: "/#industries", id: "industries", label: "Industries" },
  { href: "/#technology", id: "technology", label: "Technology" },
  { href: "/#projects", id: "projects", label: "Our Work" },
  { href: "/#about", id: "about", label: "About Us" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

type Tone = "dark" | "light";

// Height of the bar in px (h-[72px]); its middle decides which section it is sitting on
const BAR_HEIGHT = 72;
// Distance (px) the user must scroll before the bar gets its own background
const SCROLL_THRESHOLD = 24;

/** Same two colour combinations as the industry cards */
const TONES: Record<Tone, { bar: string; link: string; active: string; cta: string; toggle: string; line: string }> = {
  dark: {
    bar: "border-white/10 bg-c-ink/95",
    link: "text-white hover:text-c-highlight",
    active: "text-c-highlight",
    cta: "bg-white text-c-ink hover:bg-slate-200 focus-visible:outline-white",
    toggle: "text-white hover:bg-white/10 focus-visible:outline-white",
    line: "border-white/10",
  },
  light: {
    bar: "border-slate-200 bg-white/95",
    link: "text-c-ink hover:text-c-brand",
    active: "text-c-brand",
    cta: "bg-c-ink text-white hover:bg-c-ink-hover focus-visible:outline-c-ink",
    toggle: "text-c-ink hover:bg-slate-100 focus-visible:outline-c-ink",
    line: "border-slate-200",
  },
};

export default function Navbar() {
  const { openQuoteModal } = useQuoteModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sectionTone, setSectionTone] = useState<Tone>("dark");
  const [activeId, setActiveId] = useState<string | null>(null);

  const sync = useCallback(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD);

    // Match the section behind the bar; nested areas come later in the page, so the last hit wins
    let tone: Tone = "dark";
    document.querySelectorAll<HTMLElement>("[data-header]").forEach((el) => {
      const { top, bottom } = el.getBoundingClientRect();
      if (top <= BAR_HEIGHT / 2 && bottom > BAR_HEIGHT / 2) tone = el.dataset.header === "light" ? "light" : "dark";
    });
    setSectionTone(tone);

    // Highlight the link of the section around the middle of the screen
    const middle = window.innerHeight * 0.45;
    const current = NAV_LINKS.find(({ id }) => {
      const rect = document.getElementById(id)?.getBoundingClientRect();
      return rect && rect.top <= middle && rect.bottom > middle;
    });
    setActiveId(window.scrollY < 200 ? null : (current?.id ?? null));
  }, []);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", sync);

  // First paint (refresh or anchor link can start mid-page) and window resizes
  useEffect(() => {
    const frame = requestAnimationFrame(sync);
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  // Close the mobile menu with Escape, or when the screen grows to the desktop layout
  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia("(min-width: 64rem)");
    const close = () => setMenuOpen(false);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", close);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", close);
    };
  }, [menuOpen]);

  const tone = TONES[sectionTone];
  const isDark = sectionTone === "dark";
  // Over the hero the bar is see-through, so header and hero read as one
  const solid = scrolled || menuOpen;

  const linkClass = (id: string) => cn("transition-colors", activeId === id ? tone.active : tone.link);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        solid ? cn("backdrop-blur-md", tone.bar) : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between gap-6 px-6 sm:px-8">
        {/* Logo: white on dark, original colours on light. The file has empty margins, hence the negative one. */}
        <Link href="/" aria-label="Craft and Code, home" className="-ml-4 shrink-0" onClick={() => setMenuOpen(false)}>
          <Image
            src="/craft and code logo.png"
            alt=""
            width={208}
            height={48}
            priority
            sizes="208px"
            className={cn("h-12 w-auto object-contain transition-[filter] duration-300", isDark && "brightness-0 invert")}
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              aria-current={activeId === link.id ? "location" : undefined}
              className={cn(
                "relative px-3.5 py-2 text-[15px] font-semibold whitespace-nowrap xl:px-4",
                "after:absolute after:inset-x-3.5 after:bottom-0.5 after:h-0.5 after:rounded-full after:bg-current xl:after:inset-x-4",
                activeId === link.id ? "after:opacity-100" : "after:opacity-0",
                linkClass(link.id)
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className={cn(
              "hidden h-11 cursor-pointer items-center gap-2 rounded-xl px-5 text-[15px] font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:inline-flex",
              tone.cta
            )}
          >
            Get a Quote
            <ArrowRight aria-hidden className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={cn(
              "-mr-2.5 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl transition-colors focus-visible:outline-2 lg:hidden",
              tone.toggle
            )}
          >
            {menuOpen ? <X aria-hidden className="h-6 w-6" /> : <Menu aria-hidden className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile and tablet menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          data-lenis-prevent
          className={cn("max-h-[calc(100svh-72px)] overflow-y-auto border-t lg:hidden", tone.line)}
        >
          <ul className="mx-auto max-w-6xl px-6 pt-2 pb-6 sm:px-8">
            {NAV_LINKS.map((link) => (
              <li key={link.id} className={cn("border-b", tone.line)}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeId === link.id ? "location" : undefined}
                  className={cn("flex h-14 items-center text-lg font-semibold", linkClass(link.id))}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-5 sm:hidden">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openQuoteModal();
                }}
                className={cn(
                  "inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-base font-semibold",
                  tone.cta
                )}
              >
                Get a Quote
                <ArrowRight aria-hidden className="h-5 w-5" />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
