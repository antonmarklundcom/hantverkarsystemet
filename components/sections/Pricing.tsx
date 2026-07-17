import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaButton } from "@/components/ui/CtaButton";
import { copy } from "@/content/copy.sv";

export function Pricing() {
  return (
    <section className="py-14 sm:py-20" id="pris">
      <Container>
        <SectionHeading eyebrow={copy.pricing.eyebrow} title={copy.pricing.title} />

        <div className="mx-auto max-w-md rounded-3xl border-2 border-brand bg-white p-8 text-center shadow-sm">
          <p className="text-5xl font-extrabold text-neutral-900">
            {copy.pricing.price}
            <span className="text-xl font-medium text-neutral-500">
              {copy.pricing.priceSuffix}
            </span>
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            {copy.pricing.bindingNote}
          </p>

          <ul className="mt-6 space-y-3 text-left">
            {copy.pricing.includes.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-0.5 text-accent">
                  ✓
                </span>
                <span className="text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>

          <CtaButton href="#kom-igang" className="mt-8 w-full">
            {copy.pricing.cta}
          </CtaButton>
        </div>
      </Container>
    </section>
  );
}
