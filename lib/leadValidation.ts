const NAME_MAX_LENGTH = 100;
const PHONE_MAX_LENGTH = 20;
const SOURCE_MAX_LENGTH = 50;
// Swedish mobile/landline numbers, with or without +46 / leading 0, spaces allowed.
const PHONE_PATTERN = /^(\+46|0)[\s-]?[1-9][\d\s-]{6,17}$/;

export type LeadValidationResult =
  | { ok: true; honeypotTriggered: false; namn: string; telefon: string; source: string }
  | { ok: true; honeypotTriggered: true }
  | { ok: false; error: string };

export function validateLeadPayload(body: unknown): LeadValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Ogiltig förfrågan." };
  }

  const { namn, telefon, sourceSection, foretagswebbplats } = body as Record<
    string,
    unknown
  >;

  // Honeypot: real visitors never fill this hidden field.
  if (typeof foretagswebbplats === "string" && foretagswebbplats.length > 0) {
    return { ok: true, honeypotTriggered: true };
  }

  if (
    typeof namn !== "string" ||
    namn.trim().length < 2 ||
    namn.length > NAME_MAX_LENGTH
  ) {
    return { ok: false, error: "Ange ditt namn." };
  }

  if (
    typeof telefon !== "string" ||
    telefon.length > PHONE_MAX_LENGTH ||
    !PHONE_PATTERN.test(telefon.trim())
  ) {
    return { ok: false, error: "Ange ett giltigt mobilnummer." };
  }

  const source =
    typeof sourceSection === "string"
      ? sourceSection.slice(0, SOURCE_MAX_LENGTH)
      : "unknown";

  return {
    ok: true,
    honeypotTriggered: false,
    namn: namn.trim(),
    telefon: telefon.trim(),
    source,
  };
}
