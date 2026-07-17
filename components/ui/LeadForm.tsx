"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm({
  sourceSection,
  compact = false,
}: {
  sourceSection: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real visitors never fill this hidden field.
    if (data.get("foretagswebbplats")) {
      setStatus("success");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          namn: data.get("namn"),
          telefon: data.get("telefon"),
          sourceSection,
        }),
      });

      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-2xl bg-green-50 px-5 py-4 text-base font-medium text-green-800">
        Tack! Vi hör av oss inom kort.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex ${compact ? "flex-col sm:flex-row" : "flex-col"} gap-3`}
    >
      <input
        type="text"
        name="foretagswebbplats"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <label className="sr-only" htmlFor={`namn-${sourceSection}`}>
        Namn
      </label>
      <input
        id={`namn-${sourceSection}`}
        name="namn"
        type="text"
        required
        placeholder="Ditt namn"
        autoComplete="name"
        className="min-h-12 flex-1 rounded-full border border-neutral-300 px-5 py-3 text-base outline-none focus:border-brand focus:ring-2 focus:ring-brand"
      />
      <label className="sr-only" htmlFor={`telefon-${sourceSection}`}>
        Mobilnummer
      </label>
      <input
        id={`telefon-${sourceSection}`}
        name="telefon"
        type="tel"
        required
        placeholder="Ditt mobilnummer"
        autoComplete="tel"
        className="min-h-12 flex-1 rounded-full border border-neutral-300 px-5 py-3 text-base outline-none focus:border-brand focus:ring-2 focus:ring-brand"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="min-h-12 rounded-full bg-brand px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Skickar..." : "Kom igång"}
      </button>
      {status === "error" ? (
        <p className="text-sm font-medium text-red-700" role="alert">
          Något gick fel. Ring oss direkt så hjälper vi dig.
        </p>
      ) : null}
    </form>
  );
}
