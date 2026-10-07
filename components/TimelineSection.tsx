"use client";

import { ReactNode } from "react";
import type { Internship, Education } from "@prisma/client";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  dateRange: string;
  description?: string | null;
  linkUrl?: string | null;
  linkLabel?: string;
  badge?: string;
}

export function TimelineItem({
  title,
  subtitle,
  dateRange,
  description,
  linkUrl,
  linkLabel = "Learn more ↗",
  badge,
}: TimelineItemProps) {
  return (
    <div className="group relative border-l border-[var(--line)] pl-8 pb-10 last:pb-2 transition-colors hover:border-[var(--accent-line)]">
      {/* Timeline Bullet Node */}
      <div className="absolute -left-[7.5px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] transition-all group-hover:scale-125 group-hover:bg-[var(--accent)]" />

      {/* Card Content with subtle hover lift */}
      <div className="space-y-3 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 transition-all duration-300 hover:border-[var(--accent-line)] hover:shadow-[0_12px_24px_rgba(3,105,161,0.06)] sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full border border-[var(--line)] bg-[var(--hover-bg)] px-2.5 py-0.5 font-mono text-xs font-medium text-[var(--accent)]">
            {dateRange}
          </span>
          {badge && <span className="font-mono text-xs text-[var(--dim)]">{badge}</span>}
        </div>

        <div>
          <h4 className="font-display text-xl font-semibold text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
            {title} <span className="text-[var(--dim)] font-normal text-base">at</span> {subtitle}
          </h4>
        </div>

        {description && (
          <p className="whitespace-pre-line pt-1 text-sm leading-relaxed text-[var(--fg-2)]">{description}</p>
        )}

        {linkUrl && (
          <div className="pt-2">
            <a
              href={linkUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-sm font-medium text-[var(--accent)] underline decoration-[var(--accent-line)] underline-offset-4 transition-colors hover:text-[var(--accent-hover)]"
            >
              {linkLabel}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

interface ExperienceTimelineProps {
  internships: Internship[];
}

export function ExperienceSection({ internships }: ExperienceTimelineProps) {
  if (internships.length === 0) return null;

  return (
    <section id="experience" className="relative z-10 w-full py-6">
      <div className="mx-auto w-full max-w-7xl space-y-12 px-6 sm:px-10 lg:px-12">
        <div className="space-y-1">
          <h3 className="font-display text-3xl font-semibold text-[var(--fg)]">Experience</h3>
          <p className="text-sm text-[var(--dim)]">Professional roles, internships, and security research</p>
        </div>

        <div className="space-y-2">
          {internships.map((internship) => (
            <TimelineItem
              key={internship.id}
              title={internship.role}
              subtitle={internship.company}
              dateRange={`${new Date(internship.startDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })} — ${
                internship.endDate
                  ? new Date(internship.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : "Present"
              }`}
              description={internship.description}
              linkUrl={internship.url}
              linkLabel="Company site ↗"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface EducationSectionProps {
  educationList: Education[];
}

export function EducationSection({ educationList }: EducationSectionProps) {
  if (educationList.length === 0) return null;

  return (
    <section id="education" className="relative z-10 w-full py-6">
      <div className="mx-auto w-full max-w-7xl space-y-12 px-6 sm:px-10 lg:px-12">
        <div className="space-y-1">
          <h3 className="font-display text-3xl font-semibold text-[var(--fg)]">Education</h3>
          <p className="text-sm text-[var(--dim)]">Academic degrees, coursework, and specialized studies</p>
        </div>

        <div className="space-y-2">
          {educationList.map((edu) => (
            <TimelineItem
              key={edu.id}
              title={`${edu.degree} in ${edu.fieldOfStudy}`}
              subtitle={edu.institution}
              dateRange={`${new Date(edu.startDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })} — ${
                edu.endDate
                  ? new Date(edu.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : "Present"
              }`}
              description={edu.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
