import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

interface TechItem {
  name: string;
  image?: string;
}

interface CategoryRow {
  id: string;
  title: string;
  bgColor: string;
  borderColor: string;
  items: TechItem[];
}

const techCategories: CategoryRow[] = [
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
      { name: "CSS 3", image: "/frontend/css.png" },
      { name: "Wordpress", image: "/frontend/wordpress.png" },
      { name: "Webflow", image: "/frontend/webflow.png" },
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
      { name: "C#", image: "/backend/c sharp.png" },
      { name: "PHP", image: "/backend/php.png" },
      { name: "Go-Lang", image: "/backend/Go_Logo_B.webp" },
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
      { name: "Sharepoint", image: "/cloud devops/SharePoint_.webp" },
    ],
  },
];

export default function TechStack() {
  return (
    <section className={`w-full bg-white py-16 sm:py-24 ${font.className}`}>
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Our Technology Stack
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Empowering enterprise applications with modern, battle-tested technologies.
          </p>
        </div>

        {/* Stack Categories Container */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {techCategories.map((category) => (
            <div
              key={category.id}
              className={`flex flex-col gap-6 rounded-2xl border ${category.borderColor} ${category.bgColor} p-6 sm:p-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between transition-all duration-200 hover:shadow-xs`}
            >
              {/* Category Title */}
              <div className="lg:w-1/4 shrink-0">
                <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                  {category.title}
                </h3>
              </div>

              {/* Technology Pills */}
              <div className="flex flex-wrap items-center gap-3.5 lg:w-3/4 lg:justify-start">
                {category.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white px-4.5 py-2 text-sm font-semibold text-slate-800 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md cursor-default"
                  >
                    {tech.image ? (
                      <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                        <Image
                          src={tech.image}
                          alt={tech.name}
                          width={20}
                          height={20}
                          className="max-h-5 max-w-5 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 uppercase">
                        {tech.name.substring(0, 2)}
                      </div>
                    )}
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
