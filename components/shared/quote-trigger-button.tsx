"use client";

import React from "react";
import { useQuoteModal } from "@/context/quote-modal-context";
import { ArrowRight, Send, LucideIcon } from "lucide-react";

export interface QuoteTriggerButtonProps {
  children?: React.ReactNode;
  label?: string;
  variant?: "gradient" | "solid" | "footer" | "mobile" | "custom";
  icon?: "arrow" | "send" | "circle-arrow" | "none";
  customIcon?: LucideIcon;
  initialService?: string;
  className?: string;
  onClick?: () => void;
}

export default function QuoteTriggerButton({
  children,
  label = "Get a Quote",
  variant = "gradient",
  icon = "circle-arrow",
  customIcon: CustomIcon,
  initialService,
  className = "",
  onClick,
}: QuoteTriggerButtonProps) {
  const { openQuoteModal } = useQuoteModal();

  const handleClick = () => {
    if (onClick) onClick();
    openQuoteModal(initialService);
  };

  const baseStyles =
    "group relative inline-flex items-center justify-center font-bold text-white cursor-pointer transition-all duration-300 shrink-0";

  const variantStyles = {
    gradient:
      "gap-2.5 rounded-full bg-gradient-to-r from-[#0B1739] to-sky-950 px-6 py-2.5 text-xs sm:text-sm shadow-md shadow-[#0B1739]/20 hover:from-sky-600 hover:to-blue-700 hover:shadow-lg hover:shadow-sky-500/30 hover:scale-[1.03] border border-sky-400/20",
    solid:
      "gap-2 rounded-2xl bg-[#0B1739] hover:bg-[#152052] px-7 py-5 text-base font-semibold shadow-lg shadow-blue-900/15 hover:scale-[1.02]",
    footer:
      "gap-2.5 rounded-2xl bg-[#0B1739] hover:bg-[#152052] px-7 py-3.5 text-sm shadow-lg shadow-[#0B1739]/15",
    mobile:
      "gap-2 rounded-full bg-gradient-to-r from-[#0B1739] to-sky-900 px-6 py-3 text-sm shadow-md hover:from-sky-600 hover:to-blue-700 active:scale-[0.99] touch-manipulation",
    custom: "",
  };

  const renderIcon = () => {
    if (CustomIcon) return <CustomIcon className="h-4 w-4" />;
    if (icon === "send") return <Send className="h-4 w-4" />;
    if (icon === "arrow") return <ArrowRight className="ml-2 h-5 w-5" />;
    if (icon === "circle-arrow") {
      return (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/25 transition-colors">
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform text-white" />
        </div>
      );
    }
    return null;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children ? children : <span>{label}</span>}
      {renderIcon()}
    </button>
  );
}
