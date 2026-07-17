import { hero } from "@/content/copy.sv";
import { siteConfig } from "@/lib/site";
import { LeadForm } from "@/components/ui/LeadForm";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="border-b border-line bg-bg-muted py-14 sm:py-20">
      <Container className="flex flex-col gap-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">{hero.eyebrow}</p>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
          {hero.headline}
        </h1>
        <p className="text-lg text-ink-muted">{hero.subline}</p>

        <div className="mt-2 rounded-xl border border-line bg-bg p-5">
          <LeadForm sourceSection="hero" compact />
        </div>

        {siteConfig.contactPhoneNumber && (
          <p className="text-sm text-ink-muted">
            {hero.ctaPhoneLabel}: <PhoneLink phoneNumber={siteConfig.contactPhoneNumber} gaEvent="phone_clicked" />
          </p>
        )}
      </Container>
    </section>
  );
}
