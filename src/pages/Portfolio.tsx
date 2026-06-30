import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, ExternalLink } from "lucide-react";
import { Gallery, GalleryImage } from "@/components/Gallery";

const projects = [
  { id: "1", title: "Bella Cucina NYC", category: "Restaurant", desc: "A gorgeous menu-driven site with reservations integration. 40% increase in online bookings.", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80", color: "#fb923c" },
  { id: "2", title: "SmilePro Dental", category: "Dental Practice", desc: "Patient-first design with appointment scheduling and before/after gallery.", src: "https://images.unsplash.com/photo-1588776814546-1ffedde3f10f?w=600&q=80", color: "#38bdf8" },
  { id: "3", title: "Iron Republic Gym", category: "Fitness", desc: "Class bookings, membership tiers, and a video-heavy hero that converts visitors.", src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", color: "#34d399" },
  { id: "4", title: "Luxe & Co. Salon", category: "Beauty & Wellness", desc: "Booking-forward design with portfolio gallery and staff profiles.", src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80", color: "#f472b6" },
  { id: "5", title: "Park Ave Legal", category: "Law Firm", desc: "Authority-building design with practice areas, case results, and attorney bios.", src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80", color: "#a78bfa" },
  { id: "6", title: "Hudson Realty Group", category: "Real Estate", desc: "MLS-integrated listings, neighborhood guides, and agent lead capture.", src: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=600&q=80", color: "#fbbf24" },
];

const reviews = [
  { name: "Maria S.", biz: "Bella Cucina NYC", text: "WebDev NY transformed our online presence. We went from zero online reservations to 40% of bookings coming through the website in the first month.", stars: 5 },
  { name: "Dr. James K.", biz: "SmilePro Dental", text: "The team understood what a dental practice needs — clean, trustworthy, fast. New patient forms are now fully online and we save hours a week.", stars: 5 },
  { name: "Tony R.", biz: "Iron Republic Gym", text: "Our site finally looks as good as our gym. Membership sign-ups through the site doubled in 60 days. Worth every penny.", stars: 5 },
];

export default function Portfolio() {
  return (
    <div className="bg-black text-white pt-28">
      {/* Hero */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-[clamp(36px,7vw,84px)] font-bold leading-[0.92] tracking-[-0.03em] mb-6"
          >
            Work that<br />
            <span className="gradient-text italic">speaks for itself.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 font-barlow text-lg max-w-xl"
          >
            Real projects for real New York businesses. Click any image to zoom in.
          </motion.p>
        </div>
      </section>

      {/* Portfolio grid with gallery */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <Gallery>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {projects.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-2xl overflow-hidden card-hover group"
                >
                  <div className="relative overflow-hidden">
                    <GalleryImage src={p.src} alt={p.title} id={p.id} />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-barlow px-2.5 py-1 rounded-full glass-strong" style={{ color: p.color, borderColor: `${p.color}30`, border: `1px solid ${p.color}40` }}>
                        {p.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-barlow font-semibold text-white text-base mb-1">{p.title}</h3>
                    <p className="text-white/50 font-barlow text-xs leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Gallery>
        </div>
      </section>

      {/* Reviews */}
      <section className="px-4 pb-24 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-bold text-white mb-3">What clients say</h2>
            <p className="text-white/50 font-barlow">Real reviews from real business owners.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 card-hover"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(r.stars)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-white/70 font-barlow text-sm leading-relaxed mb-5 italic">"{r.text}"</p>
                <div>
                  <div className="font-barlow font-semibold text-white text-sm">{r.name}</div>
                  <div className="text-white/40 font-barlow text-xs">{r.biz}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto glass rounded-3xl p-10 text-center">
          <h2 className="font-display text-[clamp(24px,4vw,44px)] font-bold text-white mb-4">Your project could be next.</h2>
          <p className="text-white/60 font-barlow mb-8">Let's talk about what we can build for your business.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full font-barlow font-semibold hover:bg-sky-100 transition-colors">
            Start a Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
