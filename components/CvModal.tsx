"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Printer, Shield, GraduationCap, Briefcase, Award, Code2, ExternalLink } from "lucide-react";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileName?: string;
  tagline?: string;
  email?: string;
  resumeUrl?: string | null;
  cvMode?: string;
  cvContent?: string | null;
}

export function CvModal({
  isOpen,
  onClose,
  profileName = "Lyna Selmani",
  tagline = "4th Year Computer Science Student at ESTIN — Cybersecurity & Full-Stack",
  email = "l_selmani@estin.dz",
  resumeUrl,
  cvMode = "custom",
  cvContent,
}: CvModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    if (cvMode === "pdf" && resumeUrl) {
      window.open(resumeUrl, "_blank", "noopener,noreferrer");
      return;
    }
    window.print();
  };

  const displayText = cvContent?.trim() || `Profile\n\nCybersecurity student at ESTIN, focused on infrastructure and IPC security.\n\nEducation\n- ESTIN Higher School of Computer Science — Computer Science (Cybersecurity), 2023 — Present\n- Baccalaureate in Mathematics, Boukhlil Brothers School\n\nProjects\n- CommandBase — cybersecurity command & resource manager\n- DZ-Fit — full-stack gym discovery and management platform\n\nSkills\n- Cybersecurity: IPC Security, Network Analysis, Nmap, Wireshark, Burp Suite\n- Languages: Python, TypeScript, JavaScript, C/C++, SQL, Bash\n- Frameworks: FastAPI, Next.js, React, Node.js, PostgreSQL, Prisma\n\nCertifications\n- eJPT — Junior Penetration Tester\n- CompTIA Security+ (SY0-701)\n- Cisco CCNA: Routing & Switching\n- Docker Certified Associate`;

  const renderCustomCv = () => (
    <div className="space-y-6 whitespace-pre-line text-sm leading-relaxed text-ink">
      <div className="rounded-2xl border border-line bg-white p-5">
        <div className="mb-4 border-b border-line pb-3">
          <h2 className="font-display text-3xl font-semibold text-ink">{profileName}</h2>
          <p className="mt-1 text-berry-700 font-medium">{tagline}</p>
          {email && <p className="mt-1 font-mono text-xs text-muted">{email}</p>}
        </div>
        <div className="text-[13px] leading-7">{displayText}</div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/70 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-line overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
          >
            {/* Header / Actions Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#17161A] text-white border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-berry-600 inline-block" />
                <span className="w-3 h-3 rounded-full bg-lav-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-grey-400 inline-block" />
                <span className="font-mono text-xs text-grey-400 ml-2 tracking-wide">
                  {cvMode === "pdf" ? "curriculum_vitae.pdf [PDF]" : "curriculum_vitae.pdf [Preview]"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors flex items-center gap-1.5"
                  title="Print / Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print / Save PDF</span>
                </button>
                {resumeUrl && cvMode === "pdf" ? (
                  <a
                    href={resumeUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-full bg-berry-600 hover:bg-berry-500 text-xs font-mono text-white transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                ) : (
                  <button
                    onClick={handlePrint}
                    className="px-3 py-1.5 rounded-full bg-berry-600 hover:bg-berry-500 text-xs font-mono text-white transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-white/10 text-grey-400 hover:text-white transition-colors ml-1"
                  aria-label="Close CV modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable CV Document View */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-bone/40 text-ink selection:bg-berry-200">
              {cvMode === "pdf" && resumeUrl ? (
                <iframe src={resumeUrl} title="CV PDF preview" className="h-[70vh] w-full rounded-2xl border border-line bg-white" />
              ) : (
                renderCustomCv()
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
