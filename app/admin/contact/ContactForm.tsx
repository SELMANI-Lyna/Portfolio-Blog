"use client";
import { useState } from "react";
import { updateContactInfo } from "../actions";

interface Link { label: string; url: string; }

export function ContactForm({ email, links: initialLinks }: { email: string; links: Link[] }) {
  const [links, setLinks] = useState<Link[]>(initialLinks);

  const addLink = () => setLinks(l => [...l, { label: "", url: "" }]);
  const removeLink = (i: number) => setLinks(l => l.filter((_, idx) => idx !== i));
  const updateLink = (i: number, field: keyof Link, value: string) =>
    setLinks(l => l.map((item, idx) => idx === i ? { ...item, [field]: value } : item));

  return (
    <form action={updateContactInfo} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
      <input type="hidden" name="links" value={JSON.stringify(links)} />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" name="email" defaultValue={email} required
          className="w-full rounded-md border border-gray-300 p-2 text-sm" />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Links</label>
          <button type="button" onClick={addLink}
            className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md">+ Add Link</button>
        </div>
        {links.map((link, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input value={link.label} onChange={e => updateLink(i, "label", e.target.value)}
              placeholder="Label (e.g. GitHub)" className="flex-1 border rounded p-2 text-sm" />
            <input value={link.url} onChange={e => updateLink(i, "url", e.target.value)}
              placeholder="https://..." className="flex-1 border rounded p-2 text-sm" />
            <button type="button" onClick={() => removeLink(i)}
              className="text-red-500 hover:text-red-700 text-sm px-2">✕</button>
          </div>
        ))}
      </div>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">Save</button>
    </form>
  );
}
