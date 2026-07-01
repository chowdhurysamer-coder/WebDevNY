import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { caseBySlug } from "@/data/cases";
import { postBySlug } from "@/data/journal";
import { industryBySlug } from "@/data/industries";
import { dict } from "@/lib/translations";

const en = (key: string) => dict[key]?.en ?? key;

const BASE = "WebDev NY";
const SITE = "https://chowdhurysamer-coder.github.io/WebDevNY";
const DEFAULT_OG = `${SITE}/og.png`;

const staticMeta: Record<string, { t: string; d: string }> = {
  "/": { t: "WebDev NY, Websites New York actually clicks with.", d: "Custom web design & development for New York businesses. Fast, distinctive, conversion-focused, one flat fee, live in about two weeks." },
  "/about": { t: `About, ${BASE}`, d: "A small New York web studio that ships big. Design, code, and strategy under one roof, no templates, no offshore assembly line." },
  "/explore": { t: `Explore, ${BASE}`, d: "Everything on the site in one place, pages, case studies, industries, and writing." },
  "/terms": { t: `Terms of Service, ${BASE}`, d: "The terms governing use of the WebDev NY website." },
  "/web-design": { t: `Web Design & Development, ${BASE}`, d: "Hand-coded, brand-led websites engineered for speed, SEO, and conversions. No templates, no page builders." },
  "/capabilities": { t: `Capabilities, ${BASE}`, d: "Full-stack delivery, conversion architecture, SEO, rapid turnaround, flat-fee pricing, and ongoing partnership." },
  "/portfolio": { t: `Portfolio, ${BASE}`, d: "Selected work for New York restaurants, dentists, gyms, salons, law firms, and real estate." },
  "/previews": { t: `Live Previews, ${BASE}`, d: "Browse working starting points for every industry, each fully customized to your brand." },
  "/analytics": { t: `Analytics & Results, ${BASE}`, d: "Every WebDev NY build ships with a real analytics foundation. See the numbers move." },
  "/pricing": { t: `Pricing, ${BASE}`, d: "Simple, flat-fee pricing. Price your project in 30 seconds with our interactive estimator." },
  "/plans": { t: `Plans & Maintenance, ${BASE}`, d: "Care plans that keep your site fast, secure, and improving, without you lifting a finger." },
  "/journal": { t: `Journal, ${BASE}`, d: "Plain-spoken thinking on web design, performance, SEO, and what moves the needle for NYC businesses." },
  "/contact": { t: `Contact, ${BASE}`, d: "Tell us about your project. We reply within 24 hours with a plan and a real quote." },
};

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

export function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    let meta = staticMeta[pathname];
    let ogImage = DEFAULT_OG;
    if (!meta) {
      if (pathname.startsWith("/work/")) {
        const c = caseBySlug(pathname.split("/")[2]);
        if (c) meta = { t: `${c.name}, Case Study, ${BASE}`, d: `${c.tagline} ${c.intro}`.slice(0, 160) };
      } else if (pathname.startsWith("/journal/")) {
        const p = postBySlug(pathname.split("/")[2]);
        if (p) meta = { t: `${en(p.titleKey)}, ${BASE}`, d: en(p.excerptKey) };
      } else if (pathname.startsWith("/for/")) {
        const slug = pathname.split("/")[2];
        const i = industryBySlug(slug);
        if (i) { meta = { t: `${en(i.eyebrowKey)}, ${BASE}`, d: en(i.subKey) }; ogImage = `${SITE}/og/${slug}.png`; }
      }
    }
    if (!meta) meta = { t: `Page Not Found, ${BASE}`, d: "This page got lost in shipping." };

    document.title = meta.t;
    setMeta("description", meta.d);
    setMeta("og:title", meta.t, "property");
    setMeta("og:description", meta.d, "property");
    setMeta("og:image", ogImage, "property");
    setMeta("twitter:title", meta.t);
    setMeta("twitter:description", meta.d);
    setMeta("twitter:image", ogImage);
  }, [pathname]);
  return null;
}
