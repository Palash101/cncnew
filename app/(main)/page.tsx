import dynamic from "next/dynamic";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";

// Lazy-load below-the-fold components to reduce initial JS critical request chain
const SolutionsTabbedSection = dynamic(
  () => import("@/components/solutions-tabbed-section"),
);
const ExpertiseSection = dynamic(
  () => import("@/components/expertise-section"),
);
const IndustriesSection = dynamic(
  () => import("@/components/industries-section"),
);
const AgileProcess = dynamic(() => import("@/components/agile-process"));
const ReviewsSection = dynamic(() => import("@/components/reviews-section"));
const TechStack = dynamic(() => import("@/components/tech-stack"));

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50/80 via-white to-blue-50/50">
      {/*
        Hero stays pinned (sticky) while the stats section slides up over it.
        The wrapper limits how long the hero stays pinned.
      */}
      <div className="relative">
        <HeroSection />
        <div className="relative z-10 overflow-hidden rounded-t-[28px] shadow-[0_-24px_60px_-12px_rgba(11,23,57,0.35)] sm:rounded-t-[40px]">
          <StatsSection />
        </div>
      </div>
      <div className="relative z-10">
        <SolutionsTabbedSection />
        <ExpertiseSection />
        <IndustriesSection />
        <AgileProcess />
        <ReviewsSection />
        <TechStack />
      </div>
    </main>
  );
}
