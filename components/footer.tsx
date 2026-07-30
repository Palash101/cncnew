"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  ArrowRight,
  Send,
} from "lucide-react";
import { useQuoteModal } from "@/context/quote-modal-context";

export default function Footer() {
  const { openQuoteModal } = useQuoteModal();
  return (
    <footer className="w-full bg-white text-slate-700 border-t border-slate-200/90 relative overflow-hidden">
      {/* Ambient Subtle Background Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-sky-500/5 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-indigo-500/5 blur-[150px]" />
      </div>

      {/* Top CTA Banner */}
      <div id="contact" className="border-b border-slate-200/80 bg-slate-50/80 py-14 sm:py-20 scroll-mt-10">
        <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 md:p-12 shadow-xl shadow-slate-900/5 backdrop-blur-md">
            
            <div className="text-center lg:text-left max-w-2xl">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#0B1739] tracking-tight leading-tight">
                Let's Build Something Extraordinary Together
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Partner with our engineering experts to deploy custom AI models, enterprise ERP platforms, and high-frequency web systems.
              </p>
            </div>

            {/* Newsletter / CTA Form */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3.5 shrink-0">
              <div className="relative w-full sm:w-88">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter your work email address"
                  className="w-full rounded-2xl bg-slate-50 border border-slate-300 pl-11 pr-4 py-3.5 text-sm text-[#0B1739] placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#0B1739] hover:bg-[#152052] px-7 py-3.5 text-sm font-bold text-white transition-all shadow-lg shadow-[#0B1739]/15 cursor-pointer shrink-0"
              >
                <span>Get Started</span>
                <Send className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links & Info - Larger Padding & Typography */}
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Brand & Description Column */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <Link href="/" className="inline-block mb-5 -ml-[10px]">
              <Image
                src="/craft and code logo.png"
                alt="Craft and Code Logo"
                width={190}
                height={50}
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>
            
            <p className="text-sm text-slate-600 leading-relaxed font-normal mb-8 max-w-md">
              CraftandCode is a premier digital engineering firm specializing in Next-Gen Artificial Intelligence, custom Odoo & ERPNext ERP integrations, and high-performance full-stack platforms for global enterprises.
            </p>

            {/* Direct Contact Info */}
            <div className="flex flex-col gap-3.5 text-sm text-slate-700">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center shrink-0">
                  <Image src="/email.png" alt="Email" width={20} height={20} className="h-5 w-5 object-contain" />
                </div>
                <a href="mailto:discuss@craftandcode.in" className="font-medium hover:text-sky-600 transition-colors">
                  discuss@craftandcode.in
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center shrink-0">
                  <Image src="/call.png" alt="Phone" width={20} height={20} className="h-5 w-5 object-contain" />
                </div>
                <a href="tel:+917224901787" className="font-medium hover:text-sky-600 transition-colors">
                  +91-72249 01787
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center shrink-0">
                  <Image src="/map.png" alt="Location" width={20} height={20} className="h-5 w-5 object-contain" />
                </div>
                <span className="font-medium inline-flex items-center gap-2">
                  <span>Gwalior, M.P., India</span>
                  <Image src="/flag.png" alt="India Flag" width={20} height={15} className="h-4 w-auto object-contain shrink-0" />
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Solutions & Expertise */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0B1739] mb-5 border-l-3 border-sky-600 pl-3">
              Solutions & Services
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <Link href="#services" className="text-slate-600 hover:text-sky-600 font-medium transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>Custom LLM & Chatbots</span>
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-slate-600 hover:text-sky-600 font-medium transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>Wisper Voice Agents</span>
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-slate-600 hover:text-sky-600 font-medium transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>Odoo 18 ERP & CRM Suite</span>
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-slate-600 hover:text-sky-600 font-medium transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>ERPNext Integration</span>
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-slate-600 hover:text-sky-600 font-medium transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>Full-Stack Web Apps</span>
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-slate-600 hover:text-sky-600 font-medium transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>Cloud DevOps & Microservices</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Industries & Marketplaces */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0B1739] mb-5 border-l-3 border-sky-600 pl-3">
              Industries & Marketplaces
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <Link href="#industries" className="text-slate-600 hover:text-sky-600 font-medium transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>Food Delivery & On-Demand</span>
                </Link>
              </li>
              <li>
                <Link href="#industries" className="text-slate-600 hover:text-sky-600 font-medium transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>B2B & B2C Marketplaces</span>
                </Link>
              </li>
              <li>
                <Link href="#industries" className="text-slate-600 hover:text-sky-600 font-medium transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>E-Commerce Platforms</span>
                </Link>
              </li>
              <li>
                <Link href="#industries" className="text-slate-600 hover:text-sky-600 font-medium transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>Healthcare & Telemedicine</span>
                </Link>
              </li>
              <li>
                <Link href="#industries" className="text-slate-600 hover:text-sky-600 font-medium transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>Fintech & Digital Banking</span>
                </Link>
              </li>
              <li>
                <Link href="#industries" className="text-slate-600 hover:text-sky-600 font-medium transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>EV & Telemetry Systems</span>
                </Link>
              </li>
              <li>
                <Link href="#industries" className="text-slate-600 hover:text-sky-600 font-medium transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>Ed-Tech & E-Learning</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Ecosystem */}
          <div className="lg:col-span-2 text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0B1739] mb-5 border-l-3 border-sky-600 pl-3">
              Company
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <Link href="#services" className="text-slate-600 hover:text-[#0B1739] font-medium transition-colors">
                  Our Technical Expertise
                </Link>
              </li>
              <li>
                <Link href="#industries" className="text-slate-600 hover:text-[#0B1739] font-medium transition-colors">
                  Target Industries
                </Link>
              </li>
              <li>
                <Link href="#agile" className="text-slate-600 hover:text-[#0B1739] font-medium transition-colors">
                  Agile Workflow Process
                </Link>
              </li>
              <li>
                <button
                  onClick={() => openQuoteModal()}
                  className="text-left text-slate-600 hover:text-[#0B1739] font-medium transition-colors cursor-pointer"
                >
                  Request a Quote
                </button>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-[#0B1739] font-medium transition-colors">
                  Careers & Hiring
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 bg-slate-50 py-7 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>Copyright {new Date().getFullYear()} CraftandCode | All Rights Reserved</p>
          <div className="flex items-center gap-6 text-xs font-medium text-slate-600">
            <Link href="#" className="hover:text-sky-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-sky-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-sky-600 transition-colors">
              Security Governance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
