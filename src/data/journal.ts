export interface Post {
  slug: string;
  titleKey: string;
  excerptKey: string;
  date: string;
  read: string;
  categoryKey: string;
  body: { hKey?: string; pKey: string }[];
}

export const posts: Post[] = [
  {
    slug: "why-flat-fee",
    titleKey: "post.flatfee.title",
    excerptKey: "post.flatfee.excerpt",
    date: "Jun 2026", read: "4 min", categoryKey: "link.pricing",
    body: [
      { pKey: "post.flatfee.p0" },
      { hKey: "post.flatfee.h1", pKey: "post.flatfee.p1" },
      { hKey: "post.flatfee.h2", pKey: "post.flatfee.p2" },
      { pKey: "post.flatfee.p3" },
    ],
  },
  {
    slug: "speed-is-a-feature",
    titleKey: "post.speed.title",
    excerptKey: "post.speed.excerpt",
    date: "May 2026", read: "5 min", categoryKey: "wd.o.performance",
    body: [
      { pKey: "post.speed.p0" },
      { hKey: "post.speed.h1", pKey: "post.speed.p1" },
      { hKey: "post.speed.h2", pKey: "post.speed.p2" },
      { pKey: "post.speed.p3" },
    ],
  },
  {
    slug: "local-seo-playbook",
    titleKey: "post.seo.title",
    excerptKey: "post.seo.excerpt",
    date: "Apr 2026", read: "6 min", categoryKey: "term.seo",
    body: [
      { pKey: "post.seo.p0" },
      { hKey: "post.seo.h1", pKey: "post.seo.p1" },
      { hKey: "post.seo.h2", pKey: "post.seo.p2" },
      { pKey: "post.seo.p3" },
    ],
  },
  {
    slug: "templates-vs-custom",
    titleKey: "post.templates.title",
    excerptKey: "post.templates.excerpt",
    date: "Mar 2026", read: "4 min", categoryKey: "term.design",
    body: [
      { pKey: "post.templates.p0" },
      { hKey: "post.templates.h1", pKey: "post.templates.p1" },
      { hKey: "post.templates.h2", pKey: "post.templates.p2" },
      { pKey: "post.templates.p3" },
    ],
  },
];

export const postBySlug = (slug?: string) => posts.find((p) => p.slug === slug);
