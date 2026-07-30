"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const [activeStep, setActiveStep] = useState(0);
  const [radius, setRadius] = useState(185);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive radius calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setRadius(105);
      } else if (window.innerWidth < 640) {
        setRadius(130);
      } else {
        setRadius(185);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lastStepRef = useRef(0);

  // GSAP ScrollTrigger driven step rotation animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          const stepIndex = Math.min(
            steps.length - 1,
            Math.floor(self.progress * steps.length)
          );
          if (stepIndex !== lastStepRef.current) {
            lastStepRef.current = stepIndex;
            setActiveStep(stepIndex);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Calculate rotation angle so active step node moves to focal right-center position (- activeStep * 60)
  const rotationAngle = -activeStep * 60;

  return (
    <div id="agile" ref={containerRef} className="relative h-[400vh] w-full">
      <section className="sticky top-0 h-[100dvh] w-full bg-[#EBF1FA] flex items-center justify-center overflow-hidden py-4 sm:py-8">
        <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-3 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading, Subtitle & Flow Diagram */}
            <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
              {/* Heading */}
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
                Our Agile Process.{" "}
                <span className="bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent block sm:inline">
                  Simple, Seamless, Streamlined
                </span>
              </h2>

              {/* Subtitle */}
              <p className="mt-2 sm:mt-4 text-xs sm:text-base leading-relaxed text-slate-600 max-w-xl mx-auto lg:mx-0">
                We follow a structured and agile development approach with project management planner to ensure the successful delivery of every project.
              </p>

              {/* Flow Diagram Pills Grid */}
              <div className="mt-5 sm:mt-10 max-w-xl mx-auto lg:mx-0 w-full">
                {/* Row 1: Scoping -> Cost Estimation -> Development */}
                <div className="flex items-center justify-between gap-1 sm:gap-3">
                  {/* Step 0: Scoping */}
                  <button
                    type="button"
                    onClick={() => setActiveStep(0)}
                    className={`flex-1 rounded-full px-2 sm:px-4 py-1.5 sm:py-2.5 text-[10px] sm:text-sm font-bold transition-all duration-300 cursor-pointer text-center truncate ${
                      activeStep === 0
                        ? "bg-sky-600 text-white shadow-md ring-2 ring-sky-400 scale-105"
                        : "bg-[#1E293B] text-slate-200 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    Scoping
                  </button>

                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 text-amber-500" />

                  {/* Step 1: Cost Estimation */}
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className={`flex-1 rounded-full px-2 sm:px-4 py-1.5 sm:py-2.5 text-[10px] sm:text-sm font-bold transition-all duration-300 cursor-pointer text-center truncate ${
                      activeStep === 1
                        ? "bg-sky-600 text-white shadow-md ring-2 ring-sky-400 scale-105"
                        : "bg-[#1E293B] text-slate-200 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    Cost Estimation
                  </button>

                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 text-amber-500" />

                  {/* Step 2: Development */}
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className={`flex-1 rounded-full px-2 sm:px-4 py-1.5 sm:py-2.5 text-[10px] sm:text-sm font-bold transition-all duration-300 cursor-pointer text-center truncate ${
                      activeStep === 2
                        ? "bg-sky-600 text-white shadow-md ring-2 ring-sky-400 scale-105"
                        : "bg-[#1E293B] text-slate-200 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    Development
                  </button>
                </div>

                {/* Connecting Down Arrow on right */}
                <div className="flex justify-end pr-6 sm:pr-12 my-1 sm:my-3">
                  <ArrowDown className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
                </div>

                {/* Row 2: Maintenance <- Deployment <- QA & Testing */}
                <div className="flex items-center justify-between gap-1 sm:gap-3">
                  {/* Step 5: Maintenance */}
                  <button
                    type="button"
                    onClick={() => setActiveStep(5)}
                    className={`flex-1 rounded-full px-2 sm:px-4 py-1.5 sm:py-2.5 text-[10px] sm:text-sm font-bold transition-all duration-300 cursor-pointer text-center truncate ${
                      activeStep === 5
                        ? "bg-sky-600 text-white shadow-md ring-2 ring-sky-400 scale-105"
                        : "bg-[#1E293B] text-slate-200 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    Maintenance
                  </button>

                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 text-amber-500" />

                  {/* Step 4: Deployment */}
                  <button
                    type="button"
                    onClick={() => setActiveStep(4)}
                    className={`flex-1 rounded-full px-2 sm:px-4 py-1.5 sm:py-2.5 text-[10px] sm:text-sm font-bold transition-all duration-300 cursor-pointer text-center truncate ${
                      activeStep === 4
                        ? "bg-sky-600 text-white shadow-md ring-2 ring-sky-400 scale-105"
                        : "bg-[#1E293B] text-slate-200 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    Deployment
                  </button>

                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 text-amber-500" />

                  {/* Step 3: QA & Testing */}
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className={`flex-1 rounded-full px-2 sm:px-4 py-1.5 sm:py-2.5 text-[10px] sm:text-sm font-bold transition-all duration-300 cursor-pointer text-center truncate ${
                      activeStep === 3
                        ? "bg-sky-600 text-white shadow-md ring-2 ring-sky-400 scale-105"
                        : "bg-[#1E293B] text-slate-200 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    QA & Testing
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Rotating Circular Orbit Component */}
            <div className="lg:col-span-6 flex justify-center items-center py-2 sm:py-6">
              <div className="relative w-[270px] h-[270px] sm:w-[460px] sm:h-[460px] flex items-center justify-center">
                {/* Orbit Ring Line */}
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
                        {/* Counter-rotate node container */}
                        <button
                          type="button"
                          onClick={() => setActiveStep(idx)}
                          className={`flex items-center justify-center rounded-xl sm:rounded-2xl cursor-pointer ${
                            isActive
                              ? "w-10 h-10 sm:w-14 sm:h-14 bg-sky-600 text-white shadow-lg ring-2 sm:ring-4 ring-sky-200 scale-110"
                              : "w-8 h-8 sm:w-11 sm:h-11 bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-sky-50 hover:text-sky-600 hover:scale-105"
                          }`}
                          style={{
                            transform: `rotate(${-rotationAngle}deg)`,
                            transition:
                              "transform 1000ms cubic-bezier(0.16, 1, 0.3, 1), background-color 400ms ease, box-shadow 400ms ease, width 400ms ease, height 400ms ease",
                            willChange: "transform",
                          }}
                          aria-label={step.title}
                        >
                          <Icon className={isActive ? "h-4 w-4 sm:h-6 sm:w-6" : "h-3.5 w-3.5 sm:h-5 sm:w-5"} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Center Info Card */}
                <div className="relative z-20 max-w-[170px] sm:max-w-[280px] text-center px-1 py-2">
                  <div
                    key={steps[activeStep].id}
                    className="animate-in fade-in zoom-in-95 duration-500"
                  >
                    <h3 className="text-sm sm:text-2xl font-extrabold text-sky-600 tracking-tight">
                      {steps[activeStep].title}
                    </h3>
                    <p className="mt-1 sm:mt-3 text-[10px] sm:text-sm leading-snug sm:leading-relaxed text-slate-600 font-medium">
                      {steps[activeStep].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
