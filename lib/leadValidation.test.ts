import { describe, expect, it } from "vitest";
import { validateLeadPayload } from "@/lib/leadValidation";

describe("validateLeadPayload", () => {
  it("rejects non-object bodies", () => {
    expect(validateLeadPayload(null)).toEqual({
      ok: false,
      error: "Ogiltig förfrågan.",
    });
    expect(validateLeadPayload("hej")).toEqual({
      ok: false,
      error: "Ogiltig förfrågan.",
    });
  });

  it("flags the honeypot without validating the rest", () => {
    const result = validateLeadPayload({
      namn: "",
      telefon: "not a number",
      foretagswebbplats: "https://spam.example",
    });
    expect(result).toEqual({ ok: true, honeypotTriggered: true });
  });

  it("rejects a missing or too-short name", () => {
    expect(
      validateLeadPayload({ namn: "A", telefon: "0701234567" }),
    ).toEqual({ ok: false, error: "Ange ditt namn." });
    expect(
      validateLeadPayload({ namn: 123, telefon: "0701234567" }),
    ).toEqual({ ok: false, error: "Ange ditt namn." });
  });

  it("accepts Swedish numbers in common formats", () => {
    const validNumbers = [
      "0701234567",
      "070-123 45 67",
      "+46701234567",
      "+46 70 123 45 67",
    ];
    for (const telefon of validNumbers) {
      const result = validateLeadPayload({ namn: "Anna Andersson", telefon });
      expect(result.ok).toBe(true);
      if (result.ok && !result.honeypotTriggered) {
        expect(result.telefon).toBe(telefon);
      }
    }
  });

  it("rejects obviously invalid phone numbers", () => {
    const invalid = ["123", "abc", "+1 555 123 4567", "0"];
    for (const telefon of invalid) {
      const result = validateLeadPayload({ namn: "Anna Andersson", telefon });
      expect(result).toEqual({
        ok: false,
        error: "Ange ett giltigt mobilnummer.",
      });
    }
  });

  it("trims name/phone and defaults an unknown source", () => {
    const result = validateLeadPayload({
      namn: "  Anna Andersson  ",
      telefon: "  0701234567  ",
    });
    expect(result).toEqual({
      ok: true,
      honeypotTriggered: false,
      namn: "Anna Andersson",
      telefon: "0701234567",
      source: "unknown",
    });
  });

  it("caps an overly long source label", () => {
    const longSource = "x".repeat(80);
    const result = validateLeadPayload({
      namn: "Anna Andersson",
      telefon: "0701234567",
      sourceSection: longSource,
    });
    expect(result.ok).toBe(true);
    if (result.ok && !result.honeypotTriggered) {
      expect(result.source.length).toBe(50);
    }
  });
});
