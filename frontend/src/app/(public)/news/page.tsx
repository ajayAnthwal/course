"use client";

import Link from "next/link";
import { Badge, Card, CardContent, Button } from "@/components/ui";

const articles = [
  {
    title: "JEE Main 2026 Registration Opens: Key Dates, Eligibility & How to Apply",
    excerpt: "The National Testing Agency has opened registration for JEE Main 2026. Here's everything you need to know about the application process, important dates, and eligibility criteria.",
    category: "Exam Updates",
    date: "Mar 28, 2026",
    readTime: "5 min read",
    image: "📐",
    featured: true,
  },
  {
    title: "Top 10 Engineering Colleges in India: NIRF Rankings 2026 Released",
    excerpt: "The National Institutional Ranking Framework has released its 2026 rankings. IIT Madras retains the top spot, while IIT Bombay and IIT Delhi follow closely.",
    category: "Rankings",
    date: "Mar 25, 2026",
    readTime: "8 min read",
    image: "🏆",
    featured: true,
  },
  {
    title: "CAT 2026: New Pattern Changes You Must Know Before Applying",
    excerpt: "IIM has announced significant changes to the CAT 2026 exam pattern. The test will now include a new section on data interpretation and logical reasoning.",
    category: "Exam Updates",
    date: "Mar 22, 2026",
    readTime: "4 min read",
    image: "📝",
    featured: false,
  },
  {
    title: "NEET 2026 Syllabus Revised: Complete Topic-Wise Breakdown",
    excerpt: "The NMC has released the revised NEET 2026 syllabus with changes in Physics and Chemistry. Get the complete topic-wise breakdown here.",
    category: "Exam Updates",
    date: "Mar 20, 2026",
    readTime: "6 min read",
    image: "🩺",
    featured: false,
  },
  {
    title: "Delhi University Admissions 2026: CUET Score Cut-offs Expected to Rise",
    excerpt: "With increasing competition, Delhi University is expected to raise cut-off scores for popular courses. Here's what experts are predicting.",
    category: "Admissions",
    date: "Mar 18, 2026",
    readTime: "5 min read",
    image: "🎓",
    featured: false,
  },
  {
    title: "IIM Ahmedabad Placement Report 2026: Highest Package ₹1.2 Crore",
    excerpt: "IIM Ahmedabad has released its 2026 placement report with record-breaking packages. The average CTC has increased by 15% compared to last year.",
    category: "Placements",
    date: "Mar 15, 2026",
    readTime: "4 min read",
    image: "💰",
    featured: false,
  },
  {
    title: "GATE 2027 Preparation: 6-Month Study Plan for Top Rank",
    excerpt: "Planning to appear for GATE 2027? Follow this comprehensive 6-month study plan designed by top rankers to maximize your chances.",
    category: "Preparation",
    date: "Mar 12, 2026",
    readTime: "10 min read",
    image: "📚",
    featured: false,
  },
  {
    title: "Scholarship Alert: Full Ride Scholarships for Engineering Students 2026",
    excerpt: "Multiple government and private scholarships are available for meritorious engineering students. Apply before the deadlines close.",
    category: "Scholarships",
    date: "Mar 10, 2026",
    readTime: "6 min read",
    image: "🏅",
    featured: false,
  },
  {
    title: "CLAT 2026 Exam Analysis: Difficulty Level, Expected Cut-offs",
    excerpt: "Expert analysis of the CLAT 2026 exam with section-wise difficulty ratings, expected cut-offs, and strategies for counselling.",
    category: "Exam Analysis",
    date: "Mar 8, 2026",
    readTime: "7 min read",
    image: "⚖️",
    featured: false,
  },
];

const categories = [
  { name: "All", count: articles.length },
  { name: "Exam Updates", count: 3 },
  { name: "Rankings", count: 1 },
  { name: "Admissions", count: 1 },
  { name: "Placements", count: 1 },
  { name: "Preparation", count: 1 },
  { name: "Scholarships", count: 1 },
];

export default function NewsPage() {
  const featuredArticles = articles.filter((a) => a.featured);
  const regularArticles = articles.filter((a) => !a.featured);

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-neutral-900 via-slate-900 to-neutral-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Badge className="mb-3 bg-white/10 text-white border-white/20">News & Articles</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Latest Education News
          </h1>
          <p className="text-neutral-300 max-w-xl">
            Stay updated with the latest exam notifications, admission dates, rankings, and expert guidance for your education journey.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap bg-white text-neutral-600 border border-neutral-200 hover:border-primary-300 hover:text-primary-600 transition-all"
            >
              {cat.name}
              <span className="px-1.5 py-0.5 text-xs rounded-full bg-neutral-100 text-neutral-500">
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Featured Articles */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Featured Stories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <Card key={article.title} hover padding="none" className="overflow-hidden group cursor-pointer">
                <div className="h-56 bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{article.image}</span>
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
                    <span className="text-xs text-neutral-400">{article.date}</span>
                    <span className="text-sm font-medium text-primary-600 group-hover:text-primary-700 transition-colors">
                      Read More →
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Regular Articles */}
        <div>
          <h2 className="text-xl font-bold text-neutral-900 mb-6">More Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {regularArticles.map((article) => (
              <Card key={article.title} hover padding="none" className="overflow-hidden group cursor-pointer">
                <div className="h-40 bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{article.image}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="default" size="sm">{article.category}</Badge>
                    <span className="text-xs text-neutral-400">{article.date}</span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400">{article.readTime}</span>
                    <span className="text-xs font-medium text-primary-600">Read →</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Never Miss an Update</h3>
          <p className="text-primary-100/80 mb-6 max-w-md mx-auto">
            Subscribe to our newsletter and get the latest education news, exam updates, and admission alerts delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-xl bg-white/20 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
            />
            <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50 shadow-lg">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
