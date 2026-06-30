export type IndVariant = "restaurant" | "dental" | "gym" | "salon" | "legal" | "realestate";

export interface Industry {
  slug: string;
  variant: IndVariant;
  name: string;       // e.g. "Restaurants"
  eyebrow: string;    // ad-friendly kicker
  headline: [string, string]; // two-line, 2nd is accent
  sub: string;
  accent: string;
  pains: string[];
  features: { t: string; d: string }[];
  result: { value: string; label: string }[];
  quote: { text: string; who: string };
}

export const industries: Industry[] = [
  {
    slug: "restaurants", variant: "restaurant", name: "Restaurants", accent: "#D98A3D",
    eyebrow: "Websites for NYC restaurants",
    headline: ["Fill every table —", "online first."],
    sub: "A mouth-watering site with one-tap reservations, a menu that sells, and local SEO that puts you in front of hungry New Yorkers.",
    pains: ["Reservations stuck on the phone", "A blurry PDF menu nobody reads", "Invisible on \"food near me\" searches", "A site that looks nothing like the room"],
    features: [
      { t: "One-tap reservations", d: "Booking wired straight into your system — covers fill while the kitchen sleeps." },
      { t: "A menu that sells", d: "A scrollable, photo-led menu that makes people hungry before they arrive." },
      { t: "Found by locals", d: "Local SEO and Google Business so you own \"Italian near me\" in your blocks." },
    ],
    result: [{ value: "+40%", label: "online reservations" }, { value: "2m 48s", label: "avg. session" }, { value: "#2", label: "local pack rank" }],
    quote: { text: "We went from zero online reservations to nearly half our bookings through the site in month one.", who: "Maria S. — Trattoria Bella" },
  },
  {
    slug: "dentists", variant: "dental", name: "Dental Practices", accent: "#37b6c4",
    eyebrow: "Websites for NYC dental practices",
    headline: ["Win trust before", "the first hello."],
    sub: "A calm, credible site with online intake, easy booking, and the structured SEO that gets new patients to choose you over the office next door.",
    pains: ["Front desk buried in paperwork", "New patients can't tell you apart", "Same five questions on every call", "No online booking"],
    features: [
      { t: "Online patient intake", d: "Secure forms patients complete before they arrive — hours back for your front desk." },
      { t: "Trust at first glance", d: "Real results, clear pricing, and a calm interface that reassures nervous patients." },
      { t: "Found in search", d: "Schema and local SEO surface your hours, insurance, and services directly in Google." },
    ],
    result: [{ value: "6 hrs", label: "saved per week" }, { value: "+58%", label: "form completion" }, { value: "99", label: "mobile score" }],
    quote: { text: "Clean, trustworthy, fast — exactly what a dental practice needs. We save hours every week.", who: "Dr. James K. — BrightSmile" },
  },
  {
    slug: "gyms", variant: "gym", name: "Gyms & Studios", accent: "#5bbf55",
    eyebrow: "Websites for NYC gyms & studios",
    headline: ["Close memberships", "while you sleep."],
    sub: "A high-energy site with class booking, self-serve memberships, and a hero that sells the room — so curiosity turns into members 24/7.",
    pains: ["Sign-ups via DMs and walk-ins", "Class schedule on a whiteboard", "Site doesn't sell the energy", "No self-serve checkout"],
    features: [
      { t: "Self-serve memberships", d: "Tiered plans with checkout built in — people join without anyone behind a desk." },
      { t: "Class booking", d: "A clean schedule and booking flow that finally gets you off the whiteboard." },
      { t: "Sell the room", d: "Full-bleed video of real members training — no stock, no models, all energy." },
    ],
    result: [{ value: "2×", label: "sign-ups in 60 days" }, { value: "6.1%", label: "visitor → member" }, { value: "1.3s", label: "load time" }],
    quote: { text: "Our site finally looks as good as our gym. Sign-ups doubled in 60 days.", who: "Tony R. — IronWorks" },
  },
  {
    slug: "salons", variant: "salon", name: "Salons & Spas", accent: "#e07ab0",
    eyebrow: "Websites for NYC salons & spas",
    headline: ["Book the chair", "solid."],
    sub: "An editorial, gallery-first site that frames your work like the art it is — and makes booking a specific stylist effortless.",
    pains: ["Clunky booking widget", "Portfolio buried or missing", "Hard to book a specific stylist", "Brand looks dated online"],
    features: [
      { t: "Gallery-first design", d: "Each stylist's work shown like a magazine spread — the work does the selling." },
      { t: "Effortless booking", d: "Stylist → service → time, with no dead ends and no frustration." },
      { t: "A refined brand", d: "A visual system you'll proudly use across print, social, and the salon itself." },
    ],
    result: [{ value: "3 wks", label: "booked ahead" }, { value: "+44%", label: "visitor → booking" }, { value: "61%", label: "rebook online" }],
    quote: { text: "It feels like a magazine, not a booking form. Clients book the stylist they want.", who: "Élise M. — Maison" },
  },
  {
    slug: "lawyers", variant: "legal", name: "Law Firms", accent: "#9d86e0",
    eyebrow: "Websites for NYC law firms",
    headline: ["Authority that", "converts."],
    sub: "A credible, results-led site that signals serious expertise and turns a search into a booked consultation.",
    pains: ["Brochure site from 2009", "Losing leads to flashier firms", "No clear path to consult", "Invisible for key practice areas"],
    features: [
      { t: "Built for credibility", d: "Practice areas, real case results, and attorney authority, front and center." },
      { t: "Low-friction consults", d: "A clear, safe path to book a consultation with expectations set at every step." },
      { t: "Rank where it matters", d: "A content engine that ranks for the specific matters you actually win." },
    ],
    result: [{ value: "+31%", label: "qualified consults" }, { value: "100", label: "mobile score" }, { value: "Top 3", label: "core terms" }],
    quote: { text: "It finally reflects the calibre of our work. Better-qualified inquiries than ever.", who: "R. Bennett — Park Ave Legal" },
  },
  {
    slug: "real-estate", variant: "realestate", name: "Real Estate", accent: "#e0b84a",
    eyebrow: "Websites for NYC real estate",
    headline: ["Listings that", "capture leads."],
    sub: "A fast, map-driven site with IDX listings, neighborhood guides, and lead capture wired straight into your CRM.",
    pains: ["Clunky portal leaks leads", "Listings slow and ugly", "No local expertise on show", "Leads lost before agents see them"],
    features: [
      { t: "Map-driven search", d: "Fast IDX listings with saved searches and clean, shareable detail pages." },
      { t: "Own the neighborhood", d: "Area guides that position your agents as the obvious local experts." },
      { t: "Instant lead routing", d: "Capture wired into your CRM — leads hit the right agent in seconds." },
    ],
    result: [{ value: "7.2%", label: "lead conversion" }, { value: "+118%", label: "listing views" }, { value: "<10s", label: "speed to lead" }],
    quote: { text: "The site does the first showing for us. Leads arrive warm and organized.", who: "Dana W. — Hudson Realty" },
  },
];

export const industryBySlug = (slug?: string) => industries.find((i) => i.slug === slug);
