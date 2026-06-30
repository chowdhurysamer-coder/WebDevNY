import { useRef, useState } from "react";
import { SiteMock } from "@/components/SiteMock";

type V = "restaurant" | "dental" | "gym" | "salon" | "legal" | "realestate";

/** Drag the handle to wipe between a dated "before" and the WebDev NY "after". */
export function BeforeAfter({ variant }: { variant: V }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromX = (clientX: number) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div ref={ref} data-cursor-label="DRAG"
      className="relative overflow-hidden select-none card-paper cursor-ew-resize aspect-[16/10]"
      onPointerDown={(e) => { dragging.current = true; setFromX(e.clientX); }}
      onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}>

      {/* AFTER (full) */}
      <div className="absolute inset-0"><SiteMock variant={variant} className="w-full h-full" /></div>

      {/* BEFORE (clipped) — a deliberately dated site */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <DatedSite />
      </div>

      {/* labels */}
      <span className="absolute top-3 left-3 mono-label bg-ink/80 text-paper px-2 py-1 z-10">Before</span>
      <span className="absolute top-3 right-3 mono-label bg-kraft text-paper px-2 py-1 z-10">After</span>

      {/* handle */}
      <div className="absolute top-0 bottom-0 z-20" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="w-0.5 h-full bg-paper shadow-[0_0_0_1px_rgba(0,0,0,0.3)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-paper border border-ink grid place-items-center text-ink shadow-lg">
          <span className="text-xs">⇄</span>
        </div>
      </div>
    </div>
  );
}

function DatedSite() {
  return (
    <div className="w-full h-full bg-[#dfe3e8] text-[#1a1a1a] p-4 overflow-hidden" style={{ fontFamily: "Times New Roman, serif" }}>
      <div className="flex items-center justify-between border-b-2 border-[#888] pb-2 mb-3">
        <span className="text-lg font-bold text-[#003366] underline">Your Business Name</span>
        <span className="text-[10px] text-blue-800 underline">Home | About | Services | Contact</span>
      </div>
      <div className="text-center mb-3">
        <div className="inline-block bg-[#003366] text-yellow-300 px-3 py-1 text-sm font-bold border-2 border-red-600">★ WELCOME TO OUR WEBSITE ★</div>
      </div>
      <div className="grid grid-cols-[1fr_90px] gap-3">
        <div>
          <p className="text-[9px] leading-snug mb-2">We are a leading provider of quality services in the local area. Please browse our website to learn more about what we offer. We have been in business for many years and pride ourselves on customer satisfaction.</p>
          <p className="text-[9px] leading-snug text-blue-800 underline mb-2">Click here to learn more »»»</p>
          <div className="bg-[#cccccc] border border-[#999] p-1.5 text-[8px]">Sign up for our newsletter! Enter email: [____________] [Submit]</div>
        </div>
        <div className="bg-[#ffffcc] border border-[#cc9900] p-1.5 text-[8px] text-center">
          <div className="font-bold mb-1">SPECIAL OFFER!</div>
          <div>Call us today at<br />(555) 123-4567</div>
          <div className="mt-2 text-[7px] text-gray-600">Best viewed in<br />Internet Explorer</div>
        </div>
      </div>
      <div className="mt-3 text-center text-[7px] text-gray-500">© 2009 · Hit Counter: 004217</div>
    </div>
  );
}
