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

// `heavy` add-ons each add 2 business days on their own; the rest are counted
// together (every 2 of them adds 1 day). See computeQuote for the timeline math.
export const ADDONS = [
  { id: "cms", label: "Blog / CMS", oneTime: 100, monthly: 10, heavy: false },
  { id: "booking", label: "Booking / scheduling", oneTime: 50, monthly: 15, heavy: false },
  { id: "seo", label: "Advanced SEO", oneTime: 75, monthly: 20, heavy: true },
  { id: "multilang", label: "Multilingual translation", oneTime: 95, monthly: 10, heavy: true },
  { id: "gallery", label: "Photo / video gallery", oneTime: 50, monthly: 5, heavy: false },
] as const;

// Base build takes 1–2 business days.
const BASE_DAYS_LOW = 1;
const BASE_DAYS_HIGH = 2;

/** Pure quote calculation used by the estimator (and unit-tested). */
export function computeQuote(pages: number, selectedIds: string[]) {
  const clamped = Math.min(MAX_PAGES, Math.max(BASE.pagesIncl, Math.round(pages)));
  const extraPages = clamped - BASE.pagesIncl;

  let oneTime = BASE.oneTime + extraPages * EXTRA_PAGE.oneTime;
  let monthly = BASE.monthly + extraPages * EXTRA_PAGE.monthly;

  const selected = ADDONS.filter((a) => selectedIds.includes(a.id));
  for (const a of selected) { oneTime += a.oneTime; monthly += a.monthly; }

  // Timeline (business days):
  //  · every 5 extra pages adds a day
  //  · each "heavy" add-on (Advanced SEO, Multilingual) adds 2 days
  //  · the remaining add-ons add 1 day per 2 selected
  const pageDays = Math.ceil(extraPages / 5);
  const heavyDays = selected.filter((a) => a.heavy).length * 2;
  const lightDays = Math.ceil(selected.filter((a) => !a.heavy).length / 2);
  const extraDays = pageDays + heavyDays + lightDays;

  return {
    oneTime, monthly, extraPages, pages: clamped,
    daysLow: BASE_DAYS_LOW + extraDays,
    daysHigh: BASE_DAYS_HIGH + extraDays,
  };
}
