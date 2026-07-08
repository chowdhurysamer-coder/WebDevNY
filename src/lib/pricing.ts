/**
 * WebDev NY pricing model.
 *
 * One base package + stackable add-ons. Every item has a one-time fee
 * (adds to the flat build fee) and a monthly fee (adds to maintenance) —
 * the two never mix. Domain registration is billed to the client directly
 * and never appears in these numbers.
 */

export const BASE = {
  oneTime: 500,   // flat build fee
  monthly: 50,    // mandatory monthly maintenance
  pagesIncl: 4,   // pages included in the base package
  days: 7,        // typical days to launch for the base site
};

/** 4 included + up to 21 extra. */
export const MAX_PAGES = 25;

export const EXTRA_PAGE = { oneTime: 50, monthly: 5 };

export const ADDONS = [
  { id: "cms", label: "Blog / CMS", oneTime: 100, monthly: 10, days: 2 },
  { id: "booking", label: "Booking / scheduling", oneTime: 50, monthly: 15, days: 2 },
  { id: "seo", label: "Advanced SEO", oneTime: 75, monthly: 20, days: 2 },
  { id: "multilang", label: "Multi-lingual support", oneTime: 95, monthly: 10, days: 2 },
  { id: "gallery", label: "Photo / video gallery", oneTime: 50, monthly: 5, days: 1 },
] as const;

/** Pure quote calculation used by the estimator (and unit-tested). */
export function computeQuote(pages: number, selectedIds: string[]) {
  const clamped = Math.min(MAX_PAGES, Math.max(BASE.pagesIncl, Math.round(pages)));
  const extraPages = clamped - BASE.pagesIncl;
  let oneTime = BASE.oneTime + extraPages * EXTRA_PAGE.oneTime;
  let monthly = BASE.monthly + extraPages * EXTRA_PAGE.monthly;
  let days = BASE.days + Math.ceil(extraPages / 4);
  for (const a of ADDONS) {
    if (selectedIds.includes(a.id)) { oneTime += a.oneTime; monthly += a.monthly; days += a.days; }
  }
  return { oneTime, monthly, days, extraPages, pages: clamped };
}
