"use client";

import { useState, type FormEvent } from "react";
import { leadForm } from "@/content/copy.sv";

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
    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("website")) {
      // Honeypot triggered — pretend success, drop silently.
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
          foretag: data.get("foretag") || undefined,
          sourceSection,
        }),
      });

      if (!res.ok) throw new Error("request-failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="min-h-12 py-3 font-medium text-ink">{leadForm.successMessage}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3" noValidate>
      <div className="hidden">
        <label htmlFor={`website-${sourceSection}`}>Lämna detta fält tomt</label>
        <input
          type="text"
          id={`website-${sourceSection}`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={compact ? "flex flex-col gap-3 sm:flex-row" : "flex flex-col gap-3"}>
        <div className="flex-1">
          <label htmlFor={`namn-${sourceSection}`} className="sr-only">
            {leadForm.nameLabel}
          </label>
          <input
            id={`namn-${sourceSection}`}
            name="namn"
            type="text"
            required
            maxLength={100}
            placeholder={leadForm.namePlaceholder}
            className="min-h-12 w-full rounded-lg border border-line bg-bg px-4 text-base text-ink placeholder:text-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          />
        </div>
        <div className="flex-1">
          <label htmlFor={`telefon-${sourceSection}`} className="sr-only">
            {leadForm.phoneLabel}
          </label>
          <input
            id={`telefon-${sourceSection}`}
            name="telefon"
            type="tel"
            required
            maxLength={20}
            placeholder={leadForm.phonePlaceholder}
            className="min-h-12 w-full rounded-lg border border-line bg-bg px-4 text-base text-ink placeholder:text-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          />
        </div>
      </div>

      {!compact && (
        <div>
          <label htmlFor={`foretag-${sourceSection}`} className="sr-only">
            {leadForm.companyLabel}
          </label>
          <input
            id={`foretag-${sourceSection}`}
            name="foretag"
            type="text"
            maxLength={100}
            placeholder={leadForm.companyPlaceholder}
            className="min-h-12 w-full rounded-lg border border-line bg-bg px-4 text-base text-ink placeholder:text-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="min-h-12 rounded-lg bg-accent px-6 text-base font-semibold text-accent-ink transition-colors hover:bg-accent/90 disabled:opacity-60"
      >
        {status === "submitting" ? leadForm.submittingLabel : leadForm.submitLabel}
      </button>

      {status === "error" && <p className="text-sm font-medium text-red-700">{leadForm.errorMessage}</p>}

      <p className="text-xs text-ink-muted">{leadForm.privacyNote}</p>
    </form>
  );
}
