import { prisma } from "@/lib/prisma";
import { ContactForm } from "./ContactForm";

export default async function ContactPage() {
  const contact = await prisma.contactInfo.findUnique({ where: { id: "singleton" } });
  const links = (contact?.links as { label: string; url: string }[]) || [];
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Contact Info</h1>
      <ContactForm email={contact?.email || ""} links={links} />
    </div>
  );
}
