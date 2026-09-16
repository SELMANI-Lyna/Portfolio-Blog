"use client";

import { createEducation, updateEducation } from "../actions";

interface EducationFormProps {
  education?: {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate: Date | null;
    description: string | null;
    order: number;
  };
}

export function EducationForm({ education }: EducationFormProps) {
  const action = education ? updateEducation : createEducation;

  return (
    <form action={action} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
      {education && <input type="hidden" name="id" value={education.id} />}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Institution / University</label>
          <input
            type="text"
            name="institution"
            defaultValue={education?.institution || ""}
            required
            className="w-full border rounded p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
          <input
            type="text"
            name="degree"
            placeholder="B.Sc., M.Sc., Diploma..."
            defaultValue={education?.degree || ""}
            required
            className="w-full border rounded p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
          <input
            type="text"
            name="fieldOfStudy"
            placeholder="Cybersecurity, Computer Science..."
            defaultValue={education?.fieldOfStudy || ""}
            required
            className="w-full border rounded p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            defaultValue={
              education?.startDate ? new Date(education.startDate).toISOString().split("T")[0] : ""
            }
            required
            className="w-full border rounded p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date (Leave blank if current)</label>
          <input
            type="date"
            name="endDate"
            defaultValue={
              education?.endDate ? new Date(education.endDate).toISOString().split("T")[0] : ""
            }
            className="w-full border rounded p-2 text-sm"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description / Key Coursework / Achievements</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={education?.description || ""}
            className="w-full border rounded p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <input
            type="number"
            name="order"
            defaultValue={education?.order ?? 0}
            className="w-full border rounded p-2 text-sm"
          />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 font-medium"
        >
          {education ? "Update" : "Create"} Education
        </button>
        <a href="/admin/education" className="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm">
          Cancel
        </a>
      </div>
    </form>
  );
}
