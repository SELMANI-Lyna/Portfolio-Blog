import { MagneticButton } from "./MagneticButton";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface LinkPillProps {
  href: string;
  children: React.ReactNode;
}

export function LinkPill({ href, children }: LinkPillProps) {
  const isExternal = href.startsWith("http");

  return (
    <MagneticButton
      as={Link}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <span className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 py-1.5 text-sm font-medium text-[var(--fg)] transition-colors hover:border-[var(--accent-line)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]">
        {children}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-[1px] group-hover:translate-x-[1px]" />
      </span>
    </MagneticButton>
  );
}
