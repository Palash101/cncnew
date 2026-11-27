"use client";

import {
  IconBrandAndroid,
  IconBrandAngular,
  IconBrandApple,
  IconBrandAws,
  IconBrandAzure,
  IconBrandBitbucket,
  IconBrandCSharp,
  IconBrandCss3,
  IconBrandDocker,
  IconBrandFlutter,
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandGolang,
  IconBrandGoogle,
  IconBrandHtml5,
  IconBrandKotlin,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandPhp,
  IconBrandPython,
  IconBrandReact,
  IconBrandReactNative,
  IconBrandVue,
  IconBrandWebflow,
  IconBrandWordpress,
  type Icon,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface TechItem {
  name: string;
  image: string;
  /** The file has a light-grey box and wide margins baked in: lift the grey to white and enlarge the mark ("clean" = no enlarging) */
  boxed?: true | "clean";
}

export interface CategoryRow {
  id: string;
  title: string;
  items: TechItem[];
}

export const techCategories: CategoryRow[] = [
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
      {
        name: "React Native",
        image: "/mobile framework/react native.png",
        boxed: "clean",
      },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    items: [
      { name: "Azure", image: "/cloud devops/azure.png" },
      { name: "AWS", image: "/cloud devops/aws-icon.webp" },
      {
        name: "Google Cloud",
        image: "/cloud devops/google cloud.webp",
        boxed: true,
      },
      { name: "Docker", image: "/cloud devops/docker.png", boxed: true },
      { name: "Bitbucket", image: "/cloud devops/bit bucket.png" },
      { name: "Github", image: "/cloud devops/github.png" },
      { name: "Gitlab", image: "/cloud devops/git lab.png" },
      { name: "Sharepoint", image: "/cloud devops/SharePoint_.webp" },
    ],
  },
];

// One continuous sequence: what people touch first, what everything runs on last
export const TECH_ORDER = ["frontend", "mobile", "backend", "cloud"];

/**
 * One-colour marks. Most are outline brand icons; the four brands the icon set lacks use the
 * project's own logo file as a silhouette (those files have transparent backgrounds).
 */
const MARKS: Record<string, Icon | string> = {
  "React Js": IconBrandReact,
  "Next Js": IconBrandNextjs,
  "Vue JS": IconBrandVue,
  "Angular Js": IconBrandAngular,
  HTML5: IconBrandHtml5,
  "CSS 3": IconBrandCss3,
  Wordpress: IconBrandWordpress,
  Webflow: IconBrandWebflow,
  "Node Js": IconBrandNodejs,
  ".Net": "/backend/dot net.webp",
  Java: "/backend/java.png",
  Python: IconBrandPython,
  "C#": IconBrandCSharp,
  PHP: IconBrandPhp,
  "Go-Lang": IconBrandGolang,
  Odoo: "/Odoo.png",
  iOS: IconBrandApple,
  Android: IconBrandAndroid,
  Flutter: IconBrandFlutter,
  Kotlin: IconBrandKotlin,
  "React Native": IconBrandReactNative,
  Azure: IconBrandAzure,
  AWS: IconBrandAws,
  "Google Cloud": IconBrandGoogle,
  Docker: IconBrandDocker,
  Bitbucket: IconBrandBitbucket,
  Github: IconBrandGithub,
  Gitlab: IconBrandGitlab,
  Sharepoint: "/cloud devops/SharePoint_.webp",
};

export function Mark({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const mark = MARKS[name];
  if (typeof mark === "string") {
    const image = `url("${encodeURI(mark)}")`;
    return (
      <span
        className={cn("block bg-current", className)}
        style={{
          maskImage: image,
          WebkitMaskImage: image,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
        }}
      />
    );
  }
  const Glyph = mark;
  return <Glyph className={className} stroke={1.5} />;
}
