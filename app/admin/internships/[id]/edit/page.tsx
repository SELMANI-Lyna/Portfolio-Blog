import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { InternshipForm } from "../../InternshipForm";
export default async function EditInternshipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const internship = await prisma.internship.findUnique({ where: { id } });
  if (!internship) notFound();
  return <div className="max-w-2xl mx-auto space-y-6"><h1 className="text-3xl font-bold">Edit Internship</h1><InternshipForm internship={internship} /></div>;
}
