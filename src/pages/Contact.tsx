import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import { RippleButton } from "@/components/ui/RippleButton";

const contactInfo = [
  { icon: <Mail className="w-5 h-5" />, label: "Email", value: "hello@webdevny.com", href: "mailto:hello@webdevny.com" },
  { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "(212) 555-0190", href: "tel:+12125550190" },
  { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "New York, NY", href: "#" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", business: "", budget: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-black text-white pt-28">
      <section className="px-4 pb-10">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-[clamp(36px,7vw,84px)] font-bold leading-[0.92] tracking-[-0.03em] mb-6"
          >
            Let's build<br />
            <span className="gradient-text italic">something great.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 font-barlow text-lg max-w-xl"
          >
            Tell us about your project. We'll reply within 24 hours with a plan and a realistic quote.
          </motion.p>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.6fr] gap-10">
          {/* Left: contact info */}
          <div>
            <div className="flex flex-col gap-4 mb-10">
              {contactInfo.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4 glass rounded-2xl p-4 hover:bg-white/8 transition-all card-hover"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center text-sky-400 shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-white/40 font-barlow text-xs">{c.label}</div>
                    <div className="text-white font-barlow font-medium text-sm">{c.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass rounded-2xl p-5"
            >
              <h3 className="font-barlow font-semibold text-white mb-3">What happens next?</h3>
              {["You fill out the form", "We review your project", "Free 30-min strategy call", "Proposal delivered in 24h"].map((s, i) => (
                <div key={s} className="flex items-center gap-3 mb-3 last:mb-0">
                  <span className="w-6 h-6 rounded-full bg-sky-400/20 text-sky-400 text-xs font-barlow font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-white/60 font-barlow text-sm">{s}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-3xl p-8"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-5" />
                </motion.div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Message sent!</h3>
                <p className="text-white/60 font-barlow">We'll be in touch within 24 hours. Check your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 font-barlow text-xs mb-1.5 block uppercase tracking-wider">Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-barlow text-sm outline-none focus:border-sky-400/50 focus:bg-white/8 transition-all placeholder:text-white/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 font-barlow text-xs mb-1.5 block uppercase tracking-wider">Email *</label>
                    <input
                      required type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-barlow text-sm outline-none focus:border-sky-400/50 focus:bg-white/8 transition-all placeholder:text-white/20"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/50 font-barlow text-xs mb-1.5 block uppercase tracking-wider">Business Name</label>
                  <input
                    value={form.business}
                    onChange={(e) => setForm({ ...form, business: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-barlow text-sm outline-none focus:border-sky-400/50 focus:bg-white/8 transition-all placeholder:text-white/20"
                    placeholder="Your business"
                  />
                </div>
                <div>
                  <label className="text-white/50 font-barlow text-xs mb-1.5 block uppercase tracking-wider">Budget Range</label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-barlow text-sm outline-none focus:border-sky-400/50 transition-all"
                  >
                    <option value="" className="bg-black">Select a budget</option>
                    <option value="starter" className="bg-black">$2,499 — Starter</option>
                    <option value="growth" className="bg-black">$4,999 — Growth</option>
                    <option value="elite" className="bg-black">$9,999 — Elite</option>
                    <option value="custom" className="bg-black">Custom / Enterprise</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/50 font-barlow text-xs mb-1.5 block uppercase tracking-wider">Tell us about your project *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-barlow text-sm outline-none focus:border-sky-400/50 focus:bg-white/8 transition-all placeholder:text-white/20 resize-none"
                    placeholder="What do you need? What's working, what isn't? Who's your customer?"
                  />
                </div>
                <RippleButton
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-white text-black py-3.5 rounded-xl font-barlow font-semibold hover:bg-sky-100 transition-colors"
                >
                  Send Message <ArrowRight className="w-4 h-4" />
                </RippleButton>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
