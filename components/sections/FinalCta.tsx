import { finalCta } from "@/content/copy.sv";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/ui/LeadForm";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { siteConfig } from "@/lib/site";

export function FinalCta() {
  return (
    <section id="kom-igang" className="py-14 sm:py-20">
      <Container className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{finalCta.heading}</h2>
        <p className="text-ink-muted">{finalCta.body}</p>

        <div className="rounded-xl border border-line bg-bg-muted p-5">
          <LeadForm sourceSection="final-cta" compact />
        </div>

        {siteConfig.contactPhoneNumber && (
          <PhoneLink phoneNumber={siteConfig.contactPhoneNumber} gaEvent="phone_clicked" />
        )}
      </Container>
    </section>
  );
}
