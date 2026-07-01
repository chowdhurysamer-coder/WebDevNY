export type CaseVariant = "restaurant" | "dental" | "gym" | "salon" | "legal" | "realestate";

export interface CaseStudy {
  slug: string;
  variant: CaseVariant;
  name: string;            // brand name, not translated
  categoryKey: string;
  year: string;
  taglineKey: string;
  introKey: string;
  serviceKeys: string[];
  stack: string[];         // tech names, not translated
  challengeKey: string;
  approachKeys: string[];
  outcomeKey: string;
  metrics: { labelKey: string; value: string; subKey: string }[];
  quote: { textKey: string; who: string };
  accent: string;
}

export const cases: CaseStudy[] = [
  {
    slug: "trattoria-bella", variant: "restaurant", name: "Trattoria Bella", categoryKey: "pf.cat.restaurant", year: "2025", accent: "#D98A3D",
    taglineKey: "case.trattoria.tagline", introKey: "case.trattoria.intro",
    serviceKeys: ["cs.svc.webdesign", "term.development", "cs.svc.localseo", "cs.svc.reservations"],
    stack: ["React", "Headless CMS", "OpenTable API", "GA4"],
    challengeKey: "case.trattoria.challenge",
    approachKeys: ["case.trattoria.a0", "case.trattoria.a1", "case.trattoria.a2"],
    outcomeKey: "case.trattoria.outcome",
    metrics: [
      { labelKey: "case.trattoria.m0l", value: "+40%", subKey: "case.trattoria.m0s" },
      { labelKey: "case.trattoria.m1l", value: "2m 48s", subKey: "case.trattoria.m1s" },
      { labelKey: "case.trattoria.m2l", value: "#2", subKey: "case.trattoria.m2s" },
    ],
    quote: { textKey: "case.trattoria.q", who: "Maria S., Owner" },
  },
  {
    slug: "brightsmile-dental", variant: "dental", name: "BrightSmile Dental", categoryKey: "term.dentalPractices", year: "2025", accent: "#37b6c4",
    taglineKey: "case.brightsmile.tagline", introKey: "case.brightsmile.intro",
    serviceKeys: ["cs.svc.webdesign", "term.development", "cs.svc.intake", "term.seo"],
    stack: ["React", "Secure Forms", "Calendar Sync", "Schema"],
    challengeKey: "case.brightsmile.challenge",
    approachKeys: ["case.brightsmile.a0", "case.brightsmile.a1", "case.brightsmile.a2"],
    outcomeKey: "case.brightsmile.outcome",
    metrics: [
      { labelKey: "case.brightsmile.m0l", value: "6 hrs", subKey: "case.brightsmile.m0s" },
      { labelKey: "case.brightsmile.m1l", value: "+58%", subKey: "case.brightsmile.m1s" },
      { labelKey: "case.brightsmile.m2l", value: "99", subKey: "case.brightsmile.m2s" },
    ],
    quote: { textKey: "case.brightsmile.q", who: "Dr. James K., Principal Dentist" },
  },
  {
    slug: "ironworks-gym", variant: "gym", name: "IronWorks Gym", categoryKey: "pf.cat.fitness", year: "2024", accent: "#7ee06b",
    taglineKey: "case.ironworks.tagline", introKey: "case.ironworks.intro",
    serviceKeys: ["cs.svc.webdesign", "term.development", "cs.svc.memberships", "cs.svc.booking"],
    stack: ["React", "Stripe", "Class Booking", "Video"],
    challengeKey: "case.ironworks.challenge",
    approachKeys: ["case.ironworks.a0", "case.ironworks.a1", "case.ironworks.a2"],
    outcomeKey: "case.ironworks.outcome",
    metrics: [
      { labelKey: "case.ironworks.m0l", value: "2×", subKey: "case.ironworks.m0s" },
      { labelKey: "case.ironworks.m1l", value: "6.1%", subKey: "case.ironworks.m1s" },
      { labelKey: "case.ironworks.m2l", value: "1.3s", subKey: "case.ironworks.m2s" },
    ],
    quote: { textKey: "case.ironworks.q", who: "Tony R., Founder" },
  },
  {
    slug: "maison-salon", variant: "salon", name: "Maison Salon", categoryKey: "pf.cat.beauty", year: "2025", accent: "#e07ab0",
    taglineKey: "case.maison.tagline", introKey: "case.maison.intro",
    serviceKeys: ["cs.svc.webdesign", "term.branding", "cs.svc.booking", "cs.svc.photoart"],
    stack: ["React", "Booking API", "Headless CMS", "Image CDN"],
    challengeKey: "case.maison.challenge",
    approachKeys: ["case.maison.a0", "case.maison.a1", "case.maison.a2"],
    outcomeKey: "case.maison.outcome",
    metrics: [
      { labelKey: "case.maison.m0l", value: "3 wks", subKey: "case.maison.m0s" },
      { labelKey: "case.maison.m1l", value: "+44%", subKey: "case.maison.m1s" },
      { labelKey: "case.maison.m2l", value: "61%", subKey: "case.maison.m2s" },
    ],
    quote: { textKey: "case.maison.q", who: "Élise M., Creative Director" },
  },
  {
    slug: "park-ave-legal", variant: "legal", name: "Park Ave Legal", categoryKey: "term.lawFirms", year: "2024", accent: "#9d86e0",
    taglineKey: "case.parkave.tagline", introKey: "case.parkave.intro",
    serviceKeys: ["cs.svc.webdesign", "term.development", "cs.svc.content", "term.seo"],
    stack: ["React", "CMS", "Lead Routing", "Analytics"],
    challengeKey: "case.parkave.challenge",
    approachKeys: ["case.parkave.a0", "case.parkave.a1", "case.parkave.a2"],
    outcomeKey: "case.parkave.outcome",
    metrics: [
      { labelKey: "case.parkave.m0l", value: "+31%", subKey: "case.parkave.m0s" },
      { labelKey: "case.parkave.m1l", value: "100", subKey: "case.parkave.m1s" },
      { labelKey: "case.parkave.m2l", value: "Top 3", subKey: "case.parkave.m2s" },
    ],
    quote: { textKey: "case.parkave.q", who: "R. Bennett, Managing Partner" },
  },
  {
    slug: "hudson-realty", variant: "realestate", name: "Hudson Realty Group", categoryKey: "pf.cat.realestate", year: "2025", accent: "#e0b84a",
    taglineKey: "case.hudson.tagline", introKey: "case.hudson.intro",
    serviceKeys: ["cs.svc.webdesign", "term.development", "cs.svc.idx", "cs.svc.leadcapture"],
    stack: ["React", "IDX Feed", "Map UI", "CRM Sync"],
    challengeKey: "case.hudson.challenge",
    approachKeys: ["case.hudson.a0", "case.hudson.a1", "case.hudson.a2"],
    outcomeKey: "case.hudson.outcome",
    metrics: [
      { labelKey: "case.hudson.m0l", value: "7.2%", subKey: "case.hudson.m0s" },
      { labelKey: "case.hudson.m1l", value: "+118%", subKey: "case.hudson.m1s" },
      { labelKey: "case.hudson.m2l", value: "<10s", subKey: "case.hudson.m2s" },
    ],
    quote: { textKey: "case.hudson.q", who: "Dana W., Broker / Owner" },
  },
];

export const caseBySlug = (slug?: string) => cases.find((c) => c.slug === slug);
