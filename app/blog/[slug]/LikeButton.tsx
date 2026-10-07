"use client";
import { useState, useEffect } from "react";

export function LikeButton({ slug, likeCount }: { slug: string; likeCount: number }) {
  const [count, setCount] = useState(likeCount);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const storageKey = `liked:${slug}`;

  useEffect(() => {
    try {
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]") as string[];
      setLiked(likedPosts.includes(storageKey));
    } catch {
      setLiked(false);
    }
  }, [storageKey]);

  const handleLike = async () => {
    if (liked || loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/blog/${slug}/like`, { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Like failed");
      }

      setCount(data.likeCount);
      setLiked(true);

      try {
        const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]") as string[];
        const next = [...new Set([...likedPosts, storageKey])];
        localStorage.setItem("likedPosts", JSON.stringify(next));
      } catch {
        // ignore localStorage issues
      }
    } catch {
      // keep UI stable if request fails
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={liked || loading}
      aria-label={liked ? "Already liked" : "Like this post"}
      data-on={liked}
      className="th-btn flex items-center gap-2 rounded-full px-4 py-2 font-mono text-sm"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-4 w-4 transition-transform duration-300 ${liked ? "scale-125 fill-current" : "fill-none"} stroke-current`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
      {count}
    </button>
  );
}
