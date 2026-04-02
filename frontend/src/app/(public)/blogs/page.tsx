"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge, Card, Button } from "@/components/ui";
import { useBlogs } from "@/features/blogs/hooks/useBlogs";

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filters: Record<string, any> = { limit: "20" };
  if (activeCategory !== "All") filters.category = activeCategory;

  const { data, isLoading } = useBlogs(filters);
  const blogs = data?.data || [];

  const featuredBlogs = blogs.filter((b) => b.featured);
  const regularBlogs = blogs.filter((b) => !b.featured);
  const displayFeatured = featuredBlogs.length > 0 ? featuredBlogs : blogs.slice(0, 2);
  const displayRegular = featuredBlogs.length > 0 ? regularBlogs : blogs.slice(2);

  const categories = ["All", "Technology", "Education", "Career", "Exam Tips", "College Life"];

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-gradient-to-r from-neutral-900 via-slate-900 to-neutral-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Badge className="mb-3 bg-white/10 text-white border-white/20">Blog</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Our Blog</h1>
          <p className="text-neutral-300 max-w-xl">
            Insights, tips, and guides to help you navigate your education journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-primary-600 text-white border border-primary-600"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:border-primary-300 hover:text-primary-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-neutral-400">
            <p className="text-6xl mb-4">📝</p>
            <p className="text-lg">No blog posts found</p>
          </div>
        ) : (
          <>
            {displayFeatured.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-neutral-900 mb-6">Featured Posts</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {displayFeatured.map((blog) => (
                    <Link key={blog._id} href={`/blogs/${blog.slug}`}>
                      <Card hover padding="none" className="overflow-hidden group cursor-pointer h-full">
                        <div className="h-56 bg-gradient-to-br from-secondary-100 to-secondary-50 flex items-center justify-center">
                          {blog.image ? (
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-7xl group-hover:scale-110 transition-transform duration-300">📝</span>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="primary" size="sm">{blog.category}</Badge>
                            <span className="text-xs text-neutral-400">{blog.readTime}</span>
                          </div>
                          <h3 className="text-xl font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {blog.title}
                          </h3>
                          <p className="text-sm text-neutral-500 line-clamp-2 mb-4">{blog.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-neutral-400">
                              {new Date(blog.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                            <span className="text-sm font-medium text-primary-600">Read More →</span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {displayRegular.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-neutral-900 mb-6">More Posts</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {displayRegular.map((blog) => (
                    <Link key={blog._id} href={`/blogs/${blog.slug}`}>
                      <Card hover padding="none" className="overflow-hidden group cursor-pointer h-full">
                        <div className="h-40 bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center">
                          {blog.image ? (
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-5xl group-hover:scale-110 transition-transform duration-300">📝</span>
                          )}
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="default" size="sm">{blog.category}</Badge>
                            <span className="text-xs text-neutral-400">
                              {new Date(blog.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                            </span>
                          </div>
                          <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {blog.title}
                          </h3>
                          <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{blog.excerpt}</p>
                          <span className="text-xs font-medium text-primary-600">Read →</span>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
