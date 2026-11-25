"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Monitor, Server, Smartphone, Cloud, Cpu, type LucideIcon } from "lucide-react";
import {
  Container,
  Eyebrow,
  Highlight,
  TopHairline,
  descriptionClass,
  headingClass,
  reveal,
  revealHeading,
} from "@/components/ui/section";
import { cn } from "@/lib/utils";

interface TechItem {
  name: string;
  image: string;
  /** The file has a light-grey box and wide margins baked in: lift the grey to white and enlarge the mark ("clean" = no enlarging) */
  boxed?: true | "clean";
}

interface CategoryRow {
  id: string;
  title: string;
  icon: LucideIcon;
  items: TechItem[];
}

const techCategories: CategoryRow[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    icon: Monitor,
    items: [
      { name: "React Js", image: "/frontend/react.png" },
      { name: "Next Js", image: "/frontend/nextjs.png" },
      { name: "Vue JS", image: "/frontend/vue.webp", boxed: true },
      { name: "Angular Js", image: "/frontend/angular.png" },
      { name: "HTML5", image: "/frontend/html.png" },
      { name: "CSS 3", image: "/frontend/css.png" },
      { name: "Wordpress", image: "/frontend/wordpress.png" },
      { name: "Webflow", image: "/frontend/webflow.png" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: Server,
    items: [
      { name: "Node Js", image: "/backend/Node.js_.webp" },
      { name: ".Net", image: "/backend/dot net.webp" },
      { name: "Java", image: "/backend/java.png" },
      { name: "Python", image: "/backend/python.webp" },
      { name: "C#", image: "/backend/c sharp.png" },
      { name: "PHP", image: "/backend/php.png" },
      { name: "Go-Lang", image: "/backend/Go_Logo_B.webp" },
      { name: "Odoo", image: "/Odoo.png" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Frameworks",
    icon: Smartphone,
    items: [
      { name: "iOS", image: "/mobile framework/ios.webp" },
      { name: "Android", image: "/mobile framework/android.png" },
      { name: "Flutter", image: "/mobile framework/flutter.png" },
      { name: "Kotlin", image: "/mobile framework/Kotlin_icon.webp" },
      { name: "React Native", image: "/mobile framework/react native.png", boxed: "clean" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    items: [
      { name: "Azure", image: "/cloud devops/azure.png" },
      { name: "AWS", image: "/cloud devops/aws-icon.webp" },
      { name: "Google Cloud", image: "/cloud devops/google cloud.webp", boxed: true },
      { name: "Docker", image: "/cloud devops/docker.png", boxed: true },
      { name: "Bitbucket", image: "/cloud devops/bit bucket.png" },
      { name: "Github", image: "/cloud devops/github.png" },
      { name: "Gitlab", image: "/cloud devops/git lab.png" },
      { name: "Sharepoint", image: "/cloud devops/SharePoint_.webp" },
    ],
  },
];

// The stack, top to bottom: what people touch first, what everything runs on last.
// Same pale-to-navy progression as the process section; the last layer meets the footer.
const LAYERS = [
  { id: "frontend", header: "light", surface: "bg-c-brand-100 text-c-ink", tile: "bg-c-brand text-white", muted: "text-slate-700" },
  { id: "mobile", header: "light", surface: "bg-c-brand-200 text-c-ink", tile: "bg-c-brand text-white", muted: "text-slate-700" },
  { id: "backend", header: "dark", surface: "bg-c-brand text-white", tile: "bg-white text-c-brand", muted: "text-white" },
  { id: "cloud", header: "dark", surface: "bg-c-ink text-white", tile: "bg-c-highlight text-c-ink", muted: "text-slate-300" },
];

export default function TechStack() {
  return (
    <section id="technology" data-header="light" className="relative isolate w-full overflow-hidden bg-white text-c-ink">
      <TopHairline tone="light" />

      <Container className="pt-20 pb-14 sm:pt-28 sm:pb-16">
        <motion.div {...reveal(0)} className="mb-6">
          <Eyebrow icon={Cpu} tone="light">
            Technology
          </Eyebrow>
        </motion.div>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <motion.h2 {...revealHeading(1)} className={headingClass("light")}>
            Our <Highlight tone="light">Technology Stack</Highlight>
          </motion.h2>
          <motion.p {...reveal(2)} className={cn(descriptionClass("light"), "max-w-xl")}>
            Empowering enterprise applications with modern, battle-tested technologies.
          </motion.p>
        </div>
      </Container>

      {/* Each layer is a full-width sheet that overlaps the one above it */}
      {LAYERS.map((layer, i) => {
        const category = techCategories.find((c) => c.id === layer.id);
        if (!category) return null;
        const Icon = category.icon;
        const last = i === LAYERS.length - 1;
        return (
          <div
            key={layer.id}
            data-header={layer.header}
            className={cn(
              "relative rounded-t-[28px] shadow-[0_-18px_40px_-24px_color-mix(in_srgb,var(--c-ink)_45%,transparent)] sm:rounded-t-[40px]",
              i > 0 && "-mt-8 sm:-mt-10",
              layer.surface,
            )}
          >
            <Container className={cn("pt-9 sm:pt-12", last ? "pb-14 sm:pb-20" : "pb-[4.25rem] sm:pb-[5.5rem]")}>
              <motion.div
                {...reveal(0)}
                className="grid gap-7 lg:grid-cols-[14.5rem_minmax(0,1fr)] lg:items-center lg:gap-12"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={cn("inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", layer.tile)}
                  >
                    <Icon aria-hidden className="h-6 w-6" strokeWidth={1.9} />
                  </span>
                  <div>
                    <h3 className="text-xl leading-tight font-semibold tracking-[-0.02em]">{category.title}</h3>
                    <p className={cn("mt-1 text-sm", layer.muted)}>{category.items.length} technologies</p>
                  </div>
                </div>

                <ul className="grid grid-cols-4 gap-x-2 gap-y-6 md:grid-cols-8 md:gap-x-3">
                  {category.items.map((tech) => (
                    <li key={tech.name} className="flex flex-col items-center gap-2.5">
                      <span className="flex h-15 w-15 items-center justify-center overflow-hidden rounded-2xl bg-white p-3 shadow-[0_8px_20px_-10px_color-mix(in_srgb,var(--c-ink)_50%,transparent)] sm:h-[4.25rem] sm:w-[4.25rem] sm:p-3.5">
                        <Image
                          src={tech.image}
                          alt=""
                          width={48}
                          height={48}
                          className={cn(
                            "h-full w-full object-contain",
                            tech.boxed && "contrast-[1.28]",
                            tech.boxed === true && "scale-125",
                          )}
                        />
                      </span>
                      <span className="text-center text-xs leading-tight font-medium sm:text-[13px]">{tech.name}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Container>
          </div>
        );
      })}
    </section>
  );
}
