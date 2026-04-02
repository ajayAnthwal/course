"use client";

import Link from "next/link";
import { Badge, Card } from "@/components/ui";

interface NewsArticle {
  _id: string;
  slug: string;
  title: string;
  category: string;
  readTime?: string;
  image?: string;
  publishedAt: string;
}

interface NewsSectionProps {
  news: NewsArticle[];
}

export default function NewsSection({ news }: NewsSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <Badge variant="primary" className="mb-4">Latest Updates</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              News & Articles
            </h2>
          </div>
          <Link href="/news" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
            View All Articles
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
        {news.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {news.slice(0, 3).map((article) => (
              <Link key={article._id} href={`/news/${article.slug}`}>
                <Card hover padding="none" className="overflow-hidden group h-full">
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                    {article.image ? (
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-6xl group-hover:scale-110 transition-transform duration-300">📰</span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="primary" size="sm">{article.category}</Badge>
                      <span className="text-xs text-neutral-400">{article.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {new Date(article.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-neutral-400">
            <p className="text-lg">No articles yet</p>
          </div>
        )}
        <div className="sm:hidden mt-6 text-center">
          <Link href="/news" className="text-sm font-medium text-primary-600">View All Articles →</Link>
        </div>
      </div>
    </section>
  );
}
