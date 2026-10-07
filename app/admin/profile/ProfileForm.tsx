"use client";

import { useState } from "react";
import { updateProfile } from "../actions";

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

const DEFAULT_CV_CONTENT = `Profile

Cybersecurity student at ESTIN, focused on infrastructure and IPC security.

Education
- ESTIN Higher School of Computer Science — Computer Science (Cybersecurity), 2023 — Present
- Baccalaureate in Mathematics, Boukhlil Brothers School

Projects
- CommandBase — cybersecurity command & resource manager
- DZ-Fit — full-stack gym discovery and management platform

Skills
- Cybersecurity: IPC Security, Network Analysis, Nmap, Wireshark, Burp Suite
- Languages: Python, TypeScript, JavaScript, C/C++, SQL, Bash
- Frameworks: FastAPI, Next.js, React, Node.js, PostgreSQL, Prisma

Certifications
- eJPT — Junior Penetration Tester
- CompTIA Security+ (SY0-701)
- Cisco CCNA: Routing & Switching
- Docker Certified Associate`;

interface ProfileFormProps {
  profile?: {
    name: string;
    tagline: string;
    bio: string;
    resumeUrl: string | null;
    cvMode?: string | null;
    cvContent?: string | null;
    socialLinks: any;
  } | null;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [resumeUrl, setResumeUrl] = useState(profile?.resumeUrl || "");
  const [cvMode, setCvMode] = useState(profile?.cvMode || "custom");
  const [cvContent, setCvContent] = useState(profile?.cvContent || DEFAULT_CV_CONTENT);
  const [uploading, setUploading] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    if (!profile?.socialLinks) return [];
    if (Array.isArray(profile.socialLinks)) return profile.socialLinks;
    try {
      return JSON.parse(profile.socialLinks as string);
    } catch {
      return [];
    }
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setResumeUrl(data.url);
        setCvMode("pdf");
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "github", url: "" }]);
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setSocialLinks(updated);
  };

  return (
    <form action={updateProfile} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          defaultValue={profile?.name || ""}
          required
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
        <input
          type="text"
          name="tagline"
          defaultValue={profile?.tagline || ""}
          required
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea
          name="bio"
          rows={5}
          defaultValue={profile?.bio || ""}
          required
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
        />
      </div>

      <div className="space-y-3 border-t pt-4">
        <label className="block text-sm font-medium text-gray-700">CV / Resume</label>

        <div className="flex items-center gap-3 rounded-md border border-gray-300 bg-gray-50 p-2">
          <label className="text-sm font-medium text-gray-700">Mode</label>
          <select
            value={cvMode}
            onChange={(e) => setCvMode(e.target.value)}
            name="cvMode"
            className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm"
          >
            <option value="custom">Use editable CV</option>
            <option value="pdf">Use uploaded PDF</option>
          </select>
        </div>

        {cvMode === "custom" ? (
          <div className="space-y-2">
            <textarea
              name="cvContent"
              value={cvContent}
              onChange={(e) => setCvContent(e.target.value)}
              rows={14}
              className="w-full rounded-md border border-gray-300 p-3 text-sm"
              placeholder="Write your CV content here..."
            />
            <p className="text-xs text-gray-500">This content will be shown in the CV modal from the hero section.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="url"
                name="resumeUrl"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="https://... or upload a PDF"
                className="flex-1 rounded-md border border-gray-300 p-2 text-sm"
              />
              <label className="cursor-pointer bg-gray-100 border border-gray-300 hover:bg-gray-200 px-3 py-2 rounded-md text-sm text-gray-700 flex items-center">
                <span>{uploading ? "Uploading..." : "Upload File"}</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
            {resumeUrl && (
              <p className="text-xs text-gray-500">
                Current file: <a href={resumeUrl} target="_blank" rel="noreferrer" className="text-indigo-600 underline">Preview PDF</a>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="space-y-3 border-t pt-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Social & Profile Links</label>
          <button
            type="button"
            onClick={addSocialLink}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded border"
          >
            + Add Link
          </button>
        </div>

        <input type="hidden" name="socialLinks" value={JSON.stringify(socialLinks)} />

        {socialLinks.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No social links added yet.</p>
        ) : (
          <div className="space-y-2">
            {socialLinks.map((link, index) => (
              <div key={index} className="flex gap-2 items-center">
                <select
                  value={link.platform}
                  onChange={(e) => updateSocialLink(index, "platform", e.target.value)}
                  className="rounded-md border border-gray-300 p-2 text-sm bg-white"
                >
                  <option value="github">GitHub</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">Twitter / X</option>
                  <option value="email">Email</option>
                  <option value="website">Website</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, "url", e.target.value)}
                  className="flex-1 rounded-md border border-gray-300 p-2 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="text-red-500 hover:text-red-700 px-2 py-1 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-indigo-700 shadow-sm"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
}
