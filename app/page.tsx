import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50/80 via-white to-blue-50/50">
      <HeroSection />
      <StatsSection />
    </main>
  );
}
