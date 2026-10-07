"use client";

import { useRef, useState } from "react";
import type { Certificate } from "@prisma/client";
import { LinkPill } from "./LinkPill";
import { ChevronLeft, ChevronRight, Award, ShieldCheck, CheckCircle2, Lock } from "lucide-react";

interface CertificatesCarouselProps {
  certificates: Certificate[];
}

export function CertificatesCarousel({ certificates }: CertificatesCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  if (!certificates || certificates.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 380;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const newIndex = Math.round(scrollLeft / Math.min(clientWidth, 380));
    setScrollIndex(newIndex);
  };

  return (
    <section id="certificates" className="relative z-10 w-full py-6">
      <div className="w-full space-y-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 py-1 text-xs font-mono font-medium text-[var(--accent)]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verified Qualifications</span>
            </div>
            <h3 className="font-display text-3xl font-semibold tracking-tight text-[var(--fg)] sm:text-4xl">
              Certifications
            </h3>
            <p className="max-w-lg text-sm text-[var(--dim)]">
              Official industry credentials, cybersecurity qualifications, and academic honors.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous certificates"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--fg)] transition-all hover:border-[var(--accent-line)] hover:text-[var(--accent)] active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next certificates"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--fg)] transition-all hover:border-[var(--accent-line)] hover:text-[var(--accent)] active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[var(--bg)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[var(--bg)] to-transparent" />

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {certificates.map((cert, idx) => {
              const hash = `0x${((idx + 1) * 374921).toString(16).padStart(6, "0")}...${(idx * 891 + 104).toString(16)}`;

              return (
                <div
                  key={cert.id}
                  className="flex-none w-[300px] snap-start overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--panel)] shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-line)] sm:w-[360px]"
                >
                  <div className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--code-bg)] px-4 py-3 select-none">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)]/70" />
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--dim)]" />
                      <span className="ml-1.5 max-w-[180px] truncate font-mono text-[11px] text-[var(--dim)]">
                        {cert.issuer}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-500">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>VERIFIED</span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between space-y-5 p-6">
                    <div className="relative h-32 overflow-hidden rounded-2xl border border-[var(--line)] bg-[linear-gradient(135deg,var(--accent-soft),var(--panel))] p-4">
                      <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-[var(--accent-soft)] blur-xl" />
                      <div className="flex items-center justify-between font-mono text-xs text-[var(--fg-2)]">
                        <span className="flex items-center gap-1">
                          <Lock className="h-3 w-3 text-[var(--accent)]" />
                          <span>CREDENTIAL_ID</span>
                        </span>
                        <span className="text-[10px] text-[var(--dim)]">{hash}</span>
                      </div>

                      <div className="mt-8 space-y-1">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent)]">
                          {cert.issuer}
                        </span>
                        <div className="line-clamp-1 font-display text-sm font-semibold text-[var(--fg)]">
                          {cert.title}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="line-clamp-2 font-display text-lg font-semibold text-[var(--fg)] transition-colors hover:text-[var(--accent)]">
                        {cert.title}
                      </h4>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs font-medium text-[var(--fg-2)] sm:text-sm">{cert.issuer}</span>
                        <span className="text-[var(--line)]">•</span>
                        <span className="rounded border border-[var(--line)] bg-[var(--hover-bg)] px-2 py-0.5 font-mono text-xs text-[var(--dim)]">
                          {new Date(cert.dateIssued).getFullYear()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-[var(--line)] pt-3">
                      {cert.credentialUrl ? (
                        <LinkPill href={cert.credentialUrl}>Verify Credential</LinkPill>
                      ) : (
                        <span className="flex items-center gap-1 font-mono text-xs text-[var(--dim)]">
                          <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent)]" />
                          <span>Academic Honor</span>
                        </span>
                      )}
                      <span className="font-mono text-[10px] text-[var(--dim)]">ESTIN Lab</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            {certificates.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  scrollIndex === i ? "w-8 bg-[var(--accent)]" : "w-2 bg-[var(--line)]"
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-xs text-[var(--dim)]">
            {certificates.length} Credentials · Scroll horizontally
          </span>
        </div>
      </div>
    </section>
  );
}
