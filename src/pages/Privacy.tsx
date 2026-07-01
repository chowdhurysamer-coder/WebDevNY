import { Link } from "react-router-dom";
import { Reveal, FadeUp, SectionLabel } from "@/components/primitives";
import { IconArrow } from "@/components/icons";

const sections = [
  { h: "The short version", p: "We're a web studio, not a data broker. We collect the minimum needed to reply to your inquiry and keep the site working. We don't sell your data, ever." },
  { h: "What we collect", p: "When you submit the contact form, we receive what you type: your name, email, business, budget, and message. The site also stores small preferences (theme, sound, cookie choice) locally in your browser, these never leave your device." },
  { h: "Cookies & local storage", p: "We use browser local storage to remember your theme and sound preferences and whether you've seen the intro. We don't use third-party advertising or cross-site tracking cookies." },
  { h: "How we use it", p: "Solely to respond to your project inquiry and provide our services. We may email you about your specific project. We won't add you to a marketing list without asking." },
  { h: "Who we share it with", p: "Form submissions are delivered through our form provider (Formspree) so we can receive your message by email. That's it. No advertisers, no resale." },
  { h: "Your rights", p: "Email us any time to access, correct, or delete the information you've sent us. You can clear local preferences by clearing your browser storage for this site." },
  { h: "Contact", p: "Questions about privacy? Email hello@webdevny.com and a real person will reply." },
];

export default function Privacy() {
  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[760px] mx-auto px-5 sm:px-8 pt-16 pb-10">
        <Link to="/" className="inline-flex items-center gap-2 mono-label text-ink-soft hover:text-kraft transition-colors mb-10 link-draw">
          <IconArrow size={15} className="rotate-180" /> Home
        </Link>
        <SectionLabel index="·" className="mb-6">Legal</SectionLabel>
        <h1 className="display text-[clamp(36px,7vw,80px)] font-semibold tracking-tightest mb-4">
          <Reveal text="Privacy policy" />
        </h1>
        <p className="mono-label text-ink-faint">Last updated, June 2026</p>
      </section>

      <section className="max-w-[760px] mx-auto px-5 sm:px-8 pb-24">
        <div className="border-t border-line">
          {sections.map((s, i) => (
            <FadeUp key={s.h} delay={i * 0.04} className="border-b border-line py-7">
              <h2 className="display text-2xl font-semibold mb-3">{s.h}</h2>
              <p className="text-ink-soft leading-relaxed">{s.p}</p>
            </FadeUp>
          ))}
        </div>
        <p className="text-ink-faint text-sm mt-10 leading-relaxed">
          This policy is provided in good faith for an independent studio and isn't legal advice. For a binding agreement on a specific engagement, we'll provide a formal contract.
        </p>
      </section>
    </div>
  );
}
