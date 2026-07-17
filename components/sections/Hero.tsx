import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/ui/LeadForm";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { copy } from "@/content/copy.sv";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-14 sm:py-20">
      <Container className="text-center">
        <p className="mx-auto max-w-xl text-lg text-neutral-700">
          {copy.hero.painPoint}
        </p>
        <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold text-balance text-neutral-900 sm:text-4xl">
          {copy.hero.headline}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-600">
          {copy.hero.subline}
        </p>
        <div className="mx-auto mt-8 max-w-md">
          <LeadForm sourceSection="hero" />
        </div>
        <p className="mt-4 text-sm text-neutral-500">
          {copy.hero.ctaSecondaryLabel} <PhoneLink className="text-brand" />
        </p>
      </Container>
    </section>
  );
}
