import Link from "next/link";
import { TAG_SPLIT } from "@/lib/blog";

export function HashtagText({ text }: { text: string }) {
  const parts = text.split(TAG_SPLIT);

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Link
            key={i}
            href={`/blog?tag=${encodeURIComponent(part.slice(1).toLowerCase())}`}
            className="th-accent-link underline-offset-4 hover:underline"
          >
            {part}
          </Link>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
