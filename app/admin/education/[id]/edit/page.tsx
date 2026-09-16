import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EducationForm } from "../../EducationForm";

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const education = await prisma.education.findUnique({ where: { id } });
  if (!education) notFound();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Edit Education</h1>
      <EducationForm education={education} />
    </div>
  );
}
