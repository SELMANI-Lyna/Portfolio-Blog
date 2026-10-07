"use client";

import { useMemo } from "react";
import type { SkillGroup, Skill } from "@prisma/client";
import {
  Code,
  Shield,
  Server,
  Database,
  Terminal,
  Cpu,
  Globe,
  Lock,
} from "lucide-react";

interface SkillWithGroup extends Skill {
  groupName?: string;
}

interface SkillGroupWithSkills extends SkillGroup {
  skills: Skill[];
}

interface SkillsMarqueeProps {
  skillGroups: SkillGroupWithSkills[];
}

const DEFAULT_SKILL_GROUPS = [
  {
    id: "g-cyber",
    name: "Cybersecurity",
    order: 1,
    skills: [
      { id: "s1", name: "IPC Security & Memory Exploits", skillGroupId: "g-cyber" },
      { id: "s2", name: "Penetration Testing (Kali Linux)", skillGroupId: "g-cyber" },
      { id: "s3", name: "Network Protocol Analysis (Wireshark)", skillGroupId: "g-cyber" },
      { id: "s4", name: "Linux Hardening & seccomp", skillGroupId: "g-cyber" },
      { id: "s5", name: "Burp Suite & Web App Auditing", skillGroupId: "g-cyber" },
      { id: "s6", name: "Cryptography & PKI", skillGroupId: "g-cyber" },
    ],
  },
  {
    id: "g-stack",
    name: "Full-Stack",
    order: 2,
    skills: [
      { id: "s7", name: "FastAPI & Python 3.11+", skillGroupId: "g-stack" },
      { id: "s8", name: "Next.js 15+ & React 19", skillGroupId: "g-stack" },
      { id: "s9", name: "TypeScript & Node.js", skillGroupId: "g-stack" },
      { id: "s10", name: "PostgreSQL & Prisma ORM", skillGroupId: "g-stack" },
      { id: "s11", name: "Tailwind CSS & Framer Motion", skillGroupId: "g-stack" },
      { id: "s12", name: "REST APIs & JWT Auth", skillGroupId: "g-stack" },
    ],
  },
  {
    id: "g-devops",
    name: "DevOps & Systems",
    order: 3,
    skills: [
      { id: "s13", name: "Docker & Container Isolation", skillGroupId: "g-devops" },
      { id: "s14", name: "Electron Desktop Apps", skillGroupId: "g-devops" },
      { id: "s15", name: "Git & GitHub CI/CD Actions", skillGroupId: "g-devops" },
      { id: "s16", name: "Bash & Linux Shell Scripting", skillGroupId: "g-devops" },
      { id: "s17", name: "Cloudinary API Integration", skillGroupId: "g-devops" },
      { id: "s18", name: "Linux Kernel & System Calls", skillGroupId: "g-devops" },
    ],
  },
] as const;

function getSkillIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("security") || lower.includes("crypto") || lower.includes("auth") || lower.includes("exploit") || lower.includes("burp")) {
    return <Shield className="h-4 w-4 text-[var(--accent)]" />;
  }
  if (lower.includes("db") || lower.includes("sql") || lower.includes("postgres") || lower.includes("prisma")) {
    return <Database className="h-4 w-4 text-[var(--accent)]" />;
  }
  if (lower.includes("linux") || lower.includes("bash") || lower.includes("shell") || lower.includes("terminal")) {
    return <Terminal className="h-4 w-4 text-[var(--fg)]" />;
  }
  if (lower.includes("cloud") || lower.includes("docker") || lower.includes("server") || lower.includes("fastapi")) {
    return <Server className="h-4 w-4 text-[var(--accent)]" />;
  }
  if (lower.includes("web") || lower.includes("react") || lower.includes("next") || lower.includes("electron")) {
    return <Globe className="h-4 w-4 text-[var(--accent)]" />;
  }
  if (lower.includes("c++") || lower.includes("python") || lower.includes("kernel") || lower.includes("ipc")) {
    return <Cpu className="h-4 w-4 text-[var(--accent)]" />;
  }
  return <Code className="h-4 w-4 text-[var(--dim)]" />;
}

export function SkillsMarquee({ skillGroups }: SkillsMarqueeProps) {
  const displayGroups = skillGroups && skillGroups.length > 0 ? skillGroups : DEFAULT_SKILL_GROUPS;

  const allSkills = useMemo(() => {
    const list: SkillWithGroup[] = [];
    displayGroups.forEach((group) => {
      group.skills.forEach((skill) => {
        list.push({ ...skill, groupName: group.name });
      });
    });
    return list;
  }, [displayGroups]);

  const mid = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, mid);
  const row2 = allSkills.slice(mid).length > 0 ? allSkills.slice(mid) : allSkills;

  const row1Repeated = [...row1, ...row1, ...row1, ...row1];
  const row2Repeated = [...row2, ...row2, ...row2, ...row2];

  return (
    <section id="skills" className="relative z-10 w-full overflow-hidden py-8">
      <div className="mx-auto mb-8 w-full max-w-7xl space-y-2 px-6 sm:px-10 lg:px-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 py-1 text-xs font-mono font-medium text-[var(--accent)]">
          <Cpu className="h-3.5 w-3.5" />
          <span>Technical Arsenal</span>
        </div>
        <h3 className="font-display text-3xl font-semibold tracking-tight text-[var(--fg)] sm:text-4xl">
          Skills & Stack
        </h3>
        <p className="max-w-lg text-sm text-[var(--dim)]">
          Technologies, cybersecurity tools, and development frameworks in active rotation.
        </p>
      </div>

      <div className="relative w-full space-y-4 overflow-hidden py-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--bg)] to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--bg)] to-transparent md:w-28" />

        <div className="animate-marquee-left flex items-center gap-4">
          {row1Repeated.map((skill, index) => (
            <div
              key={`r1-${skill.id}-${index}`}
              className="group flex cursor-default select-none items-center gap-2.5 rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-4 py-2.5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-line)] hover:shadow-[0_12px_25px_rgba(3,105,161,0.08)]"
            >
              {getSkillIcon(skill.name)}
              <span className="whitespace-nowrap font-mono text-xs font-medium text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] sm:text-sm">
                {skill.name}
              </span>
              {skill.groupName && (
                <span className="border-l border-[var(--line)] pl-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--dim)]">
                  {skill.groupName}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="animate-marquee-right flex items-center gap-4">
          {row2Repeated.map((skill, index) => (
            <div
              key={`r2-${skill.id}-${index}`}
              className="group flex cursor-default select-none items-center gap-2.5 rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-4 py-2.5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-line)] hover:shadow-[0_12px_25px_rgba(3,105,161,0.08)]"
            >
              {getSkillIcon(skill.name)}
              <span className="whitespace-nowrap font-mono text-xs font-medium text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] sm:text-sm">
                {skill.name}
              </span>
              {skill.groupName && (
                <span className="border-l border-[var(--line)] pl-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--dim)]">
                  {skill.groupName}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
