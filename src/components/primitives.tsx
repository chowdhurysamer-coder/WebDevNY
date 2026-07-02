import * as React from "react";
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

/* ---------------- 3D tilt card ---------------- */
export function TiltCard({ children, className, max = 9 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 220, damping: 18 });
  const ry = useSpring(0, { stiffness: 220, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    gx.set(px * 100); gy.set(py * 100);
  };
  const reset = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", transformPerspective: 900 }}
      className={cn("relative", className)}>
      <motion.div className="pointer-events-none absolute inset-0 z-10 opacity-0 hover:opacity-100 transition-opacity"
        style={{ background: useTransform([gx, gy], ([x, y]) => `radial-gradient(420px circle at ${x}% ${y}%, rgba(255,255,255,0.35), transparent 60%)`) }} />
      <div style={{ transform: "translateZ(40px)" }}>{children}</div>
    </motion.div>
  );
}

/* ---------------- Scroll progress bar ---------------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-kraft z-[60] progress-bar" style={{ scaleX: sx }} />;
}

/* ---------------- Section label (numbered, mono) ---------------- */
export function SectionLabel({ index, children, className }: { index?: string; children: React.ReactNode; className?: string }) {
  const { num } = useLang();
  return (
    <div className={cn("flex items-center gap-3 mono-label text-ink-soft", className)}>
      {index && <span className="text-kraft">[{num(index)}]</span>}
      <span className="h-px w-8 bg-ink/30" />
      <span>{children}</span>
    </div>
  );
}

/* ---------------- Reveal: word-by-word rise ---------------- */
export function Reveal({ text, className, as = "div", delay = 0 }: { text: string; className?: string; as?: "div" | "h1" | "h2" | "h3"; delay?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(" ");
  const Comp: any = motion[as];
  return (
    <Comp ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((w, i) => (
        // extra bottom room + matching negative margin so descenders (y, g, p)
        // are never clipped by the reveal mask, without changing layout.
        <span key={i} className="overflow-hidden inline-flex" style={{ marginRight: "0.22em", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.7, delay: delay + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

/* ---------------- Fade up on view ---------------- */
export function FadeUp({ children, delay = 0, className, y = 28 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Marquee ticker ---------------- */
export function Marquee({ items, reverse, className }: { items: string[]; reverse?: boolean; className?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("overflow-hidden w-full", className)}>
      <div className={cn("marquee", reverse && "marquee-rev")}>
        {doubled.map((it, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 display text-[clamp(28px,5vw,64px)] whitespace-nowrap">
            {it}
            <span className="text-kraft text-[0.6em]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Magnetic button ---------------- */
export function Magnetic({ children, className, strength = 0.4 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x, y }} className={cn("inline-block", className)}>
      {children}
    </motion.div>
  );
}

/* ---------------- Parallax wrapper ---------------- */
export function Parallax({ children, speed = 0.2, className }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ---------------- Counter ---------------- */
export function Counter({ to, suffix = "", prefix = "", duration = 1.6, className }: { to: number; suffix?: string; prefix?: string; duration?: number; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!inView) return;
    let raf = 0; const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  const { num } = useLang();
  const display = Number.isInteger(to) ? Math.round(val).toString() : val.toFixed(1);
  return <span ref={ref} className={className}>{prefix}{num(display)}{suffix}</span>;
}
