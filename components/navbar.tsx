"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useQuoteModal } from "@/context/quote-modal-context";
import { SITE_CONFIG } from "@/lib/constants";

export default function Navbar() {
  const { openQuoteModal } = useQuoteModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (navTimerRef.current) {
        clearTimeout(navTimerRef.current);
      }
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (navTimerRef.current) {
      clearTimeout(navTimerRef.current);
    }

    navTimerRef.current = setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 40);
  };

  return (
    <>
      {/* Top Blue Contact Strip - Hides fast on scroll */}
      <div
        className={`w-full bg-[#0B1739] text-white text-xs transition-all duration-200 ease-out overflow-hidden ${
          scrolled
            ? "max-h-0 opacity-0 py-0 border-b-0 pointer-events-none"
            : "max-h-12 opacity-100 py-2 border-b border-white/10"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-end px-4 sm:px-8">
          {/* Phone & Email on the Right */}
          <div className="flex items-center gap-5 sm:gap-8 text-xs font-medium">
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="flex items-center gap-2 text-slate-200 hover:text-sky-300 transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-sky-400 shrink-0" />
              <span>{SITE_CONFIG.contact.email}</span>
            </a>
            <a
              href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
              className="flex items-center gap-2 text-slate-200 hover:text-sky-300 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-sky-400 shrink-0" />
              <span className="inline-flex items-center gap-1.5">
                <span>{SITE_CONFIG.contact.phone}</span>
                <Image
                  src={SITE_CONFIG.assets.flag}
                  alt="India Flag"
                  width={16}
                  height={12}
                  className="h-3.5 w-auto object-contain shrink-0"
                />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Main Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-md shadow-slate-900/8 transition-all">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
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

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#services"
            onClick={(e) => handleNavClick(e, "services")}
            className="text-sm font-semibold tracking-tight text-[#0B1739] transition-colors hover:text-sky-600 cursor-pointer"
          >
            Services
          </a>
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, "projects")}
            className="text-sm font-semibold tracking-tight text-[#0B1739] transition-colors hover:text-sky-600 cursor-pointer"
          >
            Our Work
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, "about")}
            className="text-sm font-semibold tracking-tight text-[#0B1739] transition-colors hover:text-sky-600 cursor-pointer"
          >
            About Us
          </a>
          <a
            href="#careers"
            onClick={(e) => handleNavClick(e, "careers")}
            className="text-sm font-semibold tracking-tight text-[#0B1739] transition-colors hover:text-sky-600 cursor-pointer"
          >
            Careers
          </a>
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="group relative hidden sm:inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#0B1739] to-sky-950 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#0B1739]/20 hover:from-sky-600 hover:to-blue-700 hover:shadow-lg hover:shadow-sky-500/30 hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-sky-400/20 shrink-0"
          >
            <span>Get a Quote</span>
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/25 transition-colors">
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform text-white" />
            </div>
          </button>

          {/* Animated Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative inline-flex items-center justify-center rounded-lg p-2 text-[#0B1739] hover:bg-slate-100 active:scale-95 focus:outline-none md:hidden cursor-pointer transition-all duration-150 touch-manipulation"
            aria-label="Toggle menu"
          >
            <motion.div
              initial={false}
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Ultra Smooth & Snappy Animated Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-slate-200/80 bg-white/98 backdrop-blur-lg md:hidden will-change-[height,opacity]"
          >
            <div className="px-5 py-4">
              <nav className="flex flex-col gap-1.5">
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, "services")}
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold tracking-tight text-[#0B1739] transition-colors hover:bg-sky-50/80 hover:text-sky-600 active:bg-sky-100/80 cursor-pointer"
                  >
                    Services
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: 0.02 }}
                >
                  <a
                    href="#projects"
                    onClick={(e) => handleNavClick(e, "projects")}
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold tracking-tight text-[#0B1739] transition-colors hover:bg-sky-50/80 hover:text-sky-600 active:bg-sky-100/80 cursor-pointer"
                  >
                    Our Work
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: 0.04 }}
                >
                  <a
                    href="#about"
                    onClick={(e) => handleNavClick(e, "about")}
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold tracking-tight text-[#0B1739] transition-colors hover:bg-sky-50/80 hover:text-sky-600 active:bg-sky-100/80 cursor-pointer"
                  >
                    About Us
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: 0.06 }}
                >
                  <a
                    href="#careers"
                    onClick={(e) => handleNavClick(e, "careers")}
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold tracking-tight text-[#0B1739] transition-colors hover:bg-sky-50/80 hover:text-sky-600 active:bg-sky-100/80 cursor-pointer"
                  >
                    Careers
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: 0.08 }}
                  className="pt-1.5"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openQuoteModal();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0B1739] to-sky-900 px-6 py-3 text-sm font-bold text-white shadow-md hover:from-sky-600 hover:to-blue-700 active:scale-[0.99] cursor-pointer transition-all touch-manipulation"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  </>
);
}
