"use client";

import { useId, useState } from "react";
import { calculator } from "@/content/copy.sv";
import { CALCULATOR_DEFAULTS, CALCULATOR_LIMITS, calculateMonthlyLostIncome } from "@/lib/calculator";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaButton } from "@/components/ui/CtaButton";

const krFormatter = new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 0 });

export function LostIncomeCalculator() {
  const [missedCalls, setMissedCalls] = useState<number>(CALCULATOR_DEFAULTS.missedCallsPerWeek);
  const [jobValue, setJobValue] = useState<number>(CALCULATOR_DEFAULTS.jobValueKr);
  const missedCallsId = useId();
  const jobValueId = useId();

  const result = calculateMonthlyLostIncome(missedCalls, jobValue);

  return (
    <section className="border-b border-line py-14 sm:py-20">
      <Container className="flex flex-col gap-6">
        <SectionHeading>{calculator.heading}</SectionHeading>
        <p className="text-ink-muted">{calculator.intro}</p>

        <div className="flex flex-col gap-6 rounded-xl border border-line bg-bg-muted p-6">
          <div>
            <label htmlFor={missedCallsId} className="mb-2 block text-sm font-semibold text-ink">
              {calculator.missedCallsLabel}: {missedCalls}
            </label>
            <input
              id={missedCallsId}
              type="range"
              min={CALCULATOR_LIMITS.missedCallsPerWeek.min}
              max={CALCULATOR_LIMITS.missedCallsPerWeek.max}
              step={CALCULATOR_LIMITS.missedCallsPerWeek.step}
              value={missedCalls}
              onChange={(event) => setMissedCalls(Number(event.target.value))}
              className="w-full accent-accent"
            />
          </div>

          <div>
            <label htmlFor={jobValueId} className="mb-2 block text-sm font-semibold text-ink">
              {calculator.jobValueLabel}: {krFormatter.format(jobValue)} kr
            </label>
            <input
              id={jobValueId}
              type="range"
              min={CALCULATOR_LIMITS.jobValueKr.min}
              max={CALCULATOR_LIMITS.jobValueKr.max}
              step={CALCULATOR_LIMITS.jobValueKr.step}
              value={jobValue}
              onChange={(event) => setJobValue(Number(event.target.value))}
              className="w-full accent-accent"
            />
          </div>

          <div className="flex min-h-20 flex-col items-start justify-center gap-1 rounded-lg bg-bg p-4">
            <p className="text-2xl font-extrabold text-ink">
              {calculator.resultPrefix} {krFormatter.format(result)} {calculator.resultSuffix}
            </p>
            <p className="text-xs text-ink-muted">{calculator.disclaimer}</p>
          </div>

          <CtaButton href="#kom-igang" className="self-start">
            {calculator.ctaLabel}
          </CtaButton>
        </div>
      </Container>
    </section>
  );
}
