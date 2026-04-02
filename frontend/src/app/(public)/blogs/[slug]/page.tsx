"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Badge, Card, Button } from "@/components/ui";
import { useBlogBySlug } from "@/features/blogs/hooks/useBlogs";
import { useBlogs } from "@/features/blogs/hooks/useBlogs";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data, isLoading } = useBlogBySlug(slug);
  const { data: latestData } = useBlogs({ limit: "3" });

  const blog = data?.data;
  const latestBlogs = (latestData?.data || []).filter((b) => b.slug !== slug).slice(0, 3);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-neutral-200 rounded w-3/4" />
          <div className="h-4 bg-neutral-200 rounded w-1/2" />
          <div className="h-64 bg-neutral-200 rounded" />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">📝</p>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Blog Not Found</h1>
        <p className="text-neutral-500 mb-6">The blog post you are looking for does not exist.</p>
        <Link href="/blogs">
          <Button>Browse Blogs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <article>
        <div className="bg-gradient-to-r from-neutral-900 via-slate-900 to-neutral-800 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-white/10 text-white border-white/20">{blog.category}</Badge>
              <span className="text-sm text-neutral-300">{blog.readTime}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{blog.title}</h1>
            <p className="text-lg text-neutral-300 max-w-2xl">{blog.excerpt}</p>
            <div className="flex items-center gap-4 mt-8">
              <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                <span className="text-sm font-bold text-white">{blog.author.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <div>
                <p className="text-sm font-medium">{blog.author}</p>
                <p className="text-xs text-neutral-400">
                  {new Date(blog.publishedAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {blog.image && (
            <div className="mb-8 rounded-2xl overflow-hidden">
              <img src={blog.image} alt={blog.title} className="w-full h-auto" />
            </div>
          )}
          <div
            className="prose prose-lg max-w-none prose-headings:text-neutral-900 prose-p:text-neutral-600 prose-a:text-primary-600"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          {blog.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-neutral-200">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-neutral-100 text-sm text-neutral-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {latestBlogs.length > 0 && (
        <div className="bg-neutral-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-8">More Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {latestBlogs.map((b) => (
                <Link key={b._id} href={`/blogs/${b.slug}`}>
                  <Card hover padding="none" className="overflow-hidden group cursor-pointer h-full">
                    <div className="h-40 bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center">
                      {b.image ? (
                        <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-5xl">📝</span>
                      )}
                    </div>
                    <div className="p-5">
                      <Badge variant="default" size="sm">{b.category}</Badge>
                      <h3 className="font-semibold text-neutral-900 mt-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {b.title}
                      </h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
