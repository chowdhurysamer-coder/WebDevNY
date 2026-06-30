import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Ripple { x: number; y: number; size: number; id: number }

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const RippleButton = ({ children, className, onClick, ...props }: RippleButtonProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple: Ripple = { x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2, size, id: Date.now() };
    setRipples((r) => [...r, ripple]);
    setTimeout(() => setRipples((r) => r.filter((rr) => rr.id !== ripple.id)), 600);
    onClick?.(e);
  };

  return (
    <button ref={ref} onClick={handleClick} className={cn("relative overflow-hidden", className)} {...props}>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/20 pointer-events-none animate-ping"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size, animationDuration: "0.6s", animationIterationCount: 1 }}
        />
      ))}
      {children}
    </button>
  );
};
