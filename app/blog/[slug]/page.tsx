import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LikeButton } from "./LikeButton";
import { CopyButton } from "./CopyButton";
import ReactMarkdown from "react-markdown";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug, published: true } });
  if (!post) notFound();

  const pdfs = (post.pdfs as { name: string; url: string }[]) || [];
  const links = (post.links as { label: string; url: string }[]) || [];

  return (
    <div className="w-full min-h-screen bg-bone text-ink">
      <div className="max-w-3xl mx-auto px-6 py-24 space-y-12">
        {/* Back + actions */}
        <div className="flex items-center justify-between">
          <Link href="/blog" className="font-mono text-sm text-muted hover:text-ink transition-colors">← Blog</Link>
          <div className="flex items-center gap-3">
            <LikeButton slug={slug} likeCount={post.likeCount} />
            <CopyButton slug={slug} />
          </div>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <p className="font-mono text-xs text-muted">
            {new Date(post.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <h1 className="font-display text-5xl font-semibold text-ink leading-tight">{post.title}</h1>
          <p className="text-xl text-ink/70 leading-relaxed">{post.description}</p>
        </div>

        {/* Cover image */}
        {post.images[0] && (
          <div className="w-full rounded-2xl overflow-hidden">
            <img src={post.images[0]} alt={post.title} className="w-full h-auto object-cover" />
          </div>
        )}

        {/* Body */}
        <article className="prose prose-stone max-w-none">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </article>

        {/* Image gallery (remaining images) */}
        {post.images.length > 1 && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-ink">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {post.images.slice(1).map((url, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-line">
                  <img src={url} alt={`Image ${i + 2}`} className="w-full h-48 object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PDF downloads */}
        {pdfs.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-ink">Downloads</h2>
            <div className="space-y-2">
              {pdfs.map((pdf, i) => (
                <a key={i} href={pdf.url} download target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 bg-white border border-line rounded-xl px-4 py-3 hover:border-berry-200 hover:shadow-sm transition-all group">
                  <span className="text-2xl">📄</span>
                  <span className="font-medium text-ink group-hover:text-berry-800 transition-colors">{pdf.name}</span>
                  <span className="ml-auto font-mono text-xs text-muted">Download ↗</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* External links */}
        {links.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-ink">Links</h2>
            <div className="space-y-2">
              {links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 bg-white border border-line rounded-xl px-4 py-3 hover:border-berry-200 hover:shadow-sm transition-all group">
                  <span className="font-medium text-ink group-hover:text-berry-800 transition-colors">{link.label}</span>
                  <span className="ml-auto font-mono text-xs text-muted">↗</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Bottom actions */}
        <div className="flex items-center justify-between pt-8 border-t border-line">
          <Link href="/blog" className="font-mono text-sm text-muted hover:text-ink transition-colors">← Back to Blog</Link>
          <div className="flex items-center gap-3">
            <LikeButton slug={slug} likeCount={post.likeCount} />
            <CopyButton slug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
