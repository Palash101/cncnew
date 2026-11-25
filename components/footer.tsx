"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck, Sparkles, Send } from "lucide-react";
import { motion } from "motion/react";
import { useQuoteModal } from "@/context/quote-modal-context";
import { cn } from "@/lib/utils";
import { Container, Highlight, TopHairline, reveal } from "@/components/ui/section";

const SOLUTION_LINKS = [
  { href: "/#work", label: "Custom LLM & Chatbots" },
  { href: "/#work", label: "Wisper Real-Time Voice Agent" },
  { href: "/#services", label: "Odoo 18 ERP & CRM Suite" },
  { href: "/#services", label: "ERPNext & Frappe Doctypes" },
  { href: "/#industries", label: "EV & Telemetry Infrastructure" },
];

const COMPANY_LINKS = [
  { href: "/#services", label: "Our Technical Expertise" },
  { href: "/#industries", label: "Target Industries" },
  { href: "/#work", label: "Portfolio Showcase" },
  { href: "/#agile", label: "Agile Workflow Process" },
  { href: "#", label: "Careers & Hiring" },
];

const SOCIALS = [
  {
    href: "https://github.com",
    label: "GitHub",
    path: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    href: "https://twitter.com",
    label: "Twitter",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
];

const CONTACTS = [
  { icon: Mail, label: "discuss@craftandcode.in", href: "mailto:discuss@craftandcode.in" },
  { icon: Phone, label: "+91-72249 01787", href: "tel:+917224901787" },
  { icon: MapPin, label: "Global Delivery Centers — USA & India" },
];

// One set of text styles for every footer column
const columnTitle = "mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-200";
const bodyText = "text-sm leading-6 text-slate-400";
const linkClass = "text-sm leading-6 text-slate-400 transition-colors hover:text-white";
const contactRow = "inline-flex items-center gap-2.5 text-sm leading-6 text-slate-300 transition-colors";

export default function Footer() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <footer data-header="dark" className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,var(--c-ink)_0%,var(--c-panel)_45%,var(--color-slate-950)_100%)] text-slate-300">
      <TopHairline />

      {/* Background: soft glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[26rem] w-[56rem] -translate-x-1/2 rounded-full bg-sky-500/15 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[24rem] w-[24rem] translate-x-1/3 translate-y-1/3 rounded-full bg-blue-600/15 blur-[120px]" />
      </div>

      {/* ───────── CTA strip (part of the footer, no card) ───────── */}
      <div id="contact" className="scroll-mt-16">
        <Container className="py-12 sm:py-14">
          <motion.div
            {...reveal(0)}
            className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12"
          >
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-sky-300 uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                Ready to Elevate Your Enterprise?
              </p>
              <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                Let&apos;s Build Something <Highlight>Extraordinary Together</Highlight>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
                Partner with our engineering experts to deploy custom AI models, enterprise ERP platforms, and
                high-frequency web systems.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                openQuoteModal();
              }}
              className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:shrink-0"
            >
              <div className="relative w-full sm:flex-1 lg:w-80 lg:flex-none">
                <Mail className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="Your work email"
                  aria-label="Work email address"
                  className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] pr-4 pl-11 text-sm text-white placeholder-slate-400 transition-colors focus:border-sky-400 focus:bg-white/[0.09] focus:ring-4 focus:ring-sky-400/20 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-c-ink transition-colors hover:bg-sky-100"
              >
                Get Started
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </Container>
      </div>

      {/* ───────── Links & info ───────── */}
      <Container className="border-t border-white/10 py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-12">
          {/* Brand + contact */}
          <motion.div {...reveal(0)} className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="Craft and Code home"
              className="inline-flex rounded-lg bg-white px-3 py-1.5 transition-opacity hover:opacity-90"
            >
              <Image
                src="/craft and code logo.png"
                alt="Craft and Code Logo"
                width={150}
                height={40}
                className="h-7 w-auto object-contain"
              />
            </Link>

            <p className={cn(bodyText, "mt-5 max-w-sm")}>
              A digital engineering firm specializing in Next-Gen AI, custom Odoo & ERPNext integrations, and
              high-performance full-stack platforms for global enterprises.
            </p>

            <ul className="mt-6 space-y-3">
              {CONTACTS.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  {href ? (
                    <a href={href} className={cn(contactRow, "hover:text-white")}>
                      <Icon className="h-4 w-4 shrink-0 text-sky-400" />
                      {label}
                    </a>
                  ) : (
                    <span className={contactRow}>
                      <Icon className="h-4 w-4 shrink-0 text-sky-400" />
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions */}
          <motion.nav {...reveal(1)} aria-label="Solutions">
            <h4 className={columnTitle}>Solutions</h4>
            <ul className="space-y-3">
              {SOLUTION_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Company */}
          <motion.nav {...reveal(2)} aria-label="Company">
            <h4 className={columnTitle}>Company</h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Trust + social */}
          <motion.div {...reveal(3)}>
            <h4 className={columnTitle}>Enterprise Trust</h4>
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              <ShieldCheck className="h-4 w-4 shrink-0 text-sky-400" />
              ISO 27001 & HIPAA Compliant
            </p>
            <p className={cn(bodyText, "mt-2")}>
              Data sovereignty, zero-trust security, and end-to-end encrypted AI deployments.
            </p>

            <h4 className={cn(columnTitle, "mt-7 mb-3")}>Follow Us</h4>
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 transition-colors hover:border-white hover:bg-white hover:text-c-ink"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>

      {/* ───────── Bottom bar ───────── */}
      <Container className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Craft & Code. All rights reserved.</p>
        <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {["Privacy Policy", "Terms of Service", "Security Governance"].map((label) => (
            <Link key={label} href="#" className="transition-colors hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
