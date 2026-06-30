export type CaseVariant = "restaurant" | "dental" | "gym" | "salon" | "legal" | "realestate";

export interface CaseStudy {
  slug: string;
  variant: CaseVariant;
  name: string;
  category: string;
  year: string;
  tagline: string;
  intro: string;
  services: string[];
  stack: string[];
  challenge: string;
  approach: string[];
  outcome: string;
  metrics: { label: string; value: string; sub: string }[];
  quote: { text: string; who: string };
  accent: string;
}

export const cases: CaseStudy[] = [
  {
    slug: "trattoria-bella", variant: "restaurant", name: "Trattoria Bella", category: "Restaurant", year: "2025", accent: "#D98A3D",
    tagline: "A neighborhood trattoria that fills every table — online first.",
    intro: "A family-run Italian spot in the West Village with incredible food and a website stuck in 2014. Reservations happened by phone, the menu was a blurry PDF, and Google barely knew they existed.",
    services: ["Web Design", "Development", "Local SEO", "Reservations"],
    stack: ["React", "Headless CMS", "OpenTable API", "GA4"],
    challenge: "Turn a beautiful-in-person experience into a website that earns reservations while the kitchen sleeps — and finally show up when locals search \"Italian near me.\"",
    approach: [
      "Photographed the room and the plates, then built a menu-led scroll that makes you hungry by the second section.",
      "Wired one-tap reservations straight into their booking system — no phone tag, no missed covers.",
      "Rebuilt the technical SEO foundation and Google Business Profile around the neighborhoods they serve.",
    ],
    outcome: "Within the first month, 40% of all reservations came through the website. Walk-ins quoting the site became a nightly occurrence.",
    metrics: [
      { label: "Online reservations", value: "+40%", sub: "share of bookings, month one" },
      { label: "Avg. session", value: "2m 48s", sub: "up from 41 seconds" },
      { label: "Local pack", value: "#2", sub: "for core search terms" },
    ],
    quote: { text: "We went from zero online reservations to nearly half of our bookings through the site in the first month. It finally looks like our food tastes.", who: "Maria S. — Owner" },
  },
  {
    slug: "brightsmile-dental", variant: "dental", name: "BrightSmile Dental", category: "Dental Practice", year: "2025", accent: "#37b6c4",
    tagline: "A modern practice that earns trust before the first hello.",
    intro: "A growing dental practice in Midtown drowning in paperwork and fielding the same five questions on every call. New patients couldn't tell them apart from the office next door.",
    services: ["Web Design", "Development", "Patient Intake", "SEO"],
    stack: ["React", "Secure Forms", "Calendar Sync", "Schema"],
    challenge: "Build instant credibility for nervous new patients and pull the endless intake paperwork off the front desk's plate.",
    approach: [
      "Designed a calm, clinical-but-warm interface with real before/after results and clear pricing.",
      "Moved patient intake fully online with secure, HIPAA-minded forms that sync to their calendar.",
      "Added structured data so insurance, hours, and services surface directly in search.",
    ],
    outcome: "The front desk reclaimed roughly six hours a week, and new-patient form completion jumped now that it happens before the visit.",
    metrics: [
      { label: "Staff time saved", value: "6 hrs", sub: "per week on paperwork" },
      { label: "Form completion", value: "+58%", sub: "online vs. in-office" },
      { label: "Mobile score", value: "99", sub: "Lighthouse performance" },
    ],
    quote: { text: "Clean, trustworthy, fast — exactly what a dental practice needs. Patient forms are fully online now and we save hours every week.", who: "Dr. James K. — Principal Dentist" },
  },
  {
    slug: "ironworks-gym", variant: "gym", name: "IronWorks Gym", category: "Fitness", year: "2024", accent: "#7ee06b",
    tagline: "A gym that closes memberships while the doors are locked.",
    intro: "A serious strength gym in Brooklyn with a loyal crowd but a website that didn't sell the room. Sign-ups meant a DM or a walk-in, and class schedules lived on a whiteboard.",
    services: ["Web Design", "Development", "Memberships", "Booking"],
    stack: ["React", "Stripe", "Class Booking", "Video"],
    challenge: "Capture the intensity of the gym online and turn curiosity into memberships without anyone behind a desk.",
    approach: [
      "Led with full-bleed video of real members training — no stock, no models.",
      "Built tiered memberships with Stripe checkout and a self-serve class booking flow.",
      "Created a trainer roster and results wall that does the convincing for them.",
    ],
    outcome: "Membership sign-ups through the site doubled within 60 days, and class booking moved entirely off the whiteboard.",
    metrics: [
      { label: "Sign-ups", value: "2×", sub: "via site, in 60 days" },
      { label: "Conversion", value: "6.1%", sub: "visitor → member" },
      { label: "Load time", value: "1.3s", sub: "video hero included" },
    ],
    quote: { text: "Our site finally looks as good as our gym. Sign-ups doubled in 60 days. Worth every single penny.", who: "Tony R. — Founder" },
  },
  {
    slug: "maison-salon", variant: "salon", name: "Maison Salon", category: "Beauty & Wellness", year: "2025", accent: "#e07ab0",
    tagline: "An editorial salon experience that books itself solid.",
    intro: "A high-end salon in SoHo with serious talent and an outdated booking widget that buried their portfolio and frustrated clients.",
    services: ["Web Design", "Branding", "Booking", "Photography Art-Direction"],
    stack: ["React", "Booking API", "Headless CMS", "Image CDN"],
    challenge: "Frame the work like the editorial it is, and make booking a specific stylist effortless.",
    approach: [
      "Built a gallery-first layout that treats each stylist's work like a magazine spread.",
      "Streamlined booking down to stylist → service → time, with no dead ends.",
      "Established a refined visual system the salon now uses across print and social.",
    ],
    outcome: "The calendar now runs roughly three weeks out, and stylists point new clients straight to their portfolios.",
    metrics: [
      { label: "Booked ahead", value: "3 wks", sub: "average lead time" },
      { label: "Conversion", value: "+44%", sub: "visitor → booking" },
      { label: "Returning", value: "61%", sub: "rebook online" },
    ],
    quote: { text: "It feels like a magazine, not a booking form. Clients notice — and they book the stylist they want.", who: "Élise M. — Creative Director" },
  },
  {
    slug: "park-ave-legal", variant: "legal", name: "Park Ave Legal", category: "Law Firm", year: "2024", accent: "#9d86e0",
    tagline: "Authority that converts a search into a consultation.",
    intro: "A boutique litigation firm with an impressive track record and a website that read like a 2009 brochure. Qualified leads were slipping to flashier competitors.",
    services: ["Web Design", "Development", "Content Strategy", "SEO"],
    stack: ["React", "CMS", "Lead Routing", "Analytics"],
    challenge: "Signal serious credibility and make starting a consultation feel safe and obvious.",
    approach: [
      "Structured the site around practice areas, real case results, and attorney authority.",
      "Designed a low-friction consultation flow with clear expectations at every step.",
      "Built a content engine to rank for the specific matters they win.",
    ],
    outcome: "Qualified consultation requests climbed 31% as the firm started outranking larger competitors on key terms.",
    metrics: [
      { label: "Consultations", value: "+31%", sub: "qualified requests" },
      { label: "Mobile score", value: "100", sub: "Lighthouse" },
      { label: "Avg. position", value: "Top 3", sub: "core practice terms" },
    ],
    quote: { text: "It finally reflects the calibre of our work. We're getting better-qualified inquiries than ever.", who: "R. Bennett — Managing Partner" },
  },
  {
    slug: "hudson-realty", variant: "realestate", name: "Hudson Realty Group", category: "Real Estate", year: "2025", accent: "#e0b84a",
    tagline: "Listings that capture leads instead of losing them.",
    intro: "A growing brokerage with great inventory and a clunky portal that leaked leads and buried neighborhood expertise.",
    services: ["Web Design", "Development", "IDX / Listings", "Lead Capture"],
    stack: ["React", "IDX Feed", "Map UI", "CRM Sync"],
    challenge: "Make browsing listings a pleasure and turn interest into agent-ready leads.",
    approach: [
      "Built fast, map-driven listing search with saved searches and clean detail pages.",
      "Added neighborhood guides that position their agents as the local experts.",
      "Wired lead capture straight into their CRM with instant agent routing.",
    ],
    outcome: "The site now converts at 7.2% — well above brokerage benchmarks — with leads landing in front of agents in seconds.",
    metrics: [
      { label: "Lead conversion", value: "7.2%", sub: "above benchmark" },
      { label: "Listing views", value: "+118%", sub: "per session" },
      { label: "Speed to lead", value: "<10s", sub: "to agent inbox" },
    ],
    quote: { text: "The site does the first showing for us. Leads arrive warm and organized — our agents love it.", who: "Dana W. — Broker / Owner" },
  },
];

export const caseBySlug = (slug?: string) => cases.find((c) => c.slug === slug);
