import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/ui/LeadForm";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { copy } from "@/content/copy.sv";

export function FinalCta() {
  return (
    <section id="kom-igang" className="bg-brand py-14 text-white sm:py-20">
      <Container className="text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          {copy.finalCta.title}
        </h2>
        <p className="mt-3 text-lg text-blue-100">{copy.finalCta.subtitle}</p>

        <div className="mx-auto mt-8 max-w-md rounded-3xl bg-white p-6">
          <LeadForm sourceSection="final-cta" />
        </div>

        <p className="mt-4 text-sm text-blue-100">
          <PhoneLink className="text-white" />
        </p>
      </Container>
    </section>
  );
}
