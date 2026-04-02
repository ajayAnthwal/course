"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge, Card, Button } from "@/components/ui";
import { useNews } from "@/features/news/hooks/useNews";

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filters: Record<string, any> = { limit: "20" };
  if (activeCategory !== "All") filters.category = activeCategory;

  const { data, isLoading } = useNews(filters);
  const articles = data?.data || [];

  const featuredArticles = articles.filter((a) => a.featured);
  const regularArticles = articles.filter((a) => !a.featured);
  const displayFeatured = featuredArticles.length > 0 ? featuredArticles : articles.slice(0, 2);
  const displayRegular = featuredArticles.length > 0 ? regularArticles : articles.slice(2);

  const categoryFilters = ["All", "Exam Updates", "Rankings", "Admissions", "Placements", "Preparation", "Scholarships"];

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-gradient-to-r from-neutral-900 via-slate-900 to-neutral-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Badge className="mb-3 bg-white/10 text-white border-white/20">News & Articles</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Latest Education News</h1>
          <p className="text-neutral-300 max-w-xl">
            Stay updated with the latest exam notifications, admission dates, rankings, and expert guidance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categoryFilters.map((cat) => (
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
        ) : articles.length === 0 ? (
          <div className="text-center py-20 text-neutral-400">
            <p className="text-6xl mb-4">📰</p>
            <p className="text-lg">No articles found</p>
          </div>
        ) : (
          <>
            {displayFeatured.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-neutral-900 mb-6">Featured Stories</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {displayFeatured.map((article) => (
                    <Link key={article._id} href={`/news/${article.slug}`}>
                      <Card hover padding="none" className="overflow-hidden group cursor-pointer h-full">
                        <div className="h-56 bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                          {article.image ? (
                            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-7xl group-hover:scale-110 transition-transform duration-300">📰</span>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="primary" size="sm">{article.category}</Badge>
                            <span className="text-xs text-neutral-400">{article.readTime}</span>
                          </div>
                          <h3 className="text-xl font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-sm text-neutral-500 line-clamp-2 mb-4">{article.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-neutral-400">
                              {new Date(article.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
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
                <h2 className="text-xl font-bold text-neutral-900 mb-6">More Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {displayRegular.map((article) => (
                    <Link key={article._id} href={`/news/${article.slug}`}>
                      <Card hover padding="none" className="overflow-hidden group cursor-pointer h-full">
                        <div className="h-40 bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center">
                          {article.image ? (
                            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-5xl group-hover:scale-110 transition-transform duration-300">📰</span>
                          )}
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="default" size="sm">{article.category}</Badge>
                            <span className="text-xs text-neutral-400">
                              {new Date(article.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                            </span>
                          </div>
                          <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{article.excerpt}</p>
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

        <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Never Miss an Update</h3>
          <p className="text-primary-100/80 mb-6 max-w-md mx-auto">
            Subscribe to our newsletter and get the latest education news delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-xl bg-white/20 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
            />
            <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50 shadow-lg">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
