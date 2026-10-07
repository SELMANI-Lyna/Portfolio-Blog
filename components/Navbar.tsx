"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  name?: string;
}

export function Navbar({ name = "Lyna Selmani" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#intro" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--line)] bg-[color:var(--bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-12">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--panel)] font-mono text-xs font-bold text-[var(--fg)] shadow-[0_0_0_1px_var(--line)] transition-colors group-hover:bg-[var(--accent-soft)]">
            LS
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">{name}</span>
          <span className="hidden rounded-full border border-[var(--line)] bg-[var(--panel)] px-2 py-0.5 font-mono text-[11px] text-[var(--dim)] sm:inline-block">
            4th Year CS @ ESTIN
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--dim)] md:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-[var(--fg)]">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/blog"
            className="flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--panel)] px-4 py-1.5 text-xs font-medium text-[var(--fg)] transition-all hover:border-[var(--accent-line)] hover:text-[var(--accent)] active:scale-95 sm:text-sm"
          >
            Blog <span className="text-[var(--dim)]">→</span>
          </Link>

          <a
            href="#contact"
            className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-medium text-white transition-all hover:brightness-110 active:scale-95 sm:text-sm"
          >
            Contact
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-2 text-[var(--fg)] transition-colors hover:text-[var(--accent)] md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="space-y-3 border-b border-[var(--line)] bg-[var(--bg)] px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-sm font-medium text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
