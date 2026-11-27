"use client";

import { useId, useState } from "react";
import { ArrowLeft, Check, ChevronDown, Copy, MailCheck, Send } from "lucide-react";
import { BUDGET_RANGES, CONTACT_EMAIL, SERVICES } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

const EMPTY = { fullName: "", email: "", phone: "", company: "", service: SERVICES[0], budget: "", message: "" };
type Inquiry = typeof EMPTY;

const labelClass = "mb-2 block text-sm font-semibold text-c-ink";
const fieldClass =
  "h-12 w-full rounded-xl border border-slate-300 bg-c-wash-25 px-4 text-[15px] text-c-ink placeholder-slate-400 transition-colors focus:border-c-brand focus:bg-white focus:ring-4 focus:ring-c-brand/15 focus:outline-none";

/** The inquiry as plain text, ready for an email */
function toMessage(data: Inquiry) {
  return [
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    data.company && `Company: ${data.company}`,
    `Service: ${data.service}`,
    data.budget && `Budget: ${data.budget}`,
  ]
    .filter(Boolean)
    .concat("", data.message)
    .join("\r\n");
}

/**
 * Project inquiry form.
 * There is no mail server behind the site yet, so sending opens the visitor's own email app
 * with the message already written and addressed to us. To send from the site instead,
 * replace the body of `send` with a request to an API route.
 */
export default function ContactForm() {
  const id = useId();
  const [data, setData] = useState<Inquiry>(EMPTY);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Project inquiry from ${data.fullName}`,
  )}&body=${encodeURIComponent(toMessage(data))}`;

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = mailto;
    setSent(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(toMessage(data));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the address and the "open again" link are still there
    }
  };

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-start py-4">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-c-brand-100 text-c-brand">
          <MailCheck aria-hidden className="h-7 w-7" strokeWidth={1.75} />
        </span>
        <h3 className="mt-6 text-2xl leading-tight font-semibold tracking-[-0.03em] text-c-ink">
          One more step: press send in your email app
        </h3>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Your message is written and addressed to us, {data.fullName.split(" ")[0]}. If your email app did not open,
          copy the message and send it to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-c-brand hover:underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>

        <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
          <a
            href={mailto}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-c-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-c-ink-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c-brand"
          >
            Open email app again
            <Send aria-hidden className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 text-sm font-semibold text-c-ink transition-colors hover:border-c-brand hover:bg-c-wash-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c-brand"
          >
            {copied ? <Check aria-hidden className="h-4 w-4" /> : <Copy aria-hidden className="h-4 w-4" />}
            {copied ? "Copied" : "Copy message"}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-c-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c-brand"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          Edit my message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={send} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={labelClass}>
            Full name <span className="text-c-brand">*</span>
          </label>
          <input
            id={`${id}-name`}
            name="fullName"
            type="text"
            required
            autoComplete="name"
            value={data.fullName}
            onChange={set}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={labelClass}>
            Work email <span className="text-c-brand">*</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            value={data.email}
            onChange={set}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-phone`} className={labelClass}>
            Phone
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={set}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${id}-company`} className={labelClass}>
            Company
          </label>
          <input
            id={`${id}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            value={data.company}
            onChange={set}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-service`} className={labelClass}>
          What do you need?
        </label>
        <div className="relative">
          <select
            id={`${id}-service`}
            name="service"
            value={data.service}
            onChange={set}
            className={cn(fieldClass, "cursor-pointer appearance-none pr-11")}
          >
            {SERVICES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-slate-500"
          />
        </div>
      </div>

      <div role="group" aria-labelledby={`${id}-budget`}>
        <p id={`${id}-budget`} className={labelClass}>
          Estimated budget <span className="font-normal text-slate-500">(optional)</span>
        </p>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {BUDGET_RANGES.map((range) => {
            const selected = data.budget === range;
            return (
              <button
                key={range}
                type="button"
                aria-pressed={selected}
                onClick={() => setData((prev) => ({ ...prev, budget: selected ? "" : range }))}
                className={cn(
                  "h-11 cursor-pointer rounded-xl border text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c-brand",
                  selected
                    ? "border-c-ink bg-c-ink text-white"
                    : "border-slate-300 bg-c-wash-25 text-slate-700 hover:border-c-brand hover:bg-c-wash-100",
                )}
              >
                {range}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className={labelClass}>
          Project details <span className="text-c-brand">*</span>
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={5}
          placeholder="Goals, timeline, key features, anything we should know"
          value={data.message}
          onChange={set}
          className={cn(fieldClass, "h-auto resize-y py-3 leading-6")}
        />
      </div>

      <div className="pt-1">
        <button
          type="submit"
          className="group inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-c-ink px-8 text-base font-semibold text-white shadow-[0_14px_34px_-16px_color-mix(in_srgb,var(--c-ink)_80%,transparent)] transition-colors duration-300 hover:bg-c-ink-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c-brand"
        >
          Send message
          <Send
            aria-hidden
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </button>
        <p className="mt-3 text-center text-sm text-slate-500">
          This opens your email app with the message ready to send.
        </p>
      </div>
    </form>
  );
}
