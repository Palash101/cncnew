export interface TechItem {
  name: string;
  image?: string;
}

export interface CategoryRow {
  id: string;
  title: string;
  bgColor: string;
  borderColor: string;
  items: TechItem[];
}

export const techCategories: CategoryRow[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    bgColor: "bg-[#FDF2F4]",
    borderColor: "border-[#FBE2E6]",
    items: [
      { name: "React Js", image: "/frontend/react.png" },
      { name: "Next Js", image: "/frontend/nextjs.png" },
      { name: "Vue JS", image: "/frontend/vue.webp" },
      { name: "Angular Js", image: "/frontend/angular.png" },
      { name: "HTML5", image: "/frontend/html.png" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    bgColor: "bg-[#F0FDF4]",
    borderColor: "border-[#DCFCE7]",
    items: [
      { name: "Node Js", image: "/backend/Node.js_.webp" },
      { name: ".Net", image: "/backend/dot net.webp" },
      { name: "Java", image: "/backend/java.png" },
      { name: "Python", image: "/backend/python.webp" },
      { name: "PHP", image: "/backend/php.png" },
      { name: "Go-Lang", image: "/backend/Go_Logo_B.webp" },
      { name: "Odoo", image: "/Odoo.png" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Frameworks",
    bgColor: "bg-[#F0F9FF]",
    borderColor: "border-[#E0F2FE]",
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
    bgColor: "bg-[#FEFCE8]",
    borderColor: "border-[#FEF08A]",
    items: [
      { name: "Azure", image: "/cloud devops/azure.png" },
      { name: "AWS", image: "/cloud devops/aws-icon.webp" },
      { name: "Google Cloud", image: "/cloud devops/google cloud.webp" },
      { name: "Docker", image: "/cloud devops/docker.png" },
      { name: "Bitbucket", image: "/cloud devops/bit bucket.png" },
      { name: "Github", image: "/cloud devops/github.png" },
      { name: "Gitlab", image: "/cloud devops/git lab.png" },
    ],
  },
];
