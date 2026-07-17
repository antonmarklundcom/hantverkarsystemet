import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MissedCallVisualizer } from "@/components/sections/MissedCallVisualizer";
import { copy } from "@/content/copy.sv";
import { env } from "@/lib/env";

function formatSwedishNumber(e164: string) {
  const digits = e164.replace(/^\+46/, "0");
  return digits.replace(/(\d{2,3})(?=\d)/g, "$1 ").trim();
}

export function LiveDemo() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={copy.demo.eyebrow}
          title={copy.demo.title}
          subtitle={
            env.demoPhoneNumber ? copy.demo.subtitle : copy.demo.unavailableNote
          }
        />

        {env.demoPhoneNumber ? (
          <div className="mx-auto max-w-md text-center">
            <a
              href={`tel:${env.demoPhoneNumber}`}
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-brand px-8 py-4 text-xl font-bold text-white transition-colors hover:bg-brand-dark"
            >
              {formatSwedishNumber(env.demoPhoneNumber)}
            </a>
            <ol className="mx-auto mt-6 max-w-xs list-decimal space-y-1 text-left text-neutral-600">
              {copy.demo.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        ) : null}

        {/* Animated fallback: always shown, for visitors who don't want to
            dial (and as the only proof when the demo number isn't live yet). */}
        <div className="mx-auto mt-10 max-w-md">
          <MissedCallVisualizer caption={copy.demo.visualizerCaption} />
        </div>
      </Container>
    </section>
  );
}
