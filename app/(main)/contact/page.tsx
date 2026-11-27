import type { Metadata } from "next";
import ContactSection from "@/components/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Craft and Code about your project. Share your requirements and our lead technical architects will get back to you within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
