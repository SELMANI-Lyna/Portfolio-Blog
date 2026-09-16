import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteInternship } from "../actions";

export default async function InternshipsPage() {
  const internships = await prisma.internship.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Internships</h1>
        <Link href="/admin/internships/new" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">+ New Internship</Link>
      </div>
      {internships.length === 0 ? <p className="text-gray-500 italic">No internships yet.</p> : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Role</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Company</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Period</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {internships.map(i => (
                <tr key={i.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{i.role}</td>
                  <td className="px-4 py-3 text-gray-500">{i.company}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(i.startDate).toLocaleDateString()} – {i.endDate ? new Date(i.endDate).toLocaleDateString() : "Present"}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link href={`/admin/internships/${i.id}/edit`} className="text-indigo-600 hover:text-indigo-800 font-medium">Edit</Link>
                    <form action={deleteInternship} className="inline">
                      <input type="hidden" name="id" value={i.id} />
                      <button type="submit" className="text-red-600 hover:text-red-800 font-medium"
                        onClick={e => { if (!confirm("Delete?")) e.preventDefault(); }}>Delete</button>
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
