import { benefitCards } from "@/content/copy.sv";
import { Container } from "@/components/ui/Container";

export function BenefitCards() {
  return (
    <section className="border-b border-line py-14 sm:py-20">
      <Container className="grid gap-5 sm:grid-cols-3">
        {benefitCards.map((card) => (
          <div key={card.title} className="rounded-xl border border-line bg-bg-muted p-5">
            <h3 className="mb-2 text-lg font-bold text-ink">{card.title}</h3>
            <p className="text-sm text-ink-muted">{card.body}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
