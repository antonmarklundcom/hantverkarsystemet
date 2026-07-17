export const siteConfig = {
  name: "Hantverkarsystemet",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  demoPhoneNumber: process.env.NEXT_PUBLIC_DEMO_PHONE_NUMBER ?? "",
  contactPhoneNumber: process.env.NEXT_PUBLIC_CONTACT_PHONE_NUMBER ?? "",
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
} as const;

export function telHref(phoneNumber: string): string {
  return `tel:${phoneNumber.replace(/\s+/g, "")}`;
}

export function formatSwedishPhone(phoneNumber: string): string {
  if (phoneNumber.startsWith("+46")) {
    return `0${phoneNumber.slice(3)}`;
  }
  return phoneNumber;
}
