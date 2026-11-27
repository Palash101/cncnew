"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  Cloud,
  Eye,
  Handshake,
  LayoutGrid,
  Mail,
  MapPin,
  MonitorSmartphone,
  Phone,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { STATS } from "@/components/stats-section";
import AmbientBackground from "@/components/ui/ambient-background";
import {
  Container,
  Eyebrow,
  Highlight,
  SECTION_Y,
  SectionHeader,
  TopHairline,
  cardClass,
  descriptionClass,
  IconTile,
  monoLabel,
  reveal,
  revealBlock,
  revealCard,
  revealHeading,
} from "@/components/ui/section";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

const FOCUS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: BrainCircuit,
    title: "AI and Machine Learning",
    description: "Custom LLM chatbots, fine-tuning and RAG, and real-time voice agents.",
  },
  {
    icon: LayoutGrid,
    title: "ERP and CRM",
    description: "Odoo 18 customization and ERPNext integrations built around how your business runs.",
  },
  {
    icon: MonitorSmartphone,
    title: "Web and Mobile Apps",
    description: "Full-stack web platforms and apps for iOS and Android.",
  },
  {
    icon: Cloud,
    title: "Cloud and DevOps",
    description: "Secure cloud infrastructure with automated, zero-downtime deployments.",
  },
];

// The four things the process section on the home page promises, each with what backs it up
const PRINCIPLES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: BadgeCheck,
    title: "Quality",
    description: "Automated testing, security audits and bug fixing make sure the software is solid before it ships.",
  },
  {
    icon: Wallet,
    title: "Cost Optimization",
    description: "You get a module-wise cost breakdown for the project, along with a maintenance and support plan.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear project planning and agile sprints, so you can see what is being built at every stage.",
  },
  {
    icon: Handshake,
    title: "Client Satisfaction",
    description: "After launch we stay on with monitoring, performance tuning, security updates and SLA-backed support.",
  },
];

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d277.6208877750689!2d78.1926465177077!3d26.208094955429612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c551a7da89a9%3A0x886b94936fa11b2f!2sCraftandCode%20Solutions%20Private%20Limited!5e1!3m2!1sen!2sin!4v1795773672366!5m2!1sen!2sin";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=CraftandCode%20Solutions%20Private%20Limited";

/**
 * About page: header with the company numbers (dark), who we are and what we build (white),
 * how we work (pale), then the office map (white) before the dark footer.
 */
export default function AboutSection() {
  return (
    <MotionConfig reducedMotion="user">
      {/* ───────── Header and numbers ───────── */}
      <section
        data-header="dark"
        className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,var(--c-night)_0%,var(--c-ink)_55%,var(--c-panel)_100%)] pt-32 pb-16 text-white sm:pt-40 sm:pb-20"
      >
        <AmbientBackground variant="dark" />

        <Container>
          <motion.div {...reveal(0)}>
            <Eyebrow icon={Users}>About Us</Eyebrow>
          </motion.div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <motion.h1
              {...revealHeading(1)}
              className="text-[2.25rem] leading-[1.08] font-semibold tracking-[-0.035em] sm:text-5xl md:text-[56px]"
            >
              The Engineering Team Behind <Highlight>Craft and Code</Highlight>
            </motion.h1>
            <motion.p {...reveal(2)} className={cn(descriptionClass("dark"), "max-w-md lg:pb-2")}>
              We design and build software that helps ambitious brands grow, and we have been doing it for more than
              12 years.
            </motion.p>
          </div>

          <ul className="mt-14 grid grid-cols-2 border-t border-white/15 sm:mt-16 lg:grid-cols-4">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.li
                  key={stat.label}
                  {...reveal(i)}
                  className={cn(
                    "border-white/15 py-8 lg:py-10",
                    i % 2 === 0 ? "pr-5" : "border-l pl-5 sm:pl-8",
                    i >= 2 && "border-t lg:border-t-0",
                    i === 2 && "lg:border-l lg:pl-8",
                  )}
                >
                  <Icon aria-hidden className="h-6 w-6 text-sky-400" strokeWidth={1.75} />
                  <p className="mt-5 text-5xl leading-none font-semibold tracking-[-0.04em] tabular-nums sm:text-6xl">
                    {stat.value}
                    <span className="font-medium text-sky-400">+</span>
                  </p>
                  <p className="mt-4 text-base font-semibold sm:text-lg">{stat.label}</p>
                  <p className="mt-1.5 text-sm leading-snug text-slate-300">{stat.description}</p>
                </motion.li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ───────── Who we are, what we build ───────── */}
      <section
        data-header="light"
        className={cn("relative isolate w-full overflow-hidden bg-white text-c-ink", SECTION_Y)}
      >
        <TopHairline tone="light" />
        <AmbientBackground variant="white" />

        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <SectionHeader
                tone="light"
                align="left"
                eyebrow="Who We Are"
                title={
                  <>
                    A Digital Engineering Firm for <Highlight tone="light">Modern Enterprises</Highlight>
                  </>
                }
              />
              <motion.p {...reveal(2)} className={cn(descriptionClass("light"), "mt-6")}>
                Craft and Code has spent more than 12 years turning complex infrastructure into products people find
                easy to use.
              </motion.p>
              <motion.p {...reveal(3)} className={cn(descriptionClass("light"), "mt-5")}>
                We work with organizations around the world to modernize their systems and keep them running
                reliably, with one team that covers AI, ERP, web, mobile and cloud.
              </motion.p>
            </div>

            <ul className="border-t border-c-ink/10 lg:mt-4">
              {FOCUS.map((item, i) => (
                <motion.li
                  key={item.title}
                  {...reveal(i)}
                  className="group flex items-start gap-5 border-b border-c-ink/10 py-6"
                >
                  <IconTile icon={item.icon} tone="light" />
                  <div className="min-w-0">
                    <p className="flex items-center gap-3">
                      <span className={cn(monoLabel, "font-semibold text-c-brand")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg font-semibold tracking-[-0.02em]">{item.title}</span>
                    </p>
                    <p className="mt-1.5 text-base leading-7 text-slate-600">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ───────── How we work ───────── */}
      <section
        data-header="light"
        className={cn(
          "relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,var(--c-wash-100)_0%,var(--c-wash-50)_55%,var(--c-wash-100)_100%)] text-c-ink",
          SECTION_Y,
        )}
      >
        <AmbientBackground variant="ice" />

        <Container>
          <SectionHeader
            tone="light"
            eyebrow="How We Work"
            title={
              <>
                Four Things We Hold <Highlight tone="light">Every Project To</Highlight>
              </>
            }
          />

          <ul className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((item, i) => (
              <motion.li key={item.title} {...revealCard(i)} className={cn(cardClass("light"), "p-6 sm:p-7")}>
                <IconTile icon={item.icon} tone="light" />
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2.5 text-[15px] leading-7 text-slate-600">{item.description}</p>
              </motion.li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───────── Office map ───────── */}
      <section
        data-header="light"
        className={cn("relative isolate w-full overflow-hidden bg-white text-c-ink", SECTION_Y)}
      >
        <TopHairline tone="light" />

        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-center lg:gap-16">
            <div>
              <SectionHeader
                tone="light"
                align="left"
                eyebrow="Our Office"
                eyebrowIcon={MapPin}
                title={
                  <>
                    Come and <Highlight tone="light">Meet the Team</Highlight>
                  </>
                }
              />

              <motion.ul {...reveal(2)} className="mt-8 space-y-4">
                <li className="flex items-start gap-3 text-base leading-7 text-slate-700">
                  <MapPin aria-hidden className="mt-1 h-5 w-5 shrink-0 text-c-brand" />
                  <span>
                    <span className="block font-semibold text-c-ink">CraftandCode Solutions Private Limited</span>
                    Second Floor, 828-A, above The Classic Restaurant, City Center, Kailash Vihar, Tulsi Vihar
                    Colony, Gwalior, Madhya Pradesh 474002
                  </span>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-3 text-base text-slate-700 transition-colors hover:text-c-brand"
                  >
                    <Mail aria-hidden className="h-5 w-5 shrink-0 text-c-brand" />
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT_PHONE.href}
                    className="inline-flex items-center gap-3 text-base text-slate-700 transition-colors hover:text-c-brand"
                  >
                    <Phone aria-hidden className="h-5 w-5 shrink-0 text-c-brand" />
                    {CONTACT_PHONE.label}
                  </a>
                </li>
              </motion.ul>

              <motion.div {...reveal(3)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact"
                  className="group inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-xl whitespace-nowrap bg-c-ink px-6 text-base font-semibold text-white transition-colors duration-300 hover:bg-c-ink-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c-brand"
                >
                  Contact us
                  <ArrowRight
                    aria-hidden
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </Link>
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-xl whitespace-nowrap border border-slate-300 px-6 text-base font-semibold text-c-ink transition-colors duration-300 hover:border-c-brand hover:bg-c-wash-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c-brand"
                >
                  Open in Google Maps
                  <ArrowUpRight aria-hidden className="h-5 w-5" />
                </a>
              </motion.div>
            </div>

            <motion.div
              {...revealBlock(1)}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-c-wash-100 shadow-[0_30px_70px_-40px_color-mix(in_srgb,var(--c-ink)_45%,transparent)]"
            >
              <iframe
                src={MAP_EMBED}
                title="Map showing the Craft and Code office"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="block h-[340px] w-full border-0 sm:h-[460px]"
              />
            </motion.div>
          </div>
        </Container>
      </section>
    </MotionConfig>
  );
}
