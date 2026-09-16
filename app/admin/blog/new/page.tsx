import { BlogPostForm } from "../BlogPostForm";
export default function NewBlogPostPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">New Blog Post</h1>
      <BlogPostForm />
    </div>
  );
}
