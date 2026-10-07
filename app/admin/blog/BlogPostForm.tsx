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
  const [images, setImages] = useState<string[]>(() => post?.images || []);
  const [pdfs, setPdfs] = useState<Pdf[]>(() => {
    if (!post?.pdfs) return [];
    try { return post.pdfs as Pdf[]; } catch { return []; }
  });
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadingPdfIndex, setUploadingPdfIndex] = useState<number | null>(null);

  const action = post ? updateBlogPost : createBlogPost;

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (!res.ok || !data.url) {
      throw new Error(data.error || "Upload failed");
    }

    return data.url as string;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploadingImages(true);
    try {
      const uploadedUrls = await Promise.all(files.map((file) => uploadFile(file)));
      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error(error);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploadingImages(false);
      e.target.value = "";
    }
  };

  const handlePdfUpload = async (index: number, file: File | null) => {
    if (!file) return;

    setUploadingPdfIndex(index);
    try {
      const url = await uploadFile(file);
      setPdfs((prev) => prev.map((pdf, i) => i === index ? { ...pdf, url, name: pdf.name || file.name } : pdf));
    } catch (error) {
      console.error(error);
      alert("PDF upload failed. Please try again.");
    } finally {
      setUploadingPdfIndex(null);
    }
  };

  return (
    <form action={action} className="space-y-5 bg-white p-6 rounded-lg shadow-sm border">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="images" value={images.join("\n")} />
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

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Images from your computer</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
        />
        {uploadingImages && <p className="text-xs text-indigo-600">Uploading images…</p>}

        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.map((url, i) => (
              <div key={`${url}-${i}`} className="relative overflow-hidden rounded-lg border bg-gray-50">
                <img src={url} alt={`Blog image ${i + 1}`} className="h-28 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                  className="absolute right-2 top-2 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">PDF Files</label>
          <button type="button" onClick={() => setPdfs((p) => [...p, { name: "", url: "" }])}
            className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md">+ Add PDF</button>
        </div>
        {pdfs.map((pdf, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-md border p-3">
            <div className="flex gap-2 items-center">
              <input
                value={pdf.name}
                onChange={(e) => setPdfs((p) => p.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x))}
                placeholder="File name"
                className="w-40 border rounded p-2 text-sm"
              />
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handlePdfUpload(i, e.target.files?.[0] || null)}
                className="flex-1 text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
              />
              <button type="button" onClick={() => setPdfs((p) => p.filter((_, idx) => idx !== i))}
                className="text-red-500 hover:text-red-700 px-2">✕</button>
            </div>
            {uploadingPdfIndex === i && <p className="text-xs text-indigo-600">Uploading PDF…</p>}
            {pdf.url && (
              <a href={pdf.url} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 hover:underline">
                Uploaded file: {pdf.name || "Open PDF"}
              </a>
            )}
          </div>
        ))}
      </div>

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
