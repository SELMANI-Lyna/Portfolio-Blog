import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CertificateForm } from "../../CertificateForm";
export default async function EditCertPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cert = await prisma.certificate.findUnique({ where: { id } });
  if (!cert) notFound();
  return <div className="max-w-2xl mx-auto space-y-6"><h1 className="text-3xl font-bold">Edit Certificate</h1><CertificateForm cert={cert} /></div>;
}
