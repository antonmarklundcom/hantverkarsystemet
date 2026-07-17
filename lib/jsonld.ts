import { env } from "@/lib/env";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hantverkarsystemet",
    url: env.siteUrl,
    ...(env.contactPhoneNumber
      ? { telephone: env.contactPhoneNumber }
      : {}),
    areaServed: "SE",
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Telefon- och recensionshantering för hantverkare",
    provider: {
      "@type": "Organization",
      name: "Hantverkarsystemet",
      url: env.siteUrl,
    },
    areaServed: "SE",
    offers: {
      "@type": "Offer",
      price: "2995",
      priceCurrency: "SEK",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "2995",
        priceCurrency: "SEK",
        billingDuration: "P1M",
      },
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
