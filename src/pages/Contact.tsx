import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, SectionLabel, Magnetic } from "@/components/primitives";
import { IconMail, IconPhone, IconPin, IconArrowUpRight, IconCheck } from "@/components/icons";
import { burstConfetti } from "@/components/Confetti";
import { sfx } from "@/lib/sfx";

// Set VITE_FORMSPREE_ID to your Formspree form id (e.g. "xmyzabcd") to receive submissions.
const FORMSPREE_ID = (import.meta.env.VITE_FORMSPREE_ID as string) || "";
const ENDPOINT = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : "";

const info = [
  { icon: IconMail, label: "Email", value: "hello@webdevny.com", href: "mailto:hello@webdevny.com" },
  { icon: IconPhone, label: "Phone", value: "(212) 555-0190", href: "tel:+12125550190" },
  { icon: IconPin, label: "Studio", value: "New York, NY", href: "#" },
];

const steps = ["You send the brief", "We review your project", "Free 30-min strategy call", "Proposal within 24 hours"];

interface Quote { tier: string; pages: number; addons: string[]; total: number; days: number }

export default function Contact() {
  const quote = (useLocation().state as { quote?: Quote } | null)?.quote;
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [hp, setHp] = useState("");           // honeypot — humans never fill this
  const startedAt = useState(() => Date.now())[0]; // submit-too-fast detector
  const [form, setForm] = useState(() => {
    if (quote) {
      const addons = quote.addons.length ? `\nAdd-ons: ${quote.addons.join(", ")}` : "";
      const budgetMap: Record<string, string> = { Starter: "$1,490, Starter", Growth: "$3,490, Growth", Elite: "$6,990, Elite" };
      return {
        name: "", email: "", business: "",
        budget: budgetMap[quote.tier] || "Custom / Enterprise",
        message: `I built an estimate on your site:\n\nPackage: ${quote.tier}\nPages: ${quote.pages}${addons}\nEstimated total: $${quote.total.toLocaleString()}\nEstimated timeline: ~${quote.days} days\n\nA bit about my project: `,
      };
    }
    return { name: "", email: "", business: "", budget: "", message: "" };
  });

  const markSent = () => { try { localStorage.setItem("webdevny_last_submit", String(Date.now())); } catch { /* ignore */ } };
  const succeed = () => {
    setSent(true);
    sfx.chime();
    burstConfetti(window.innerWidth / 2, window.innerHeight * 0.35);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Spam guard 1 — honeypot: a bot that filled the hidden field is silently "accepted"
    // (we show success but never send).
    if (hp.trim() !== "") { succeed(); return; }
    // Spam guard 2 — too fast: real people take more than a couple seconds to fill this out.
    if (Date.now() - startedAt < 2500) { setError("Please take a moment, then send again."); return; }
    // Spam guard 3 — rate limit: one submission per 30s per browser.
    try {
      const last = Number(localStorage.getItem("webdevny_last_submit") || 0);
      if (Date.now() - last < 30000) { setError("You just sent a message. Please wait a moment before sending another."); return; }
    } catch { /* ignore */ }

    if (!ENDPOINT) { markSent(); succeed(); return; } // no backend configured → optimistic success
    setSending(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _subject: `New project inquiry, ${form.business || form.name}` }),
      });
      if (res.ok) { markSent(); succeed(); }
      else { const d = await res.json().catch(() => ({})); setError(d?.errors?.[0]?.message || "Something went wrong. Please email us directly."); }
    } catch {
      setError("Network error. Please email hello@webdevny.com directly.");
    } finally {
      setSending(false);
    }
  };

  const field = "w-full bg-paper-2 border border-line px-4 py-3 text-sm outline-none focus:border-ink transition-colors placeholder:text-ink-faint";

  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-12 border-b border-line">
        <SectionLabel index="08" className="mb-8">Contact</SectionLabel>
        <h1 className="display text-[clamp(44px,10vw,150px)] font-semibold tracking-tightest">
          <Reveal text="Let's build" />
          <span className="italic text-kraft"><Reveal text="something great." delay={0.15} /></span>
        </h1>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16 grid lg:grid-cols-[0.85fr_1.15fr] gap-12">
        {/* left */}
        <div>
          <p className="text-ink-soft text-lg leading-relaxed mb-10 max-w-sm">
            Tell us about your project. We reply within 24 hours with a plan and a real quote, no automated drip, no runaround.
          </p>
          <div className="flex flex-col gap-3 mb-12">
            {info.map((c) => (
              <a key={c.label} href={c.href} className="card-paper press flex items-center gap-4 p-4">
                <span className="w-10 h-10 bg-ink text-paper flex items-center justify-center shrink-0"><c.icon size={18} /></span>
                <span>
                  <span className="mono-label text-ink-faint block">{c.label}</span>
                  <span className="text-sm font-medium">{c.value}</span>
                </span>
              </a>
            ))}
          </div>
          <div className="card-paper-kraft p-6">
            <div className="mono-label text-paper/80 mb-4">What happens next</div>
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3 mb-3 last:mb-0">
                <span className="w-6 h-6 border border-paper/50 flex items-center justify-center mono-label shrink-0">{i + 1}</span>
                <span className="text-sm text-paper/90">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* form */}
        <div className="card-paper p-8 sm:p-10">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[420px] text-center">
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260 }}
                className="w-16 h-16 bg-kraft text-paper flex items-center justify-center mb-6"><IconCheck size={32} /></motion.span>
              <h3 className="display text-3xl font-semibold mb-3">Brief received.</h3>
              <p className="text-ink-soft max-w-xs">We'll be in touch within 24 hours. Keep an eye on your inbox.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-5">
              {/* honeypot: hidden from people, tempting to bots */}
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={hp}
                onChange={(e) => setHp(e.target.value)} aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
              {quote && (
                <div className="card-paper-kraft p-5">
                  <div className="mono-label text-paper/80 mb-2">Your estimate, carried over</div>
                  <div className="flex items-baseline gap-3">
                    <span className="display text-3xl font-semibold">${quote.total.toLocaleString()}</span>
                    <span className="mono-label text-paper/80">{quote.tier} · {quote.pages} pages · ~{quote.days} days</span>
                  </div>
                  {quote.addons.length > 0 && <div className="mono-label text-paper/70 mt-2">+ {quote.addons.join(" · ")}</div>}
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="mono-label text-ink-faint block mb-2">Name *</span>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} placeholder="Your name" />
                </label>
                <label className="block">
                  <span className="mono-label text-ink-faint block mb-2">Email *</span>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} placeholder="you@company.com" />
                </label>
              </div>
              <label className="block">
                <span className="mono-label text-ink-faint block mb-2">Business</span>
                <input value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} className={field} placeholder="Your business name" />
              </label>
              <label className="block">
                <span className="mono-label text-ink-faint block mb-2">Budget</span>
                <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={field}>
                  <option value="">Select a range</option>
                  <option>$2,499, Starter</option>
                  <option>$4,999, Growth</option>
                  <option>$9,999, Elite</option>
                  <option>Custom / Enterprise</option>
                </select>
              </label>
              <label className="block">
                <span className="mono-label text-ink-faint block mb-2">Project details *</span>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${field} resize-none`} placeholder="What do you need? What's working, what isn't? Who's your customer?" />
              </label>
              {error && <div className="mono-label text-red-700 bg-red-500/10 border border-red-500/30 px-4 py-3">{error}</div>}
              <Magnetic>
                <button type="submit" disabled={sending} data-cursor-label="SEND" className="card-paper-kraft press w-full flex items-center justify-center gap-2 py-4 mono-label disabled:opacity-60">
                  {sending ? "Sending…" : <>Send the brief <IconArrowUpRight size={15} /></>}
                </button>
              </Magnetic>
              <p className="mono-label text-ink-faint text-center" style={{ fontSize: 9 }}>We reply within 24 hours · or email hello@webdevny.com</p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
