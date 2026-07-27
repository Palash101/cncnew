"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const WORDS = ["DESIGN", "DEVELOPMENT", "DEPLOYMENT", "SUPPORT"];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<"visible" | "exiting" | "entering">("visible");

  useEffect(() => {
    const timer = setInterval(() => {
      // Exit animation: slide UP to top and fade OUT
      setStatus("exiting");

      setTimeout(() => {
        // Change word and position at bottom (hidden)
        setIndex((prev) => (prev + 1) % WORDS.length);
        setStatus("entering");

        // Enter animation: slide UP from bottom into view and fade IN
        setTimeout(() => {
          setStatus("visible");
        }, 50);
      }, 500);
    }, 3800); // 3.8s interval for slower, elegant reading pace

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className={`relative overflow-hidden bg-transparent ${inter.className}`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Rich Multi-layered Mesh Gradient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Base Radial Spotlight Canvas */}
        <div className="absolute inset-0 bg-[radial-gradient(75%_100%_at_50%_0%,rgba(224,242,254,0.85)_0%,rgba(238,242,255,0.45)_50%,rgba(255,255,255,1)_100%)]" />

        {/* Dynamic Glowing Mesh Orbs */}
        <div className="absolute -top-36 -left-36 h-[38rem] w-[38rem] rounded-full bg-gradient-to-br from-sky-300/45 to-blue-500/25 blur-[130px]" />
        <div className="absolute top-0 -right-24 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-indigo-300/40 via-sky-300/30 to-blue-400/20 blur-[140px]" />
        <div className="absolute -bottom-24 left-1/4 h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-blue-300/30 via-indigo-200/40 to-sky-200/50 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 h-[26rem] w-[26rem] rounded-full bg-sky-400/25 blur-[115px]" />

        {/* Subtle Tech Grid Texture with Radial Masking */}
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(#0B1739 1px, transparent 1px), linear-gradient(90deg, #0B1739 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 85%)",
          }}
        />

        {/* Top Shimmer Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-28 text-center sm:py-36">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-[#0B1739] sm:text-5xl md:text-6xl max-w-5xl leading-[1.15]">
          Your trusted partner for Enterprise-grade software{" "}
          <span className="relative inline-flex items-center justify-start text-left overflow-hidden align-bottom h-[1.1em] -mb-1 min-w-[7.2em] sm:min-w-[8em]">
            <span
              className={`absolute inset-y-0 left-0 flex items-center justify-start text-left whitespace-nowrap bg-gradient-to-r from-blue-700 via-sky-500 to-blue-400 bg-clip-text text-transparent ${
                status === "visible"
                  ? "transition-all duration-500 ease-out translate-y-0 opacity-100"
                  : status === "exiting"
                  ? "transition-all duration-500 ease-in -translate-y-full opacity-0"
                  : "transition-none translate-y-full opacity-0"
              }`}
            >
              {WORDS[index]}
            </span>
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 max-w-3xl text-base text-slate-600 sm:text-lg leading-relaxed font-normal">
          We build scalable, mission-critical software solutions tailored for modern enterprises and fast-growing tech leaders. Powered by top-tier engineering talent in Bangalore, India, delivering speed, reliability, and measurable business growth.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-[#0B1739] text-white hover:bg-[#152052] px-8 py-6 text-base font-semibold shadow-xl shadow-blue-900/15 transition-all hover:scale-[1.02] cursor-pointer"
          >
            Get a FREE Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#0B1739]/30 px-8 py-6 text-base font-semibold text-[#0B1739] hover:bg-blue-50/80 transition-all hover:scale-[1.02] cursor-pointer"
          >
            View our work
          </Button>
        </div>
      </div>
    </section>
  );
}
