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
    <div className="group relative pl-8 border-l border-line pb-10 last:pb-2 hover:border-lav-300 transition-colors">
      {/* Timeline Bullet Node */}
      <div className="absolute w-3.5 h-3.5 bg-bone border-2 border-lav-500 rounded-full -left-[7.5px] top-1.5 group-hover:bg-lav-500 group-hover:scale-125 transition-all shadow-xs" />

      {/* Card Content with subtle hover lift */}
      <div className="bg-white/70 hover:bg-white p-5 sm:p-6 rounded-2xl border border-line/80 hover:border-lav-300 hover:shadow-md transition-all duration-300 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs font-medium text-lav-500 bg-berry-50 px-2.5 py-0.5 rounded-full border border-lav-300/40">
            {dateRange}
          </span>
          {badge && (
            <span className="font-mono text-xs text-muted">
              {badge}
            </span>
          )}
        </div>

        <div>
          <h4 className="font-display text-xl font-semibold text-ink group-hover:text-berry-800 transition-colors">
            {title} <span className="text-muted font-normal text-base">at</span> {subtitle}
          </h4>
        </div>

        {description && (
          <p className="text-ink/80 leading-relaxed text-sm pt-1 whitespace-pre-line">
            {description}
          </p>
        )}

        {linkUrl && (
          <div className="pt-2">
            <a
              href={linkUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-sm font-medium text-berry-600 hover:text-berry-800 underline underline-offset-4"
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
    <section id="experience" className="w-full relative z-10">
      <div className="max-w-[1100px] px-6 md:px-10 space-y-12">
        <div className="space-y-1">
          <h3 className="font-display text-3xl font-semibold text-ink">Experience</h3>
          <p className="text-muted text-sm">Professional roles, internships, and security research</p>
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
    <section id="education" className="w-full relative z-10">
      <div className="max-w-[1100px] px-6 md:px-10 space-y-12">
        <div className="space-y-1">
          <h3 className="font-display text-3xl font-semibold text-ink">Education</h3>
          <p className="text-muted text-sm">Academic degrees, coursework, and specialized studies</p>
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
