"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { useQuoteModal } from "@/context/quote-modal-context";

export default function QuoteModal() {
  const { isOpen, closeQuoteModal } = useQuoteModal();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeQuoteModal();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeQuoteModal]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
    closeQuoteModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="quote-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={closeQuoteModal}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/75 transform-gpu"
        >
          {/* Modal Container */}
          <motion.div
            key="quote-modal-card"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-2xl shadow-slate-950/25 z-10 my-auto transform-gpu will-change-transform"
          >
            {/* Header Ambient Soft Glow */}
            <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />
            <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={closeQuoteModal}
              className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/80 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-all cursor-pointer shadow-sm"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header Content */}
            <div className="px-6 pt-6 sm:px-8 sm:pt-8 pb-4 text-left border-b border-slate-100">
              <h3 className="text-2xl sm:text-3xl font-normal text-[#0B1739] tracking-tight">
                Request a Custom Quote
              </h3>
              <p className="mt-3 sm:mt-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Fill in your project details below and our lead engineering team will reach out within 24 hours.
              </p>
            </div>

            {/* Modal Body / Form */}
            <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4 shadow-inner ring-4 ring-emerald-50">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#0B1739]">
                    Inquiry Received!
                  </h4>
                  <p className="mt-2 text-sm text-slate-600 max-w-md leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>. We've recorded your project requirements and will contact you shortly at <span className="font-semibold text-slate-900">{formData.email}</span>.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#0B1739] hover:bg-[#152052] px-8 py-3 text-sm font-bold text-white transition-all shadow-lg cursor-pointer"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Full Name <span className="text-sky-600">*</span>
                      </label>
                      <div className="relative group">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                        <input
                          type="text"
                          name="fullName"
                          required
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2.5 text-sm text-[#0B1739] placeholder-slate-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:outline-none transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Work Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Work Email <span className="text-sky-600">*</span>
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2.5 text-sm text-[#0B1739] placeholder-slate-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:outline-none transition-all shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <div className="relative group">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2.5 text-sm text-[#0B1739] placeholder-slate-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:outline-none transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Company Name
                      </label>
                      <div className="relative group">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                        <input
                          type="text"
                          name="company"
                          placeholder="Acme Corp"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2.5 text-sm text-[#0B1739] placeholder-slate-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:outline-none transition-all shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Details (Increased Height) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Project Details & Vision <span className="text-sky-600">*</span>
                    </label>
                    <div className="relative group">
                      <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us about your goals, key requirements, tech stack preferences, or project timeline..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-3 text-sm text-[#0B1739] placeholder-slate-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:outline-none transition-all shadow-sm resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#0B1739] via-[#122254] to-[#0B1739] hover:from-[#122254] hover:to-[#182c6b] px-6 py-3.5 text-sm font-bold text-white transition-all shadow-xl shadow-[#0B1739]/20 hover:shadow-sky-900/20 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Quote Request</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
