// Konservativt antagande: bara ett av tre missade samtal räknas som ett
// förlorat jobb (se content/copy.sv.ts, calculator.conversionNote).
const CONVERSION_RATE = 1 / 3;
const WEEKS_PER_MONTH = 4.33;

export function estimateMonthlyLoss(
  missedCallsPerWeek: number,
  averageJobValueSek: number,
): number {
  const lostJobsPerMonth =
    missedCallsPerWeek * WEEKS_PER_MONTH * CONVERSION_RATE;
  return Math.round(lostJobsPerMonth * averageJobValueSek);
}

const sekFormatter = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
  maximumFractionDigits: 0,
});

export function formatSek(amount: number): string {
  return sekFormatter.format(amount);
}
