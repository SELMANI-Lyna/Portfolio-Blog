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
  const [renderedOutputCount, setRenderedOutputCount] = useState(0);

  const commandText = useMemo(() => {
    const entry = ghostTerminalEntries[entryIndex];
    return entry ? `lyna@estin:~$ ${entry.command}` : "";
  }, [entryIndex]);

  const prompt = "lyna@estin:~$";
  const typedCommandText = typedText.startsWith(prompt) ? typedText.slice(prompt.length + 1) : typedText;
  const remainingCommandText = commandText.startsWith(prompt) ? commandText.slice(prompt.length + 1) : commandText;

  useEffect(() => {
    if (prefersReducedMotion) {
      const allLines = ghostTerminalEntries.flatMap((entry) => [
        `lyna@estin:~$ ${entry.command}`,
        ...entry.output,
      ]);
      setTypedText(allLines.join("\n"));
      setRenderedOutputCount(Math.max(...ghostTerminalEntries.map((entry) => entry.output.length)));
      setShowOutput(true);
      return;
    }

    const current = ghostTerminalEntries[entryIndex];
    if (!current) return;

    const chars = commandText.split("");
    let charIndex = 0;
    let typingTimer: NodeJS.Timeout | undefined;
    let outputLineTimer: NodeJS.Timeout | undefined;

    setTypedText("");
    setRenderedOutputCount(0);
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
          let lineIndex = 0;

          const renderNextLine = () => {
            if (lineIndex >= current.output.length) {
              setTimeout(() => {
                setEntryIndex((prev) => (prev + 1) % ghostTerminalEntries.length);
              }, 400);
              return;
            }

            setRenderedOutputCount(lineIndex + 1);
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
      clearTimeout(outputLineTimer);
    };
  }, [entryIndex, prefersReducedMotion, commandText]);

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
          <div className="whitespace-pre-wrap break-words text-[var(--fg)]">{fullText}</div>
        ) : (
          <div className="relative grid w-full">
            {ghostTerminalEntries.map((entry, entryIdx) => {
              const currentEntry = entryIdx === entryIndex;
              const visibleOutputCount = currentEntry ? renderedOutputCount : entry.output.length;
              const isVisible = currentEntry;

              return (
                <div
                  key={entry.command}
                  aria-hidden={!isVisible}
                  className="col-start-1 row-start-1 transition-opacity duration-200 ease-linear"
                  style={{ opacity: isVisible ? 1 : 0 }}
                >
                  <div className="space-y-1 whitespace-pre-wrap break-words">
                    <div className="block text-[var(--fg)] opacity-80">
                      <span className="text-[var(--accent)]">{prompt}</span>
                      <span className="ml-1 text-[var(--fg)]">
                        {currentEntry ? (
                          <>
                            <span>{typedCommandText}</span>
                            <span className="opacity-0">{remainingCommandText}</span>
                          </>
                        ) : (
                          <span>{entry.command}</span>
                        )}
                      </span>

                      <span
                        className="ml-[0.12ch] inline-block h-[1em] w-[0.6ch] overflow-hidden align-middle bg-[var(--fg)]"
                        style={{ opacity: currentEntry && cursorVisible ? 1 : 0 }}
                      />
                    </div>

                    <div className="space-y-1 text-[var(--dim)] opacity-55">
                      {entry.output.map((line, lineIdx) => {
                        const isRendered = currentEntry ? lineIdx < visibleOutputCount : true;
                        return (
                          <div
                            key={`${entry.command}-${line}-${lineIdx}`}
                            aria-hidden={!isRendered}
                            style={{ opacity: isRendered ? 1 : 0 }}
                          >
                            {line}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
