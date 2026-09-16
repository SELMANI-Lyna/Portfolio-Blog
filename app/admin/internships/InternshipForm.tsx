"use client";
import { createInternship, updateInternship } from "../actions";

export function InternshipForm({ internship }: { internship?: { id: string; company: string; role: string; startDate: Date; endDate: Date | null; description: string; url: string | null; order: number } }) {
  const action = internship ? updateInternship : createInternship;
  return (
    <form action={action} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
      {internship && <input type="hidden" name="id" value={internship.id} />}
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
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">
          {internship ? "Update" : "Create"} Internship
        </button>
        <a href="/admin/internships" className="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm">Cancel</a>
      </div>
    </form>
  );
}
