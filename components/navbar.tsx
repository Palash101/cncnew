"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useQuoteModal } from "@/context/quote-modal-context";

export default function Navbar() {
  const { openQuoteModal } = useQuoteModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-md shadow-slate-900/8 transition-all"
    >
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
          <Button
            size="sm"
            onClick={() => openQuoteModal()}
            className="hidden bg-[#0B1739] px-5 text-white hover:bg-[#152052] cursor-pointer sm:inline-flex"
          >
            Get a Quote
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>

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
                  <Button
                    size="default"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openQuoteModal();
                    }}
                    className="mt-2 w-full bg-[#0B1739] text-white hover:bg-[#152052] cursor-pointer shadow-md"
                  >
                    Get a Quote
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
