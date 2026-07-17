"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { estimateMonthlyLoss, formatSek } from "@/lib/calculator";
import { copy } from "@/content/copy.sv";

const MISSED_CALLS_MIN = 0;
const MISSED_CALLS_MAX = 20;
const JOB_VALUE_MIN = 1000;
const JOB_VALUE_MAX = 50000;
const JOB_VALUE_STEP = 500;

export function LostIncomeCalculator() {
  const [missedCalls, setMissedCalls] = useState(5);
  const [jobValue, setJobValue] = useState(8000);

  const monthlyLoss = useMemo(
    () => estimateMonthlyLoss(missedCalls, jobValue),
    [missedCalls, jobValue],
  );

  return (
    <section className="bg-neutral-50 py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={copy.calculator.eyebrow}
          title={copy.calculator.title}
          subtitle={copy.calculator.subtitle}
        />

        <div className="mx-auto max-w-xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 sm:p-8">
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="missed-calls" className="font-medium">
                {copy.calculator.missedCallsLabel}
              </label>
              <span className="font-semibold text-brand">{missedCalls}</span>
            </div>
            <input
              id="missed-calls"
              type="range"
              min={MISSED_CALLS_MIN}
              max={MISSED_CALLS_MAX}
              value={missedCalls}
              onChange={(e) => setMissedCalls(Number(e.target.value))}
              className="h-3 w-full cursor-pointer accent-brand"
            />
          </div>

          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="job-value" className="font-medium">
                {copy.calculator.jobValueLabel}
              </label>
              <span className="font-semibold text-brand">
                {formatSek(jobValue)}
              </span>
            </div>
            <input
              id="job-value"
              type="range"
              min={JOB_VALUE_MIN}
              max={JOB_VALUE_MAX}
              step={JOB_VALUE_STEP}
              value={jobValue}
              onChange={(e) => setJobValue(Number(e.target.value))}
              className="h-3 w-full cursor-pointer accent-brand"
            />
          </div>

          <div className="min-h-24 rounded-2xl bg-blue-50 p-5 text-center">
            <p className="text-base text-neutral-700">
              {copy.calculator.resultPrefix}
            </p>
            <p className="text-3xl font-extrabold text-brand-dark">
              {formatSek(monthlyLoss)}
            </p>
            <p className="text-base text-neutral-700">
              {copy.calculator.resultSuffix}
            </p>
          </div>

          <p className="mt-4 text-center text-sm text-neutral-600">
            {copy.calculator.conversionNote}
          </p>
        </div>
      </Container>
    </section>
  );
}
