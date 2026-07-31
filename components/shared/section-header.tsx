import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export interface SectionHeaderProps {
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  theme?: "dark" | "light";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function SectionHeader({
  eyebrow,
  eyebrowIcon: Icon,
  title,
  description,
  align = "center",
  theme = "dark",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={`max-w-3xl ${
        isCenter ? "mx-auto text-center" : "text-left"
      } mb-8 sm:mb-12 ${className}`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider mb-3 backdrop-blur-md ${
            isDark
              ? "border border-sky-500/30 bg-sky-500/10 text-sky-400"
              : "border border-sky-600/20 bg-sky-50 text-sky-600"
          }`}
        >
          {Icon && <Icon className="h-3.5 w-3.5" />}
          <span>{eyebrow}</span>
        </div>
      )}

      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-tight ${
          isDark ? "text-white" : "text-[#0B1739]"
        } ${titleClassName}`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-3 text-xs sm:text-sm md:text-base leading-relaxed font-normal ${
            isDark ? "text-slate-300" : "text-slate-600"
          } ${isCenter ? "max-w-xl mx-auto" : "max-w-md"} ${descriptionClassName}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
