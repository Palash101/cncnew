"use client";

import { Clock, ListChecks, Mail, MapPin, MessagesSquare, Phone, type LucideIcon } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import ContactForm from "@/components/contact-form";
import AmbientBackground from "@/components/ui/ambient-background";
import {
  Container,
  Eyebrow,
  Highlight,
  SECTION_Y,
  SectionHeader,
  TopHairline,
  descriptionClass,
  monoLabel,
  reveal,
  revealBlock,
  revealHeading,
} from "@/components/ui/section";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

const CHANNELS: { icon: LucideIcon; label: string; value: string; href?: string }[] = [
  { icon: Mail, label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: Phone, label: "Phone", value: CONTACT_PHONE.label, href: CONTACT_PHONE.href },
  { icon: MapPin, label: "Location", value: "Bangalore, India. Delivery centers in the USA and India." },
  { icon: Clock, label: "Response time", value: "We reply within 24 hours" },
];

// Same wording as the first stages of the process section on the home page
const NEXT_STEPS = [
  {
    title: "We read your brief",
    description: "One of our lead technical architects goes through your details and replies within 24 hours.",
  },
  {
    title: "Scoping",
    description:
      "We go through your requirements together, break the work into modules and map the technical roadmap.",
  },
  {
    title: "Cost estimation",
    description:
      "You get a complete module-wise cost breakdown for the project, along with a maintenance and support plan.",
  },
];

// Pale to navy, the same progression the process section uses
const STEP_BARS = ["bg-c-brand-300", "bg-c-brand", "bg-c-ink"];

/**
 * Contact page: the page header and form on the dark surface, then what happens after
 * the message is sent on the pale surface, so the dark footer has something to follow.
 */
export default function ContactSection() {
  return (
    <MotionConfig reducedMotion="user">
      {/* ───────── Header, contact details and form ───────── */}
      <section
        data-header="dark"
        className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,var(--c-night)_0%,var(--c-ink)_55%,var(--c-panel)_100%)] pt-32 pb-20 text-white sm:pt-40 sm:pb-28"
      >
        <AmbientBackground variant="dark" />

        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="lg:pt-4">
              <motion.div {...reveal(0)}>
                <Eyebrow icon={MessagesSquare}>Contact</Eyebrow>
              </motion.div>

              <motion.h1
                {...revealHeading(1)}
                className="mt-6 text-[2.25rem] leading-[1.08] font-semibold tracking-[-0.035em] sm:text-5xl md:text-[56px]"
              >
                Tell Us What You <Highlight>Want to Build</Highlight>
              </motion.h1>

              <motion.p {...reveal(2)} className={cn(descriptionClass("dark"), "mt-6 max-w-lg")}>
                Share a few details about your project and one of our lead technical architects will get back to you
                within 24 hours.
              </motion.p>

              <ul className="mt-10 border-t border-white/10">
                {CHANNELS.map(({ icon: Icon, label, value, href }, i) => (
                  <motion.li key={label} {...reveal(3 + i)} className="border-b border-white/10">
                    <div className="group flex items-center gap-4 py-5">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/10 text-sky-300 transition-colors duration-300 group-hover:border-sky-400/60 group-hover:bg-sky-400/20">
                        <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0">
                        <p className={cn(monoLabel, "text-sky-300/80 uppercase")}>{label}</p>
                        {href ? (
                          <a
                            href={href}
                            className="mt-1 block text-base font-semibold break-words text-white transition-colors hover:text-c-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-lg"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="mt-1 text-base leading-6 font-semibold text-white sm:text-lg">{value}</p>
                        )}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Form card */}
            <motion.div
              {...revealBlock(2)}
              className="relative rounded-3xl border border-white/60 bg-white p-6 text-c-ink shadow-[0_40px_90px_-40px_color-mix(in_srgb,var(--c-glow)_55%,transparent)] sm:p-9"
            >
              <h2 className="text-2xl leading-tight font-semibold tracking-[-0.03em] sm:text-[1.75rem]">
                Start a project
              </h2>
              <p className="mt-2 mb-7 text-[15px] leading-6 text-slate-600">
                Fields marked <span className="font-semibold text-c-brand">*</span> are required.
              </p>
              <ContactForm />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ───────── What happens next ───────── */}
      <section
        data-header="light"
        className={cn(
          "relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,var(--c-wash-100)_0%,var(--c-wash-50)_55%,var(--c-wash-100)_100%)] text-c-ink",
          SECTION_Y,
        )}
      >
        <TopHairline tone="light" />
        <AmbientBackground variant="ice" />

        <Container>
          <SectionHeader
            tone="light"
            align="left"
            eyebrow="What Happens Next"
            eyebrowIcon={ListChecks}
            title={
              <>
                From First Message to <Highlight tone="light">a Clear Plan</Highlight>
              </>
            }
          />

          <ol className="mt-12 grid gap-10 sm:mt-14 md:grid-cols-3 md:gap-8">
            {NEXT_STEPS.map((step, i) => (
              <motion.li key={step.title} {...reveal(i)} className="border-t border-c-ink/10 pt-6">
                <div className="flex items-center gap-3">
                  <span aria-hidden className={cn("block h-1 w-8 rounded-full", STEP_BARS[i])} />
                  <span className={cn(monoLabel, "font-semibold text-c-brand")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2.5 text-base leading-7 text-slate-600">{step.description}</p>
              </motion.li>
            ))}
          </ol>
        </Container>
      </section>
    </MotionConfig>
  );
}
