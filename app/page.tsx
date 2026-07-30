import dynamic from "next/dynamic";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";

// Lazy-load below-the-fold components to reduce initial JS critical request chain
const SolutionsTabbedSection = dynamic(
  () => import("@/components/solutions-tabbed-section")
);
const ExpertiseSection = dynamic(
  () => import("@/components/expertise-section")
);
const IndustriesSection = dynamic(
  () => import("@/components/industries-section")
);
const AgileProcess = dynamic(() => import("@/components/agile-process"));
const TechStack = dynamic(() => import("@/components/tech-stack"));

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50/80 via-white to-blue-50/50">
      <HeroSection />
      <StatsSection />
      <SolutionsTabbedSection />
      <ExpertiseSection />
      <IndustriesSection />
      <AgileProcess />
      <TechStack />
    </main>
  );
}
