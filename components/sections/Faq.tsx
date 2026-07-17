import { faqSection } from "@/content/copy.sv";
import { faqItems } from "@/content/faq.sv";
import { faqPageJsonLd } from "@/lib/jsonld";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq() {
  return (
    <section className="border-b border-line py-14 sm:py-20">
      <Container className="flex flex-col gap-6">
        <SectionHeading>{faqSection.heading}</SectionHeading>

        <div className="flex flex-col gap-3">
          {faqItems.map((item) => (
            <details key={item.question} className="group rounded-lg border border-line bg-bg-muted p-4">
              <summary className="cursor-pointer list-none font-semibold text-ink marker:content-none">
                {item.question}
              </summary>
              <p className="mt-3 text-ink-muted">{item.answer}</p>
            </details>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd()) }}
        />
      </Container>
    </section>
  );
}
