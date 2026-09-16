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
  Boxes,
  Workflow,
  Sparkles,
  Layers,
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

function getSkillIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("security") || lower.includes("crypto") || lower.includes("auth") || lower.includes("oauth")) {
    return <Shield className="w-3.5 h-3.5 text-berry-600" />;
  }
  if (lower.includes("db") || lower.includes("sql") || lower.includes("postgres") || lower.includes("prisma") || lower.includes("mongo")) {
    return <Database className="w-3.5 h-3.5 text-lav-500" />;
  }
  if (lower.includes("linux") || lower.includes("bash") || lower.includes("shell") || lower.includes("terminal")) {
    return <Terminal className="w-3.5 h-3.5 text-ink" />;
  }
  if (lower.includes("cloud") || lower.includes("docker") || lower.includes("server") || lower.includes("k8s")) {
    return <Server className="w-3.5 h-3.5 text-berry-400" />;
  }
  if (lower.includes("web") || lower.includes("react") || lower.includes("next") || lower.includes("vue")) {
    return <Globe className="w-3.5 h-3.5 text-lav-500" />;
  }
  if (lower.includes("c++") || lower.includes("rust") || lower.includes("kernel") || lower.includes("hardware") || lower.includes("embedded")) {
    return <Cpu className="w-3.5 h-3.5 text-berry-600" />;
  }
  return <Code className="w-3.5 h-3.5 text-muted" />;
}

export function SkillsMarquee({ skillGroups }: SkillsMarqueeProps) {
  // Collect all skills into two balanced arrays for Row 1 & Row 2
  const allSkills = useMemo(() => {
    const list: SkillWithGroup[] = [];
    skillGroups.forEach((group) => {
      group.skills.forEach((skill) => {
        list.push({ ...skill, groupName: group.name });
      });
    });
    return list;
  }, [skillGroups]);

  if (allSkills.length === 0) {
    return (
      <section id="skills" className="w-full relative z-10">
        <div className="max-w-[1100px] px-6 md:px-10 space-y-8">
          <h3 className="font-display text-3xl font-semibold text-ink">Skills</h3>
          <p className="text-muted italic">No skills added yet.</p>
        </div>
      </section>
    );
  }

  const mid = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, mid);
  const row2 = allSkills.slice(mid).length > 0 ? allSkills.slice(mid) : allSkills;

  // Duplicate arrays to create seamless infinite loops
  const row1Repeated = [...row1, ...row1, ...row1, ...row1];
  const row2Repeated = [...row2, ...row2, ...row2, ...row2];

  return (
    <section id="skills" className="w-full relative z-10 overflow-hidden py-6">
      <div className="max-w-[1100px] px-6 md:px-10 space-y-8 mb-6">
        <div className="space-y-1">
          <h3 className="font-display text-3xl font-semibold text-ink">Skills & Stack</h3>
          <p className="text-muted text-sm">Technologies, security tools, and development frameworks</p>
        </div>
      </div>

      {/* Marquee Track Container with gradient fade on edges */}
      <div className="relative w-full overflow-hidden space-y-4 py-2">
        {/* Left & Right subtle edge fade mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-bone to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-bone to-transparent z-10" />

        {/* Row 1 - scrolling left */}
        <div className="animate-marquee-left gap-3.5 flex items-center">
          {row1Repeated.map((skill, index) => (
            <div
              key={`r1-${skill.id}-${index}`}
              className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-line shadow-xs hover:border-lav-300 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-default select-none group"
            >
              {getSkillIcon(skill.name)}
              <span className="font-mono text-xs sm:text-sm text-ink group-hover:text-berry-800 transition-colors whitespace-nowrap font-medium">
                {skill.name}
              </span>
              {skill.groupName && (
                <span className="text-[10px] font-mono text-muted/60 uppercase tracking-wider pl-1 border-l border-line/60">
                  {skill.groupName}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Row 2 - scrolling right */}
        <div className="animate-marquee-right gap-3.5 flex items-center">
          {row2Repeated.map((skill, index) => (
            <div
              key={`r2-${skill.id}-${index}`}
              className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-line shadow-xs hover:border-lav-300 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-default select-none group"
            >
              {getSkillIcon(skill.name)}
              <span className="font-mono text-xs sm:text-sm text-ink group-hover:text-berry-800 transition-colors whitespace-nowrap font-medium">
                {skill.name}
              </span>
              {skill.groupName && (
                <span className="text-[10px] font-mono text-muted/60 uppercase tracking-wider pl-1 border-l border-line/60">
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
