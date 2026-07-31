import Image from "next/image";
import { techCategories } from "@/lib/data/tech-stack";
import SectionHeader from "@/components/shared/section-header";

export default function TechStack() {
  return (
    <section id="careers" className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Our Technology Stack"
          description="Empowering enterprise applications with modern, battle-tested technologies."
          theme="light"
          className="mb-8 sm:mb-12 md:mb-14"
          titleClassName="font-extrabold text-slate-900"
        />

        {/* Stack Categories Container */}
        <div className="flex flex-col gap-3 sm:gap-4">
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
                className={`group flex flex-col gap-2 rounded-xl sm:rounded-2xl border ${category.borderColor} ${category.bgColor} p-3 sm:py-3.5 sm:px-5 md:py-4 md:px-6 lg:px-8 lg:py-3 lg:flex-row lg:items-center lg:justify-between transition-all duration-300 hover:shadow-md overflow-hidden relative`}
              >
                {/* Category Title */}
                <div className="lg:w-1/4 shrink-0 z-10 bg-inherit pr-4">
                  <h3 className="text-sm font-bold text-slate-900 sm:text-base md:text-lg">
                    {category.title}
                  </h3>
                </div>

                {/* Mobile Static View (No Moving Animation) */}
                <div className="flex sm:hidden flex-wrap items-center gap-1.5 w-full py-0.5">
                  {category.items.map((tech) => (
                    <div
                      key={`${category.id}-mobile-${tech.name}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-2.5 py-1 text-xs font-semibold text-slate-800 shadow-xs shrink-0"
                    >
                      {tech.image ? (
                        <div className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                          <Image
                            src={tech.image}
                            alt={tech.name}
                            width={14}
                            height={14}
                            className="max-h-3.5 max-w-3.5 object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[8px] font-bold text-slate-600 uppercase">
                          {tech.name.substring(0, 2)}
                        </div>
                      )}
                      <span className="whitespace-nowrap">{tech.name}</span>
                    </div>
                  ))}
                </div>

                {/* Desktop Animated Marquee Train (hidden on mobile) */}
                <div className="hidden sm:block lg:w-3/4 w-full overflow-hidden relative py-0.5">
                  {/* Left & Right edge fade */}
                  <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-inherit to-transparent" />
                  <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-inherit to-transparent" />

                  <div
                    className={`flex items-center gap-2 sm:gap-3 w-max ${
                      isRtl ? "tech-track-rtl" : "tech-track-ltr"
                    }`}
                  >
                    {duplicatedItems.map((tech, techIdx) => (
                      <div
                        key={`${category.id}-${tech.name}-${techIdx}`}
                        className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs sm:text-sm font-semibold text-slate-800 shadow-xs transition-all duration-200 hover:scale-105 hover:border-sky-400 hover:shadow-md cursor-pointer shrink-0"
                      >
                        {tech.image ? (
                          <div className="relative flex h-4 w-4 sm:h-4.5 sm:w-4.5 shrink-0 items-center justify-center">
                            <Image
                              src={tech.image}
                              alt={tech.name}
                              width={18}
                              height={18}
                              className="max-h-4 max-w-4 sm:max-h-4.5 sm:max-w-4.5 object-contain"
                            />
                          </div>
                        ) : (
                          <div className="flex h-4 w-4 sm:h-4.5 sm:w-4.5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[9px] font-bold text-slate-600 uppercase">
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
