import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import TechStack from "@/components/tech-stack";
import OdooSection from "@/components/odoo-section";
import IndustriesSection from "@/components/industries-section";
import AgileProcess from "@/components/agile-process";
import StageWorkflow from "@/components/stage-workflow";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50/80 via-white to-blue-50/50">
      <HeroSection />
      <StatsSection />
      <TechStack />
      <OdooSection />
      <IndustriesSection />
      <AgileProcess />
      {/* <StageWorkflow /> */}
    </main>
  );
}
