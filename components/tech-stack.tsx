import Image from "next/image";

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

export default function TechStack() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-center sm:mb-12 md:mb-14">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Our Technology Stack
          </h2>
          <p className="mt-2.5 text-sm text-slate-600 sm:mt-3 sm:text-base md:text-lg max-w-2xl mx-auto">
            Empowering enterprise applications with modern, battle-tested technologies.
          </p>
        </div>

        {/* Stack Categories Container */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          <style>{`
            @keyframes techMarqueeRtl {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            @keyframes techMarqueeLtr {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0%); }
            }
            .tech-track-rtl {
              animation: techMarqueeRtl 25s linear infinite;
              will-change: transform;
            }
            .tech-track-ltr {
              animation: techMarqueeLtr 25s linear infinite;
              will-change: transform;
            }
            .group:hover .tech-track-rtl,
            .group:hover .tech-track-ltr {
              animation-play-state: paused !important;
            }
          `}</style>
          {techCategories.map((category, index) => {
            const isRtl = index % 2 === 0;
            const duplicatedItems = [
              ...category.items,
              ...category.items,
              ...category.items,
              ...category.items,
            ];

            return (
              <div
                key={category.id}
                className={`group flex flex-col gap-4 rounded-xl sm:rounded-2xl border ${category.borderColor} ${category.bgColor} p-4 sm:p-6 md:p-8 lg:px-10 lg:py-7 lg:flex-row lg:items-center lg:justify-between transition-all duration-300 hover:shadow-md overflow-hidden relative`}
              >
                {/* Category Title */}
                <div className="lg:w-1/4 shrink-0 z-10 bg-inherit pr-4">
                  <h3 className="text-base font-bold text-slate-900 sm:text-lg md:text-xl">
                    {category.title}
                  </h3>
                </div>

                {/* Mobile Static View (No Moving Animation) */}
                <div className="flex sm:hidden flex-wrap items-center gap-2 w-full py-1">
                  {category.items.map((tech) => (
                    <div
                      key={`${category.id}-mobile-${tech.name}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-xs shrink-0"
                    >
                      {tech.image ? (
                        <div className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                          <Image
                            src={tech.image}
                            alt={tech.name}
                            width={16}
                            height={16}
                            className="max-h-4 max-w-4 object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[9px] font-bold text-slate-600 uppercase">
                          {tech.name.substring(0, 2)}
                        </div>
                      )}
                      <span className="whitespace-nowrap">{tech.name}</span>
                    </div>
                  ))}
                </div>

                {/* Desktop Animated Marquee Train (hidden on mobile) */}
                <div className="hidden sm:block lg:w-3/4 w-full overflow-hidden relative py-1">
                  {/* Left & Right edge fade */}
                  <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-inherit to-transparent" />
                  <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-inherit to-transparent" />

                  <div
                    className={`flex items-center gap-2.5 sm:gap-3.5 w-max ${
                      isRtl ? "tech-track-rtl" : "tech-track-ltr"
                    }`}
                  >
                    {duplicatedItems.map((tech, techIdx) => (
                      <div
                        key={`${category.id}-${tech.name}-${techIdx}`}
                        className="inline-flex items-center gap-1.5 sm:gap-2 md:gap-2.5 rounded-full border border-slate-200/80 bg-white px-3.5 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-slate-800 shadow-xs transition-all duration-200 hover:scale-105 hover:border-sky-400 hover:shadow-md cursor-pointer shrink-0"
                      >
                        {tech.image ? (
                          <div className="relative flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center">
                            <Image
                              src={tech.image}
                              alt={tech.name}
                              width={20}
                              height={20}
                              className="max-h-4 max-w-4 sm:max-h-5 sm:max-w-5 object-contain"
                            />
                          </div>
                        ) : (
                          <div className="flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[9px] sm:text-[10px] font-bold text-slate-600 uppercase">
                            {tech.name.substring(0, 2)}
                          </div>
                        )}
                        <span className="whitespace-nowrap">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
