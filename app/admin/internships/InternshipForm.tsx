"use client";
import { useState, useRef } from "react";
import { createInternship, updateInternship } from "../actions";

export function InternshipForm({ internship }: { internship?: { id: string; company: string; role: string; startDate: Date; endDate: Date | null; description: string; url: string | null; coverImage: string | null; order: number } }) {
  const [coverImage, setCoverImage] = useState<string>(internship?.coverImage || "");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(internship?.coverImage || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const action = internship ? updateInternship : createInternship;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
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
      setPreview(internship?.coverImage || "");
      setCoverImage(internship?.coverImage || "");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setCoverImage("");
    setPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form action={action} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
      {internship && <input type="hidden" name="id" value={internship.id} />}
      <input type="hidden" name="coverImage" value={coverImage} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <input type="text" name="role" defaultValue={internship?.role || ""} required className="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input type="text" name="company" defaultValue={internship?.company || ""} required className="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input type="date" name="startDate" defaultValue={internship?.startDate ? new Date(internship.startDate).toISOString().split("T")[0] : ""} required className="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date (leave blank for Present)</label>
          <input type="date" name="endDate" defaultValue={internship?.endDate ? new Date(internship.endDate).toISOString().split("T")[0] : ""} className="w-full border rounded p-2 text-sm" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" rows={4} defaultValue={internship?.description || ""} required className="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company URL</label>
          <input type="url" name="url" defaultValue={internship?.url || ""} className="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <input type="number" name="order" defaultValue={internship?.order ?? 0} className="w-full border rounded p-2 text-sm" />
        </div>

        {/* Cover Image Upload */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <div className="space-y-3">
            {preview && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border bg-gray-50">
                <img src={preview} alt="Internship preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
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
      <div className="flex gap-3 pt-2">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700" disabled={uploading}>
          {internship ? "Update" : "Create"} Internship
        </button>
        <a href="/admin/internships" className="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm">Cancel</a>
      </div>
    </form>
  );
}
