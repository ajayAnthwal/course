"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { useNewsBySlug, useLatestNews } from "@/features/news";
import { Card, CardContent, Badge, Button, LoadingPage } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { data, isLoading, isError } = useNewsBySlug(slug);
  const { data: latestData } = useLatestNews();
  const article = data?.data;
  const latestArticles = latestData?.data?.filter((a) => a.slug !== slug).slice(0, 4) || [];

  if (isLoading) return <LoadingPage message="Loading article..." />;

  if (isError || !article) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Article Not Found</h2>
          <p className="text-neutral-500 mb-6">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push("/news")}>Browse All News</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{article.title} | EduPortal</title>
        <meta name="description" content={article.excerpt} />
      </Head>

      <div className="bg-neutral-50 min-h-screen">
        {/* Hero Image */}
        <div className="relative bg-gradient-to-br from-neutral-900 via-slate-900 to-neutral-800 overflow-hidden">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>›</span>
              <Link href="/news" className="hover:text-white transition-colors">News</Link>
              <span>›</span>
              <span className="text-neutral-300 truncate max-w-[200px]">{article.category}</span>
            </nav>

            <div className="flex items-center gap-2 mb-4">
              <Badge variant="primary">{article.category}</Badge>
              <span className="text-sm text-neutral-400">{article.readTime}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-700">{article.author.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{article.author}</p>
                <p className="text-xs text-neutral-400">{formatDate(article.publishedAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
            {/* Main Article */}
            <article>
              {article.image && (
                <div className="mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50 h-64 sm:h-80 flex items-center justify-center">
                  <span className="text-7xl">{article.image}</span>
                </div>
              )}

              <Card>
                <CardContent className="p-6 sm:p-8">
                  <div className="prose prose-neutral max-w-none">
                    <p className="text-lg text-neutral-700 leading-relaxed font-medium mb-6">{article.excerpt}</p>
                    <div className="text-neutral-600 leading-relaxed whitespace-pre-line text-[15px]">{article.content}</div>
                  </div>

                  {article.tags?.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-neutral-100">
                      <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-3">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Share */}
              <div className="mt-6 flex items-center justify-between">
                <Link href="/news" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                  ← Back to News
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="sticky top-24">
                {/* Author Card */}
                <Card className="mb-6">
                  <CardContent className="p-5 text-center">
                    <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg font-bold text-primary-700">{article.author.charAt(0)}</span>
                    </div>
                    <p className="font-semibold text-neutral-900">{article.author}</p>
                    <p className="text-xs text-neutral-500 mt-1">Education Journalist</p>
                  </CardContent>
                </Card>

                {/* Latest Articles */}
                {latestArticles.length > 0 && (
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="text-sm font-semibold text-neutral-900 mb-4">Latest Articles</h3>
                      <div className="space-y-4">
                        {latestArticles.map((a) => (
                          <Link key={a._id} href={`/news/${a.slug}`} className="block group">
                            <p className="text-sm font-medium text-neutral-800 line-clamp-2 group-hover:text-primary-600 transition-colors">{a.title}</p>
                            <p className="text-xs text-neutral-400 mt-1">{formatDate(a.publishedAt)}</p>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
