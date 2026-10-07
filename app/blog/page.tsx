import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { extractTags, readingTime, fmtDate } from "@/lib/blog";
import { ScrambleText } from "@/components/ScrambleText";
import { GridBackdrop } from "@/components/GridBackdrop";

export const metadata = { title: "Blog", description: "Lab write-ups, how things work, and what I'm learning." };
export const dynamic = "force-dynamic";

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const { tag } = await searchParams;
  const active = tag?.toLowerCase();

  const raw = await prisma.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  const posts = raw.map((p) => ({ ...p, tags: extractTags(p.description, p.body) }));

  const counts = new Map<string, number>();
  posts.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
  const allTags = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const shown = active ? posts.filter((p) => p.tags.includes(active)) : posts;

  return (
    <div className="th-page relative min-h-screen w-full">
      <GridBackdrop />
      <div className="relative mx-auto max-w-2xl space-y-8 px-4 py-20 sm:px-6 lg:px-8">
        <header className="space-y-5">
          <Link href="/" className="th-dim-link font-mono text-sm">
            ← Home
          </Link>
          <h1 className="th-fg font-display text-5xl font-semibold tracking-tight sm:text-6xl">
            <ScrambleText text="Blog" />
          </h1>
          <p className="th-dim max-w-md text-lg">Lab write-ups, how things work, and what I'm learning along the way.</p>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              <Link href="/blog" className={`th-chip rounded-full px-3 py-1 text-sm ${!active ? "data-on=true" : ""}`}>
                All
              </Link>
              {allTags.map(([t, n]) => (
                <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`} className={`th-chip rounded-full px-3 py-1 text-sm ${active === t ? "data-on=true" : ""}`}>
                  #{t} <span className="opacity-60">{n}</span>
                </Link>
              ))}
            </div>
          )}
        </header>

        {shown.length === 0 ? (
          <p className="th-dim">{active ? `No posts tagged #${active} yet.` : "No posts yet. The first write-up is coming."}</p>
        ) : (
          <div className="space-y-5">
            {shown.map((post) => (
              <article key={post.id} className="th-panel overflow-hidden rounded-3xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="px-4 pb-4 pt-5 sm:px-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-berry-600 to-lav-500 font-display text-sm font-semibold text-white shadow-sm">
                      {post.title.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1 pt-1">
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="th-dim">{fmtDate(post.createdAt)}</span>
                        <span className="th-dim">•</span>
                        <span className="th-dim font-mono text-[11px]">{readingTime(post.body)} min read</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <h2 className="th-title font-display text-2xl font-semibold leading-snug transition-colors hover:text-[var(--accent)]">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="th-dim text-[15px] leading-7">{post.description}</p>
                  </div>
                </div>

                {post.images[0] && (
                  <Link href={`/blog/${post.slug}`} className="block border-t border-b border-[var(--line)]">
                    <img src={post.images[0]} alt={post.title} className="h-[280px] w-full object-cover sm:h-[360px]" />
                  </Link>
                )}

                <div className="px-4 py-3 sm:px-6">
                  <div className="flex flex-wrap gap-2 pb-3">
                    {post.tags.slice(0, 4).map((t) => (
                      <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`} className="th-tag rounded-full px-2.5 py-1 text-xs">
                        #{t}
                      </Link>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-[var(--line)] pt-3 text-sm">
                    <div className="flex items-center gap-4">
                      <span className="th-dim flex items-center gap-1.5">
                        <span aria-hidden>♥</span>
                        {post.likeCount}
                      </span>
                      <span className="th-dim flex items-center gap-1.5">
                        <span aria-hidden>↩</span>
                        Share
                      </span>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="th-accent-link font-medium">
                      Read article →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
