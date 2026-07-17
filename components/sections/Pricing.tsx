import { pricing } from "@/content/copy.sv";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaButton } from "@/components/ui/CtaButton";

export function Pricing() {
  return (
    <section className="border-b border-line bg-bg-muted py-14 sm:py-20">
      <Container className="flex flex-col items-start gap-6">
        <SectionHeading>{pricing.heading}</SectionHeading>

        <div className="w-full rounded-xl border border-line bg-bg p-6">
          <p className="text-4xl font-extrabold text-ink">{pricing.priceLabel}</p>
          <p className="mt-1 text-ink-muted">{pricing.priceSubline}</p>
          <p className="mt-4 text-sm font-medium text-ink">{pricing.bindingNote}</p>

          <p className="mt-6 mb-2 font-semibold text-ink">{pricing.includedHeading}</p>
          <ul className="flex flex-col gap-2">
            {pricing.included.map((item) => (
              <li key={item} className="flex gap-2 text-ink-muted">
                <span aria-hidden className="text-accent">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <CtaButton href="#kom-igang" className="mt-6">
            {pricing.ctaLabel}
          </CtaButton>
        </div>
      </Container>
    </section>
  );
}
