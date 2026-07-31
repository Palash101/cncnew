import Image from "next/image";
import { expertiseItems } from "@/lib/data/services";
import SectionHeader from "@/components/shared/section-header";

export default function ExpertiseSection() {
  return (
    <section id="services" className="w-full bg-black py-16 sm:py-24 md:py-28 text-white scroll-mt-20">
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={
            <>
              Deep Technical Expertise, <br className="hidden sm:inline" />
              Supporting Modern Systems
            </>
          }
          className="mb-14 sm:mb-20"
        />

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
