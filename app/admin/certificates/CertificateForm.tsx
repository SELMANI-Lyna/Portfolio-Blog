"use client";
import { createCertificate, updateCertificate } from "../actions";

export function CertificateForm({ cert }: { cert?: { id: string; title: string; issuer: string; dateIssued: Date; credentialUrl: string | null; fileUrl: string | null; order: number } }) {
  const action = cert ? updateCertificate : createCertificate;
  return (
    <form action={action} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
      {cert && <input type="hidden" name="id" value={cert.id} />}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">File/Image URL (Cloudinary)</label>
          <input type="url" name="fileUrl" defaultValue={cert?.fileUrl || ""} className="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <input type="number" name="order" defaultValue={cert?.order ?? 0} className="w-full border rounded p-2 text-sm" />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">
          {cert ? "Update" : "Create"} Certificate
        </button>
        <a href="/admin/certificates" className="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm">Cancel</a>
      </div>
    </form>
  );
}
