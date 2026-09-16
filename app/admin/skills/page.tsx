import { prisma } from "@/lib/prisma";
import { SkillsManager } from "./SkillsManager";

export default async function SkillsPage() {
  const groups = await prisma.skillGroup.findMany({
    orderBy: { order: "asc" },
    include: { skills: true },
  });

  return <SkillsManager groups={groups} />;
}
