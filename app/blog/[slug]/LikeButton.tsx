"use client";
import { useState, useEffect } from "react";

export function LikeButton({ slug, likeCount }: { slug: string; likeCount: number }) {
  const [count, setCount] = useState(likeCount);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const storageKey = `liked:${slug}`;

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]") as string[];
    setLiked(likedPosts.includes(storageKey));
  }, [storageKey]);

  const handleLike = async () => {
    if (liked || loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/${slug}/like`, { method: "POST" });
      const data = await res.json();
      setCount(data.likeCount);
      setLiked(true);
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]") as string[];
      localStorage.setItem("likedPosts", JSON.stringify([...likedPosts, storageKey]));
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={liked || loading}
      aria-label={liked ? "Already liked" : "Like this post"}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all font-mono text-sm ${
        liked
          ? "bg-berry-50 border-berry-200 text-berry-800 cursor-default"
          : "border-line text-muted hover:border-berry-200 hover:text-berry-800 hover:bg-berry-50"
      }`}
    >
      <span className={`text-base transition-transform ${liked ? "scale-125" : ""}`}>
        {liked ? "❤️" : "🤍"}
      </span>
      <span>{count}</span>
    </button>
  );
}
