"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { aiCapabilities } from "@/lib/data/ai-capabilities";

export default function AiSection() {
  return (
    <section className="relative w-full bg-slate-950 py-8 sm:py-10 md:py-12 overflow-hidden text-white">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-32 h-48 w-48 rounded-full bg-cyan-500/15 blur-[100px]" />
        <div className="absolute bottom-1/3 -right-32 h-48 w-48 rounded-full bg-indigo-500/20 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300 backdrop-blur-md mb-2"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Next-Gen AI Solutions</span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-white leading-tight">
            Pioneering Artificial{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent font-medium">
              Intelligence Projects
            </span>
          </h2>
        </div>

        {/* 3 Inline AI Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {aiCapabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-xl transition-all duration-300 ${item.borderColor} hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Banner Header Image / Live Animation */}
                  {item.isWisper ? (
                    <div className="relative h-24 w-full rounded-lg overflow-hidden border border-cyan-500/30 bg-slate-950 p-2.5 mb-3 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                          Wisper Engine Active
                        </span>
                        <span className="text-[9px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                          &lt;120ms
                        </span>
                      </div>
                      
                      {/* Animated Waveform */}
                      <div className="flex items-center justify-center gap-1 h-8 my-auto">
                        {[40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 75].map((h, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`],
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              repeatType: "reverse",
                              delay: i * 0.08,
                            }}
                            className="w-1 rounded-full bg-gradient-to-t from-cyan-500 to-indigo-400"
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-24 w-full rounded-lg overflow-hidden border border-slate-800 mb-3 bg-slate-950">
                      <Image
                        src={item.imageUrl || ""}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                      <div className="absolute top-2 left-2 z-10">
                        <span className="rounded-full bg-slate-950/90 border border-slate-700/80 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 backdrop-blur-md">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Card Title & Icon */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Highlights Bullet List */}
                <div className="relative z-10 mt-3 pt-2.5 border-t border-slate-800/80 flex flex-col gap-1">
                  {item.highlights.map((point) => (
                    <div key={point} className="flex items-center gap-1.5 text-[10px] font-medium text-slate-300">
                      <CheckCircle2 className="h-3 w-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
