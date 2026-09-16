"use client";
import { useState } from "react";

export function CopyButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      // Track in background - fire and forget
      fetch(`/api/blog/${slug}/copy`, { method: "POST" }).catch(() => {});
    } catch {
      // Fallback
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy link to post"
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all font-mono text-sm ${
        copied
          ? "bg-green-50 border-green-200 text-green-700"
          : "border-line text-muted hover:border-berry-200 hover:text-berry-800 hover:bg-berry-50"
      }`}
    >
      <span>{copied ? "✓ Copied" : "📋 Copy Link"}</span>
    </button>
  );
}
