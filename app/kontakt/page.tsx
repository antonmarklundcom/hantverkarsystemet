import type { Metadata } from "next";
import { contactPage, legalEntity } from "@/content/copy.sv";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { LeadForm } from "@/components/ui/LeadForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Ring, mejla eller skicka ett meddelande till Hantverkarsystemet.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <Container className="flex flex-col gap-8 py-14 sm:py-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ink">{contactPage.heading}</h1>
        <p className="mt-2 text-ink-muted">{contactPage.intro}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
            {contactPage.phoneHeading}
          </h2>
          {siteConfig.contactPhoneNumber ? (
            <PhoneLink phoneNumber={siteConfig.contactPhoneNumber} gaEvent="phone_clicked" />
          ) : (
            <p className="text-ink-muted">TODO: kontaktnummer saknas i miljövariabel.</p>
          )}
        </div>
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
            {contactPage.emailHeading}
          </h2>
          <a href={`mailto:${legalEntity.email}`} className="font-semibold text-ink underline underline-offset-4">
            {legalEntity.email}
          </a>
        </div>
      </div>

      <div className="rounded-xl border border-line bg-bg-muted p-5">
        <LeadForm sourceSection="kontakt" />
      </div>
    </Container>
  );
}
