import type { Metadata } from "next";
import { howItWorksStub } from "@/content/copy.sv";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Så funkar det",
  description: "De tre delarna i Hantverkarsystemet, steg för steg.",
  alternates: { canonical: "/sa-funkar-det" },
};

export default function SaFunkarDetPage() {
  return (
    <Container className="flex flex-col gap-6 py-14 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-ink">{howItWorksStub.heading}</h1>
      <p className="text-ink-muted">{howItWorksStub.intro}</p>
    </Container>
  );
}
