import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProjectForm } from "../../ProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
