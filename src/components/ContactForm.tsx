"use client";

import { useState } from "react";
import { site } from "@/data/site";

const inputClass =
  "mt-1 block w-full rounded-md border-ink/20 bg-white text-ink shadow-xs focus:border-blueprint focus:ring-blueprint sm:text-sm";
const labelClass = "block font-heading text-sm font-medium text-ink";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }
      form.reset();
      setStatus("sent");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-6 rounded-md border border-blueprint/30 bg-blueprint-50 p-5">
        <p className="font-heading text-base font-semibold text-blueprint-dark">
          Thanks — we got it.
        </p>
        <p className="mt-1 text-sm text-ink-500">
          We&apos;ll be in touch shortly. Need an answer faster? Call{" "}
          {site.phoneDisplay}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      {/* Honeypot — hidden from people, catches bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

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
        disabled={status === "sending"}
        className="rounded-sm bg-blueprint px-7 py-3 font-heading text-sm font-medium text-white transition-colors duration-200 hover:bg-blueprint-dark disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send it over"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-700">
          {errorMsg} You can also reach us directly at {site.email}.
        </p>
      )}
    </form>
  );
}
