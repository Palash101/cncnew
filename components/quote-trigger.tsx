"use client";

import React from "react";
import { useQuoteModal } from "@/context/quote-modal-context";

interface QuoteTriggerProps {
  children: React.ReactNode;
  className?: string;
  initialService?: string;
}

export default function QuoteTrigger({
  children,
  className = "",
  initialService = "",
}: QuoteTriggerProps) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <button
      type="button"
      onClick={() => openQuoteModal(initialService)}
      className={className}
    >
      {children}
    </button>
  );
}
