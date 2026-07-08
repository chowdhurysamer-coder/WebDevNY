import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, SectionLabel, Magnetic } from "@/components/primitives";
import { IconMail, IconPin, IconArrowUpRight, IconCheck } from "@/components/icons";
import { burstConfetti } from "@/components/Confetti";
import { sfx } from "@/lib/sfx";
import { useLang } from "@/lib/i18n";

// Set VITE_FORMSPREE_ID to your Formspree form id (e.g. "xmyzabcd") to receive submissions.
const FORMSPREE_ID = (import.meta.env.VITE_FORMSPREE_ID as string) || "";
const ENDPOINT = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : "";
// Every inquiry lands here.
const INBOX = "contact@webdevny.com";
// Web3Forms access key — the website POSTs the brief straight to their API, which
// emails it to INBOX server-side. The key is public/safe to ship in frontend code.
// Get a free key (no account) at https://web3forms.com and paste it here or set VITE_WEB3FORMS_KEY.
const WEB3FORMS_KEY = (import.meta.env.VITE_WEB3FORMS_KEY as string) || "487c3ffa-fecc-4864-b349-77872a76ad98";

const info = [
  { icon: IconMail, labelKey: "ct.info.email", value: "contact@webdevny.com", href: "mailto:contact@webdevny.com" },
  // Phone hidden until we have a business line.
  // { icon: IconPhone, labelKey: "ct.info.phone", value: "(212) 555-0190", href: "tel:+12125550190" },
  { icon: IconPin, labelKey: "ct.info.studio", value: "New York, NY", href: "#" },
];

const stepKeys = ["ct.step1", "ct.step2", "ct.step3", "ct.step4"];

interface Quote { pages: number; addons: string[]; oneTime: number; monthly: number; daysLow: number; daysHigh: number }

export default function Contact() {
  const { t, num } = useLang();
  const quote = (useLocation().state as { quote?: Quote } | null)?.quote;
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [hp, setHp] = useState("");           // honeypot — humans never fill this
  const startedAt = useState(() => Date.now())[0]; // submit-too-fast detector
  const [form, setForm] = useState(() => {
    if (quote) {
      const addons = quote.addons.length ? `\nAdd-ons: ${quote.addons.join(", ")}` : "";
      return {
        name: "", email: "", business: "",
        budget: `$${quote.oneTime.toLocaleString()} + $${quote.monthly}/mo`,
        message: `I built an estimate on your site:\n\nPackage: Base ($500 + $50/mo)\nPages: ${quote.pages}${addons}\nEstimated: $${quote.oneTime.toLocaleString()} one-time + $${quote.monthly}/mo maintenance\nEstimated timeline: ~${quote.daysLow}–${quote.daysHigh} business days\n\nA bit about my project: `,
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
    if (Date.now() - startedAt < 2500) { setError(t("ct.err.slow")); return; }
    // Spam guard 3 — rate limit: one submission per 30s per browser.
    try {
      const last = Number(localStorage.getItem("webdevny_last_submit") || 0);
      if (Date.now() - last < 30000) { setError(t("ct.err.rate")); return; }
    } catch { /* ignore */ }

    const subject = `New project inquiry, ${form.business || form.name}`;

    // Preferred path — the website sends the email itself (no visitor mail client).
    // Web3Forms delivers server-side to INBOX; Formspree is the alternative if set.
    if (WEB3FORMS_KEY) {
      setSending(true);
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject,
            from_name: form.name || "WebDev NY inquiry",
            replyto: form.email,
            name: form.name,
            email: form.email,
            business: form.business,
            budget: form.budget,
            message: form.message,
          }),
        });
        const d = await res.json().catch(() => ({}));
        if (res.ok && d?.success) { markSent(); succeed(); }
        else { setError(d?.message || t("ct.err.generic")); }
      } catch {
        setError(t("ct.err.network"));
      } finally {
        setSending(false);
      }
      return;
    }

    if (ENDPOINT) {
      setSending(true);
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...form, _subject: subject }),
        });
        if (res.ok) { markSent(); succeed(); }
        else { const d = await res.json().catch(() => ({})); setError(d?.errors?.[0]?.message || t("ct.err.generic")); }
      } catch {
        setError(t("ct.err.network"));
      } finally {
        setSending(false);
      }
      return;
    }

    // No backend configured yet → last-resort mailto so the brief still reaches INBOX.
    const body =
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Business: ${form.business || "—"}\n` +
      `Budget: ${form.budget || "—"}\n\n` +
      `${form.message}`;
    window.location.href = `mailto:${INBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    markSent();
    succeed();
  };

  const field = "w-full bg-paper-2 border border-line px-4 py-3 text-sm outline-none focus:border-ink transition-colors placeholder:text-ink-faint";

  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-12 border-b border-line">
        <SectionLabel index="08" className="mb-8">{t("ct.eyebrow")}</SectionLabel>
        <h1 className="display text-[clamp(44px,10vw,150px)] font-semibold tracking-tightest">
          <Reveal text={t("ct.h1a")} />
          <span className="italic text-kraft"><Reveal text={t("ct.h1b")} delay={0.15} /></span>
        </h1>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16 grid lg:grid-cols-[0.85fr_1.15fr] gap-12">
        {/* left */}
        <div>
          <p className="text-ink-soft text-lg leading-relaxed mb-10 max-w-sm">
            {t("ct.intro")}
          </p>
          <div className="flex flex-col gap-3 mb-12">
            {info.map((c) => (
              <a key={c.labelKey} href={c.href} className="card-paper press flex items-center gap-4 p-4">
                <span className="w-10 h-10 bg-ink text-paper flex items-center justify-center shrink-0"><c.icon size={18} /></span>
                <span>
                  <span className="mono-label text-ink-faint block">{t(c.labelKey)}</span>
                  <span className="text-sm font-medium" dir="ltr">{num(c.value)}</span>
                </span>
              </a>
            ))}
          </div>
          <div className="card-paper-kraft p-6">
            <div className="mono-label text-paper/80 mb-4">{t("ct.next")}</div>
            {stepKeys.map((s, i) => (
              <div key={s} className="flex items-center gap-3 mb-3 last:mb-0">
                <span className="w-6 h-6 border border-paper/50 flex items-center justify-center mono-label shrink-0">{num(i + 1)}</span>
                <span className="text-sm text-paper/90">{t(s)}</span>
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
              <h3 className="display text-3xl font-semibold mb-3">{t("ct.sent.h")}</h3>
              <p className="text-ink-soft max-w-xs">{t("ct.sent.p")}</p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-5">
              {/* honeypot: hidden from people, tempting to bots */}
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={hp}
                onChange={(e) => setHp(e.target.value)} aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
              {quote && (
                <div className="card-paper-kraft p-5">
                  <div className="mono-label text-paper/80 mb-2">{t("ct.quote.carried")}</div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="display text-3xl font-semibold" dir="ltr">${num(quote.oneTime.toLocaleString())} + ${num(quote.monthly)}{t("pr.perMo")}</span>
                    <span className="mono-label text-paper/80">{num(quote.pages)} {t("ct.quote.pages")} · ~{num(quote.daysLow)}–{num(quote.daysHigh)} {t("ct.quote.days")}</span>
                  </div>
                  {quote.addons.length > 0 && <div className="mono-label text-paper/70 mt-2">+ {quote.addons.join(" · ")}</div>}
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="mono-label text-ink-faint block mb-2">{t("ct.f.name")} *</span>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} placeholder={t("ct.f.namePh")} />
                </label>
                <label className="block">
                  <span className="mono-label text-ink-faint block mb-2">{t("ct.f.email")} *</span>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} placeholder="you@company.com" />
                </label>
              </div>
              <label className="block">
                <span className="mono-label text-ink-faint block mb-2">{t("ct.f.business")}</span>
                <input value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} className={field} placeholder={t("ct.f.businessPh")} />
              </label>
              <label className="block">
                <span className="mono-label text-ink-faint block mb-2">{t("ct.f.budget")}</span>
                <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={field}>
                  <option value="">{t("ct.f.budgetPh")}</option>
                  {/* carried-over estimate needs a matching option or the select renders blank */}
                  {quote && <option>{`$${quote.oneTime.toLocaleString()} + $${quote.monthly}/mo`}</option>}
                  <option>$500, {t("es.base")}</option>
                  <option>$500 – $1,000</option>
                  <option>$1,000+</option>
                  <option>{t("ct.f.custom")}</option>
                </select>
              </label>
              <label className="block">
                <span className="mono-label text-ink-faint block mb-2">{t("ct.f.details")} *</span>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${field} resize-none`} placeholder={t("ct.f.detailsPh")} />
              </label>
              {error && <div className="mono-label text-red-700 bg-red-500/10 border border-red-500/30 px-4 py-3">{error}</div>}
              <Magnetic>
                <button type="submit" disabled={sending} data-cursor-label="SEND" className="card-paper-kraft press w-full flex items-center justify-center gap-2 py-4 mono-label disabled:opacity-60">
                  {sending ? t("ct.f.sending") : <>{t("ct.f.send")} <IconArrowUpRight size={15} /></>}
                </button>
              </Magnetic>
              <p className="mono-label text-ink-faint text-center" style={{ fontSize: 9 }}>{t("ct.f.note")}</p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
