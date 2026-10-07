"use client";
import { useState } from "react";

export function CopyButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const done = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopy = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      done();
      fetch(`/api/blog/${slug}/copy`, { method: "POST" }).catch(() => {});
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      done();
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy link to post"
      data-on={copied}
      className="th-btn rounded-full px-4 py-2 font-mono text-sm"
    >
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}
