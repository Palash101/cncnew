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
  Sparkles,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { useQuoteModal } from "@/context/quote-modal-context";

const SERVICES = [
  "AI & Machine Learning Solutions",
  "Odoo 18 ERP Customization",
  "ERPNext Integration",
  "Custom Full-Stack Web App",
  "Cloud & DevOps Infrastructure",
  "Mobile App Development",
  "Other / Consulting",
];

const BUDGET_RANGES = ["< $10,000", "$10k - $25k", "$25k - $50k", "$50k+"];

export default function QuoteModal() {
  const { isOpen, closeQuoteModal, selectedService } = useQuoteModal();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: selectedService || SERVICES[0],
    budget: BUDGET_RANGES[1],
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call / form transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      service: SERVICES[0],
      budget: BUDGET_RANGES[1],
      message: "",
    });
    closeQuoteModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeQuoteModal}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/30 z-10 my-auto"
          >
            {/* Header Ambient Glow */}
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={closeQuoteModal}
              className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header Content */}
            <div className="px-6 pt-7 sm:px-9 sm:pt-9 pb-4 text-left border-b border-slate-100">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-700 mb-3">
                <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                <span>Tell Us About Your Idea</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1739] tracking-tight">
                Request a Custom Quote
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Share your requirements below and our lead technical architects will get back to you within 24 hours.
              </p>
            </div>

            {/* Modal Body / Form */}
            <div className="p-6 sm:p-9 max-h-[75vh] overflow-y-auto">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4 shadow-inner">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#0B1739]">
                    Inquiry Submitted Successfully!
                  </h4>
                  <p className="mt-2 text-sm text-slate-600 max-w-md leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-800">{formData.fullName}</span>. We've received your project details and sent a confirmation email to <span className="font-semibold text-slate-800">{formData.email}</span>.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-7 inline-flex items-center justify-center rounded-2xl bg-[#0B1739] hover:bg-[#152052] px-8 py-3 text-sm font-bold text-white transition-all shadow-lg cursor-pointer"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          name="fullName"
                          required
                          placeholder="Alex Morgan"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-300 bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm text-[#0B1739] placeholder-slate-400 focus:bg-white focus:border-sky-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-300 bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm text-[#0B1739] placeholder-slate-400 focus:bg-white focus:border-sky-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-300 bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm text-[#0B1739] placeholder-slate-400 focus:bg-white focus:border-sky-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          name="company"
                          placeholder="Acme Corp"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-300 bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm text-[#0B1739] placeholder-slate-400 focus:bg-white focus:border-sky-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Category */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Primary Service Needed <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm text-[#0B1739] focus:bg-white focus:border-sky-600 focus:outline-none transition-all"
                    >
                      {SERVICES.map((srv) => (
                        <option key={srv} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Estimated Budget Pills */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Estimated Project Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BUDGET_RANGES.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, budget: b }))}
                          className={`rounded-xl px-3 py-2 text-xs font-semibold border transition-all cursor-pointer ${
                            formData.budget === b
                              ? "bg-[#0B1739] text-white border-[#0B1739] shadow-sm"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Project Details & Vision <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <textarea
                        name="message"
                        required
                        rows={3}
                        placeholder="Briefly describe your goals, timeline, or key feature requirements..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm text-[#0B1739] placeholder-slate-400 focus:bg-white focus:border-sky-600 focus:outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#0B1739] hover:bg-[#152052] px-6 py-3.5 text-sm font-bold text-white transition-all shadow-lg shadow-[#0B1739]/20 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Transmitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Quote Request</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
