import { Container } from "@/components/ui/Container";
import { copy } from "@/content/copy.sv";

export function BenefitCards() {
  return (
    <section className="bg-neutral-50 py-14 sm:py-20">
      <Container className="max-w-5xl">
        <div className="grid gap-6 sm:grid-cols-3">
          {copy.benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-200"
            >
              <h3 className="text-lg font-bold text-neutral-900">
                {benefit.title}
              </h3>
              <p className="mt-2 text-neutral-600">{benefit.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
