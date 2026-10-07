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
}

export function CvModal({
  isOpen,
  onClose,
  profileName = "Lyna Selmani",
  tagline = "4th Year Computer Science Student at ESTIN — Cybersecurity & Full-Stack",
  email = "l_selmani@estin.dz",
  resumeUrl,
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
    window.print();
  };

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
                  curriculum_vitae.pdf [Preview]
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
                {resumeUrl ? (
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
              {/* Top Profile Header */}
              <div className="border-b border-line pb-6 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
                      {profileName}
                    </h2>
                    <p className="text-berry-800 font-medium text-base mt-1">
                      {tagline}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-muted space-y-1 sm:text-right">
                    <div>{email}</div>
                    <div>ESTIN Higher School of Computer Science</div>
                    <div className="text-berry-600 font-semibold">Available for Internships</div>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-ink font-display text-xl font-semibold border-b border-line/60 pb-2">
                  <GraduationCap className="w-5 h-5 text-berry-600" />
                  <span>Education</span>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-white p-4 rounded-xl border border-line shadow-xs">
                    <div className="flex justify-between items-start font-medium">
                      <h4 className="text-ink font-semibold">
                        Master Degree & Engineering in Computer Science (Cybersecurity)
                      </h4>
                      <span className="font-mono text-xs text-lav-500 bg-berry-50 px-2 py-0.5 rounded">
                        2023 — Present (4th Year)
                      </span>
                    </div>
                    <p className="text-muted text-xs mt-1">
                      École Supérieure en Sciences et Technologies de l'Informatique et du Numérique (ESTIN)
                    </p>
                    <p className="text-ink/80 text-xs mt-2 leading-relaxed">
                      Specializing in Information Security, IPC Security, Cryptography, Distributed Systems, Network Security Protocols, and Linux Kernel Exploration.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-line shadow-xs">
                    <div className="flex justify-between items-start font-medium">
                      <h4 className="text-ink font-semibold">Baccalaureate in Mathematics (Honors B+)</h4>
                      <span className="font-mono text-xs text-lav-500 bg-berry-50 px-2 py-0.5 rounded">
                        Graduated with 17.28 / 20
                      </span>
                    </div>
                    <p className="text-muted text-xs mt-1">Boukhlil Brothers School</p>
                  </div>
                </div>
              </div>

              {/* Featured Technical Projects */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-ink font-display text-xl font-semibold border-b border-line/60 pb-2">
                  <Briefcase className="w-5 h-5 text-berry-600" />
                  <span>Key Technical Projects</span>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-white p-4 rounded-xl border border-line shadow-xs space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="text-ink font-semibold">
                        CommandBase — Cybersecurity Command & Resource Manager
                      </h4>
                      <span className="font-mono text-xs text-berry-800 bg-berry-50 px-2 py-0.5 rounded">
                        Desktop / Electron
                      </span>
                    </div>
                    <p className="text-ink/80 text-xs leading-relaxed">
                      Cross-platform desktop application designed for cybersecurity practitioners to catalog, index, and execute complex penetration testing commands, exploit payloads, and network diagnostic tools with instant search and syntax specifications.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {["Electron", "TypeScript", "Kali Linux Tools", "Node.js"].map((t) => (
                        <span key={t} className="text-[10px] font-mono bg-bone px-2 py-0.5 rounded text-muted border border-line">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-line shadow-xs space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="text-ink font-semibold">
                        DZ-Fit — Gym Discovery & Management Platform
                      </h4>
                      <span className="font-mono text-xs text-berry-800 bg-berry-50 px-2 py-0.5 rounded">
                        Full-Stack / Backend Lead
                      </span>
                    </div>
                    <p className="text-ink/80 text-xs leading-relaxed">
                      Architected backend with FastAPI, PostgreSQL, and SQLAlchemy. Implemented secure JWT authentication, Cloudinary media storage, Gmail SMTP notifications, and containerized deployment with Docker and Docker Compose.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {["FastAPI", "Python 3.11", "PostgreSQL", "Docker", "JWT", "Cloudinary"].map((t) => (
                        <span key={t} className="text-[10px] font-mono bg-bone px-2 py-0.5 rounded text-muted border border-line">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-line shadow-xs space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="text-ink font-semibold">
                        Boutique Order & Inventory System (Modesty)
                      </h4>
                      <span className="font-mono text-xs text-berry-800 bg-berry-50 px-2 py-0.5 rounded">
                        Production E-Commerce
                      </span>
                    </div>
                    <p className="text-ink/80 text-xs leading-relaxed">
                      Full-stack commercial platform with live 3-tier matrix inventory computation, dynamic variant table generator, admin analytics, automated stock adjustments on courier delivery/returns, handling 600+ orders/day.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {["Next.js", "Prisma", "PostgreSQL", "NextAuth", "Resend"].map((t) => (
                        <span key={t} className="text-[10px] font-mono bg-bone px-2 py-0.5 rounded text-muted border border-line">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Skills & Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-ink font-display text-lg font-semibold border-b border-line/60 pb-2">
                    <Code2 className="w-4 h-4 text-berry-600" />
                    <span>Technical Competencies</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-ink">Cybersecurity: </span>
                      <span className="text-muted">IPC Security, Network Analysis, Nmap, Wireshark, Burp Suite, Linux Hardening</span>
                    </div>
                    <div>
                      <span className="font-semibold text-ink">Languages: </span>
                      <span className="text-muted">Python, TypeScript, JavaScript, C/C++, SQL, Bash</span>
                    </div>
                    <div>
                      <span className="font-semibold text-ink">Frameworks & DB: </span>
                      <span className="text-muted">FastAPI, Next.js, React, Node.js, PostgreSQL, Prisma, SQLAlchemy</span>
                    </div>
                    <div>
                      <span className="font-semibold text-ink">DevOps & Systems: </span>
                      <span className="text-muted">Docker & Compose, Electron, Git, Linux Administration</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-ink font-display text-lg font-semibold border-b border-line/60 pb-2">
                    <Award className="w-4 h-4 text-berry-600" />
                    <span>Certifications</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-ink">eJPT — Junior Penetration Tester</span>
                      <span className="font-mono text-muted">INE Security</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-ink">CompTIA Security+ (SY0-701)</span>
                      <span className="font-mono text-muted">CompTIA</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-ink">Cisco CCNA: Routing & Switching</span>
                      <span className="font-mono text-muted">Cisco</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-ink">Docker Certified Associate</span>
                      <span className="font-mono text-muted">Docker</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
