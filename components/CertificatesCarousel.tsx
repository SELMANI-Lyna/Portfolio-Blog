"use client";

import { useRef } from "react";
import type { Certificate } from "@prisma/client";
import { LinkPill } from "./LinkPill";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CertificatesCarouselProps {
  certificates: Certificate[];
}

export function CertificatesCarousel({ certificates }: CertificatesCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 360;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (certificates.length === 0) {
    return null;
  }

  return (
    <section id="certificates" className="w-full relative z-10">
      <div className="max-w-[1100px] px-6 md:px-10 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-display text-3xl font-semibold text-ink">Certifications</h3>
            <p className="text-muted text-sm">Verified credentials and professional certifications</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous certificates"
              className="w-9 h-9 rounded-full border border-line bg-white/80 hover:bg-white hover:border-lav-300 text-ink flex items-center justify-center transition-colors shadow-xs active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next certificates"
              className="w-9 h-9 rounded-full border border-line bg-white/80 hover:bg-white hover:border-lav-300 text-ink flex items-center justify-center transition-colors shadow-xs active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable container with scroll snap */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex-none w-[300px] sm:w-[350px] snap-start bg-white rounded-2xl border border-line shadow-sm hover:shadow-md hover:border-lav-300 transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Window Chrome Header */}
              <div className="flex items-center px-4 py-3 bg-[#FAFAFC] border-b border-line gap-3">
                <div className="flex items-center gap-1.5 flex-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-berry-600 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-lav-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-grey-400 inline-block" />
                </div>
                <span className="font-mono text-xs text-muted truncate max-w-[200px]" title={cert.title}>
                  {cert.title}
                </span>
              </div>

              {/* Window Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                {cert.fileUrl ? (
                  <div className="w-full h-40 bg-grey-400/20 rounded-xl overflow-hidden border border-line/60 relative">
                    <img
                      src={cert.fileUrl}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-full h-28 bg-berry-50/50 rounded-xl border border-berry-200/50 flex items-center justify-center text-berry-600 font-mono text-xs">
                    Verified Credential
                  </div>
                )}

                <div className="space-y-1.5">
                  <h4 className="font-display text-lg font-semibold text-ink line-clamp-1">
                    {cert.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-ink/80 font-medium text-xs sm:text-sm">{cert.issuer}</span>
                    <span className="text-line">•</span>
                    <span className="font-mono text-xs text-grey-400">
                      {new Date(cert.dateIssued).getFullYear()}
                    </span>
                  </div>
                </div>

                {cert.credentialUrl && (
                  <div className="pt-2 mt-auto">
                    <LinkPill href={cert.credentialUrl}>Verify Credential</LinkPill>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
