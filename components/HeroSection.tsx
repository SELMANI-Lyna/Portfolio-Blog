"use client";

import { useState } from "react";
import { CursorGlow } from "./CursorGlow";
import { HeroMatrix } from "./HeroMatrix";
import { SocialIcons } from "./SocialIcons";
import { MagneticButton } from "./MagneticButton";
import { InteractiveTerminal } from "./InteractiveTerminal";
import { CvModal } from "./CvModal";
import { FileText } from "lucide-react";
import type { Profile } from "@prisma/client";

interface HeroSectionProps {
  profile: Profile | null;
  formattedDate: string;
}

export function HeroSection({ profile, formattedDate }: HeroSectionProps) {
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const profileData = profile as any;

  const name = profileData?.name || "Lyna Selmani";
  const tagline = profileData?.tagline || "4th Year Computer Science Student at ESTIN";
  const bio =
    profileData?.bio ||
    "Cybersecurity student at ESTIN, exploring infrastructure and IPC security. Full-stack web developer | mobile app designer.";
  const cvMode = profileData?.cvMode || "custom";

  const handleCvAction = () => {
    if (cvMode === "pdf" && profileData?.resumeUrl) {
      window.open(profileData.resumeUrl, "_blank", "noopener,noreferrer");
      return;
    }

    setCvModalOpen(true);
  };

  return (
    <section id="intro" className="relative w-full overflow-hidden py-6 md:py-10 lg:min-h-[calc(100svh-92px)] lg:py-0">
      <CursorGlow isFullBleed={true} />
      <HeroMatrix />

      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-14 xl:px-20">
        <div className="grid min-h-[calc(100svh-92px)] grid-cols-1 items-center gap-8 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:py-0">
          <div className="relative z-10 max-w-[760px] space-y-6 lg:pr-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)]/85 px-3.5 py-1.5 backdrop-blur-md">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="font-mono text-[0.7rem] font-medium text-[var(--fg)] sm:text-[0.75rem]">
                4th Year CS @ ESTIN · Cybersecurity & Systems
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display leading-[0.92] tracking-[-0.05em] text-[clamp(3rem,6.2vw,7rem)] font-semibold text-[var(--fg)]">
                {name}
              </h1>
              <h2 className="text-[clamp(1.15rem,2vw,2.6rem)] font-medium text-[var(--accent)]">
                {tagline}
              </h2>
            </div>

            <p className="max-w-[42rem] text-[clamp(1rem,1.35vw,1.35rem)] leading-relaxed text-[var(--fg-2)]">
              {bio}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={handleCvAction}
                className="group flex cursor-pointer items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white shadow-[0_10px_22px_rgba(3,105,161,0.18)] transition-all hover:-translate-y-0.5 hover:brightness-110 active:scale-95"
              >
                <FileText className="h-4 w-4 text-white/90 transition-transform group-hover:scale-110" />
                <span>Download CV</span>
              </button>

              <MagneticButton
                as="a"
                href="#projects"
                className="rounded-full border border-[var(--line)] bg-[var(--panel)] px-6 py-3 font-medium text-[var(--fg)] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all hover:border-[var(--accent-line)] hover:text-[var(--accent)]"
              >
                View Projects
              </MagneticButton>

              <MagneticButton
                as="a"
                href="#contact"
                className="rounded-full border border-[var(--line)] bg-[var(--panel)]/70 px-5 py-3 text-sm font-medium text-[var(--fg-2)] transition-all hover:border-[var(--accent-line)] hover:text-[var(--fg)]"
              >
                Contact
              </MagneticButton>
            </div>

            {profileData?.socialLinks && <SocialIcons links={profileData.socialLinks} />}

            <div className="flex items-center gap-2 pt-2">
              <div className="h-2 w-2 animate-ping rounded-full bg-[var(--accent)]" />
              <span className="font-mono text-xs text-[var(--dim)]">Last updated · {formattedDate}</span>
            </div>
          </div>

          <div className="relative z-10 flex w-full items-center justify-center lg:justify-end">
            <div className="w-full max-w-[620px] lg:min-h-[500px] lg:pt-2">
              <InteractiveTerminal />
            </div>
          </div>
        </div>
      </div>

      <CvModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        profileName={name}
        tagline={tagline}
        resumeUrl={profileData?.resumeUrl}
        cvMode={cvMode}
        cvContent={profileData?.cvContent}
      />
    </section>
  );
}
