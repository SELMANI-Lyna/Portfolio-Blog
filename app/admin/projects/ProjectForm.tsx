"use client";
import { useState, useRef } from "react";
import { createProject, updateProject } from "../actions";

interface Stat { label: string; value: string; }
interface Project {
  id: string; title: string; description: string;
  techTags: string[]; stats: unknown; liveUrl: string | null; repoUrl: string | null;
  coverImage: string | null; order: number;
}

export function ProjectForm({ project }: { project?: Project }) {
  const [stats, setStats] = useState<Stat[]>(() => {
    if (!project?.stats) return [];
    try { return project.stats as Stat[]; } catch { return []; }
  });
  const [coverImage, setCoverImage] = useState<string>(project?.coverImage || "");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(project?.coverImage || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const action = project ? updateProject : createProject;

  const addStat = () => setStats(s => [...s, { label: "", value: "" }]);
  const removeStat = (i: number) => setStats(s => s.filter((_, idx) => idx !== i));
  const updateStat = (i: number, field: keyof Stat, value: string) =>
    setStats(s => s.map((item, idx) => idx === i ? { ...item, [field]: value } : item));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    // Upload to server
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setCoverImage(data.url);
        setPreview(data.url);
      }
    } catch {
      // Reset on failure
      setPreview(project?.coverImage || "");
      setCoverImage(project?.coverImage || "");
    } finally {
      setUploading(false);
    }
  };

  const removeCover = () => {
    setCoverImage("");
    setPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form action={action} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
      {project && <input type="hidden" name="id" value={project.id} />}
      <input type="hidden" name="stats" value={JSON.stringify(stats)} />
      <input type="hidden" name="coverImage" value={coverImage} />

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input type="text" name="title" defaultValue={project?.title || ""} required
            className="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <input type="number" name="order" defaultValue={project?.order ?? 0}
            className="w-full border rounded p-2 text-sm" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" rows={3} defaultValue={project?.description || ""} required
            className="w-full border rounded p-2 text-sm" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tech Tags (comma-separated)</label>
          <input type="text" name="techTags" defaultValue={project?.techTags.join(", ") || ""}
            placeholder="React, TypeScript, Node.js" className="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
          <input type="url" name="liveUrl" defaultValue={project?.liveUrl || ""}
            className="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Repo URL</label>
          <input type="url" name="repoUrl" defaultValue={project?.repoUrl || ""}
            className="w-full border rounded p-2 text-sm" />
        </div>

        {/* Cover Image Upload */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
          <div className="space-y-3">
            {preview && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border bg-gray-50">
                <img src={preview} alt="Cover preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={removeCover}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            )}
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
              />
              {uploading && (
                <span className="text-xs text-indigo-600 animate-pulse">Uploading…</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Stats</label>
          <button type="button" onClick={addStat}
            className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md">+ Add Stat</button>
        </div>
        {stats.map((stat, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input value={stat.label} onChange={e => updateStat(i, "label", e.target.value)}
              placeholder="Label (e.g. Users)" className="flex-1 border rounded p-2 text-sm" />
            <input value={stat.value} onChange={e => updateStat(i, "value", e.target.value)}
              placeholder="Value (e.g. 1000+)" className="flex-1 border rounded p-2 text-sm" />
            <button type="button" onClick={() => removeStat(i)}
              className="text-red-500 hover:text-red-700 text-sm px-2">✕</button>
          </div>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700"
          disabled={uploading}>
          {project ? "Update" : "Create"} Project
        </button>
        <a href="/admin/projects" className="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm">Cancel</a>
      </div>
    </form>
  );
}
