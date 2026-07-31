import Image from "next/image";
import { expertiseItems } from "@/lib/data/services";

export default function ExpertiseSection() {
  return (
    <section id="services" className="w-full bg-black py-16 sm:py-24 md:py-28 text-white scroll-mt-20">
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight sm:leading-tight">
            Deep Technical Expertise, <br className="hidden sm:inline" />
            Supporting Modern Systems
          </h2>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-12 sm:gap-y-14">
          {expertiseItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex flex-col text-left group">
                {/* Card Image Banner */}
                <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden mb-5 border border-black transition-all duration-300 bg-black shadow-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-slate-200 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
