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
    <MagneticButton as={Link} href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
      <span className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-berry-800 text-sm font-medium text-berry-800 transition-colors hover:bg-berry-800 hover:text-white">
        {children}
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
      </span>
    </MagneticButton>
  );
}
