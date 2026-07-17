import type { Metadata } from "next";
import { privacyPage, legalEntity } from "@/content/copy.sv";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description: "Hur Hantverkarsystemet hanterar personuppgifter.",
  alternates: { canonical: "/integritetspolicy" },
};

export default function IntegritetspolicyPage() {
  return (
    <Container className="flex flex-col gap-6 py-14 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-ink">{privacyPage.heading}</h1>
      <p className="text-ink-muted">{privacyPage.intro}</p>

      {privacyPage.sections.map((section) => (
        <div key={section.heading}>
          <h2 className="mb-1 text-lg font-semibold text-ink">{section.heading}</h2>
          <p className="text-ink-muted">{section.body}</p>
        </div>
      ))}

      <div>
        <h2 className="mb-1 text-lg font-semibold text-ink">Personuppgiftsansvarig</h2>
        <p className="text-ink-muted">
          {legalEntity.companyName}, org.nr {legalEntity.orgNumber}, {legalEntity.address}.{" "}
          {legalEntity.email}
        </p>
      </div>
    </Container>
  );
}
