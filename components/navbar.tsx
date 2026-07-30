"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useQuoteModal } from "@/context/quote-modal-context";

export default function Navbar() {
  const { openQuoteModal } = useQuoteModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-md shadow-slate-900/8 transition-all">
      {/* Top Contact Strip - Hides smoothly and fast on scroll */}
      <div
        className={`overflow-hidden bg-[#0B1739] text-white border-b border-white/10 text-xs transition-all duration-150 ease-out ${
          scrolled
            ? "max-h-0 opacity-0 py-0 border-b-0 pointer-events-none"
            : "max-h-12 opacity-100 py-2"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-end px-4 sm:px-8">
          {/* Phone & Email on the Right */}
          <div className="flex items-center gap-5 sm:gap-8 text-xs font-medium">
            <a
              href="mailto:discuss@craftandcode.in"
              className="flex items-center gap-2 text-slate-200 hover:text-sky-300 transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-sky-400 shrink-0" />
              <span>discuss@craftandcode.in</span>
            </a>
            <a
              href="tel:+917224901787"
              className="flex items-center gap-2 text-slate-200 hover:text-sky-300 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-sky-400 shrink-0" />
              <span className="inline-flex items-center gap-1.5">
                <span>+91-72249 01787</span>
                <Image
                  src="/flag.png"
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

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
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
          <Link
            href="#services"
            className="text-sm font-semibold tracking-tight text-[#0B1739] transition-colors hover:text-sky-600"
          >
            Services
          </Link>
          <Link
            href="#projects"
            className="text-sm font-semibold tracking-tight text-[#0B1739] transition-colors hover:text-sky-600"
          >
            Our Work
          </Link>
          <Link
            href="#about"
            className="text-sm font-semibold tracking-tight text-[#0B1739] transition-colors hover:text-sky-600"
          >
            About Us
          </Link>
          <Link
            href="#careers"
            className="text-sm font-semibold tracking-tight text-[#0B1739] transition-colors hover:text-sky-600"
          >
            Careers
          </Link>
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
            className="relative inline-flex items-center justify-center rounded-lg p-2 text-[#0B1739] hover:bg-slate-100 focus:outline-none md:hidden cursor-pointer transition-colors"
            aria-label="Toggle menu"
          >
            <motion.div
              initial={false}
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Smooth Animated Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden border-b border-slate-200/80 bg-white/98 backdrop-blur-lg md:hidden"
          >
            <div className="px-6 py-5">
              <nav className="flex flex-col gap-4">
                <motion.div
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  <Link
                    href="#services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-base font-semibold tracking-tight text-[#0B1739] transition-colors hover:text-sky-600"
                  >
                    Services
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <Link
                    href="#projects"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-base font-semibold tracking-tight text-[#0B1739] transition-colors hover:text-sky-600"
                  >
                    Our Work
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                >
                  <Link
                    href="#about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-base font-semibold tracking-tight text-[#0B1739] transition-colors hover:text-sky-600"
                  >
                    About Us
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  <Link
                    href="#careers"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-base font-semibold tracking-tight text-[#0B1739] transition-colors hover:text-sky-600"
                  >
                    Careers
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.25 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openQuoteModal();
                    }}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0B1739] to-sky-900 px-6 py-3 text-sm font-bold text-white shadow-md hover:from-sky-600 hover:to-blue-700 cursor-pointer transition-all"
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
  );
}
