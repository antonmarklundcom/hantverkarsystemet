import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { DraftNotice } from "@/components/ui/DraftNotice";

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description: "Så hanterar vi dina personuppgifter.",
  alternates: { canonical: "/integritetspolicy" },
};

export default function IntegritetspolicyPage() {
  return (
    <Container className="py-14 sm:py-20">
      <h1 className="text-3xl font-bold">Integritetspolicy</h1>

      <DraftNotice>
        Den här sidan väntar på riktiga företagsuppgifter (firmanamn,
        organisationsnummer, adress, kontakt-e-post) från ägaren innan
        lansering — se PLAN.md, Fas 0, punkt 4.
      </DraftNotice>

      <div className="prose max-w-none space-y-6 text-neutral-700">
        <section>
          <h2 className="text-xl font-bold text-neutral-900">
            Vem ansvarar för dina uppgifter?
          </h2>
          <p>
            [Firmanamn], org.nr [XXXXXX-XXXX], [adress], är
            personuppgiftsansvarig för de uppgifter du lämnar till oss.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900">
            Vilka uppgifter samlar vi in?
          </h2>
          <p>
            När du fyller i vårt formulär eller ringer oss sparar vi namn och
            telefonnummer, samt eventuella uppgifter du lämnar om ditt
            företag, för att kunna kontakta dig om tjänsten.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900">
            Hur använder vi uppgifterna?
          </h2>
          <p>
            Uppgifterna används för att kontakta dig, sätta upp tjänsten åt
            dig, och för det automatiska SMS-svaret och recensionspåminnelsen
            om du blir kund. Vi säljer aldrig dina uppgifter vidare.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900">
            Dina rättigheter
          </h2>
          <p>
            Du har rätt att begära utdrag, rättelse eller radering av dina
            uppgifter. Kontakta oss på [e-post] så hjälper vi dig.
          </p>
        </section>
      </div>
    </Container>
  );
}
