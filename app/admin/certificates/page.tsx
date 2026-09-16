import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteCertificate } from "../actions";
import { DeleteButton } from "../DeleteButton";

export default async function CertificatesPage() {
  const certs = await prisma.certificate.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Certificates</h1>
        <Link href="/admin/certificates/new" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">
          + New Certificate
        </Link>
      </div>
      {certs.length === 0 ? <p className="text-gray-500 italic">No certificates yet.</p> : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Issuer</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {certs.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{c.title}</td>
                  <td className="px-4 py-3 text-gray-500">{c.issuer}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(c.dateIssued).toLocaleDateString()}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link href={`/admin/certificates/${c.id}/edit`} className="text-indigo-600 hover:text-indigo-800 font-medium">Edit</Link>
                    <form action={deleteCertificate} className="inline">
                      <input type="hidden" name="id" value={c.id} />
                      <DeleteButton confirmMessage="Delete this certificate?" />
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
