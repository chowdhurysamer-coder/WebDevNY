import { useParams, Link, Navigate } from "react-router-dom";
import { postBySlug, posts } from "@/data/journal";
import { Reveal, FadeUp } from "@/components/primitives";
import { IconArrow, IconArrowUpRight } from "@/components/icons";
import { useLang } from "@/lib/i18n";

export default function JournalPost() {
  const { t, num } = useLang();
  const { slug } = useParams();
  const post = postBySlug(slug);
  if (!post) return <Navigate to="/journal" replace />;
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const next = posts[(idx + 1) % posts.length];

  return (
    <div className="bg-paper pt-16">
      <article className="max-w-[760px] mx-auto px-5 sm:px-8 pt-16 pb-12">
        <Link to="/journal" className="inline-flex items-center gap-2 mono-label text-ink-soft hover:text-kraft transition-colors mb-10 link-draw">
          <IconArrow size={15} className="rotate-180" /> {t("jn.eyebrow")}
        </Link>
        <div className="flex items-center gap-3 mb-6 mono-label text-ink-faint">
          <span className="text-kraft">{t(post.categoryKey)}</span><span>·</span><span>{num(post.date)}</span><span>·</span><span>{num(post.read)} {t("jn.read")}</span>
        </div>
        <h1 className="display text-[clamp(32px,6vw,68px)] font-semibold tracking-tightest mb-10 leading-[0.95]">
          <Reveal text={t(post.titleKey)} />
        </h1>
        <div className="h-px bg-line mb-10" />
        <div className="flex flex-col gap-7">
          {post.body.map((b, i) => (
            <FadeUp key={i} delay={0.02 * i}>
              {b.hKey && <h2 className="display text-2xl sm:text-3xl font-semibold mb-3 mt-2">{t(b.hKey)}</h2>}
              <p className="text-ink-soft text-lg leading-relaxed">{t(b.pKey)}</p>
            </FadeUp>
          ))}
        </div>
      </article>

      <section className="max-w-[760px] mx-auto px-5 sm:px-8 pb-24">
        <div className="card-paper-kraft p-8 sm:p-10 text-center mb-8">
          <div className="mono-label text-paper/80 mb-3">{t("jp.readyApply")}</div>
          <h2 className="display text-3xl font-semibold mb-6">{t("jp.buildSite")}</h2>
          <Link to="/contact" data-cursor-label="GO" className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3.5 mono-label press">
            {t("cta.start")} <IconArrowUpRight size={15} />
          </Link>
        </div>
        <Link to={`/journal/${next.slug}`} className="group flex items-center justify-between border-t border-ink pt-6">
          <div>
            <div className="mono-label text-ink-faint mb-1">{t("jp.nextRead")}</div>
            <div className="display text-2xl font-semibold group-hover:text-kraft transition-colors">{t(next.titleKey)}</div>
          </div>
          <IconArrowUpRight size={28} className="shrink-0 ml-4 group-hover:text-kraft group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
        </Link>
      </section>
    </div>
  );
}
