"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Inter } from "next/font/google";
import { motion } from "motion/react";

const inter = Inter({ subsets: ["latin"] });

const WORDS = ["DESIGN", "DEVELOPMENT", "DEPLOYMENT", "SUPPORT"];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<"visible" | "exiting" | "entering">("visible");

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus("exiting");

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % WORDS.length);
        setStatus("entering");

        setTimeout(() => {
          setStatus("visible");
        }, 50);
      }, 500);
    }, 3800);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className={`relative min-h-[700px] flex flex-col justify-center overflow-hidden bg-transparent ${inter.className}`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Rich Multi-layered Mesh Background with Smooth Ambient Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Base Radial Spotlight Canvas */}
        <div className="absolute inset-0 bg-[radial-gradient(75%_100%_at_50%_0%,rgba(224,242,254,0.85)_0%,rgba(238,242,255,0.45)_50%,rgba(255,255,255,1)_100%)]" />

        {/* Ambient Glowing Mesh Orbs */}
        <div className="absolute -top-36 -left-36 h-[38rem] w-[38rem] rounded-full bg-gradient-to-br from-sky-300/45 to-blue-500/25 blur-[130px]" />
        <div className="absolute top-0 -right-24 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-indigo-300/40 via-sky-300/30 to-blue-400/20 blur-[140px]" />
        <div className="absolute -bottom-24 left-1/4 h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-blue-300/30 via-indigo-200/40 to-sky-200/50 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 h-[26rem] w-[26rem] rounded-full bg-sky-400/25 blur-[115px]" />

        {/* Enhanced Interactive Modern Tech Grid UI */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* SVG Vector Grid Pattern */}
          <svg className="absolute inset-0 h-full w-full stroke-blue-900/15 [mask-image:radial-gradient(100%_100%_at_top_center,white_35%,transparent_85%)]">
            <defs>
              <pattern
                id="hero-grid-pattern"
                width="48"
                height="48"
                patternUnits="userSpaceOnUse"
                x="50%"
                y="-1"
              >
                <path d="M.5 48V.5H48" fill="none" strokeWidth="1" strokeDasharray="0" />
                {/* Intersection Cross Nodes */}
                <circle cx="0.5" cy="0.5" r="1.5" className="fill-sky-500/40" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero-grid-pattern)" />
          </svg>

          {/* Animated Horizontal Shimmer Grid Beam */}
          <motion.div
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/4 left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent blur-[1px] opacity-75"
          />

          {/* Animated Vertical Shimmer Grid Beam */}
          <motion.div
            animate={{
              y: ["-100%", "200%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: 2,
            }}
            className="absolute top-0 right-1/3 w-[2px] h-1/2 bg-gradient-to-b from-transparent via-blue-500 to-transparent blur-[1px] opacity-75"
          />
        </div>

        {/* Top Shimmer Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />
      </div>

      {/* Stable Hero Content Container (No Jitter / Boggling on Scroll) */}
      <div className="relative mx-auto flex max-w-[85rem] flex-col items-center px-6 -mt-6 sm:-mt-10 pt-0 pb-12 text-center sm:pb-16">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-normal [word-spacing:0.08em] sm:[word-spacing:0.12em] [font-variant-ligatures:none] text-[#0B1739] max-w-6xl leading-[1.25] sm:leading-[1.2] text-center">
          {/* Line 1 on Medium & Small screens */}
          <span className="block md:block lg:inline">
            Your trusted par<span className="inline-block pl-[0.04em]">t</span>ner for
          </span>{" "}

          {/* Line 2 & 3 wrapper */}
          <span className="inline-block md:block lg:inline mt-1 sm:mt-0">
            <span className="block sm:inline">
              Enterprise-grade sof<span className="inline-block pl-[0.03em]">t</span>ware
            </span>{" "}
            <span className="relative inline-flex items-center justify-center sm:justify-start overflow-hidden align-bottom h-[1.15em] -mb-1 mt-1 sm:mt-0 transition-[width] duration-300 mx-auto sm:mx-0 sm:ml-1.5">
              <span className="opacity-0 select-none pointer-events-none whitespace-nowrap pr-1.5" aria-hidden="true">
                {WORDS[index]}
              </span>
              <span
                className={`absolute inset-y-0 inset-x-0 sm:inset-x-auto sm:left-0 flex items-center justify-center sm:justify-start text-center sm:text-left whitespace-nowrap bg-gradient-to-r from-blue-700 via-sky-500 to-blue-400 bg-clip-text text-transparent pr-1.5 ${
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
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 max-w-5xl text-base text-slate-600 sm:text-lg leading-relaxed font-normal">
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
