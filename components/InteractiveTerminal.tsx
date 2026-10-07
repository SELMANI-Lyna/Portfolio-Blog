"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ghostTerminalEntries } from "@/lib/portfolio";

const RANDOM_BASE = 35;
const RANDOM_RANGE = 20;

function getTypingDelay() {
  return RANDOM_BASE + Math.random() * RANDOM_RANGE;
}

export function InteractiveTerminal() {
  const prefersReducedMotion = useReducedMotion();
  const [entryIndex, setEntryIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [renderedOutput, setRenderedOutput] = useState<string[]>([]);

  const timeline = useMemo(() => {
    return ghostTerminalEntries.flatMap((entry) => [
      { type: "command", text: `lyna@estin:~$ ${entry.command}` },
      { type: "output", text: entry.output },
    ]);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      const allLines = ghostTerminalEntries.flatMap((entry) => [
        `lyna@estin:~$ ${entry.command}`,
        ...entry.output,
      ]);
      setTypedText(allLines.join("\n"));
      setRenderedOutput(allLines);
      setShowOutput(true);
      return;
    }

    const current = ghostTerminalEntries[entryIndex];
    if (!current) return;

    const commandText = `lyna@estin:~$ ${current.command}`;
    const chars = commandText.split("");
    let charIndex = 0;
    let typingTimer: NodeJS.Timeout | undefined;
    let outputTimer: NodeJS.Timeout | undefined;
    let outputLineTimer: NodeJS.Timeout | undefined;
    let resetTimer: NodeJS.Timeout | undefined;

    setTypedText("");
    setRenderedOutput([]);
    setShowOutput(false);
    setCursorVisible(true);

    const tickTyping = () => {
      if (charIndex <= chars.length) {
        setTypedText(chars.slice(0, charIndex).join(""));
        charIndex += 1;
        typingTimer = setTimeout(tickTyping, getTypingDelay());
      } else {
        setTimeout(() => {
          setShowOutput(true);
          const outputLines = current.output;
          let lineIndex = 0;

          const renderNextLine = () => {
            if (lineIndex >= outputLines.length) {
              setTimeout(() => {
                setEntryIndex((prev) => (prev + 1) % ghostTerminalEntries.length);
              }, 400);
              return;
            }

            setRenderedOutput(outputLines.slice(0, lineIndex + 1));
            lineIndex += 1;
            outputLineTimer = setTimeout(renderNextLine, 90);
          };

          renderNextLine();
        }, 400);
      }
    };

    tickTyping();

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(outputTimer);
      clearTimeout(outputLineTimer);
      clearTimeout(resetTimer);
    };
  }, [entryIndex, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const blink = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(blink);
  }, [prefersReducedMotion, entryIndex]);

  useEffect(() => {
    if (!prefersReducedMotion && !showOutput) {
      return;
    }

    if (!prefersReducedMotion && entryIndex === ghostTerminalEntries.length - 1 && showOutput) {
      const finalReset = setTimeout(() => {
        setEntryIndex(0);
      }, 4000);
      return () => clearTimeout(finalReset);
    }
  }, [entryIndex, prefersReducedMotion, showOutput]);

  const fullText = useMemo(() => {
    return ghostTerminalEntries.flatMap((entry) => [
      `lyna@estin:~$ ${entry.command}`,
      ...entry.output,
    ]).join("\n");
  }, []);

  const maskStyle = {
    maskImage:
      "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.9) 6%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0.9) 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 82%, transparent 100%)",
    WebkitMaskImage:
      "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.9) 6%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0.9) 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 82%, transparent 100%)",
  };

  const currentOutput = showOutput ? renderedOutput : [];
  const lineCount = currentOutput.length;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none overflow-hidden"
      style={{
        ...maskStyle,
        height: "100%",
        width: "100%",
        opacity: 0.9,
      }}
    >
      <div className="font-mono text-[clamp(0.75rem,0.9vw,1.05rem)] leading-[1.7] tracking-[-0.02em] text-[var(--fg)] opacity-90">
        {prefersReducedMotion ? (
          <div className="whitespace-pre-wrap break-words text-[var(--fg)]">
            {fullText}
          </div>
        ) : (
          <div className="space-y-1 whitespace-pre-wrap break-words">
            <div className="block text-[var(--fg)] opacity-80">
              <span className="text-[var(--accent)]">lyna@estin:~$</span>
              <span className="ml-1 text-[var(--fg)] opacity-80">{typedText}</span>
              {cursorVisible && typedText.length > 0 && <span className="inline-block h-[1em] w-[0.6ch] translate-y-[0.08em] bg-[var(--fg)] align-middle opacity-75" />}
              {!typedText && cursorVisible && (
                <span className="inline-block h-[1em] w-[0.6ch] translate-y-[0.08em] bg-[var(--fg)] align-middle opacity-75" />
              )}
            </div>

            {showOutput && currentOutput.length > 0 && (
              <div className="space-y-1 text-[var(--dim)] opacity-55">
                {currentOutput.map((line, idx) => (
                  <div key={`${line}-${idx}`}>{line}</div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
