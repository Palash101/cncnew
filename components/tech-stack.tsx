"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Monitor, Server, Smartphone, Cloud, Cpu, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Container,
  SectionHeader,
  Highlight,
  IconTile,
  cardClass,
  SECTION_Y,
  TopHairline,
  revealCard,
} from "@/components/ui/section";

interface TechItem {
  name: string;
  image?: string;
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
      { name: "Vue JS", image: "/frontend/vue.webp" },
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
      { name: "React Native", image: "/mobile framework/react native.png" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    items: [
      { name: "Azure", image: "/cloud devops/azure.png" },
      { name: "AWS", image: "/cloud devops/aws-icon.webp" },
      { name: "Google Cloud", image: "/cloud devops/google cloud.webp" },
      { name: "Docker", image: "/cloud devops/docker.png" },
      { name: "Bitbucket", image: "/cloud devops/bit bucket.png" },
      { name: "Github", image: "/cloud devops/github.png" },
      { name: "Gitlab", image: "/cloud devops/git lab.png" },
      { name: "Sharepoint", image: "/cloud devops/SharePoint_.webp" },
    ],
  },
];

export default function TechStack() {
  return (
    <section className={cn("relative isolate w-full overflow-hidden bg-white text-[#0B1739]", SECTION_Y)}>
      <TopHairline tone="light" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[22rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-100/70 blur-[120px]" />
      </div>

      <Container>
        <SectionHeader
          tone="light"
          eyebrow="Technology"
          eyebrowIcon={Cpu}
          title={
            <>
              Our <Highlight tone="light">Technology Stack</Highlight>
            </>
          }
          description="Empowering enterprise applications with modern, battle-tested technologies."
        />

        <div className="mt-14 flex flex-col gap-4 sm:mt-16 sm:gap-5">
          {techCategories.map((category, i) => (
            <motion.div
              key={category.id}
              {...revealCard(i)}
              className={cn(
                cardClass("light"),
                "flex flex-col gap-5 p-5 sm:p-7 lg:flex-row lg:items-center lg:gap-8"
              )}
            >
              <div className="flex shrink-0 items-center gap-3.5 lg:w-64">
                <IconTile icon={category.icon} tone="light" />
                <h3 className="text-base font-semibold tracking-tight text-[#0B1739] sm:text-lg">{category.title}</h3>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {category.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="inline-flex max-w-full cursor-default items-center gap-2 truncate rounded-full border border-slate-200/80 bg-slate-50/60 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors duration-200 hover:border-sky-200 hover:bg-white hover:text-[#0B1739] sm:px-4 sm:py-2 sm:text-sm"
                  >
                    {tech.image ? (
                      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center sm:h-5 sm:w-5">
                        <Image
                          src={tech.image}
                          alt=""
                          width={20}
                          height={20}
                          className="max-h-4 max-w-4 object-contain sm:max-h-5 sm:max-w-5"
                        />
                      </span>
                    ) : (
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[9px] font-bold text-slate-600 uppercase sm:h-5 sm:w-5 sm:text-[10px]">
                        {tech.name.substring(0, 2)}
                      </span>
                    )}
                    <span className="truncate">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
