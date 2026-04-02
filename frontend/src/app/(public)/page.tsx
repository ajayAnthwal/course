"use client";

import { Suspense, lazy } from "react";
import Link from "next/link";
import { Button, Badge, Card, CardContent, Skeleton } from "@/components/ui";
import { useCollegeStats } from "@/features/colleges";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useSiteStats } from "@/features/stats/hooks/useStats";
import { useTestimonials } from "@/features/testimonials/hooks/useTestimonials";
import { useLatestNews } from "@/features/news/hooks/useNews";

const FeaturedColleges = lazy(() => import("@/features/colleges/components/featured-colleges").then(mod => ({ default: mod.FeaturedColleges })));

function SectionSkeleton() {
  return (
    <div className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Skeleton className="h-10 w-64 mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-6">
              <Skeleton className="h-48 rounded-xl mb-4" />
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { data: statsData } = useCollegeStats();
  const { data: categoriesData } = useCategories();
  const { data: siteStatsData } = useSiteStats();
  const { data: testimonialsData } = useTestimonials();
  const { data: newsData } = useLatestNews();

  const categories = categoriesData?.data || [];
  const siteStats = siteStatsData?.data;
  const testimonials = testimonialsData?.data || [];
  const news = newsData?.data || [];

  const statsDisplay = [
    { value: siteStats ? `${siteStats.colleges}+` : "10,000+", label: "Colleges Listed", icon: "🏛️" },
    { value: siteStats ? `${siteStats.students}+` : "50,000+", label: "Students Helped", icon: "🎓" },
    { value: siteStats ? `${siteStats.courses}+` : "500+", label: "Courses Available", icon: "📚" },
    { value: "95%", label: "Satisfaction Rate", icon: "⭐" },
  ];

  const defaultCategories = [
    { name: "Engineering", icon: "⚙️", count: 2500, color: "#6366f1" },
    { name: "Management", icon: "📊", count: 1200, color: "#10b981" },
    { name: "Medical", icon: "🩺", count: 800, color: "#f43f5e" },
    { name: "Law", icon: "⚖️", count: 600, color: "#f59e0b" },
    { name: "Design", icon: "🎨", count: 400, color: "#8b5cf6" },
    { name: "Science", icon: "🔬", count: 1800, color: "#06b6d4" },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="overflow-hidden">
      {/* ═══════════════════════ HERO SECTION ═══════════════════════ */}
      <section className="relative gradient-hero min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-400/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="animate-fade-in-up">
              <Badge variant="primary" size="lg" className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
                <span className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" />
                Admissions Open for 2026-27
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                Discover Your
                <span className="block bg-gradient-to-r from-accent-300 via-accent-200 to-secondary-300 bg-clip-text text-transparent">
                  Dream College
                </span>
                <span className="block">& Shape Your Future</span>
              </h1>
              <p className="text-lg text-primary-200/80 max-w-xl mb-8 leading-relaxed">
                Explore 10,000+ colleges, compare courses, and get expert guidance.
                Your journey to the perfect education starts here.
              </p>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/10 mb-8">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search colleges, courses, or exams..."
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/10 border-0 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm"
                    />
                  </div>
                  <Link href="/colleges">
                    <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50 shadow-lg shadow-black/10 w-full sm:w-auto">
                      Search Now
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {displayCategories.slice(0, 5).map((cat) => (
                  <Link
                    key={cat.name}
                    href="/colleges"
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden lg:block animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "IIT Bombay", type: "Engineering", rating: "4.8", image: "🏛️" },
                  { label: "IIM Ahmedabad", type: "Management", rating: "4.9", image: "📊" },
                  { label: "AIIMS Delhi", type: "Medical", rating: "4.9", image: "🩺" },
                  { label: "NLS Bangalore", type: "Law", rating: "4.7", image: "⚖️" },
                ].map((college, i) => (
                  <div
                    key={college.label}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                  >
                    <div className="text-3xl mb-3">{college.image}</div>
                    <h3 className="text-white font-semibold text-sm">{college.label}</h3>
                    <p className="text-primary-300 text-xs mt-0.5">{college.type}</p>
                    <div className="flex items-center gap-1 mt-3">
                      <span className="text-accent-400 text-xs">⭐</span>
                      <span className="text-white/80 text-xs font-medium">{college.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ═══════════════════════ TRUSTED BY ═══════════════════════ */}
      <section className="py-8 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40">
            {["NIRF", "NAAC", "AICTE", "UGC", "NBA"].map((org) => (
              <span key={org} className="text-xl font-bold text-neutral-900 tracking-wider">{org}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ STATS ═══════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statsDisplay.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                <p className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-1">{stat.value}</p>
                <p className="text-sm text-neutral-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CATEGORIES ═══════════════════════ */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">Browse by Category</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3 tracking-tight">
              Explore Top Categories
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Find colleges and courses across various streams. We cover all major disciplines to help you make the right choice.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {displayCategories.map((cat) => (
              <Link key={cat.name} href="/colleges">
                <Card hover className="text-center group cursor-pointer">
                  <CardContent>
                    <div
                      className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{ background: cat.color || "#6366f1" }}
                    >
                      {cat.icon || "📁"}
                    </div>
                    <h3 className="font-semibold text-neutral-900 text-sm mb-1">{cat.name}</h3>
                    <p className="text-xs text-neutral-500">{cat.count}+ colleges</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FEATURED COLLEGES ═══════════════════════ */}
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedColleges />
      </Suspense>

      {/* ═══════════════════════ WHY CHOOSE US ═══════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Why EduPortal</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6 tracking-tight">
                The Smarter Way to Find Your Perfect College
              </h2>
              <p className="text-neutral-500 mb-8 leading-relaxed">
                We combine technology with expert guidance to help millions of students make informed education decisions.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Comprehensive Database", desc: "Access detailed information about 10,000+ colleges including fees, placements, rankings, and reviews.", icon: "📊" },
                  { title: "Expert Counseling", desc: "Get personalized guidance from 500+ education experts who understand your goals and aspirations.", icon: "🎯" },
                  { title: "Compare & Decide", desc: "Compare colleges side-by-side on multiple parameters to make the best decision for your future.", icon: "⚖️" },
                  { title: "Application Support", desc: "End-to-end support from college selection to admission, including document guidance and deadlines.", icon: "✅" },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-xl shrink-0 group-hover:bg-primary-100 transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-neutral-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-3xl p-8 lg:p-12">
                <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center text-xl">🎓</div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">College Predictor</p>
                      <p className="text-xs text-neutral-500">Based on your JEE rank</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {["IIT Bombay - CSE", "IIT Delhi - CSE", "IIT Madras - EE"].map((college, i) => (
                      <div key={college} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50">
                        <span className="text-sm text-neutral-700">{college}</span>
                        <Badge variant={i === 0 ? "success" : i === 1 ? "primary" : "warning"} size="sm">
                          {i === 0 ? "High" : i === 1 ? "Medium" : "Safe"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" variant="gradient">Get Your Predictions</Button>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent-400/20 rounded-2xl blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary-400/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3 tracking-tight">
              Loved by Students Across India
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Join thousands of students who found their dream college through EduPortal.
            </p>
          </div>
          {testimonials.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <Card key={t._id} hover padding="lg">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-accent-400 text-sm">⭐</span>
                    ))}
                  </div>
                  <p className="text-neutral-600 leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{t.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                      <p className="text-xs text-neutral-500">{t.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-neutral-400">
              <p className="text-lg">No testimonials yet</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════ NEWS & ARTICLES ═══════════════════════ */}
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

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight text-balance">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-primary-200/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have already found their dream college through EduPortal. Your future starts with a single step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="xl" className="bg-white text-primary-700 hover:bg-primary-50 shadow-xl shadow-black/10 w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
            <Link href="/colleges">
              <Button size="xl" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 w-full sm:w-auto">
                Browse Colleges
              </Button>
            </Link>
          </div>
          <p className="text-sm text-primary-300/60 mt-6">No credit card required · Free forever</p>
        </div>
      </section>
    </div>
  );
}
