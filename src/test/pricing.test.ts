import { describe, it, expect } from "vitest";
import { computeQuote, BASE, EXTRA_PAGE, MAX_PAGES } from "@/lib/pricing";

describe("computeQuote", () => {
  it("returns the base fees with no extras", () => {
    const q = computeQuote(4, []);
    expect(q.oneTime).toBe(BASE.oneTime);   // $500
    expect(q.monthly).toBe(BASE.monthly);   // $50
    expect(q.days).toBe(BASE.days);
    expect(q.extraPages).toBe(0);
  });

  it("charges each extra page on both fees", () => {
    const q = computeQuote(10, []); // 4 included -> 6 extra
    expect(q.extraPages).toBe(6);
    expect(q.oneTime).toBe(BASE.oneTime + 6 * EXTRA_PAGE.oneTime);   // 500 + 300
    expect(q.monthly).toBe(BASE.monthly + 6 * EXTRA_PAGE.monthly);   // 50 + 30
  });

  it("adds selected add-on one-time and monthly fees", () => {
    const q = computeQuote(4, ["cms", "seo"]);
    expect(q.oneTime).toBe(500 + 100 + 75);
    expect(q.monthly).toBe(50 + 10 + 20);
  });

  it("clamps pages to the 4..25 range", () => {
    expect(computeQuote(1, []).extraPages).toBe(0);
    const q = computeQuote(99, []);
    expect(q.pages).toBe(MAX_PAGES);
    expect(q.extraPages).toBe(MAX_PAGES - BASE.pagesIncl); // 21
    expect(q.oneTime).toBe(500 + 21 * 50); // $1,550 max page spend
  });
});
