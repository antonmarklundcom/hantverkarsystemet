import { liveDemo } from "@/content/copy.sv";
import { siteConfig, telHref, formatSwedishPhone } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MissedCallVisualizer } from "@/components/sections/MissedCallVisualizer";

export function LiveDemo() {
  const hasDemoNumber = Boolean(siteConfig.demoPhoneNumber);

  return (
    <section className="border-b border-line bg-bg-muted py-14 sm:py-20">
      <Container className="flex flex-col gap-6">
        <SectionHeading>{liveDemo.heading}</SectionHeading>
        <p className="text-ink-muted">{liveDemo.intro}</p>

        {hasDemoNumber && (
          <div className="rounded-xl border border-line bg-bg p-6">
            <ol className="mb-5 flex flex-col gap-2 text-ink">
              {liveDemo.callInstructions.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="font-bold text-accent">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <a
              href={telHref(siteConfig.demoPhoneNumber)}
              data-ga-event="demo_number_clicked"
              className="inline-flex min-h-16 w-full items-center justify-center rounded-xl bg-accent px-6 text-2xl font-extrabold text-accent-ink sm:w-auto sm:px-10"
            >
              {formatSwedishPhone(siteConfig.demoPhoneNumber)}
            </a>
            <p className="mt-4 text-sm text-ink-muted">{liveDemo.noteHonest}</p>
          </div>
        )}

        <MissedCallVisualizer />
      </Container>
    </section>
  );
}
