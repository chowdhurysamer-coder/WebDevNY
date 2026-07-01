import { Link } from "react-router-dom";
import { Reveal, FadeUp, SectionLabel } from "@/components/primitives";
import { IconArrow } from "@/components/icons";

const sections = [
  { h: "Agreement", p: "By using this website you agree to these terms. If you engage us for a project, a separate written proposal and contract will govern that specific work and take precedence over anything here." },
  { h: "Our work", p: "We provide web design, development, SEO, analytics, and maintenance services. Scope, deliverables, timeline, and price for any engagement are defined in a signed proposal before work begins." },
  { h: "Estimates", p: "The pricing and estimator figures on this site are illustrative starting points, not binding quotes. Your final quote is confirmed in writing after a discovery conversation." },
  { h: "Intellectual property", p: "On full payment for a completed project, you own the final website, the code, content, and domain. This website's own brand, copy, and design remain the property of WebDev NY." },
  { h: "Acceptable use", p: "Don't use this site to break the law, infringe others' rights, or disrupt its operation. We may restrict access for misuse." },
  { h: "Liability", p: "This site is provided \"as is.\" To the extent permitted by law, we're not liable for indirect or incidental damages arising from its use. Nothing here limits liability that can't be limited by law." },
  { h: "Changes", p: "We may update these terms as the studio evolves. Material changes will be reflected by the date below. Continued use means you accept the current version." },
  { h: "Contact", p: "Questions about these terms? Email hello@webdevny.com." },
];

export default function Terms() {
  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[760px] mx-auto px-5 sm:px-8 pt-16 pb-10">
        <Link to="/" className="inline-flex items-center gap-2 mono-label text-ink-soft hover:text-kraft transition-colors mb-10 link-draw">
          <IconArrow size={15} className="rotate-180" /> Home
        </Link>
        <SectionLabel index="·" className="mb-6">Legal</SectionLabel>
        <h1 className="display text-[clamp(36px,7vw,80px)] font-semibold tracking-tightest mb-4">
          <Reveal text="Terms of service" />
        </h1>
        <p className="mono-label text-ink-faint">Last updated, June 2026</p>
      </section>
      <section className="max-w-[760px] mx-auto px-5 sm:px-8 pb-24">
        <div className="border-t border-line">
          {sections.map((s, i) => (
            <FadeUp key={s.h} delay={i * 0.03} className="border-b border-line py-7">
              <h2 className="display text-2xl font-semibold mb-3">{s.h}</h2>
              <p className="text-ink-soft leading-relaxed">{s.p}</p>
            </FadeUp>
          ))}
        </div>
        <p className="text-ink-faint text-sm mt-10 leading-relaxed">
          These terms are provided in good faith for an independent studio and aren't legal advice. Your project engagement is governed by its own signed contract.
        </p>
      </section>
    </div>
  );
}
