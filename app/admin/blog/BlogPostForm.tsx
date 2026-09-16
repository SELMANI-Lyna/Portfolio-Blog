"use client";
import { useState } from "react";
import { createBlogPost, updateBlogPost } from "../actions";

interface Link { label: string; url: string; }
interface Pdf { name: string; url: string; }
interface Post {
  id: string; title: string; description: string; body: string;
  images: string[]; pdfs: unknown; links: unknown; published: boolean;
}

export function BlogPostForm({ post }: { post?: Post }) {
  const [links, setLinks] = useState<Link[]>(() => {
    if (!post?.links) return [];
    try { return post.links as Link[]; } catch { return []; }
  });
  const [pdfs, setPdfs] = useState<Pdf[]>(() => {
    if (!post?.pdfs) return [];
    try { return post.pdfs as Pdf[]; } catch { return []; }
  });

  const action = post ? updateBlogPost : createBlogPost;

  return (
    <form action={action} className="space-y-5 bg-white p-6 rounded-lg shadow-sm border">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="links" value={JSON.stringify(links)} />
      <input type="hidden" name="pdfs" value={JSON.stringify(pdfs)} />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input type="text" name="title" defaultValue={post?.title || ""} required className="w-full border rounded p-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description (short summary)</label>
        <textarea name="description" rows={2} defaultValue={post?.description || ""} required className="w-full border rounded p-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Body (Markdown)</label>
        <textarea name="body" rows={16} defaultValue={post?.body || ""} required
          className="w-full border rounded p-2 text-sm font-mono" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs (one per line, Cloudinary)</label>
        <textarea name="images" rows={4} defaultValue={post?.images.join("\n") || ""}
          placeholder="https://res.cloudinary.com/..." className="w-full border rounded p-2 text-sm font-mono" />
      </div>

      {/* PDFs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">PDF Files (Cloudinary raw upload URL)</label>
          <button type="button" onClick={() => setPdfs(p => [...p, { name: "", url: "" }])}
            className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md">+ Add PDF</button>
        </div>
        {pdfs.map((pdf, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input value={pdf.name} onChange={e => setPdfs(p => p.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x))}
              placeholder="File name" className="w-40 border rounded p-2 text-sm" />
            <input value={pdf.url} onChange={e => setPdfs(p => p.map((x, idx) => idx === i ? { ...x, url: e.target.value } : x))}
              placeholder="https://..." className="flex-1 border rounded p-2 text-sm" />
            <button type="button" onClick={() => setPdfs(p => p.filter((_, idx) => idx !== i))}
              className="text-red-500 hover:text-red-700 px-2">✕</button>
          </div>
        ))}
      </div>

      {/* External Links */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">External Links</label>
          <button type="button" onClick={() => setLinks(l => [...l, { label: "", url: "" }])}
            className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md">+ Add Link</button>
        </div>
        {links.map((link, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input value={link.label} onChange={e => setLinks(l => l.map((x, idx) => idx === i ? { ...x, label: e.target.value } : x))}
              placeholder="Label" className="w-40 border rounded p-2 text-sm" />
            <input value={link.url} onChange={e => setLinks(l => l.map((x, idx) => idx === i ? { ...x, url: e.target.value } : x))}
              placeholder="https://..." className="flex-1 border rounded p-2 text-sm" />
            <button type="button" onClick={() => setLinks(l => l.filter((_, idx) => idx !== i))}
              className="text-red-500 hover:text-red-700 px-2">✕</button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" name="published" id="published" defaultChecked={post?.published || false}
          className="rounded border-gray-300" />
        <label htmlFor="published" className="text-sm font-medium text-gray-700">Published</label>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">
          {post ? "Update" : "Create"} Post
        </button>
        <a href="/admin/blog" className="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm">Cancel</a>
      </div>
    </form>
  );
}
