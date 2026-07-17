import { describe, expect, it } from "vitest";
import { estimateMonthlyLoss, formatSek } from "@/lib/calculator";

describe("estimateMonthlyLoss", () => {
  it("returns 0 when there are no missed calls", () => {
    expect(estimateMonthlyLoss(0, 8000)).toBe(0);
  });

  it("scales with missed calls and job value", () => {
    const low = estimateMonthlyLoss(2, 8000);
    const high = estimateMonthlyLoss(10, 8000);
    expect(high).toBeGreaterThan(low);
  });

  it("applies the conservative 1/3 conversion assumption", () => {
    // 5 missed calls/week * 4.33 weeks * 1/3 * 8000 kr ≈ 57 733 kr
    expect(estimateMonthlyLoss(5, 8000)).toBe(57733);
  });
});

describe("formatSek", () => {
  it("formats whole kronor amounts in sv-SE style", () => {
    expect(formatSek(57733)).toContain("57");
    expect(formatSek(57733)).toContain("kr");
  });
});
