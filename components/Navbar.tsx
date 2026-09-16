"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  name?: string;
}

export function Navbar({ name = "Portfolio" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#intro" },
    { label: "Projects", href: "#work" },
    { label: "Certifications", href: "#certificates" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-bone/85 border-b border-line/50 transition-all">
      <div className="w-full px-6 md:px-12 py-4 flex items-center justify-end gap-6 md:gap-8">
        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Nav Action Buttons: Blog & Contact */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/blog"
            className="px-3.5 py-1.5 rounded-full font-medium text-xs sm:text-sm text-ink border border-line bg-white/70 hover:bg-white hover:border-lav-300 hover:text-berry-800 transition-all shadow-xs active:scale-95 flex items-center gap-1"
          >
            Blog <span className="text-muted font-normal">→</span>
          </Link>
          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded-full font-medium text-xs sm:text-sm text-ink border border-line bg-white/70 hover:bg-white hover:border-lav-300 hover:text-berry-800 transition-all shadow-xs active:scale-95"
          >
            Contact
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg border border-line bg-white/80 text-ink hover:text-berry-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-bone/95 border-b border-line space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-ink hover:text-berry-800 py-1"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
