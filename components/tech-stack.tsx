"use client";

import Image from "next/image";
import { Cpu } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { Accent, Container, Eyebrow, SECTION_Y, headingClass, monoLabel, reveal, revealHeading } from "@/components/ui/section";
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
  items: TechItem[];
}

const techCategories: CategoryRow[] = [
  {
    id: "frontend",
    title: "Frontend Development",
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

// The stack, top to bottom: what people touch first, what everything runs on last
const ORDER = ["frontend", "mobile", "backend", "cloud"];
const LAYERS = ORDER.flatMap((id) => techCategories.find((c) => c.id === id) ?? []);
const TOTAL = LAYERS.reduce((sum, layer) => sum + layer.items.length, 0);

/**
 * Technology stack, on white, set as a specification table: one ruled row per layer,
 * the layer's name in the left column and its logos on a shared eight-column grid, so the
 * marks line up vertically from row to row. The logos sit directly on the page: white is
 * the one background every one of them was drawn for.
 */
export default function TechStack() {
  return (
    <section id="technology" data-header="light" className={cn("relative w-full bg-white text-c-ink", SECTION_Y)}>
      <MotionConfig reducedMotion="user">
      <Container>
        <motion.div {...reveal(0)}>
          <Eyebrow icon={Cpu} tone="light">
            Technology
          </Eyebrow>
        </motion.div>
        <div className="mt-6 flex flex-col gap-x-8 gap-y-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.h2 {...revealHeading(1)} className={headingClass("light")}>
              Our <Accent tone="light">Technology Stack</Accent>
            </motion.h2>
            <motion.p {...reveal(2)} className="mt-5 max-w-2xl text-base leading-7 text-c-ink/70">
              Empowering enterprise applications with modern, battle-tested technologies.
            </motion.p>
          </div>
          <motion.p {...reveal(2)} className={cn(monoLabel, "text-c-ink/55 lg:pb-1.5")}>
            {TOTAL} technologies / {LAYERS.length} layers
          </motion.p>
        </div>

        <div className="mt-12 border-b border-c-ink/15 sm:mt-16">
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.id}
              {...reveal(0)}
              className="grid gap-x-8 gap-y-7 border-t border-c-ink/15 py-8 sm:py-10 lg:grid-cols-12"
            >
              <div className="flex items-baseline gap-4 lg:col-span-3 lg:flex-col lg:gap-3">
                <span className={cn(monoLabel, "text-c-brand")}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-xl leading-tight font-semibold tracking-[-0.02em]">{layer.title}</h3>
                <p className={cn(monoLabel, "ml-auto shrink-0 whitespace-nowrap text-c-ink/55 lg:ml-0")}>{layer.items.length} technologies</p>
              </div>

              <ul className="grid grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-8 lg:col-span-9">
                {layer.items.map((tech) => (
                  <li key={tech.name} className="group flex flex-col gap-3">
                    <span className="flex h-11 w-11 items-center justify-center overflow-hidden transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-1">
                      <Image
                        src={tech.image}
                        alt=""
                        width={44}
                        height={44}
                        className={cn(
                          "h-full w-full object-contain",
                          tech.boxed && "contrast-[1.28]",
                          tech.boxed === true && "scale-125",
                        )}
                      />
                    </span>
                    <span className="text-[13px] leading-tight font-medium text-c-ink/75 transition-colors duration-300 group-hover:text-c-ink sm:text-sm">
                      {tech.name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
      </MotionConfig>
    </section>
  );
}
