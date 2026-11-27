"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  ArrowRight,
  Bot,
  BrainCircuit,
  ChevronDown,
  Cloud,
  Cpu,
  Database,
  Eye,
  Layers,
  Menu,
  Package,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Truck,
  Wifi,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Mark, TECH_ORDER, techCategories } from "@/components/tech-marks";
import { cn } from "@/lib/utils";
import { useQuoteModal } from "@/context/quote-modal-context";

/** One page in a popup. With a description it is a large row; without one, a compact row. */
type SubLink = {
  href: string;
  label: string;
  description?: string;
  /** A lucide icon, or `mark`: the name of a technology, drawn with its brand mark */
  icon?: LucideIcon;
  mark?: string;
};
type NavSection = {
  title: string;
  /** Columns this group takes in the popup (default: 1). The groups of one popup share its width by this number. */
  columns?: number;
  items: SubLink[];
};
type NavLink = {
  href: string;
  label: string;
  /**
   * Pages under this link, in titled groups. When present, the link gets a popup (desktop)
   * or an accordion (phones). Each group is one block of the popup, split by a rule.
   */
  sections?: NavSection[];
  /** Short line shown at the bottom of the popup */
  note?: string;
  /** Text of the popup's link to the main page (default: "View all <label>") */
  allLabel?: string;
};

const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/#/g, "-sharp")
    .replace(/\./g, "dot")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// The same four groups and technologies as the Technology Stack section
const TECH_SECTIONS: NavSection[] = TECH_ORDER.flatMap((id) => {
  const category = techCategories.find((c) => c.id === id);
  if (!category) return [];
  return [
    {
      title: category.title,
      items: category.items.map((item) => ({
        href: `/technology/${slug(item.name)}`,
        label: item.name,
        mark: item.name,
      })),
    },
  ];
});

// Each link opens its own page. To give another link a popup, add `sections` to it.
const NAV_LINKS: NavLink[] = [
  {
    href: "/services",
    label: "Services",
    note: "Not sure which service fits? Tell us about your project.",
    sections: [
      {
        title: "AI Practice",
        items: [
          {
            href: "/services/artificial-intelligence",
            label: "Artificial Intelligence",
            description: "AI built into the processes you already run",
            icon: BrainCircuit,
          },
          {
            href: "/services/generative-ai",
            label: "Generative AI",
            description: "Private models, chatbots and knowledge tools",
            icon: Sparkles,
          },
          {
            href: "/services/agentic-ai",
            label: "Agentic AI",
            description: "Supervised agents that act across workflows",
            icon: Bot,
          },
        ],
      },
      {
        title: "Engineering Foundations",
        columns: 2,
        items: [
          {
            href: "/services/machine-learning",
            label: "Machine Learning",
            description: "Production models that adapt as data changes",
            icon: Cpu,
          },
          {
            href: "/services/computer-vision",
            label: "Computer Vision",
            description: "Automated inspection and visual analysis",
            icon: Eye,
          },
          {
            href: "/services/cloud",
            label: "Cloud",
            description: "Secure, resilient infrastructure that scales",
            icon: Cloud,
          },
          {
            href: "/services/data-science-analytics",
            label: "Data Science and Analytics",
            description: "Data foundations your teams can rely on",
            icon: Database,
          },
          {
            href: "/services/cybersecurity",
            label: "Cybersecurity",
            description: "Security designed in from the first decision",
            icon: ShieldCheck,
          },
          {
            href: "/services/iot",
            label: "IoT",
            description: "Connected devices with data you can use",
            icon: Wifi,
          },
        ],
      },
    ],
  },
  {
    href: "/technology",
    label: "Technology",
    allLabel: "View the full stack",
    note: "The tools we use every day to build and run enterprise software.",
    sections: TECH_SECTIONS,
  },
  {
    href: "/our-work",
    label: "Our Work",
    allLabel: "View all projects",
    note: "Have a project in mind? We reply within 24 hours.",
    sections: [
      {
        title: "AI Solutions",
        items: [
          {
            href: "/our-work/custom-llm-chatbots",
            label: "Custom LLM & Chatbots",
            description: "Private conversational AI on your own data",
            icon: Bot,
          },
          {
            href: "/our-work/fine-tuning-rag",
            label: "Fine-Tuning & RAG",
            description: "Tuned open-source models with vector search",
            icon: BrainCircuit,
          },
          {
            href: "/our-work/wisper-ai-agent",
            label: "Wisper AI Agent",
            description: "Real-time voice and audio translation",
            icon: Zap,
          },
        ],
      },
      {
        title: "Featured Projects",
        columns: 2,
        items: [
          {
            href: "/our-work/enterprise-erp-crm-suite",
            label: "Enterprise ERP & CRM Suite",
            description: "Odoo 18 with accounting, inventory and sales",
            icon: Layers,
          },
          {
            href: "/our-work/fintech-trading-platform",
            label: "Next-Gen Fintech Trading Platform",
            description: "Real-time web trading dashboard",
            icon: TrendingUp,
          },
          {
            href: "/our-work/smart-logistics-fleet-tracker",
            label: "Smart Logistics & Fleet Tracker",
            description: "Mobile app for GPS fleet tracking and dispatch",
            icon: Truck,
          },
          {
            href: "/our-work/ai-healthcare-diagnostics-portal",
            label: "AI Healthcare Diagnostics Portal",
            description: "HIPAA-compliant AI diagnostics platform",
            icon: Activity,
          },
          {
            href: "/our-work/omnichannel-ecommerce-platform",
            label: "Omnichannel E-Commerce Platform",
            description: "Headless storefront with custom payments",
            icon: ShoppingCart,
          },
          {
            href: "/our-work/supply-chain-order-management",
            label: "Supply Chain & Order Management",
            description: "Odoo module for purchase orders and stock",
            icon: Package,
          },
        ],
      },
    ],
  },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

type Tone = "dark" | "light";

// Height of the bar in px (h-[72px]); its middle decides which section it is sitting on
const BAR_HEIGHT = 72;
// Distance (px) the user must scroll before the bar gets its own background
const SCROLL_THRESHOLD = 24;
// Time (ms) the popup stays open after the pointer leaves, so it can travel from link to popup
const CLOSE_DELAY = 140;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Same two colour combinations as the industry cards */
const TONES: Record<
  Tone,
  {
    bar: string;
    link: string;
    active: string;
    cta: string;
    toggle: string;
    line: string;
    panel: string;
    item: string;
    itemIcon: string;
    itemText: string;
    itemArrow: string;
    panelFoot: string;
  }
> = {
  dark: {
    bar: "border-white/10 bg-c-ink/95",
    link: "text-white hover:text-c-highlight",
    active: "text-c-highlight",
    cta: "bg-white text-c-ink hover:bg-slate-200 focus-visible:outline-white",
    toggle: "text-white hover:bg-white/10 focus-visible:outline-white",
    line: "border-white/10",
    panel:
      "border-white/10 bg-c-ink text-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)]",
    item: "hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:outline-white",
    itemIcon:
      "border-white/10 bg-white/[0.06] text-c-highlight group-hover/item:border-c-highlight group-hover/item:bg-c-highlight group-hover/item:text-c-ink",
    itemText: "text-slate-400",
    itemArrow: "text-c-highlight",
    panelFoot: "border-white/10 bg-white/[0.03] text-slate-300",
  },
  light: {
    bar: "border-slate-200 bg-white/95",
    link: "text-c-ink hover:text-c-brand",
    active: "text-c-brand",
    cta: "bg-c-ink text-white hover:bg-c-ink-hover focus-visible:outline-c-ink",
    toggle: "text-c-ink hover:bg-slate-100 focus-visible:outline-c-ink",
    line: "border-slate-200",
    panel:
      "border-slate-200 bg-white text-c-ink shadow-[0_30px_70px_-24px_color-mix(in_srgb,var(--c-ink)_40%,transparent)]",
    item: "hover:bg-c-wash-100 focus-visible:bg-c-wash-100 focus-visible:outline-c-brand",
    itemIcon:
      "border-slate-200 bg-c-wash-100 text-c-brand group-hover/item:border-c-brand group-hover/item:bg-c-brand group-hover/item:text-white",
    itemText: "text-slate-600",
    itemArrow: "text-c-brand",
    panelFoot: "border-slate-200 bg-slate-50 text-slate-600",
  },
};

export default function Navbar() {
  const { openQuoteModal } = useQuoteModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sectionTone, setSectionTone] = useState<Tone>("dark");
  // Desktop popup and phone accordion: the href of the link whose pages are showing
  const [popup, setPopup] = useState<string | null>(null);
  const [accordion, setAccordion] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  // The link of the page being viewed (also for pages nested under it)
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const sync = useCallback(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD);

    // Match the section behind the bar; nested areas come later in the page, so the last hit wins
    let tone: Tone = "dark";
    document.querySelectorAll<HTMLElement>("[data-header]").forEach((el) => {
      const { top, bottom } = el.getBoundingClientRect();
      if (top <= BAR_HEIGHT / 2 && bottom > BAR_HEIGHT / 2)
        tone = el.dataset.header === "light" ? "light" : "dark";
    });
    setSectionTone(tone);
  }, []);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", sync);

  // First paint, every page change, and window resizes
  useEffect(() => {
    const frame = requestAnimationFrame(sync);
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", sync);
    };
  }, [sync, pathname]);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const showPopup = (href: string) => {
    cancelClose();
    setPopup(href);
  };
  const hidePopup = () => {
    cancelClose();
    setPopup(null);
  };
  const hidePopupSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setPopup(null), CLOSE_DELAY);
  };
  useEffect(() => cancelClose, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setAccordion(null);
  };

  // Escape closes the popup and the mobile menu; the mobile menu also closes on the desktop layout
  useEffect(() => {
    if (!menuOpen && !popup) return;
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setPopup(null);
      closeMenu();
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", closeMenu);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", closeMenu);
    };
  }, [menuOpen, popup]);

  const tone = TONES[sectionTone];
  const isDark = sectionTone === "dark";
  // Over the hero the bar is see-through, so header and hero read as one
  const solid = scrolled || menuOpen;

  const linkClass = (href: string) =>
    cn("transition-colors", isActive(href) ? tone.active : tone.link);
  const desktopLinkClass = (href: string) =>
    cn(
      "relative inline-flex items-center gap-1 px-3.5 py-2 text-[15px] font-semibold whitespace-nowrap xl:px-4",
      "after:absolute after:inset-x-3.5 after:bottom-0.5 after:h-0.5 after:rounded-full after:bg-current xl:after:inset-x-4",
      isActive(href) ? "after:opacity-100" : "after:opacity-0",
      linkClass(href),
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        solid
          ? cn("backdrop-blur-md", tone.bar)
          : "border-transparent bg-transparent",
      )}
    >
      {/* `relative`: the popup spans the full width of this row */}
      <div className="relative mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between gap-6 px-6 sm:px-8">
        {/* Logo: white on dark, original colours on light. The file has empty margins, hence the negative one. */}
        <Link
          href="/"
          aria-label="Craft and Code, home"
          className="-ml-4 shrink-0"
          onClick={closeMenu}
        >
          <Image
            src="/craft and code logo.png"
            alt=""
            width={208}
            height={48}
            priority
            sizes="208px"
            className={cn(
              "h-12 w-auto object-contain transition-[filter] duration-300",
              isDark && "brightness-0 invert",
            )}
          />
        </Link>

        {/* Desktop navigation */}
        <MotionConfig reducedMotion="user">
          <nav aria-label="Main" className="hidden items-center lg:flex">
            {NAV_LINKS.map((link) => {
              const current = isActive(link.href)
                ? ("page" as const)
                : undefined;

              if (!link.sections) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={current}
                    className={desktopLinkClass(link.href)}
                  >
                    {link.label}
                  </Link>
                );
              }

              const open = popup === link.href;
              return (
                // Not positioned on purpose: the popup inside lines up with the whole row
                <div
                  key={link.href}
                  onMouseEnter={() => showPopup(link.href)}
                  onMouseLeave={hidePopupSoon}
                  onFocus={() => showPopup(link.href)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget))
                      hidePopup();
                  }}
                >
                  <Link
                    href={link.href}
                    aria-current={current}
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={hidePopup}
                    className={desktopLinkClass(link.href)}
                  >
                    {link.label}
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        open && "rotate-180",
                      )}
                    />
                  </Link>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        key="popup"
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          y: -6,
                          scale: 0.98,
                          transition: { duration: 0.15 },
                        }}
                        transition={{ duration: 0.28, ease: EASE }}
                        className="absolute inset-x-6 top-full origin-top sm:inset-x-8"
                      >
                        <div
                          className={cn(
                            "max-h-[calc(100svh-88px)] overflow-x-hidden overflow-y-auto rounded-2xl border",
                            tone.panel,
                          )}
                        >
                          <div className="flex p-3">
                            {link.sections.map((section, s) => (
                              <section
                                key={section.title}
                                aria-label={section.title}
                                // Groups share the width by their number of columns
                                style={{ flex: section.columns ?? 1 }}
                                className={cn(
                                  "min-w-0",
                                  s > 0 && cn("ml-3 border-l pl-3", tone.line),
                                )}
                              >
                                <h3
                                  className={cn(
                                    "px-3.5 pt-2.5 pb-2 font-mono text-[11px] leading-4 font-semibold tracking-[0.2em] uppercase",
                                    tone.itemText,
                                  )}
                                >
                                  {section.title}
                                </h3>
                                <ul
                                  className="grid gap-1"
                                  style={{
                                    gridTemplateColumns: `repeat(${section.columns ?? 1}, minmax(0, 1fr))`,
                                  }}
                                >
                                  {section.items.map((item, i) => {
                                    const Icon = item.icon;
                                    // No description: a compact row, so long lists stay short
                                    const compact = !item.description;
                                    return (
                                      <motion.li
                                        key={item.href}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                          duration: 0.3,
                                          ease: EASE,
                                          delay: 0.04 + (s * 2 + i) * 0.025,
                                        }}
                                      >
                                        <Link
                                          href={item.href}
                                          onClick={hidePopup}
                                          aria-current={
                                            pathname === item.href
                                              ? "page"
                                              : undefined
                                          }
                                          className={cn(
                                            "group/item flex rounded-xl transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2",
                                            compact
                                              ? "items-center gap-3 p-2"
                                              : "items-start gap-3.5 p-3.5",
                                            tone.item,
                                          )}
                                        >
                                          <span
                                            className={cn(
                                              "inline-flex shrink-0 items-center justify-center border transition-[background-color,border-color,color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/item:-translate-y-0.5",
                                              compact
                                                ? "h-9 w-9 rounded-lg"
                                                : "h-11 w-11 rounded-xl",
                                              tone.itemIcon,
                                            )}
                                          >
                                            <span
                                              aria-hidden
                                              className="inline-flex transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/item:scale-110"
                                            >
                                              {Icon && (
                                                <Icon
                                                  strokeWidth={1.75}
                                                  className="h-5 w-5"
                                                />
                                              )}
                                              {item.mark && (
                                                <Mark
                                                  name={item.mark}
                                                  className="h-5 w-5"
                                                />
                                              )}
                                            </span>
                                          </span>
                                          <span
                                            className={cn(
                                              "min-w-0",
                                              !compact && "pt-0.5",
                                            )}
                                          >
                                            <span
                                              className={cn(
                                                "flex items-center gap-1.5 leading-5 font-semibold",
                                                compact
                                                  ? "text-sm"
                                                  : "text-[15px]",
                                              )}
                                            >
                                              {item.label}
                                              <ArrowRight
                                                aria-hidden
                                                className={cn(
                                                  "h-4 w-4 shrink-0 -translate-x-1.5 opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/item:translate-x-0 group-hover/item:opacity-100 group-focus-visible/item:translate-x-0 group-focus-visible/item:opacity-100",
                                                  tone.itemArrow,
                                                )}
                                              />
                                            </span>
                                            {item.description && (
                                              <span
                                                className={cn(
                                                  "mt-1 block text-[13px] leading-5",
                                                  tone.itemText,
                                                )}
                                              >
                                                {item.description}
                                              </span>
                                            )}
                                          </span>
                                        </Link>
                                      </motion.li>
                                    );
                                  })}
                                </ul>
                              </section>
                            ))}
                          </div>

                          <div
                            className={cn(
                              "flex items-center justify-between gap-6 border-t px-6 py-3.5 text-sm",
                              tone.panelFoot,
                            )}
                          >
                            <p>{link.note}</p>
                            <Link
                              href={link.href}
                              onClick={hidePopup}
                              className={cn(
                                "group/all inline-flex shrink-0 items-center gap-1.5 font-semibold",
                                tone.link,
                              )}
                            >
                              {link.allLabel ??
                                `View all ${link.label.toLowerCase()}`}
                              <ArrowRight
                                aria-hidden
                                className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover/all:translate-x-1"
                              />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </MotionConfig>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className={cn(
              "hidden h-11 cursor-pointer items-center gap-2 rounded-xl px-5 text-[15px] font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:inline-flex",
              tone.cta,
            )}
          >
            Get a Quote
            <ArrowRight aria-hidden className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={cn(
              "-mr-2.5 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl transition-colors focus-visible:outline-2 lg:hidden",
              tone.toggle,
            )}
          >
            {menuOpen ? (
              <X aria-hidden className="h-6 w-6" />
            ) : (
              <Menu aria-hidden className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile and tablet menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          data-lenis-prevent
          className={cn(
            "max-h-[calc(100svh-72px)] overflow-y-auto border-t lg:hidden",
            tone.line,
          )}
        >
          <ul className="mx-auto max-w-6xl px-6 pt-2 pb-6 sm:px-8">
            {NAV_LINKS.map((link) => {
              const expanded = accordion === link.href;
              return (
                <li key={link.href} className={cn("border-b", tone.line)}>
                  <div className="flex items-center">
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        "flex h-14 flex-1 items-center text-lg font-semibold",
                        linkClass(link.href),
                      )}
                    >
                      {link.label}
                    </Link>
                    {link.sections && (
                      <button
                        type="button"
                        onClick={() =>
                          setAccordion(expanded ? null : link.href)
                        }
                        aria-label={`${expanded ? "Hide" : "Show"} ${link.label.toLowerCase()}`}
                        aria-expanded={expanded}
                        className={cn(
                          "-mr-2.5 inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl transition-colors focus-visible:outline-2",
                          tone.toggle,
                        )}
                      >
                        <ChevronDown
                          aria-hidden
                          className={cn(
                            "h-5 w-5 transition-transform duration-300",
                            expanded && "rotate-180",
                          )}
                        />
                      </button>
                    )}
                  </div>

                  {link.sections && expanded && (
                    <div className="space-y-4 pb-5">
                      {link.sections.map((section) => (
                        <section key={section.title} aria-label={section.title}>
                          <h3
                            className={cn(
                              "pb-1.5 font-mono text-[11px] leading-4 font-semibold tracking-[0.2em] uppercase",
                              tone.itemText,
                            )}
                          >
                            {section.title}
                          </h3>
                          <ul className="grid gap-1 sm:grid-cols-2">
                            {section.items.map((item) => {
                              const Icon = item.icon;
                              return (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    onClick={closeMenu}
                                    aria-current={
                                      pathname === item.href
                                        ? "page"
                                        : undefined
                                    }
                                    className={cn(
                                      "group/item -mx-2 flex items-center gap-3 rounded-xl p-2 text-[15px] font-semibold transition-colors",
                                      tone.item,
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300",
                                        tone.itemIcon,
                                      )}
                                    >
                                      {Icon && (
                                        <Icon
                                          aria-hidden
                                          strokeWidth={1.75}
                                          className="h-5 w-5"
                                        />
                                      )}
                                      {item.mark && (
                                        <Mark
                                          name={item.mark}
                                          className="h-5 w-5"
                                        />
                                      )}
                                    </span>
                                    {item.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </section>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
            <li className="pt-5 sm:hidden">
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  openQuoteModal();
                }}
                className={cn(
                  "inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-base font-semibold",
                  tone.cta,
                )}
              >
                Get a Quote
                <ArrowRight aria-hidden className="h-5 w-5" />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
