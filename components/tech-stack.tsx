"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Monitor, Server, Smartphone, Cloud, Cpu, type LucideIcon } from "lucide-react";
import { Container, SectionHeader, Highlight, TopHairline, reveal, SECTION_Y } from "@/components/ui/section";
import { cn } from "@/lib/utils";

interface TechItem {
  name: string;
  image: string;
  /** The file has a light-grey box baked in: brighten it to match the white tile */
  lift?: boolean;
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
      { name: "Vue JS", image: "/frontend/vue.webp", lift: true },
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
      { name: "React Native", image: "/mobile framework/react native.png", lift: true },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    items: [
      { name: "Azure", image: "/cloud devops/azure.png" },
      { name: "AWS", image: "/cloud devops/aws-icon.webp" },
      { name: "Google Cloud", image: "/cloud devops/google cloud.webp", lift: true },
      { name: "Docker", image: "/cloud devops/docker.png", lift: true },
      { name: "Bitbucket", image: "/cloud devops/bit bucket.png" },
      { name: "Github", image: "/cloud devops/github.png" },
      { name: "Gitlab", image: "/cloud devops/git lab.png" },
      { name: "Sharepoint", image: "/cloud devops/SharePoint_.webp" },
    ],
  },
];

export default function TechStack() {
  return (
    <section
      id="technology"
      className={cn("relative isolate w-full overflow-hidden bg-white text-c-ink", SECTION_Y)}
    >
      <TopHairline tone="light" />

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

        {/* One plain card per category */}
        <div className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-2 lg:gap-6">
          {techCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                {...reveal(0)}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-7"
              >
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-c-brand text-white">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg leading-tight font-semibold tracking-tight">{category.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{category.items.length} technologies</p>
                  </div>
                </div>

                <ul className="mt-6 grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3">
                  {category.items.map((tech) => (
                    <li
                      key={tech.name}
                      className="flex flex-col items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-1.5 py-4"
                    >
                      <span className="flex h-10 w-10 items-center justify-center">
                        <Image
                          src={tech.image}
                          alt=""
                          width={40}
                          height={40}
                          className={cn("h-full w-full object-contain", tech.lift && "brightness-110")}
                        />
                      </span>
                      <span className="text-center text-[13px] leading-tight font-medium text-slate-700">
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
