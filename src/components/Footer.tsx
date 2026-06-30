import { Link } from "react-router-dom";
import { IconArrowUpRight, IconBox } from "@/components/icons";
import { Marquee } from "@/components/primitives";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-paper-3 text-ink relative overflow-hidden border-t border-ink">
      <div className="absolute inset-0 dotgrid opacity-50" />

      {/* big CTA marquee */}
      <Link to="/contact" className="block border-b border-line py-8 group bg-kraft text-paper">
        <Marquee items={["Let's build something", "Start a project", "Ship it right"]} className="group-hover:text-ink transition-colors" />
      </Link>

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-8 h-8 bg-kraft text-ink flex items-center justify-center"><IconBox size={17} /></span>
              <span className="display text-[20px] font-semibold">WebDev<span className="text-kraft">.</span>NY</span>
            </div>
            <p className="text-ink-soft text-sm leading-relaxed max-w-xs">
              A web studio in New York. We design and build sites for businesses that take themselves seriously — and want a site that does too.
            </p>
          </div>

          {[
            { h: "Studio", items: [["Index", "/"], ["Design & Dev", "/web-design"], ["Capabilities", "/capabilities"], ["Portfolio", "/portfolio"]] },
            { h: "Work", items: [["Previews", "/previews"], ["Analytics", "/analytics"], ["Pricing", "/pricing"], ["Journal", "/journal"]] },
          ].map((col) => (
            <div key={col.h}>
              <div className="mono-label text-kraft mb-4">{col.h}</div>
              <div className="flex flex-col gap-2.5">
                {col.items.map(([l, to]) => (
                  <Link key={l} to={to} className="text-ink-soft hover:text-ink text-sm link-draw w-fit">{l}</Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div className="mono-label text-kraft mb-4">Contact</div>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="mailto:hello@webdevny.com" className="text-ink-soft hover:text-ink link-draw w-fit">hello@webdevny.com</a>
              <a href="tel:+12125550190" className="text-ink-soft hover:text-ink link-draw w-fit">(212) 555-0190</a>
              <span className="text-ink-faint">New York, NY</span>
            </div>
            <Link to="/contact" className="mt-5 inline-flex items-center gap-1.5 text-kraft text-sm hover:gap-2.5 transition-all">
              Start a project <IconArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 mono-label text-ink-faint">
          <span>© {year} WebDev NY — All rights reserved</span>
          <span>Designed & built in-house · No templates</span>
        </div>
      </div>
    </footer>
  );
}
