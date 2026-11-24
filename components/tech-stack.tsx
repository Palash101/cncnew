"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Monitor, Server, Smartphone, Cloud, Cpu, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, SectionHeader, Highlight, TopHairline, revealCard, SECTION_Y } from "@/components/ui/section";
import AmbientBackground from "@/components/ui/ambient-background";

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
      <AmbientBackground variant="white" />

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

        {/* Ecosystem: one row per category */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_20px_60px_-36px_rgba(11,23,57,0.25)] sm:mt-16">
          {techCategories.map((category, rowIdx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                {...revealCard(rowIdx)}
                className={cn(
                  "grid gap-5 p-5 sm:p-7 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 lg:p-8",
                  rowIdx > 0 && "border-t border-slate-200/80",
                  rowIdx % 2 === 1 && "bg-slate-50/50"
                )}
              >
                {/* Category label */}
                <div className="flex items-center gap-3.5 lg:flex-col lg:items-start lg:gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-[#1673b8]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-[#0B1739] sm:text-lg">
                      {category.title}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">
                      {category.items.length} technologies
                    </p>
                  </div>
                </div>

                {/* Logo tiles */}
                <ul className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 xl:grid-cols-8">
                  {category.items.map((tech) => (
                    <li
                      key={tech.name}
                      className="group flex flex-col items-center justify-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-2 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_12px_28px_-16px_rgba(22,115,184,0.45)] motion-reduce:hover:translate-y-0"
                    >
                      <span className="relative flex h-9 w-9 items-center justify-center">
                        {tech.image ? (
                          <Image
                            src={tech.image}
                            alt=""
                            width={36}
                            height={36}
                            className="max-h-9 max-w-9 object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 uppercase">
                            {tech.name.substring(0, 2)}
                          </span>
                        )}
                      </span>
                      <span className="w-full truncate text-center text-xs font-semibold text-slate-700 group-hover:text-[#0B1739]">
                        {tech.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
