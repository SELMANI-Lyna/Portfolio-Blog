import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Articles, write-ups, and notes.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full min-h-screen bg-bone text-ink">
      <div className="max-w-3xl mx-auto px-6 py-24 space-y-12">
        <div className="space-y-2">
          <Link href="/" className="font-mono text-sm text-muted hover:text-ink transition-colors">← Home</Link>
          <h1 className="font-display text-5xl font-semibold text-ink">Blog</h1>
          <p className="text-muted">Articles, write-ups, and notes.</p>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted italic">No posts published yet.</p>
        ) : (
          <div className="space-y-8">
            {posts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl border border-line p-6 hover:border-berry-200 hover:shadow-md transition-all">
                {post.images[0] && (
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                    <img src={post.images[0]} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
                  </div>
                )}
                <div className="space-y-2">
                  <p className="font-mono text-xs text-muted">
                    {new Date(post.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                  <h2 className="font-display text-2xl font-semibold text-ink group-hover:text-berry-800 transition-colors">{post.title}</h2>
                  <p className="text-ink/70 leading-relaxed">{post.description}</p>
                  <div className="flex items-center gap-4 pt-2">
                    <span className="font-mono text-xs text-muted flex items-center gap-1">
                      ❤️ {post.likeCount}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
