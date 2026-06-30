import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/* ---------------- Rotating circular stamp ---------------- */
export function RotatingStamp({ text = "WEBDEV NY · WEB STUDIO · NYC · ", size = 130, className, reverse, children }: {
  text?: string; size?: number; className?: string; reverse?: boolean; children?: React.ReactNode;
}) {
  const id = React.useId().replace(/:/g, "");
  return (
    <div className={cn("relative inline-grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className={reverse ? "spin-rev" : "spin-slow"} style={{ width: "100%", height: "100%" }}>
        <defs>
          <path id={id} d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text fontSize="7.2" fontFamily="'JetBrains Mono',monospace" letterSpacing="1.8" fill="currentColor">
          <textPath href={`#${id}`}>{text.repeat(2)}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

/* ---------------- Tape strip divider ---------------- */
export function TapeStrip({ label = "WEBDEV NY", rotate = -1.4, className }: { label?: string; rotate?: number; className?: string }) {
  return (
    <div className={cn("relative flex justify-center my-2 pointer-events-none", className)}>
      <div className="tape relative px-8 py-1.5" style={{ transform: `rotate(${rotate}deg)` }}>
        <span className="mono-label text-ink/70">{label}</span>
      </div>
    </div>
  );
}

/* ---------------- Live NYC clock ---------------- */
export function LiveClock() {
  const [time, setTime] = React.useState("");
  React.useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York", hour12: false });
      setTime(t);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time}</span>;
}

/* ---------------- Wordmark marquee (fake client logos) ---------------- */
const wordmarks = [
  { name: "Trattoria Bella", cls: "italic" },
  { name: "BRIGHTSMILE", cls: "tracking-[0.2em] text-[0.85em]" },
  { name: "IronWorks", cls: "font-black" },
  { name: "Maison", cls: "italic font-light" },
  { name: "PARK AVE LEGAL", cls: "tracking-[0.15em] text-[0.8em]" },
  { name: "Hudson Realty", cls: "" },
  { name: "Clinic NYC", cls: "font-light" },
  { name: "The Boutique", cls: "italic" },
];
export function WordmarkMarquee({ reverse }: { reverse?: boolean }) {
  const items = [...wordmarks, ...wordmarks];
  return (
    <div className="overflow-hidden w-full py-1">
      <div className={cn("marquee", reverse && "marquee-rev")}>
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-10 pr-10">
            <span className={cn("display text-[clamp(22px,3vw,40px)] text-ink/35 whitespace-nowrap", w.cls)}>{w.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-kraft/50" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Scroll-drawn vertical timeline ---------------- */
export function ScrollTimeline({ steps }: { steps: { n: string; t: string; d: string }[] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div ref={ref} className="relative max-w-3xl mx-auto pl-16 sm:pl-24">
      {/* track */}
      <div className="absolute left-6 sm:left-10 top-2 bottom-2 w-px bg-line" />
      <motion.div className="absolute left-6 sm:left-10 top-2 w-px bg-kraft" style={{ height: h }} />
      {steps.map((s) => (
        <motion.div key={s.n}
          initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative pb-14 last:pb-0">
          <span className="absolute -left-[42px] sm:-left-[58px] top-1 w-5 h-5 rounded-full bg-paper border-2 border-kraft grid place-items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-kraft" />
          </span>
          <span className="mono-label text-kraft">{s.n}</span>
          <h3 className="display text-[clamp(24px,3vw,40px)] font-semibold mt-1 mb-2">{s.t}</h3>
          <p className="text-ink-soft leading-relaxed max-w-md">{s.d}</p>
        </motion.div>
      ))}
    </div>
  );
}
