import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/ui/LeadForm";
import { PhoneLink } from "@/components/ui/PhoneLink";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Ring oss eller lämna dina uppgifter så hör vi av oss.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <Container className="py-14 sm:py-20">
      <h1 className="text-3xl font-bold">Kontakta oss</h1>
      <p className="mt-3 max-w-xl text-lg text-neutral-600">
        Ring oss eller fyll i formuläret så hör vi av oss samma dag.
      </p>

      <p className="mt-6">
        <PhoneLink className="text-lg text-brand" />
      </p>

      <div className="mt-8 max-w-md">
        <LeadForm sourceSection="kontakt" />
      </div>
    </Container>
  );
}
