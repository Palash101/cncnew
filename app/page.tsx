import dynamic from "next/dynamic";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import ExpertiseSection from "@/components/expertise-section";
import TechStack from "@/components/tech-stack";

// Dynamic import heavy GSAP client components
const IndustriesSection = dynamic(
  () => import("@/components/industries-section")
);
const AgileProcess = dynamic(() => import("@/components/agile-process"));

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50/80 via-white to-blue-50/50">
      <HeroSection />
      <StatsSection />
      <ExpertiseSection />
      <IndustriesSection />
      <AgileProcess />
      <TechStack />
    </main>
  );
}
