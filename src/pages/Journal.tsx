import { Link } from "react-router-dom";
import { posts } from "@/data/journal";
import { Reveal, FadeUp, SectionLabel } from "@/components/primitives";
import { IconArrowUpRight } from "@/components/icons";

export default function Journal() {
  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-12 border-b border-line">
        <SectionLabel index="08" className="mb-8">Journal</SectionLabel>
        <h1 className="display text-[clamp(44px,10vw,150px)] font-semibold tracking-tightest">
          <Reveal text="Notes from" />
          <span className="italic text-kraft"><Reveal text="the studio." delay={0.15} /></span>
        </h1>
        <p className="text-ink-soft text-lg max-w-md leading-relaxed mt-8">
          Plain-spoken thinking on web design, performance, SEO, and what actually moves the needle for New York businesses.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12">
        <div className="border-t border-ink">
          {posts.map((p, i) => (
            <FadeUp key={p.slug} delay={i * 0.06}>
              <Link to={`/journal/${p.slug}`} data-cursor-label="READ"
                className="group grid md:grid-cols-[120px_1fr_auto] gap-4 md:gap-10 items-baseline border-b border-line py-8 hover:bg-paper-2 transition-colors -mx-3 px-3">
                <span className="mono-label text-kraft">{p.category}</span>
                <div>
                  <h2 className="display text-[clamp(24px,3.2vw,42px)] font-semibold group-hover:text-kraft transition-colors leading-tight">{p.title}</h2>
                  <p className="text-ink-soft mt-2 max-w-2xl">{p.excerpt}</p>
                  <div className="mono-label text-ink-faint mt-3">{p.date} · {p.read} read</div>
                </div>
                <IconArrowUpRight size={24} className="justify-self-end opacity-30 group-hover:opacity-100 group-hover:text-kraft group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pb-24">
        <div className="card-paper-kraft p-10 sm:p-14 text-center">
          <Reveal as="h2" text="Enough reading. Let's build." className="display text-[clamp(26px,4vw,56px)] font-semibold justify-center mb-8" />
          <Link to="/contact" data-cursor-label="GO" className="inline-flex items-center gap-2 bg-ink text-paper px-7 py-4 mono-label press">
            Start a project <IconArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
