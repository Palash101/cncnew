import type { Metadata } from "next";
import AboutSection from "@/components/about-section";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Craft and Code is a digital engineering firm with more than 12 years of experience building AI, ERP, web, mobile and cloud software for organizations around the world.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <AboutSection />
    </main>
  );
}
