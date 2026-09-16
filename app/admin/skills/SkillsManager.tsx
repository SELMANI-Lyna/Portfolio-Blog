"use client";

import { createSkillGroup, deleteSkillGroup, addSkill, deleteSkill } from "../actions";

interface Skill {
  id: string;
  name: string;
}

interface SkillGroup {
  id: string;
  name: string;
  order: number;
  skills: Skill[];
}

interface SkillsManagerProps {
  groups: SkillGroup[];
}

export function SkillsManager({ groups }: SkillsManagerProps) {
  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Skills</h1>
      </div>

      {/* Add new group */}
      <form action={createSkillGroup} className="flex gap-3 bg-white p-4 rounded-lg shadow-sm border items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">New Group Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Security Tools, Languages, Cloud..."
            required
            className="w-full border rounded p-2 text-sm"
          />
        </div>
        <div className="w-24">
          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <input
            type="number"
            name="order"
            defaultValue={groups.length}
            className="w-full border rounded p-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 whitespace-nowrap font-medium"
        >
          + Add Group
        </button>
      </form>

      {/* Existing groups */}
      {groups.map((group) => (
        <div key={group.id} className="bg-white rounded-lg shadow-sm border p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg text-gray-900">{group.name}</h2>
            <form action={deleteSkillGroup}>
              <input type="hidden" name="id" value={group.id} />
              <button
                type="submit"
                className="text-red-500 hover:text-red-700 text-sm font-medium"
                onClick={(e) => {
                  if (!confirm(`Delete group "${group.name}" and all its skills?`)) {
                    e.preventDefault();
                  }
                }}
              >
                Delete Group
              </button>
            </form>
          </div>

          {/* Skills list */}
          <div className="flex flex-wrap gap-2">
            {group.skills.length === 0 ? (
              <p className="text-xs text-gray-400 italic">No skills in this group yet.</p>
            ) : (
              group.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1 text-sm border border-gray-200"
                >
                  <span className="text-gray-800 font-medium">{skill.name}</span>
                  <form action={deleteSkill} className="inline flex items-center">
                    <input type="hidden" name="id" value={skill.id} />
                    <button
                      type="submit"
                      className="text-gray-400 hover:text-red-500 ml-1 leading-none text-xs"
                      title="Remove skill"
                    >
                      ✕
                    </button>
                  </form>
                </div>
              ))
            )}
          </div>

          {/* Add skill to group */}
          <form action={addSkill} className="flex gap-2 pt-2 border-t">
            <input type="hidden" name="skillGroupId" value={group.id} />
            <input
              type="text"
              name="name"
              placeholder="New skill name (e.g. Wireshark, Rust, Burp Suite)"
              required
              className="flex-1 border rounded p-2 text-sm"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 font-medium"
            >
              + Add Skill
            </button>
          </form>
        </div>
      ))}

      {groups.length === 0 && (
        <p className="text-gray-500 italic">No skill groups yet. Add one above.</p>
      )}
    </div>
  );
}
