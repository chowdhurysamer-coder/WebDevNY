import { Link } from "react-router-dom";
import { IconArrowUpRight, IconBox } from "@/components/icons";
import { Marquee } from "@/components/primitives";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-paper relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      {/* big CTA marquee */}
      <Link to="/contact" className="block border-b border-paper/10 py-8 group">
        <Marquee items={["Let's build something", "Start a project", "Ship it right"]} className="text-paper group-hover:text-kraft transition-colors" />
      </Link>

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-8 h-8 bg-kraft text-ink flex items-center justify-center"><IconBox size={17} /></span>
              <span className="display text-[20px] font-semibold">WebDev<span className="text-kraft">.</span>NY</span>
            </div>
            <p className="text-paper/50 text-sm leading-relaxed max-w-xs">
              A web studio in New York. We design and build sites for businesses that take themselves seriously — and want a site that does too.
            </p>
          </div>

          {[
            { h: "Studio", items: [["Index", "/"], ["Design & Dev", "/web-design"], ["Capabilities", "/capabilities"], ["Portfolio", "/portfolio"]] },
            { h: "Work", items: [["Previews", "/previews"], ["Analytics", "/analytics"], ["Pricing", "/pricing"], ["Plans", "/plans"]] },
          ].map((col) => (
            <div key={col.h}>
              <div className="mono-label text-kraft mb-4">{col.h}</div>
              <div className="flex flex-col gap-2.5">
                {col.items.map(([l, to]) => (
                  <Link key={l} to={to} className="text-paper/60 hover:text-paper text-sm link-draw w-fit">{l}</Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div className="mono-label text-kraft mb-4">Contact</div>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="mailto:hello@webdevny.com" className="text-paper/60 hover:text-paper link-draw w-fit">hello@webdevny.com</a>
              <a href="tel:+12125550190" className="text-paper/60 hover:text-paper link-draw w-fit">(212) 555-0190</a>
              <span className="text-paper/40">New York, NY</span>
            </div>
            <Link to="/contact" className="mt-5 inline-flex items-center gap-1.5 text-kraft text-sm hover:gap-2.5 transition-all">
              Start a project <IconArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-paper/10 flex flex-col sm:flex-row items-center justify-between gap-3 mono-label text-paper/35">
          <span>© {year} WebDev NY — All rights reserved</span>
          <span>Designed & built in-house · No templates</span>
        </div>
      </div>
    </footer>
  );
}
