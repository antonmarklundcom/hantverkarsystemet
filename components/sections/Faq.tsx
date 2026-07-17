import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/content/faq.sv";
import { faqJsonLd } from "@/lib/jsonld";

export function Faq() {
  const jsonLd = faqJsonLd([...faqItems]);

  return (
    <section className="bg-neutral-50 py-14 sm:py-20">
      <Container className="max-w-2xl">
        <SectionHeading title="Vanliga frågor" />

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200"
            >
              <summary className="cursor-pointer list-none font-semibold text-neutral-900 marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-brand transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-neutral-600">{item.answer}</p>
            </details>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Container>
    </section>
  );
}
