import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteBlogPost } from "../actions";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <Link href="/admin/blog/new" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">
          + New Post
        </Link>
      </div>
      {posts.length === 0 ? <p className="text-gray-500 italic">No posts yet.</p> : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">❤️</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">📋</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {posts.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{p.likeCount}</td>
                  <td className="px-4 py-3 text-gray-500">{p.copyCount}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link href={`/admin/blog/${p.id}/edit`} className="text-indigo-600 hover:text-indigo-800 font-medium">Edit</Link>
                    <Link href={`/blog/${p.slug}`} target="_blank" className="text-gray-500 hover:text-gray-700 font-medium">View ↗</Link>
                    <form action={deleteBlogPost} className="inline">
                      <input type="hidden" name="id" value={p.id} />
                      <button type="submit" className="text-red-600 hover:text-red-800 font-medium"
                        onClick={e => { if (!confirm("Delete this post permanently?")) e.preventDefault(); }}>Delete</button>
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
