"use client";

import { useState, useEffect } from "react";
import {
  Eye,
  CreditCard,
  Code2,
  CheckCheck,
  PackageCheck,
  ClipboardList,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Container, SectionHeader, Highlight, SECTION_Y, TopHairline, revealBlock } from "@/components/ui/section";

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const steps: ProcessStep[] = [
  {
    id: "scoping",
    title: "Scoping",
    description:
      "We begin with in-depth discovery, defining requirements, module breakdown, and technical roadmap architecture.",
    icon: Eye,
  },
  {
    id: "cost-estimation",
    title: "Cost Estimation",
    description:
      "Get the complete project module wise cost breakdown with maintenance and support plan.",
    icon: CreditCard,
  },
  {
    id: "development",
    title: "Development",
    description:
      "Agile development sprints with clean code, scalable architecture, and continuous integration.",
    icon: Code2,
  },
  {
    id: "qa-testing",
    title: "QA & Testing",
    description:
      "Rigorous automated testing, security audits, and bug fixes to guarantee top-grade software delivery.",
    icon: CheckCheck,
  },
  {
    id: "deployment",
    title: "Deployment",
    description:
      "Automated zero-downtime deployment setup on secure cloud infrastructure environments.",
    icon: PackageCheck,
  },
  {
    id: "maintenance",
    title: "Maintenance",
    description:
      "Continuous 24/7 post-launch monitoring, performance tuning, regular security updates, and SLA support.",
    icon: ClipboardList,
  },
];

export default function AgileProcess() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [radius, setRadius] = useState(185);

  // Responsive radius calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(135);
      } else {
        setRadius(185);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto rotate every 4 seconds unless user interacts or hovers
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Calculate rotation angle so active step node moves to focal right-center position (- activeStep * 60)
  const rotationAngle = -activeStep * 60;

  return (
    <section
      id="agile"
      className={cn(
        "relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#effaff_0%,#f6fbff_60%,#ffffff_100%)] text-[#0B1739]",
        SECTION_Y
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <TopHairline tone="light" />
      {/* Background: fine grid + soft glows (same language as the hero) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(22,115,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,115,184,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_50%,black,transparent)]" />
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-sky-200/50 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-blue-200/40 blur-[120px]" />
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle & Flow Diagram */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <SectionHeader
              tone="light"
              align="left"
              eyebrow="Our Process"
              eyebrowIcon={Workflow}
              title={
                <>
                  Our Agile Process. <Highlight tone="light">Simple, Seamless, Streamlined</Highlight>
                </>
              }
              description="We follow a structured and agile development approach with project management planner to ensure the successful delivery of every project, focusing on quality, cost-optimization, transparency, and client satisfaction."
            />

            {/* Flow Diagram Pills Grid */}
            <div className="mt-10 max-w-xl">
              {/* Row 1: Scoping -> Cost Estimation -> Development */}
              <div className="flex items-center justify-between gap-2 sm:gap-3">
                {/* Step 0: Scoping */}
                <button
                  type="button"
                  onClick={() => setActiveStep(0)}
                  className={`flex-1 rounded-full border px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer text-center ${
                    activeStep === 0
                      ? "border-[#0B1739] bg-[#0B1739] text-white shadow-[0_10px_24px_-8px_rgba(11,23,57,0.45)] scale-105"
                      : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-sky-300 hover:text-[#0B1739]"
                  }`}
                >
                  Scoping
                </button>

                <ArrowRight className="h-4 w-4 shrink-0 text-sky-500" />

                {/* Step 1: Cost Estimation */}
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className={`flex-1 rounded-full border px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer text-center ${
                    activeStep === 1
                      ? "border-[#0B1739] bg-[#0B1739] text-white shadow-[0_10px_24px_-8px_rgba(11,23,57,0.45)] scale-105"
                      : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-sky-300 hover:text-[#0B1739]"
                  }`}
                >
                  Cost Estimation
                </button>

                <ArrowRight className="h-4 w-4 shrink-0 text-sky-500" />

                {/* Step 2: Development */}
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className={`flex-1 rounded-full border px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer text-center ${
                    activeStep === 2
                      ? "border-[#0B1739] bg-[#0B1739] text-white shadow-[0_10px_24px_-8px_rgba(11,23,57,0.45)] scale-105"
                      : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-sky-300 hover:text-[#0B1739]"
                  }`}
                >
                  Development
                </button>
              </div>

              {/* Connecting Down Arrow on right */}
              <div className="flex justify-end pr-8 sm:pr-12 my-2 sm:my-3">
                <ArrowDown className="h-4 w-4 text-sky-500" />
              </div>

              {/* Row 2: Maintenance <- Deployment <- QA & Testing */}
              <div className="flex items-center justify-between gap-2 sm:gap-3">
                {/* Step 5: Maintenance */}
                <button
                  type="button"
                  onClick={() => setActiveStep(5)}
                  className={`flex-1 rounded-full border px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer text-center ${
                    activeStep === 5
                      ? "border-[#0B1739] bg-[#0B1739] text-white shadow-[0_10px_24px_-8px_rgba(11,23,57,0.45)] scale-105"
                      : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-sky-300 hover:text-[#0B1739]"
                  }`}
                >
                  Maintenance
                </button>

                <ArrowLeft className="h-4 w-4 shrink-0 text-sky-500" />

                {/* Step 4: Deployment */}
                <button
                  type="button"
                  onClick={() => setActiveStep(4)}
                  className={`flex-1 rounded-full border px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer text-center ${
                    activeStep === 4
                      ? "border-[#0B1739] bg-[#0B1739] text-white shadow-[0_10px_24px_-8px_rgba(11,23,57,0.45)] scale-105"
                      : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-sky-300 hover:text-[#0B1739]"
                  }`}
                >
                  Deployment
                </button>

                <ArrowLeft className="h-4 w-4 shrink-0 text-sky-500" />

                {/* Step 3: QA & Testing */}
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className={`flex-1 rounded-full border px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer text-center ${
                    activeStep === 3
                      ? "border-[#0B1739] bg-[#0B1739] text-white shadow-[0_10px_24px_-8px_rgba(11,23,57,0.45)] scale-105"
                      : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-sky-300 hover:text-[#0B1739]"
                  }`}
                >
                  QA & Testing
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Rotating Circular Orbit Component */}
          <div className="lg:col-span-6 flex justify-center items-center py-6">
            <motion.div {...revealBlock(1)} className="relative w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] flex items-center justify-center">
              {/* Orbit Ring Line - Passes exactly through the geometric middle of every node badge (diameter = radius * 2) */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/50 pointer-events-none z-0"
                style={{
                  width: `${radius * 2}px`,
                  height: `${radius * 2}px`,
                }}
              />

              {/* Rotating Container holding all 6 nodes */}
              <div
                className="absolute inset-0 w-full h-full z-10"
                style={{
                  transform: `rotate(${rotationAngle}deg)`,
                  transition: "transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
                  willChange: "transform",
                }}
              >
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = activeStep === idx;
                  // Base angle for node positioning (0 deg at top, 60 deg increments)
                  const angleDeg = idx * 60 - 90;
                  const angleRad = (angleDeg * Math.PI) / 180;
                  const x = radius * Math.cos(angleRad);
                  const y = radius * Math.sin(angleRad);

                  return (
                    <div
                      key={step.id}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    >
                      {/* Counter-rotate node container to keep icon upright */}
                      <button
                        type="button"
                        onClick={() => setActiveStep(idx)}
                        className={`flex items-center justify-center rounded-2xl cursor-pointer ${
                          isActive
                            ? "w-14 h-14 bg-[#0B1739] text-white shadow-xl shadow-[#0B1739]/30 ring-4 ring-sky-200 scale-110"
                            : "w-11 h-11 bg-white text-slate-700 border border-slate-200 shadow-md hover:bg-sky-50 hover:text-sky-600"
                        }`}
                        style={{
                          transform: `rotate(${-rotationAngle}deg)`,
                          transition:
                            "transform 1000ms cubic-bezier(0.16, 1, 0.3, 1), background-color 400ms ease, box-shadow 400ms ease, width 400ms ease, height 400ms ease",
                          willChange: "transform",
                        }}
                        aria-label={step.title}
                      >
                        <Icon className={isActive ? "h-6 w-6" : "h-5 w-5"} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Center Info Card */}
              <div className="relative z-20 max-w-[240px] sm:max-w-[280px] text-center px-4 py-6">
                <div
                  key={steps[activeStep].id}
                  className="animate-in fade-in zoom-in-95 duration-500"
                >
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-[#0B1739]">
                    {steps[activeStep].title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {steps[activeStep].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
