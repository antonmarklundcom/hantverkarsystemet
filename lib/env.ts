const FALLBACK_SITE_URL = "http://localhost:3000";

export const env = {
  ghlLeadWebhookUrl: process.env.GHL_LEAD_WEBHOOK_URL ?? "",
  // Both phone numbers are intentionally nullable: showing a fake/placeholder
  // number to a real visitor would violate the anti-fabrication rule.
  demoPhoneNumber: process.env.NEXT_PUBLIC_DEMO_PHONE_NUMBER || null,
  contactPhoneNumber: process.env.NEXT_PUBLIC_CONTACT_PHONE_NUMBER || null,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL,
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || null,
};
