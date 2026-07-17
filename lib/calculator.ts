export const CALCULATOR_DEFAULTS = {
  missedCallsPerWeek: 5,
  jobValueKr: 8000,
} as const;

export const CALCULATOR_LIMITS = {
  missedCallsPerWeek: { min: 0, max: 20, step: 1 },
  jobValueKr: { min: 1000, max: 50000, step: 500 },
} as const;

// Konservativt antagande: bara vart tredje missat samtal hade blivit ett
// betalt jobb. Siffran visas alltid i klartext bredvid resultatet.
export const CONVERSION_FACTOR = 1 / 3;

const WEEKS_PER_MONTH = 52 / 12;

export function calculateMonthlyLostIncome(
  missedCallsPerWeek: number,
  jobValueKr: number,
): number {
  const missedCallsPerMonth = missedCallsPerWeek * WEEKS_PER_MONTH;
  const lostJobsPerMonth = missedCallsPerMonth * CONVERSION_FACTOR;
  return Math.round(lostJobsPerMonth * jobValueKr);
}
