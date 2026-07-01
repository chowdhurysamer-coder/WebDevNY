import { describe, it, expect } from "vitest";
import { computeQuote, TIERS, PER_EXTRA_PAGE } from "@/lib/pricing";

describe("computeQuote", () => {
  it("returns the base price with no extras", () => {
    const q = computeQuote("Starter", 5, []);
    expect(q.total).toBe(TIERS.Starter.base);
    expect(q.days).toBe(TIERS.Starter.days);
    expect(q.extraPages).toBe(0);
  });

  it("charges per extra page beyond the included count", () => {
    const q = computeQuote("Growth", 15, []); // 12 included -> 3 extra
    expect(q.extraPages).toBe(3);
    expect(q.total).toBe(TIERS.Growth.base + 3 * PER_EXTRA_PAGE);
  });

  it("adds selected add-on prices and days", () => {
    const q = computeQuote("Elite", 30, ["ecom", "seo"]);
    expect(q.total).toBe(TIERS.Elite.base + 1800 + 600);
    expect(q.days).toBe(TIERS.Elite.days + 6 + 2);
  });

  it("never goes below the base for fewer pages than included", () => {
    const q = computeQuote("Growth", 1, []);
    expect(q.extraPages).toBe(0);
    expect(q.total).toBe(TIERS.Growth.base);
  });
});
