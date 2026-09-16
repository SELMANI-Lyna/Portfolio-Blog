"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface CursorGlowProps {
  className?: string;
  isFullBleed?: boolean;
}

export function CursorGlow({ className = "", isFullBleed = false }: CursorGlowProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const element = glowRef.current?.parentElement;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (glowRef.current) {
        if (isFullBleed) {
          const xPct = (x / rect.width) * 100;
          const yPct = (y / rect.height) * 100;
          glowRef.current.style.setProperty("--gx", `${xPct}%`);
          glowRef.current.style.setProperty("--gy", `${yPct}%`);
        } else {
          glowRef.current.style.setProperty("--gx", `${x}px`);
          glowRef.current.style.setProperty("--gy", `${y}px`);
        }
      }
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", () => setIsHovered(true));
    element.addEventListener("mouseleave", () => setIsHovered(false));

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", () => setIsHovered(true));
      element.removeEventListener("mouseleave", () => setIsHovered(false));
    };
  }, [isFullBleed, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={glowRef}
      className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ${
        isHovered ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={{
        background: `
          radial-gradient(
            circle at var(--gx, 50%) var(--gy, 50%), 
            rgba(110, 44, 99, 0.18) 0%, 
            rgba(169, 150, 214, 0.14) 30%, 
            rgba(183, 180, 190, 0.10) 60%, 
            transparent 80%
          )
        `,
      }}
    />
  );
}
