"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface MvpStage {
  id: string;
  stepNumber: string;
  weekTag: string;
  title: string;
  description: string;
  bullets: string[];
  imageUrl: string;
}

const stages: MvpStage[] = [
  {
    id: "stage-1",
    stepNumber: "01",
    weekTag: "WEEK 1-2",
    title: "Research & ideation",
    description:
      "We analyze business requirements, user expectations and market opportunities for defining high-end digital solutions.",
    bullets: [
      "Understanding business objectives",
      "Identify market opportunities",
      "Clear roadmap",
      "Risk & scope definition",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "stage-2",
    stepNumber: "02",
    weekTag: "WEEK 2-3",
    title: "Design & architecture",
    description:
      "Our designers create interactive user experiences and a scalable technology architecture developed for security.",
    bullets: [
      "Interactive UI/UX designs",
      "Robust/secure architecture & build",
      "Best integration practices & technology stacks",
      "API contract design",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "stage-3",
    stepNumber: "03",
    weekTag: "WEEK 3-11",
    title: "Agile development",
    description:
      "We have expertise in building progressive sprints, while gathering continuous feedback throughout the development process.",
    bullets: [
      "Sprint cycles",
      "Security hardening",
      "Agile testing",
      "Building validation",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "stage-4",
    stepNumber: "04",
    weekTag: "WEEK 11-12",
    title: "Deployment & going Live",
    description:
      "Our experts have mastered development, testing, & deployment to create secure projects with successful going live experiences.",
    bullets: [
      "Zero downtime deployment",
      "Performing final testing",
      "Quality checks",
      "Launch & post deployment support",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
  },
];

const STAGE_DURATION_MS = 5000; // 5 seconds per stage step

export default function StageWorkflow() {
  const [activeStage, setActiveStage] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Smooth continuous progress timer
  useEffect(() => {
    if (isPaused) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const currentProgress = Math.min((elapsed / STAGE_DURATION_MS) * 100, 100);

      setStageProgress(currentProgress);

      if (elapsed >= STAGE_DURATION_MS) {
        startTimeRef.current = timestamp;
        setStageProgress(0);
        setActiveStage((prev) => (prev + 1) % stages.length);
      } else {
        animationFrameRef.current = requestAnimationFrame(step);
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, activeStage]);

  // Jump to specific stage on click
  const handleStageClick = (idx: number) => {
    setActiveStage(idx);
    setStageProgress(0);
    startTimeRef.current = null;
  };

  const current = stages[activeStage];

  // Calculate overall timeline fill percentage across the 4 nodes
  // Segment 1: Node 01 (0%) -> Node 02 (33.33%)
  // Segment 2: Node 02 (33.33%) -> Node 03 (66.67%)
  // Segment 3: Node 03 (66.67%) -> Node 04 (100%)
  const numSegments = stages.length - 1; // 3 segments
  const overallProgressPercent =
    activeStage < numSegments
      ? ((activeStage + stageProgress / 100) / numSegments) * 100
      : 100;

  return (
    <section
      className="w-full bg-[#0B1739] py-20 sm:py-28 text-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        startTimeRef.current = null;
      }}
    >
      <div className="mx-auto max-w-6xl xl:max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-14">
          {/* Eyebrow badge */}
          <div className="mb-3 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span>Our MVP Process</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Discovery to{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              go-live in 12 weeks
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl font-normal">
            We follow a strategic approach to shifting ideas from ideation to real-world solutions.
          </p>
        </div>

        {/* Horizontal Progress Timeline (4 Steps) */}
        <div className="mb-12 relative">
          {/* Connecting Line Track Container (Spans strictly from center of Node 01 to center of Node 04) */}
          <div className="absolute top-1/2 left-6 right-6 sm:left-7 sm:right-7 -translate-y-1/2 h-0.5 z-0 pointer-events-none">
            {/* Background Track Line */}
            <div className="w-full h-full bg-slate-700/80 rounded-full" />

            {/* Active Filled Progress Line - Synchronous 60fps frame update */}
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-400 rounded-full transition-none"
              style={{
                width: `${Math.min(Math.max(overallProgressPercent, 0), 100)}%`,
              }}
            />
          </div>

          {/* Stage Node Buttons (01, 02, 03, 04) */}
          <div className="relative z-10 flex items-center justify-between">
            {stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              const isPast = idx < activeStage;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => handleStageClick(idx)}
                  className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl font-extrabold text-base sm:text-lg transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-2 border-purple-500 bg-slate-900 text-white shadow-[0_0_20px_rgba(168,85,247,0.6)] ring-4 ring-purple-500/30 scale-110"
                      : isPast
                      ? "border-2 border-purple-500/80 bg-slate-900 text-purple-300"
                      : "border border-slate-700 bg-slate-900/90 text-slate-400 hover:border-slate-500 hover:text-white"
                  }`}
                  aria-label={`Stage ${stage.stepNumber}`}
                >
                  {stage.stepNumber}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage Content Card Container */}
        <div className="rounded-2xl border border-slate-700/60 bg-[#131F42] p-6 sm:p-10 shadow-2xl transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Stage Info & Bullets */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Week Badge */}
              <div className="inline-flex">
                <span className="rounded-full border border-slate-700 bg-slate-800/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-200">
                  {current.weekTag}
                </span>
              </div>

              {/* Stage Title */}
              <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {current.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
                {current.description}
              </p>

              {/* Checklist Bullets */}
              <div className="mt-6 flex flex-col gap-3">
                {current.bullets.map((bullet, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full border-2 border-purple-400/90 flex shrink-0 items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-200">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Stage Image Showcase */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-700/50 shadow-lg">
                <Image
                  src={current.imageUrl}
                  alt={current.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover object-center transition-all duration-700 hover:scale-105"
                />
                {/* Subtle Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
