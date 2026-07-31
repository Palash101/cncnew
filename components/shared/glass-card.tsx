import { ReactNode } from "react";

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  variant?: "dark" | "light" | "cyan" | "sky" | "indigo";
}

export default function GlassCard({
  children,
  className = "",
  hoverEffect = true,
  variant = "dark",
}: GlassCardProps) {
  const variantStyles = {
    dark: "border-white/10 bg-slate-900/60 backdrop-blur-md shadow-lg",
    light: "border-slate-200/90 bg-white shadow-xl shadow-slate-900/5 backdrop-blur-md",
    cyan: "border-slate-800 bg-slate-900/80 backdrop-blur-xl",
    sky: "border-slate-800 bg-slate-800/50 backdrop-blur-md",
    indigo: "border-white/20 bg-slate-900/60 backdrop-blur-md shadow-lg",
  };

  const hoverStyles = {
    dark: "hover:-translate-y-1 hover:border-sky-400/50 hover:bg-slate-900/80 hover:shadow-sky-500/10",
    light: "hover:-translate-y-1 hover:shadow-2xl",
    cyan: "hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10",
    sky: "hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-800 hover:shadow-xl",
    indigo: "hover:-translate-y-1 hover:border-sky-400/60 hover:bg-slate-900/75",
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${variantStyles[variant]} ${
        hoverEffect ? hoverStyles[variant] : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
