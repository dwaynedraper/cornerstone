"use client";

import { useState } from "react";
import { site } from "@/data/site";

const inputClass =
  "mt-1 block w-full rounded-md border-ink/20 bg-white text-ink shadow-sm focus:border-blueprint focus:ring-blueprint sm:text-sm";
const labelClass = "block font-heading text-sm font-medium text-ink";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const company = String(fd.get("company") || "");
    const email = String(fd.get("email") || "");
    const phone = String(fd.get("phone") || "");
    const message = String(fd.get("message") || "");

    const subject = `Project inquiry — ${name}${company ? ` (${company})` : ""}`;
    const body = `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input id="company" name="company" type="text" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>
          About your project
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Location, acreage, lot count, timeline — whatever you've got."
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        className="rounded bg-blueprint px-7 py-3 font-heading text-sm font-medium text-white transition-colors duration-200 hover:bg-blueprint-dark"
      >
        Send it over
      </button>
      {sent && (
        <p className="text-sm text-blueprint">
          Opening your email app&hellip; if nothing happens, reach us directly at{" "}
          {site.email}.
        </p>
      )}
    </form>
  );
}
