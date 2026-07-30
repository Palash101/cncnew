"use client";

import React, { createContext, useContext, useState } from "react";

interface QuoteModalContextType {
  isOpen: boolean;
  openQuoteModal: (initialService?: string) => void;
  closeQuoteModal: () => void;
  selectedService: string;
}

const QuoteModalContext = createContext<QuoteModalContextType>({
  isOpen: false,
  openQuoteModal: () => {},
  closeQuoteModal: () => {},
  selectedService: "",
});

export const QuoteModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const openQuoteModal = (initialService = "") => {
    setSelectedService(initialService);
    setIsOpen(true);
  };

  const closeQuoteModal = () => {
    setIsOpen(false);
  };

  return (
    <QuoteModalContext.Provider
      value={{ isOpen, openQuoteModal, closeQuoteModal, selectedService }}
    >
      {children}
    </QuoteModalContext.Provider>
  );
};

export const useQuoteModal = () => useContext(QuoteModalContext);
