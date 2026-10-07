"use client";
import { useEffect, useRef } from "react";

export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const p = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, p)})`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-0.5">
      <div ref={bar} className="th-bar h-full origin-left" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
