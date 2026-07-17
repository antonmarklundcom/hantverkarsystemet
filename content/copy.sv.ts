// Svensk copy-deck för Hantverkarsystemet.
// DRAFT — skriven av Sonnet 5 enligt tonreglerna i PLAN.md. Ska godkännas av
// ägaren innan lansering (se PLAN.md, Fas 0, punkt 1).
//
// Tonregler: du-form, inga anglicismer i rubriker, aldrig "plattform"/"AI"/
// "automation" som huvudord, funktionsnamn alltid som konkret nytta.

export const copy = {
  hero: {
    painPoint:
      "Du står uppe på taket, under vasken eller mitt i ett jobb. Mobilen surrar. Du kan inte svara — och kunden ringer nästa hantverkare på listan.",
    headline: "Missa aldrig ett jobb bara för att du inte kunde svara",
    subline:
      "Vi ser till att kunden får svar direkt via SMS, samlar in Google-recensioner åt dig, och ger dig en snygg hemsida — allt sköts i bakgrunden medan du jobbar.",
    ctaPrimary: "Kom igång",
    ctaSecondaryLabel: "eller ring oss direkt",
  },
  calculator: {
    eyebrow: "Räkna själv",
    title: "Vad kostar missade samtal dig varje månad?",
    subtitle:
      "Dra i reglagen och se en försiktig uppskattning — vi räknar bara med att en del av missade samtal faktiskt hade blivit jobb.",
    missedCallsLabel: "Missade samtal per vecka",
    jobValueLabel: "Vad är ett vanligt jobb värt för dig?",
    resultPrefix: "Det kan innebära ungefär",
    resultSuffix: "i förlorade jobb varje månad.",
    // Konservativt antagande — DRAFT, kräver ägarens godkännande (PLAN.md §9.3).
    // Vi räknar med att ett av tre missade samtal hade blivit ett betalt jobb.
    conversionNote:
      "Vi räknar försiktigt: bara ett av tre missade samtal räknas som ett förlorat jobb.",
    disclaimer: "En uppskattning, inte en garanti — men den säger något.",
  },
  demo: {
    eyebrow: "Se det hända",
    title: "Ring och se det hända",
    subtitle:
      "Ring numret nedan, lägg på efter en signal, och titta på din egen telefon. Du får exakt samma SMS som dina kunder skulle fått.",
    callToAction: "Ring demonumret",
    unavailableNote:
      "Demonumret sätts upp inom kort — under tiden kan du se hur det fungerar här:",
    visualizerCaption: "Så här ser det ut för din kund, i realtid.",
    steps: [
      "Kunden ringer och du hinner inte svara",
      "Ett SMS går iväg automatiskt, direkt",
      "Kunden vet att du hört av dig snart",
    ],
  },
  benefits: [
    {
      title: "Ingen kund går förlorad",
      body: "Missar du ett samtal får den som ringde ett SMS direkt, så att de vet att du hört av dig och inte går vidare till nästa hantverkare.",
    },
    {
      title: "Fler recensioner, utan att du behöver tjata",
      body: "Efter avslutat jobb skickas en vänlig påminnelse om att lämna ett Google-omdöme — helt automatiskt, du slipper fråga själv.",
    },
    {
      title: "En hemsida som gör att du ser seriös ut",
      body: "En snabb, ren och professionell lokal hemsida som visar vad du gör och var — så att kunder som googlar dig litar på dig direkt.",
    },
  ],
  pricing: {
    eyebrow: "Priset",
    title: "Ett pris. Allt ingår.",
    price: "2 995 kr",
    priceSuffix: "/månad",
    bindingNote: "3 månaders bindningstid, sedan löpande månadsvis.",
    includes: [
      "Automatiskt SMS-svar vid missade samtal",
      "Automatisk insamling av Google-recensioner",
      "En snabb, professionell lokal hemsida",
      "Personlig hjälp med uppstart",
    ],
    cta: "Kom igång",
  },
  finalCta: {
    title: "Redo att sluta missa jobb?",
    subtitle: "Fyll i dina uppgifter så hör vi av oss samma dag.",
  },
} as const;
