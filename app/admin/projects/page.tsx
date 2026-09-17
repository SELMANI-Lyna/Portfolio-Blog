import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteProject } from "../actions";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>

        <Link
          href="/admin/projects/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700"
        >
          + New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-500 italic">No projects yet.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-700">
                  Title
                </th>

                <th className="text-left px-4 py-3 font-medium text-gray-700">
                  Order
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    {p.title}
                  </td>



                  <td className="px-4 py-3 text-gray-500">
                    {p.order}
                  </td>

                  <td className="px-4 py-3 flex gap-2">
                    <Link
                      href={`/admin/projects/${p.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Edit
                    </Link>

                    <form action={deleteProject} className="inline">
                      <input
                        type="hidden"
                        name="id"
                        value={p.id}
                      />

                      <button
                        type="submit"
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
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