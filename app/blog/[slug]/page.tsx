import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { LikeButton } from "./LikeButton";
import { CopyButton } from "./CopyButton";
import { ReadingProgress } from "@/components/ReadingProgress";
import { HashtagText } from "@/components/HashtagText";
import { ScrambleText } from "@/components/ScrambleText";
import { GridBackdrop } from "@/components/GridBackdrop";
import { extractTags, readingTime, fmtDate } from "@/lib/blog";

export const dynamic = "force-dynamic";

const withTags = (children: React.ReactNode) =>
  React.Children.map(children, (c) => (typeof c === "string" ? <HashtagText text={c} /> : c));

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug, published: true } });
  if (!post) notFound();

  const pdfs = (post.pdfs as { name: string; url: string }[]) || [];
  const links = (post.links as { label: string; url: string }[]) || [];
  const tags = extractTags(post.description, post.body);

  const row = "th-panel group flex items-center gap-3 rounded-xl px-4 py-3";

  return (
    <div className="th-page relative min-h-screen w-full">
      <ReadingProgress />
      <GridBackdrop />

      <div className="relative mx-auto max-w-3xl space-y-12 px-6 pb-40 pt-24">
        <Link href="/blog" className="th-dim-link font-mono text-sm">
          ← Blog
        </Link>

        <header className="space-y-5">
          <p className="th-dim font-mono text-xs">
            {fmtDate(post.createdAt)} · {readingTime(post.body)} min read
          </p>
          <h1 className="th-fg font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            <ScrambleText text={post.title} />
          </h1>
          <p className="th-dim text-xl leading-relaxed">{post.description}</p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((t) => (
                <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`} className="th-tag rounded-full px-3 py-1 text-sm">
                  #{t}
                </Link>
              ))}
            </div>
          )}
        </header>

        {post.images[0] && (
          <div className="th-border overflow-hidden rounded-xl">
            <img src={post.images[0]} alt={post.title} className="h-auto w-full object-cover" />
          </div>
        )}

        <article className="th-prose prose max-w-none prose-headings:font-display prose-headings:font-semibold prose-p:leading-relaxed">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p>{withTags(children)}</p>,
              li: ({ children }) => <li>{withTags(children)}</li>,
            }}
          >
            {post.body}
          </ReactMarkdown>
        </article>

        {post.images.length > 1 && (
          <section className="space-y-4">
            <h2 className="th-fg font-display text-2xl font-semibold">Gallery</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {post.images.slice(1).map((url, i) => (
                <div key={i} className="th-border overflow-hidden rounded-xl">
                  <img src={url} alt={`Image ${i + 2}`} className="h-auto w-full object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}

        {pdfs.length > 0 && (
          <section className="space-y-3">
            <h2 className="th-fg font-display text-2xl font-semibold">Downloads</h2>
            {pdfs.map((pdf, i) => (
              <a key={i} href={pdf.url} download target="_blank" rel="noreferrer" className={row}>
                <span className="th-title font-medium">{pdf.name}</span>
                <span className="th-dim ml-auto font-mono text-xs">PDF ↗</span>
              </a>
            ))}
          </section>
        )}

        {links.length > 0 && (
          <section className="space-y-3">
            <h2 className="th-fg font-display text-2xl font-semibold">Links</h2>
            {links.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noreferrer" className={row}>
                <span className="th-title font-medium">{link.label}</span>
                <span className="th-dim ml-auto font-mono text-xs">↗</span>
              </a>
            ))}
          </section>
        )}
      </div>

      <div className="th-float fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full p-1.5 shadow-2xl">
        <LikeButton slug={slug} likeCount={post.likeCount} />
        <span className="th-sep h-5 w-px" />
        <CopyButton slug={slug} />
      </div>
    </div>
  );
}
