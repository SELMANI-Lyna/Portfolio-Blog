"use client";

import { LinkPill } from "./LinkPill";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import type { Project } from "@prisma/client";

const PROJECT_FALLBACK_IMAGES: Record<string, string> = {
  "DZ-Fit": "/projects/dz_fit.jpg",
  "Boutique": "/projects/boutique.jpg",
  "CommandBase": "/projects/commandbase.jpg",
};

function getProjectImage(project: Project): string {
  if (project.coverImage && (project.coverImage.startsWith("/") || project.coverImage.startsWith("http"))) {
    return project.coverImage;
  }

  for (const [key, path] of Object.entries(PROJECT_FALLBACK_IMAGES)) {
    if (project.title.toLowerCase().includes(key.toLowerCase())) {
      return path;
    }
  }

  return "/projects/commandbase.jpg";
}

export function WorkSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative z-10 w-full py-6">
      <div className="w-full space-y-8">
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
              aria-label="Previous projects"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--fg)] transition-all hover:border-[var(--accent-line)] hover:text-[var(--accent)] active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next projects"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--fg)] transition-all hover:border-[var(--accent-line)] hover:text-[var(--accent)] active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, idx) => {
            const imageUrl = getProjectImage(project);

            return (
              <article
                key={project.id}
                className="group flex min-h-[420px] w-full flex-col overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--panel)] shadow-[0_12px_35px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-line)]"
              >
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

                <div className="relative h-56 overflow-hidden border-b border-[var(--line)] bg-[var(--code-bg)] sm:h-64">
                  <img
                    src={imageUrl}
                    alt={project.title}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = "/projects/commandbase.jpg";
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
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
