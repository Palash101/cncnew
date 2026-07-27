"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";

const navbarFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all ${navbarFont.className}`}
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
            href="#work"
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
            className="hidden bg-[#0B1739] px-5 text-white hover:bg-[#152052] cursor-pointer sm:inline-flex"
          >
            Get a Quote
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-[#0B1739] hover:bg-slate-100 focus:outline-none md:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold tracking-tight text-[#0B1739] hover:text-sky-600"
            >
              Services
            </Link>
            <Link
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold tracking-tight text-[#0B1739] hover:text-sky-600"
            >
              Our Work
            </Link>
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold tracking-tight text-[#0B1739] hover:text-sky-600"
            >
              About Us
            </Link>
            <Link
              href="#careers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold tracking-tight text-[#0B1739] hover:text-sky-600"
            >
              Careers
            </Link>
            <Button
              size="default"
              className="mt-2 w-full bg-[#0B1739] text-white hover:bg-[#152052] cursor-pointer"
            >
              Get a Quote
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
