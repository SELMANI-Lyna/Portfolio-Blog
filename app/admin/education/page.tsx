import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteEducation } from "../actions";
import { DeleteButton } from "../DeleteButton";

export default async function EducationPage() {
  const educationList = prisma.education
    ? await prisma.education.findMany({ orderBy: { order: "asc" } })
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Education</h1>
        <Link
          href="/admin/education/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700"
        >
          + New Education
        </Link>
      </div>
      {educationList.length === 0 ? (
        <p className="text-gray-500 italic">No education entries yet.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Institution</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Degree & Field</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Period</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {educationList.map((edu) => (
                <tr key={edu.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{edu.institution}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {edu.degree} in {edu.fieldOfStudy}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(edu.startDate).toLocaleDateString()} –{" "}
                    {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : "Present"}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link
                      href={`/admin/education/${edu.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Edit
                    </Link>
                    <form action={deleteEducation} className="inline">
                      <input type="hidden" name="id" value={edu.id} />
                      <DeleteButton confirmMessage="Are you sure you want to delete this education entry?" />
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
