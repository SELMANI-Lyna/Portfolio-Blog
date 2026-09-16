"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

const COLOR_GREY: ColorRGB = { r: 183, g: 180, b: 190 }; // grey-400 (#B7B4BE)
const COLOR_LAV: ColorRGB = { r: 169, g: 150, b: 214 };  // lav-500 (#A996D6)
const COLOR_BERRY: ColorRGB = { r: 155, g: 78, b: 143 };  // berry-600 (#9B4E8F)

function interpolateColorByProgress(progress: number): ColorRGB {
  const p = Math.max(0, Math.min(1, progress));
  if (p <= 0.5) {
    const t = p / 0.5;
    return {
      r: Math.round(COLOR_GREY.r + (COLOR_LAV.r - COLOR_GREY.r) * t),
      g: Math.round(COLOR_GREY.g + (COLOR_LAV.g - COLOR_GREY.g) * t),
      b: Math.round(COLOR_GREY.b + (COLOR_LAV.b - COLOR_GREY.b) * t),
    };
  } else {
    const t = (p - 0.5) / 0.5;
    return {
      r: Math.round(COLOR_LAV.r + (COLOR_BERRY.r - COLOR_LAV.r) * t),
      g: Math.round(COLOR_LAV.g + (COLOR_BERRY.g - COLOR_LAV.g) * t),
      b: Math.round(COLOR_LAV.b + (COLOR_BERRY.b - COLOR_LAV.b) * t),
    };
  }
}

export function HeroMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsInteractive(mediaQuery.matches && !prefersReducedMotion);

    const handler = (e: MediaQueryListEvent) => {
      setIsInteractive(e.matches && !prefersReducedMotion);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const CELL_SIZE = 24;
    const GAP = 6;
    const STEP = CELL_SIZE + GAP;
    const RADIUS = 180;
    const RADIUS_SQ = RADIUS * RADIUS;

    // Mouse coordinates relative to container
    let mouseX = -1000;
    let mouseY = -1000;
    let isHovering = false;

    // Grid state storage for smooth intensity transition
    let cols = 0;
    let rows = 0;
    let cellIntensities: Float32Array = new Float32Array(0);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / STEP) + 1;
      rows = Math.ceil(height / STEP) + 1;
      cellIntensities = new Float32Array(cols * rows);
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const onMouseEnter = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const onMouseLeave = () => {
      isHovering = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    if (isInteractive) {
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseenter", onMouseEnter);
      container.addEventListener("mouseleave", onMouseLeave);
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Render cells
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const x = c * STEP;
          const y = r * STEP;

          const centerX = x + CELL_SIZE / 2;
          const centerY = y + CELL_SIZE / 2;

          let targetIntensity = 0;

          if (isHovering && isInteractive) {
            const dx = centerX - mouseX;
            const dy = centerY - mouseY;
            const distSq = dx * dx + dy * dy;

            if (distSq < RADIUS_SQ) {
              const dist = Math.sqrt(distSq);
              // Smooth cosine decay for natural light falloff
              targetIntensity = Math.cos((dist / RADIUS) * (Math.PI / 2));
            }
          }

          // Lerp current intensity toward target intensity (100-150ms smooth transition)
          const current = cellIntensities[idx] || 0;
          const next = current + (targetIntensity - current) * 0.14;
          cellIntensities[idx] = next;

          // Base resting opacity: 0.04
          const totalOpacity = 0.04 + next * 0.7;

          // Color based on horizontal progress across hero
          const progress = centerX / (width || 1);
          const color = interpolateColorByProgress(progress);

          // Draw rounded rectangle cell
          const radius = 4;
          ctx.beginPath();
          ctx.roundRect(x, y, CELL_SIZE, CELL_SIZE, radius);

          // Fill
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${totalOpacity})`;
          ctx.fill();

          // Border for activated cells
          if (next > 0.05) {
            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${next * 0.8})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      if (isInteractive) {
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseenter", onMouseEnter);
        container.removeEventListener("mouseleave", onMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInteractive]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="pointer-events-none w-full h-full block" />
    </div>
  );
}
