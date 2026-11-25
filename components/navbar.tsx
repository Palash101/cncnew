"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { useQuoteModal } from "@/context/quote-modal-context";

const NAV_LINKS = [
  { href: "/#services", id: "services", label: "Services" },
  { href: "/#projects", id: "projects", label: "Our Work" },
  { href: "/#about", id: "about", label: "About Us" },
  { href: "/#careers", id: "careers", label: "Careers" },
];

// Distance (px) the user must scroll before the floating bar expands to full width
const SCROLL_THRESHOLD = 24;

export default function Navbar() {
  const { openQuoteModal } = useQuoteModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > SCROLL_THRESHOLD);
  });

  // Sync initial state when the page loads already scrolled (refresh / anchor link)
  useEffect(() => {
    const frame = requestAnimationFrame(() => setScrolled(window.scrollY > SCROLL_THRESHOLD));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Highlight the link of the section currently in view
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    const clearAtTop = () => {
      if (window.scrollY < 200) setActiveId(null);
    };
    window.addEventListener("scroll", clearAtTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", clearAtTop);
    };
  }, []);

  // Close mobile menu with Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  const highlighted = hovered ?? activeId;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/*
        At the top: a floating, rounded glass bar (keeps the logo readable over the hero).
        On scroll: it smoothly stretches into a full-width bar pinned to the top.
      */}
      <div
        className={cn(
          "relative mx-auto w-full overflow-hidden border backdrop-blur-xl backdrop-saturate-150",
          "transition-[max-width,margin,border-radius,background-color,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "mt-0 max-w-[100vw] rounded-none border-x-transparent border-t-transparent border-b-slate-200/70 bg-white/85 shadow-[0_8px_30px_-12px_rgba(11,23,57,0.18)]"
            : "mt-3 max-w-[min(1200px,calc(100%-24px))] rounded-2xl border-white/80 bg-white/90 shadow-[0_10px_40px_-12px_rgba(11,23,57,0.25)] ring-1 ring-[#0B1739]/5",
          mobileMenuOpen && !scrolled && "bg-white/95"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 sm:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-90"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image
                src="/craft and code logo.png"
                alt="Craft and Code Logo"
                width={180}
                height={48}
                priority
                sizes="180px"
                className="h-10 w-auto object-contain"
              />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => setHovered(link.id)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold tracking-tight transition-colors",
                    isActive ? "text-sky-700" : "text-[#0B1739] hover:text-sky-700"
                  )}
                >
                  {highlighted === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-sky-100/80 ring-1 ring-sky-200/70"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              onClick={() => openQuoteModal()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative hidden cursor-pointer items-center overflow-hidden rounded-full bg-[#0B1739] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0B1739]/25 sm:inline-flex"
            >
              {/* Shine sweep */}
              <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 group-hover:left-[130%]" />
              <span className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative flex items-center">
                Get a Quote
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="relative inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-[#0B1739] transition-colors hover:bg-slate-900/5 md:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileMenuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden md:hidden"
            >
              <nav className="mx-auto flex max-w-6xl flex-col gap-1 border-t border-slate-200/70 px-6 pb-5 pt-3 sm:px-8">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.id}
                    initial={{ x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.25, delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3 py-3 text-base font-semibold tracking-tight transition-colors",
                        activeId === link.id
                          ? "bg-sky-50 text-sky-700"
                          : "text-[#0B1739] hover:bg-slate-50 hover:text-sky-700"
                      )}
                    >
                      {link.label}
                      <ArrowRight className="h-4 w-4 opacity-40" />
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.25, delay: 0.05 + NAV_LINKS.length * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openQuoteModal();
                    }}
                    className="mt-3 inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#0B1739] to-[#1e3a8a] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0B1739]/25"
                  >
                    Get a Quote
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
