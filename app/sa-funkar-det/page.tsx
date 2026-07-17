import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";

export const metadata: Metadata = {
  title: "Så funkar det",
  description:
    "Så här sätter vi upp automatiskt SMS-svar, recensionsinsamling och din hemsida — steg för steg.",
  alternates: { canonical: "/sa-funkar-det" },
};

const steps = [
  {
    title: "1. Du berättar om ditt företag",
    body: "Ett kort samtal eller formulär räcker: vad du gör, var du jobbar och vilket nummer kunder ringer.",
  },
  {
    title: "2. Vi sätter upp allt åt dig",
    body: "SMS-svaret kopplas till ditt nummer, recensionspåminnelsen ställs in, och din hemsida byggs klar.",
  },
  {
    title: "3. Du godkänner",
    body: "Du får se texterna och hemsidan innan något går live, så att allt känns som du.",
  },
  {
    title: "4. Det sköter sig själv",
    body: "Missar du ett samtal går SMS:et iväg direkt. Efter avslutade jobb påminns kunden om att lämna ett omdöme. Du fokuserar på jobbet.",
  },
];

export default function SaFunkarDetPage() {
  return (
    <Container className="py-14 sm:py-20">
      <h1 className="text-3xl font-bold">Så funkar det</h1>
      <p className="mt-3 max-w-xl text-lg text-neutral-600">
        Du behöver inte installera något eller lära dig ett nytt system. Så
        här går det till från första kontakt till att allt sköter sig själv.
      </p>

      <div className="mt-10 space-y-8">
        {steps.map((step) => (
          <div key={step.title}>
            <h2 className="text-xl font-bold text-neutral-900">
              {step.title}
            </h2>
            <p className="mt-1 text-neutral-600">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <CtaButton href="/#kom-igang">Kom igång</CtaButton>
      </div>
    </Container>
  );
}
