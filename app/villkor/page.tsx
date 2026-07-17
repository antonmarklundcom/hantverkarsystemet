import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { DraftNotice } from "@/components/ui/DraftNotice";

export const metadata: Metadata = {
  title: "Villkor",
  description: "Villkor för Hantverkarsystemet, inklusive pris och bindningstid.",
  alternates: { canonical: "/villkor" },
};

export default function VillkorPage() {
  return (
    <Container className="py-14 sm:py-20">
      <h1 className="text-3xl font-bold">Villkor</h1>

      <DraftNotice>
        Den här sidan väntar på riktiga företagsuppgifter (firmanamn,
        organisationsnummer, adress, kontakt-e-post) från ägaren innan
        lansering — se PLAN.md, Fas 0, punkt 4.
      </DraftNotice>

      <div className="prose max-w-none space-y-6 text-neutral-700">
        <section>
          <h2 className="text-xl font-bold text-neutral-900">Pris</h2>
          <p>
            Tjänsten kostar 2 995 kr/månad, allt ingår. Priset gäller från
            den dag tjänsten är igång.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900">
            Bindningstid
          </h2>
          <p>
            Avtalet löper på 3 månader från startdatum. Därefter fortsätter
            det löpande månad för månad tills du säger upp det.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900">Uppsägning</h2>
          <p>
            Du säger upp genom att kontakta oss på [e-post/telefon].
            Uppsägningen gäller från nästa månadsskifte efter att
            bindningstiden löpt ut.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900">
            Vad ingår
          </h2>
          <p>
            Automatiskt SMS-svar vid missade samtal, automatisk insamling av
            Google-recensioner, och en professionell lokal hemsida, samt
            hjälp med uppstart.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900">Leverantör</h2>
          <p>[Firmanamn], org.nr [XXXXXX-XXXX], [adress].</p>
        </section>
      </div>
    </Container>
  );
}
