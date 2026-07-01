export type Tier = "Starter" | "Growth" | "Elite";

export const TIERS: Record<Tier, { base: number; pagesIncl: number; days: number }> = {
  Starter: { base: 1490, pagesIncl: 5, days: 7 },
  Growth: { base: 3490, pagesIncl: 12, days: 12 },
  Elite: { base: 6990, pagesIncl: 30, days: 24 },
};

export const ADDONS = [
  { id: "ecom", label: "E-commerce / store", price: 1800, days: 6 },
  { id: "booking", label: "Booking / scheduling", price: 900, days: 3 },
  { id: "cms", label: "Blog / CMS", price: 700, days: 2 },
  { id: "seo", label: "Advanced SEO package", price: 600, days: 2 },
  { id: "brand", label: "Brand & logo design", price: 1500, days: 5 },
  { id: "copy", label: "Copywriting", price: 800, days: 3 },
] as const;

export const PER_EXTRA_PAGE = 220;

/** Pure quote calculation used by the estimator (and unit-tested). */
export function computeQuote(tier: Tier, pages: number, selectedIds: string[]) {
  const t = TIERS[tier];
  const extraPages = Math.max(0, pages - t.pagesIncl);
  let total = t.base + extraPages * PER_EXTRA_PAGE;
  let days = t.days + Math.ceil(extraPages / 3);
  for (const a of ADDONS) if (selectedIds.includes(a.id)) { total += a.price; days += a.days; }
  return { total, days, extraPages };
}
