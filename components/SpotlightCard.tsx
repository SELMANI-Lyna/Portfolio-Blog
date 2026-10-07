"use client";
import type { ReactNode } from "react";

export function SpotlightCard({ children }: { children: ReactNode }) {
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className="th-panel group relative overflow-hidden rounded-xl"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--x,50%) var(--y,50%), var(--glow), transparent 70%)",
        }}
      />
      <div className="relative p-6">{children}</div>
    </div>
  );
}
