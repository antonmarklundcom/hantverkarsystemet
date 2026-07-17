// Central svensk copy-källa. All användarvänd text ska hämtas härifrån —
// komponenter ska inte innehålla hårdkodad brödtext.
// TODO(ägare): granska och godkänn varje rad mot Fas 0-copy-decken i PLAN.md.

export const siteName = "Hantverkarsystemet";

export const hero = {
  eyebrow: "För hantverkare som inte hinner svara",
  headline: "Telefonen ringer medan du ligger under vasken. Kunden lägger på och ringer nästa firma.",
  subline:
    "Hantverkarsystemet svarar automatiskt med SMS när du missar ett samtal, ber om fler recensioner efter jobbet och ger dig en snygg hemsida — så du slutar tappa jobb bara för att du var upptagen.",
  ctaPrimary: "Kom igång",
  ctaPhoneLabel: "Eller ring oss",
} as const;

export const calculator = {
  heading: "Räkna ut vad missade samtal kostar dig",
  intro:
    "Dra i reglagen och se en försiktig uppskattning av vad du förlorar i månaden — inte en säljande gissning.",
  missedCallsLabel: "Missade samtal per vecka",
  jobValueLabel: "Snittvärde per jobb (kr)",
  resultPrefix: "≈",
  resultSuffix: "kr i förlorade jobb varje månad",
  disclaimer:
    "Vi räknar försiktigt: vi antar att bara vart tredje missat samtal hade blivit ett betalt jobb. Verkligheten kan vara värre.",
  ctaLabel: "Sluta tappa de jobben",
} as const;

export const liveDemo = {
  heading: "Testa det själv, live",
  intro: "Det här är ingen video. Det är exakt samma sak dina kunder skulle uppleva.",
  callInstructions: [
    "Ring numret nedan från din egen mobil.",
    "Lägg på efter en signal — låtsas att du inte hann svara.",
    "Titta på din telefon. SMS:et kommer inom några sekunder.",
  ],
  noteHonest: "Det här är exakt samma SMS dina kunder skulle få.",
  fallbackHeading: "Så här ser det ut",
  fallbackIntro: "Ingen telefon i handen just nu? Så här går det till:",
  visualizerSteps: [
    { label: "Missat samtal", detail: "Kunden ringer, du hinner inte svara." },
    { label: "Skriver...", detail: "Systemet svarar direkt, automatiskt." },
    { label: "SMS skickat", detail: "Kunden får svar inom sekunder — inte imorgon." },
  ],
} as const;

export const benefitCards = [
  {
    title: "Missat samtal → svar direkt",
    body: "Så fort du missar ett samtal går det automatiskt ut ett SMS till kunden. De vet att du sett det och att du hör av dig — istället för att ringa nästa firma på listan.",
  },
  {
    title: "Nöjda kunder → fler recensioner utan tjat",
    body: "Efter ett avslutat jobb skickas en vänlig fråga om kunden vill lämna en recension. Du slipper be om det själv, och fler ärliga omdömen gör att fler väljer dig.",
  },
  {
    title: "En snygg hemsida som gör att du ser seriös ut",
    body: "En enkel, professionell hemsida med dina uppgifter och vad du gör. Kunder som googlar dig innan de ringer ska se ett proffs — inte en tom Facebook-sida.",
  },
] as const;

export const pricing = {
  heading: "Ett pris. Allt ingår.",
  priceLabel: "2 995 kr/mån",
  priceSubline: "Allt ingår — inga tillägg, inga överraskningar.",
  bindingNote: "3 månaders bindningstid, därefter löpande månadsvis. Du säger upp när du vill efter det.",
  includedHeading: "Det här ingår:",
  included: [
    "Automatiskt SMS-svar när du missar samtal",
    "Automatisk fråga om recension efter avslutat jobb",
    "Din egen hemsida, färdig och skött",
    "Support på svenska när du behöver hjälp",
  ],
  ctaLabel: "Kom igång",
} as const;

export const faqSection = {
  heading: "Vanliga frågor",
} as const;

export const finalCta = {
  heading: "Nästa missade samtal behöver inte bli en förlorad kund.",
  body: "Kom igång idag — det tar bara några minuter.",
  ctaLabel: "Kom igång",
} as const;

export const leadForm = {
  heading: "Kom igång",
  nameLabel: "Namn",
  namePlaceholder: "Ditt namn",
  phoneLabel: "Mobilnummer",
  phonePlaceholder: "07X-XXX XX XX",
  companyLabel: "Företag (valfritt)",
  companyPlaceholder: "Ditt företagsnamn",
  submitLabel: "Skicka",
  submittingLabel: "Skickar...",
  successMessage: "Tack! Vi hör av oss inom kort.",
  errorMessage: "Något gick fel. Ring oss direkt istället så hjälper vi dig på en gång.",
  privacyNote: "Genom att skicka godkänner du att vi kontaktar dig om Hantverkarsystemet.",
} as const;

export const header = {
  phoneLinkLabel: "Ring oss",
} as const;

export const footer = {
  legalLinks: [
    { href: "/integritetspolicy", label: "Integritetspolicy" },
    { href: "/villkor", label: "Villkor" },
    { href: "/kontakt", label: "Kontakt" },
  ],
  copyrightSuffix: "Alla rättigheter förbehållna.",
} as const;

export const howItWorksStub = {
  heading: "Så funkar det",
  intro: "TODO: fylls i under Fas 2 med de tre delarna steg för steg, tidslinje och vad du själv behöver göra.",
} as const;

// TODO(ägare): ersätt med riktigt bolagsnamn, org.nr, adress och e-post
// (Fas 0-input i PLAN.md). Sidorna nedan får inte publiceras med
// placeholder-uppgifterna kvar.
export const legalEntity = {
  companyName: "TODO: Bolagsnamn AB",
  orgNumber: "TODO: XXXXXX-XXXX",
  address: "TODO: Gatuadress, Postnummer Ort",
  email: "TODO: info@hantverkarsystemet.se",
} as const;

export const contactPage = {
  heading: "Kontakta oss",
  intro: "Ring, mejla eller fyll i formuläret — vi svarar så fort vi kan.",
  phoneHeading: "Telefon",
  emailHeading: "E-post",
} as const;

export const privacyPage = {
  heading: "Integritetspolicy",
  intro:
    "TODO(ägare): fyll i fullständig integritetspolicy enligt GDPR med verkliga bolagsuppgifter innan publicering. Nedan är en strukturell platshållare.",
  sections: [
    {
      heading: "Vilka uppgifter vi samlar in",
      body: "TODO: beskriv exakt vilka uppgifter (namn, telefonnummer, ev. företag) som samlas in via kontaktformuläret och varför.",
    },
    {
      heading: "Hur vi använder uppgifterna",
      body: "TODO: beskriv syftet (kontakt om tjänsten) och laglig grund.",
    },
    {
      heading: "Hur länge vi sparar uppgifterna",
      body: "TODO: ange lagringstid.",
    },
    {
      heading: "Dina rättigheter",
      body: "TODO: beskriv rätt till radering, rättelse och utdrag samt kontaktväg för detta.",
    },
  ],
} as const;

export const termsPage = {
  heading: "Villkor",
  intro:
    "TODO(ägare): fyll i fullständiga avtalsvillkor med verkliga bolagsuppgifter innan publicering. Nedan är en strukturell platshållare.",
  sections: [
    {
      heading: "Bindningstid och uppsägning",
      body: "3 månaders bindningstid från startdatum, därefter löpande månadsvis med en (1) månads uppsägningstid. Ingen bindningstid döljs eller omformuleras — det som står här är det som gäller.",
    },
    {
      heading: "Pris",
      body: "2 995 kr/mån, allt ingår. Prisändringar meddelas minst 30 dagar i förväg.",
    },
    {
      heading: "Vad som ingår",
      body: "TODO: hänvisa till aktuell prissida/leveransbeskrivning.",
    },
    {
      heading: "Ansvar",
      body: "TODO(ägare): juridiskt ansvarsavsnitt — kräver juridisk granskning innan publicering.",
    },
  ],
} as const;
