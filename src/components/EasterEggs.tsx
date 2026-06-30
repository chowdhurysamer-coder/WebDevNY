import { useEffect } from "react";
import { burstConfetti } from "@/components/Confetti";
import { sfx } from "@/lib/sfx";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export function EasterEggs() {
  useEffect(() => {
    let firedBottom = sessionStorage.getItem("webdevny_confetti") === "1";
    const onScroll = () => {
      if (firedBottom) return;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 6) {
        firedBottom = true;
        sessionStorage.setItem("webdevny_confetti", "1");
        burstConfetti(window.innerWidth / 2, window.innerHeight - 80);
        sfx.chime();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let seq: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      seq.push(e.key);
      seq = seq.slice(-KONAMI.length);
      if (KONAMI.every((k, i) => k.toLowerCase() === (seq[i] || "").toLowerCase())) {
        seq = [];
        // triple burst across the screen
        [0.25, 0.5, 0.75].forEach((fx, i) =>
          setTimeout(() => { burstConfetti(window.innerWidth * fx, window.innerHeight * 0.4); sfx.pop(); }, i * 180)
        );
        sfx.chime();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);
  return null;
}
