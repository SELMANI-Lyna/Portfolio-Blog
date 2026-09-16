import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BlogPostForm } from "../../BlogPostForm";
export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
      <BlogPostForm post={post} />
    </div>
  );
}
