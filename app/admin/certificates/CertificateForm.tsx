"use client";
import { useState, useRef } from "react";
import { createCertificate, updateCertificate } from "../actions";

export function CertificateForm({ cert }: { cert?: { id: string; title: string; issuer: string; dateIssued: Date; credentialUrl: string | null; fileUrl: string | null; order: number } }) {
  const [fileUrl, setFileUrl] = useState<string>(cert?.fileUrl || "");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(cert?.fileUrl || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const action = cert ? updateCertificate : createCertificate;

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
        setFileUrl(data.url);
        setPreview(data.url);
      }
    } catch {
      setPreview(cert?.fileUrl || "");
      setFileUrl(cert?.fileUrl || "");
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setFileUrl("");
    setPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form action={action} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
      {cert && <input type="hidden" name="id" value={cert.id} />}
      <input type="hidden" name="fileUrl" value={fileUrl} />

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input type="text" name="title" defaultValue={cert?.title || ""} required className="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
          <input type="text" name="issuer" defaultValue={cert?.issuer || ""} required className="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Issued</label>
          <input type="date" name="dateIssued" defaultValue={cert?.dateIssued ? new Date(cert.dateIssued).toISOString().split("T")[0] : ""} required className="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Credential URL</label>
          <input type="url" name="credentialUrl" defaultValue={cert?.credentialUrl || ""} className="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <input type="number" name="order" defaultValue={cert?.order ?? 0} className="w-full border rounded p-2 text-sm" />
        </div>

        {/* Certificate Image Upload */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Image</label>
          <div className="space-y-3">
            {preview && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border bg-gray-50">
                <img src={preview} alt="Certificate preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={removeFile}
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
          {cert ? "Update" : "Create"} Certificate
        </button>
        <a href="/admin/certificates" className="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm">Cancel</a>
      </div>
    </form>
  );
}
