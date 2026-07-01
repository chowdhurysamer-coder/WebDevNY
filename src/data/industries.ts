export type IndVariant = "restaurant" | "dental" | "gym" | "salon" | "legal" | "realestate";

export interface Industry {
  slug: string;
  variant: IndVariant;
  nameKey: string;       // translation key for the industry name
  eyebrowKey: string;
  headlineKey: [string, string];
  subKey: string;
  accent: string;
  painKeys: string[];
  features: { tKey: string; dKey: string }[];
  result: { value: string; labelKey: string }[];
  quote: { textKey: string; who: string };
}

export const industries: Industry[] = [
  {
    slug: "restaurants", variant: "restaurant", nameKey: "term.restaurants", accent: "#D98A3D",
    eyebrowKey: "ind.restaurants.eyebrow",
    headlineKey: ["ind.restaurants.hl0", "ind.restaurants.hl1"],
    subKey: "ind.restaurants.sub",
    painKeys: ["ind.restaurants.pain0", "ind.restaurants.pain1", "ind.restaurants.pain2", "ind.restaurants.pain3"],
    features: [
      { tKey: "ind.restaurants.f0t", dKey: "ind.restaurants.f0d" },
      { tKey: "ind.restaurants.f1t", dKey: "ind.restaurants.f1d" },
      { tKey: "ind.restaurants.f2t", dKey: "ind.restaurants.f2d" },
    ],
    result: [{ value: "+40%", labelKey: "ind.restaurants.r0" }, { value: "2m 48s", labelKey: "ind.restaurants.r1" }, { value: "#2", labelKey: "ind.restaurants.r2" }],
    quote: { textKey: "ind.restaurants.q", who: "Maria S., Trattoria Bella" },
  },
  {
    slug: "dentists", variant: "dental", nameKey: "term.dentalPractices", accent: "#37b6c4",
    eyebrowKey: "ind.dentists.eyebrow",
    headlineKey: ["ind.dentists.hl0", "ind.dentists.hl1"],
    subKey: "ind.dentists.sub",
    painKeys: ["ind.dentists.pain0", "ind.dentists.pain1", "ind.dentists.pain2", "ind.dentists.pain3"],
    features: [
      { tKey: "ind.dentists.f0t", dKey: "ind.dentists.f0d" },
      { tKey: "ind.dentists.f1t", dKey: "ind.dentists.f1d" },
      { tKey: "ind.dentists.f2t", dKey: "ind.dentists.f2d" },
    ],
    result: [{ value: "6 hrs", labelKey: "ind.dentists.r0" }, { value: "+58%", labelKey: "ind.dentists.r1" }, { value: "99", labelKey: "ind.dentists.r2" }],
    quote: { textKey: "ind.dentists.q", who: "Dr. James K., BrightSmile" },
  },
  {
    slug: "gyms", variant: "gym", nameKey: "term.gymsStudios", accent: "#5bbf55",
    eyebrowKey: "ind.gyms.eyebrow",
    headlineKey: ["ind.gyms.hl0", "ind.gyms.hl1"],
    subKey: "ind.gyms.sub",
    painKeys: ["ind.gyms.pain0", "ind.gyms.pain1", "ind.gyms.pain2", "ind.gyms.pain3"],
    features: [
      { tKey: "ind.gyms.f0t", dKey: "ind.gyms.f0d" },
      { tKey: "ind.gyms.f1t", dKey: "ind.gyms.f1d" },
      { tKey: "ind.gyms.f2t", dKey: "ind.gyms.f2d" },
    ],
    result: [{ value: "2×", labelKey: "ind.gyms.r0" }, { value: "6.1%", labelKey: "ind.gyms.r1" }, { value: "1.3s", labelKey: "ind.gyms.r2" }],
    quote: { textKey: "ind.gyms.q", who: "Tony R., IronWorks" },
  },
  {
    slug: "salons", variant: "salon", nameKey: "term.salonsSpas", accent: "#e07ab0",
    eyebrowKey: "ind.salons.eyebrow",
    headlineKey: ["ind.salons.hl0", "ind.salons.hl1"],
    subKey: "ind.salons.sub",
    painKeys: ["ind.salons.pain0", "ind.salons.pain1", "ind.salons.pain2", "ind.salons.pain3"],
    features: [
      { tKey: "ind.salons.f0t", dKey: "ind.salons.f0d" },
      { tKey: "ind.salons.f1t", dKey: "ind.salons.f1d" },
      { tKey: "ind.salons.f2t", dKey: "ind.salons.f2d" },
    ],
    result: [{ value: "3 wks", labelKey: "ind.salons.r0" }, { value: "+44%", labelKey: "ind.salons.r1" }, { value: "61%", labelKey: "ind.salons.r2" }],
    quote: { textKey: "ind.salons.q", who: "Élise M., Maison" },
  },
  {
    slug: "lawyers", variant: "legal", nameKey: "term.lawFirms", accent: "#9d86e0",
    eyebrowKey: "ind.lawyers.eyebrow",
    headlineKey: ["ind.lawyers.hl0", "ind.lawyers.hl1"],
    subKey: "ind.lawyers.sub",
    painKeys: ["ind.lawyers.pain0", "ind.lawyers.pain1", "ind.lawyers.pain2", "ind.lawyers.pain3"],
    features: [
      { tKey: "ind.lawyers.f0t", dKey: "ind.lawyers.f0d" },
      { tKey: "ind.lawyers.f1t", dKey: "ind.lawyers.f1d" },
      { tKey: "ind.lawyers.f2t", dKey: "ind.lawyers.f2d" },
    ],
    result: [{ value: "+31%", labelKey: "ind.lawyers.r0" }, { value: "100", labelKey: "ind.lawyers.r1" }, { value: "Top 3", labelKey: "ind.lawyers.r2" }],
    quote: { textKey: "ind.lawyers.q", who: "R. Bennett, Park Ave Legal" },
  },
  {
    slug: "real-estate", variant: "realestate", nameKey: "term.realestate", accent: "#e0b84a",
    eyebrowKey: "ind.realestate.eyebrow",
    headlineKey: ["ind.realestate.hl0", "ind.realestate.hl1"],
    subKey: "ind.realestate.sub",
    painKeys: ["ind.realestate.pain0", "ind.realestate.pain1", "ind.realestate.pain2", "ind.realestate.pain3"],
    features: [
      { tKey: "ind.realestate.f0t", dKey: "ind.realestate.f0d" },
      { tKey: "ind.realestate.f1t", dKey: "ind.realestate.f1d" },
      { tKey: "ind.realestate.f2t", dKey: "ind.realestate.f2d" },
    ],
    result: [{ value: "7.2%", labelKey: "ind.realestate.r0" }, { value: "+118%", labelKey: "ind.realestate.r1" }, { value: "<10s", labelKey: "ind.realestate.r2" }],
    quote: { textKey: "ind.realestate.q", who: "Dana W., Hudson Realty" },
  },
];

export const industryBySlug = (slug?: string) => industries.find((i) => i.slug === slug);
