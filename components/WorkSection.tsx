"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import type { Project } from "@prisma/client";
import { LinkPill } from "./LinkPill";

function getProjectImage(project: Project): string | null {
  if (!project.coverImage) return null;
  const value = project.coverImage.trim();
  if (!value) return null;
  if (value.startsWith("/") || value.startsWith("http")) {
    return value;
  }
  return null;
}

export function WorkSection({ projects }: { projects: Project[] }) {
  const scrollRowRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(true);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = () => {
    const row = scrollRowRef.current;
    if (!row) return;

    const atStart = row.scrollLeft <= 2;
    const atEnd = row.scrollLeft >= row.scrollWidth - row.clientWidth - 2;

    setCanScrollPrev(!atStart);
    setCanScrollNext(!atEnd);
  };

  useEffect(() => {
    const row = scrollRowRef.current;
    if (!row) return;

    updateScrollState();
    row.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      row.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [projects.length]);

  const scrollByCards = (direction: 1 | -1) => {
    const row = scrollRowRef.current;
    if (!row) return;

    const firstCard = row.querySelector<HTMLElement>("[data-project-card]");
    if (!firstCard) return;

    const computedStyle = window.getComputedStyle(row);
    const gap = parseFloat(computedStyle.columnGap || computedStyle.gap || "24");
    const cardWidth = firstCard.offsetWidth;
    const distance = cardWidth + gap;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    row.scrollBy({
      left: direction * distance,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section id="projects" className="relative z-10 w-full min-w-0 py-6">
      <style jsx>{`
        .project-scroll-row::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="w-full min-w-0 space-y-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 py-1 text-xs font-mono font-medium text-[var(--accent)]">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              <span>Engineered Systems & Research</span>
            </div>
            <h3 className="font-display text-3xl font-semibold tracking-tight text-[var(--fg)] sm:text-4xl">
              Featured Work
            </h3>
            <p className="max-w-xl text-sm text-[var(--dim)]">
              Production systems, desktop security tools, and scalable web architectures built with modern engineering practices.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              aria-label="Previous projects"
              aria-disabled={!canScrollPrev}
              disabled={!canScrollPrev}
              onClick={() => scrollByCards(-1)}
              className={`flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--fg)] transition-all active:scale-95 ${
                canScrollPrev ? "cursor-pointer hover:border-[var(--accent-line)] hover:text-[var(--accent)]" : "cursor-not-allowed opacity-40"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next projects"
              aria-disabled={!canScrollNext}
              disabled={!canScrollNext}
              onClick={() => scrollByCards(1)}
              className={`flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--fg)] transition-all active:scale-95 ${
                canScrollNext ? "cursor-pointer hover:border-[var(--accent-line)] hover:text-[var(--accent)]" : "cursor-not-allowed opacity-40"
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRowRef}
          className="project-scroll-row relative flex min-w-0 flex-nowrap gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-3 -my-3"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            columnGap: "1.5rem",
            rowGap: "1.5rem",
          }}
        >
          {projects.map((project, idx) => {
            const imageUrl = getProjectImage(project);

            return (
              <article
                key={project.id}
                data-project-card
                className="group relative w-[85vw] shrink-0 snap-start overflow-visible sm:w-[calc((100%-var(--gap))/2)] min-[1024px]:w-[calc((100%-2*var(--gap))/3)]"
                style={{
                  minWidth: 0,
                  // @ts-expect-error CSS variables are valid on React style objects here
                  ["--gap" as string]: "1.5rem",
                }}
              >
                <div className="flex min-h-[420px] w-full flex-col overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--panel)] shadow-[0_12px_35px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-line)]">
                  <div className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--code-bg)] px-4 py-3 select-none">
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)]/70" />
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--dim)]" />
                      <span className="ml-2 truncate font-mono text-[11px] text-[var(--dim)] max-w-[200px]">
                        {project.title.split("—")[0].trim()}
                      </span>
                    </div>

                    <span className="rounded border border-[var(--line)] bg-[var(--hover-bg)] px-2 py-0.5 font-mono text-[10px] text-[var(--dim)]">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                  </div>

                  {imageUrl ? (
                    <div className="relative h-56 overflow-hidden border-b border-[var(--line)] bg-[var(--code-bg)] sm:h-64">
                      <img
                        src={imageUrl}
                        alt={project.title}
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                        }}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      <div className="absolute bottom-3 left-4 flex items-center gap-2">
                        <span className="flex items-center gap-1.5 rounded-md border border-white/15 bg-black/75 px-2.5 py-1 font-mono text-[11px] text-white">
                          <Lock className="h-3 w-3 text-[var(--accent)]" />
                          <span>Interactive Preview</span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-56 items-center justify-center border-b border-[var(--line)] bg-[var(--code-bg)] px-6 text-center sm:h-64">
                      <div className="space-y-2">
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--dim)]">
                          <Lock className="h-4 w-4" />
                        </div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--dim)]">
                          Preview Unavailable
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                    <div className="space-y-2">
                      <h4 className="font-display text-xl font-semibold text-[var(--fg)] sm:text-2xl">
                        {project.title}
                      </h4>
                      <p className="line-clamp-3 text-sm leading-relaxed text-[var(--dim)] sm:line-clamp-4">
                        {project.description}
                      </p>
                    </div>

                    {project.techTags && project.techTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.techTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg border border-[var(--line)] bg-[var(--hover-bg)] px-2.5 py-1 font-mono text-[11px] text-[var(--fg-2)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-3">
                      <div className="flex flex-wrap gap-2.5">
                        {project.liveUrl && <LinkPill href={project.liveUrl}>Live Site</LinkPill>}
                        {project.repoUrl && <LinkPill href={project.repoUrl}>Source Code</LinkPill>}
                      </div>
                      <span className="hidden font-mono text-[11px] text-[var(--dim)] sm:inline">
                        Swipe / Scroll →
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
