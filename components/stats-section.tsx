import Image from "next/image";
import { Award, Briefcase, Globe2, Sparkles } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export default function StatsSection() {
  return (
    <section className={`relative w-full overflow-hidden bg-[#0B1739] py-24 sm:py-32 ${font.className}`}>
      {/* Full-width Background Image */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Image
          src="/networking.png"
          alt="Global Networking Background"
          fill
          priority
          className="object-cover object-center w-full h-full"
        />
      </div>

      {/* Full-width Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0B1739]/85 via-[#0B1739]/55 to-[#0B1739]/80" />

      {/* Centered Content Container */}
      <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-6 text-center sm:px-8">
        {/* Eyebrow */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-300 backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-sky-400" />
          <span>Enterprise Global Network</span>
        </div>

        {/* Heading */}
        <h2 className="max-w-5xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl leading-[1.18]">
          Connecting Visionaries with Scalable{" "}
          <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-sky-200 bg-clip-text text-transparent">
            Digital Excellence
          </span>
        </h2>

        <p className="mt-5 max-w-4xl text-base text-slate-200 sm:text-lg leading-relaxed font-normal drop-shadow-xs">
          With years of deep technical mastery, Craft and Code bridges complex infrastructure with intuitive user experiences. We empower organizations globally through continuous digital transformation and resilient systems.
        </p>

        {/* Overlaid Glassmorphic Stat Cards Grid */}
        <div className="mt-14 grid w-full max-w-6xl gap-8 sm:grid-cols-3 sm:gap-10">
          {/* Stat 1: Years of Experience */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-slate-900/60 p-6 text-left shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/60 hover:bg-slate-900/75">
            <div className="mb-3 inline-flex rounded-xl bg-sky-500/20 p-3 text-sky-300 border border-sky-400/30 transition-colors group-hover:bg-sky-500 group-hover:text-white">
              <Award className="h-6 w-6" />
            </div>
            <div className="text-3xl font-extrabold text-white sm:text-4xl">10+</div>
            <div className="mt-1 text-sm font-semibold text-sky-200">Years Experience</div>
            <div className="mt-1 text-xs text-slate-300">Delivering top-tier software engineering</div>
          </div>

          {/* Stat 2: Total Projects */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-slate-900/60 p-6 text-left shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:bg-slate-900/75">
            <div className="mb-3 inline-flex rounded-xl bg-blue-500/20 p-3 text-blue-300 border border-blue-400/30 transition-colors group-hover:bg-blue-500 group-hover:text-white">
              <Briefcase className="h-6 w-6" />
            </div>
            <div className="text-3xl font-extrabold text-white sm:text-4xl">150+</div>
            <div className="mt-1 text-sm font-semibold text-blue-200">Total Projects</div>
            <div className="mt-1 text-xs text-slate-300">Web, mobile & cloud solutions deployed</div>
          </div>

          {/* Stat 3: Connections */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-slate-900/60 p-6 text-left shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/60 hover:bg-slate-900/75">
            <div className="mb-3 inline-flex rounded-xl bg-indigo-500/20 p-3 text-indigo-300 border border-indigo-400/30 transition-colors group-hover:bg-indigo-500 group-hover:text-white">
              <Globe2 className="h-6 w-6" />
            </div>
            <div className="text-3xl font-extrabold text-white sm:text-4xl">500+</div>
            <div className="mt-1 text-sm font-semibold text-indigo-200">Global Connections</div>
            <div className="mt-1 text-xs text-slate-300">Enterprise partners & tech networks</div>
          </div>
        </div>
      </div>
    </section>
  );
}
