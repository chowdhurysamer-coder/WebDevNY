/**
 * Hand-built stylized website mockups (no stock imagery).
 * Each variant renders a miniature, on-brand "screenshot" using pure markup.
 */
type Variant = "restaurant" | "dental" | "gym" | "salon" | "legal" | "realestate" | "ecommerce" | "medical";

const palettes: Record<Variant, { bg: string; ink: string; accent: string; label: string }> = {
  restaurant: { bg: "#211a14", ink: "#f3ebdd", accent: "#d98a3d", label: "Trattoria" },
  dental:     { bg: "#0f2733", ink: "#eaf6fb", accent: "#37b6c4", label: "BrightSmile" },
  gym:        { bg: "#141414", ink: "#f0f0f0", accent: "#7ee06b", label: "IronWorks" },
  salon:      { bg: "#2a1620", ink: "#f7e9f0", accent: "#e07ab0", label: "Maison" },
  legal:      { bg: "#15171f", ink: "#e9ebf2", accent: "#9d86e0", label: "Park Ave Legal" },
  realestate: { bg: "#1c1a12", ink: "#f3efdf", accent: "#e0b84a", label: "Hudson Realty" },
  ecommerce:  { bg: "#231320", ink: "#f7e7f2", accent: "#e0648f", label: "The Boutique" },
  medical:    { bg: "#0e2624", ink: "#e6f6f3", accent: "#3dc9a3", label: "Clinic NYC" },
};

export function SiteMock({ variant, className }: { variant: Variant; className?: string }) {
  const p = palettes[variant];
  return (
    <div className={className} style={{ background: p.bg, color: p.ink }}>
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 px-3 h-7 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <span className="w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.25)" }} />
        <span className="w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.18)" }} />
        <span className="w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
        <span className="ml-2 text-[8px] font-mono opacity-40">{p.label.toLowerCase().replace(/\s/g, "")}.nyc</span>
      </div>

      {/* nav */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-[11px] font-semibold tracking-tight" style={{ fontFamily: "Fraunces, serif" }}>{p.label}</span>
        <div className="hidden sm:flex gap-2.5">
          {["Menu", "About", "Book"].map((n) => <span key={n} className="text-[7px] opacity-50">{n}</span>)}
        </div>
        <span className="text-[7px] px-2 py-1 rounded-full" style={{ background: p.accent, color: p.bg }}>Reserve</span>
      </div>

      {/* hero */}
      <div className="px-4 pt-3 pb-4">
        <div className="text-[7px] font-mono mb-2" style={{ color: p.accent }}>● {variant.toUpperCase()}</div>
        <div className="leading-[1] mb-2" style={{ fontFamily: "Fraunces, serif", fontSize: 22, letterSpacing: "-0.04em" }}>
          {heroLines[variant][0]}<br />
          <span style={{ color: p.accent, fontStyle: "italic" }}>{heroLines[variant][1]}</span>
        </div>
        <div className="flex gap-1.5 mt-3">
          <span className="h-1.5 w-12 rounded-full" style={{ background: p.accent }} />
          <span className="h-1.5 w-8 rounded-full" style={{ background: "rgba(255,255,255,0.18)" }} />
        </div>
      </div>

      {/* content cards */}
      <div className="grid grid-cols-3 gap-1.5 px-4 pb-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md p-2 aspect-[3/4] flex flex-col justify-end" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="w-full h-1 rounded mb-1" style={{ background: i === 1 ? p.accent : "rgba(255,255,255,0.2)" }} />
            <span className="w-2/3 h-1 rounded" style={{ background: "rgba(255,255,255,0.12)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

const heroLines: Record<Variant, [string, string]> = {
  restaurant: ["Tonight,", "we feast."],
  dental:     ["Smiles", "engineered."],
  gym:        ["Stronger", "every rep."],
  salon:      ["Beauty,", "by design."],
  legal:      ["We win", "for you."],
  realestate: ["Find your", "address."],
  ecommerce:  ["Wear it", "first."],
  medical:    ["Care that", "listens."],
};
