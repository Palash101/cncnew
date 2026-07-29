import Image from "next/image";
import { Award, Users, Laptop, Smartphone, Sparkles } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export default function StatsSection() {
  return (
    <section className={`relative w-full overflow-hidden bg-[#0B1739] py-16 sm:py-24 md:py-28 ${font.className}`}>
      {/* Full-width Background Image */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Image
          src="/networking.png"
          alt="Global Networking Background"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover object-center w-full h-full"
        />
      </div>

      {/* Full-width Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0B1739]/85 via-[#0B1739]/65 to-[#0B1739]/80" />

      {/* Centered Content Container */}
      <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 md:px-8 text-center">
        {/* Eyebrow */}
        <div className="mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/20 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-300 backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-sky-400" />
          <span>Enterprise Global Network</span>
        </div>

        {/* Heading */}
        <h2 className="max-w-5xl text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.18]">
          Connecting Visionaries with Scalable{" "}
          <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-sky-200 bg-clip-text text-transparent">
            Digital Excellence
          </span>
        </h2>

        <p className="mt-4 sm:mt-5 max-w-4xl text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed font-normal drop-shadow-xs">
          With years of deep technical mastery, Craft and Code bridges complex infrastructure with intuitive user experiences. We empower organizations globally through continuous digital transformation and resilient systems.
        </p>

        {/* Overlaid Glassmorphic Stat Cards Grid - 4 Columns */}
        <div className="mt-10 sm:mt-14 grid w-full max-w-6xl grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Stat 1: 15+ Years Experience */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-slate-900/60 p-5 sm:p-6 text-left shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/60 hover:bg-slate-900/75">
            <div className="mb-3 inline-flex rounded-xl bg-sky-500/20 p-2.5 sm:p-3 text-sky-300 border border-sky-400/30 transition-colors group-hover:bg-sky-500 group-hover:text-white">
              <Award className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">15+</div>
            <div className="mt-1 text-xs sm:text-sm font-semibold text-sky-200">Years Experience</div>
            <div className="mt-1 text-[11px] sm:text-xs text-slate-300">Delivering top-tier software</div>
          </div>

          {/* Stat 2: 50+ Clients */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-slate-900/60 p-5 sm:p-6 text-left shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:bg-slate-900/75">
            <div className="mb-3 inline-flex rounded-xl bg-blue-500/20 p-2.5 sm:p-3 text-blue-300 border border-blue-400/30 transition-colors group-hover:bg-blue-500 group-hover:text-white">
              <Users className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">50+</div>
            <div className="mt-1 text-xs sm:text-sm font-semibold text-blue-200">Global Clients</div>
            <div className="mt-1 text-[11px] sm:text-xs text-slate-300">Trusted partners worldwide</div>
          </div>

          {/* Stat 3: 50+ Mobile Apps */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-slate-900/60 p-5 sm:p-6 text-left shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/60 hover:bg-slate-900/75">
            <div className="mb-3 inline-flex rounded-xl bg-purple-500/20 p-2.5 sm:p-3 text-purple-300 border border-purple-400/30 transition-colors group-hover:bg-purple-500 group-hover:text-white">
              <Smartphone className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">50+</div>
            <div className="mt-1 text-xs sm:text-sm font-semibold text-purple-200">Mobile Apps</div>
            <div className="mt-1 text-[11px] sm:text-xs text-slate-300">iOS & Android solutions</div>
          </div>

          {/* Stat 4: 100+ Web Apps */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-slate-900/60 p-5 sm:p-6 text-left shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/60 hover:bg-slate-900/75">
            <div className="mb-3 inline-flex rounded-xl bg-indigo-500/20 p-2.5 sm:p-3 text-indigo-300 border border-indigo-400/30 transition-colors group-hover:bg-indigo-500 group-hover:text-white">
              <Laptop className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">100+</div>
            <div className="mt-1 text-xs sm:text-sm font-semibold text-indigo-200">Web Apps</div>
            <div className="mt-1 text-[11px] sm:text-xs text-slate-300">Scalable web platforms</div>
          </div>
        </div>
      </div>
    </section>
  );
}
