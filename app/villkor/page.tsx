import type { Metadata } from "next";
import { termsPage, legalEntity } from "@/content/copy.sv";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Villkor",
  description: "Avtalsvillkor för Hantverkarsystemet, inklusive bindningstid och pris.",
  alternates: { canonical: "/villkor" },
};

export default function VillkorPage() {
  return (
    <Container className="flex flex-col gap-6 py-14 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-ink">{termsPage.heading}</h1>
      <p className="text-ink-muted">{termsPage.intro}</p>

      {termsPage.sections.map((section) => (
        <div key={section.heading}>
          <h2 className="mb-1 text-lg font-semibold text-ink">{section.heading}</h2>
          <p className="text-ink-muted">{section.body}</p>
        </div>
      ))}

      <div>
        <h2 className="mb-1 text-lg font-semibold text-ink">Avtalspart</h2>
        <p className="text-ink-muted">
          {legalEntity.companyName}, org.nr {legalEntity.orgNumber}, {legalEntity.address}.
        </p>
      </div>
    </Container>
  );
}
