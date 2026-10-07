"use client";

import { useEffect, useMemo, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let frame = 0;
    let active = true;

    const tick = () => {
      if (!active) return;
      const next = text
        .split("")
        .map((char, index) => {
          if (index < frame) return char;
          if (char === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(next);
      frame += 1;
      if (frame <= text.length) {
        requestAnimationFrame(tick);
      }
    };

    setDisplay(text);
    frame = 0;
    requestAnimationFrame(tick);

    return () => {
      active = false;
    };
  }, [text]);

  return <>{display}</>;
}
