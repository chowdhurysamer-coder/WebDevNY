export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  category: string;
  body: { h?: string; p: string }[];
}

export const posts: Post[] = [
  {
    slug: "why-flat-fee",
    title: "Why we charge a flat fee (and why it's better for you)",
    excerpt: "Hourly billing rewards slowness. Here's how a fixed price keeps us honest and keeps your budget sane.",
    date: "Jun 2026", read: "4 min", category: "Pricing",
    body: [
      { p: "Most agencies bill by the hour. It sounds fair until you realize the incentive it creates: the longer a project drags, the more they make. You end up paying for indecision, scope creep, and meetings that should have been emails." },
      { h: "A number you can plan around", p: "We quote one price for one defined project. You know the cost before we write a line of code, and that number doesn't move unless you change the scope. Your finance person stops dreading our invoices." },
      { h: "It makes us fast", p: "Because we're not paid by the hour, our incentive flips: deliver excellent work efficiently and move on. That's why our average build ships in eleven days instead of eleven weeks." },
      { p: "Flat fee isn't a discount gimmick. It's an alignment tool — our success is tied to shipping something great, not to running up the clock." },
    ],
  },
  {
    slug: "speed-is-a-feature",
    title: "Speed is a feature your competitors are ignoring",
    excerpt: "A one-second delay can cut conversions by 7%. Why we treat performance as a sales tool, not a checkbox.",
    date: "May 2026", read: "5 min", category: "Performance",
    body: [
      { p: "Everyone says they care about speed. Then they ship a homepage that loads six megabytes of stock video and three chat widgets. Visitors leave before the hero finishes fading in." },
      { h: "The numbers are brutal", p: "Google's own research found that as page load goes from one to three seconds, the probability of a bounce jumps 32%. At five seconds it's 90%. Every slow second is money walking out the door." },
      { h: "How we keep it fast", p: "Hand-written code instead of bloated builders. Images sized and served correctly. No tracker pile-up. We target sub-two-second loads and 95+ Lighthouse scores on every build — and we hold ourselves to it before launch." },
      { p: "Speed isn't a technical nicety. It's the cheapest conversion-rate optimization you'll ever buy." },
    ],
  },
  {
    slug: "local-seo-playbook",
    title: "The local SEO playbook for New York businesses",
    excerpt: "Ranking in your borough isn't luck. Here's the foundation we lay on every site so neighbors actually find you.",
    date: "Apr 2026", read: "6 min", category: "SEO",
    body: [
      { p: "If you run a business in New York, you're not competing with the whole internet — you're competing for the few blocks around you. Local SEO is how you win that fight." },
      { h: "Start with the boring stuff", p: "Consistent name, address, and phone across the web. A fully filled-out Google Business Profile. Structured data that tells search engines your hours, services, and location. It's unglamorous and it works." },
      { h: "Earn the neighborhood", p: "Pages built around the areas you actually serve, real reviews surfaced on-site, and content that answers what locals search. Google rewards businesses that are obviously, specifically local." },
      { p: "Done right, this is the difference between being a needle in a haystack and being the first result when someone three blocks away searches for what you do." },
    ],
  },
  {
    slug: "templates-vs-custom",
    title: "Templates make every business look the same",
    excerpt: "Why a $29 theme quietly costs you more than a custom build — in trust, in conversions, in standing out.",
    date: "Mar 2026", read: "4 min", category: "Design",
    body: [
      { p: "A template feels like a bargain. Then you notice three competitors using the identical layout, the same hero image, the same rounded-corner cards. Your business looks interchangeable — and interchangeable businesses compete on price alone." },
      { h: "Design is a trust signal", p: "Before anyone reads a word, your site tells them whether you're serious. A bespoke design says you invest in quality. A recycled theme says you cut corners — and customers wonder where else you cut them." },
      { h: "Custom doesn't mean slow or expensive", p: "We start from your brand and your goals, not a marketplace preview. It takes us days, not months, and the result is a site that looks like you and nobody else." },
      { p: "You wouldn't open a restaurant with the same menu as the place next door. Don't launch a website that way either." },
    ],
  },
];

export const postBySlug = (slug?: string) => posts.find((p) => p.slug === slug);
