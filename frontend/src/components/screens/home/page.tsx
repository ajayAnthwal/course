"use client";

import { Suspense, lazy } from "react";
import Link from "next/link";
import { Button, Badge, Card, CardContent, Skeleton } from "@/components/ui";
import { useCollegeStats } from "@/features/colleges";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useSiteStats } from "@/features/stats/hooks/useStats";
import { useTestimonials } from "@/features/testimonials/hooks/useTestimonials";
import { useLatestNews } from "@/features/news/hooks/useNews";
import HeroSection from "./hero-section";
import StatsSection from "./stats-section";
import CategoriesSection from "./categories-section";
import WhyChooseUs from "./why-choose-us";
import TestimonialsSection from "./testimonials-section";
import NewsSection from "./news-section";
import CTASection from "./cta-section";

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
  const { data: categoriesData } = useCategories();
  const { data: siteStatsData } = useSiteStats();
  const { data: testimonialsData } = useTestimonials();
  const { data: newsData } = useLatestNews();

  const categories = categoriesData?.data || [];
  const siteStats = siteStatsData?.data;
  const testimonials = testimonialsData?.data || [];
  const news = newsData?.data || [];

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
      <HeroSection categories={displayCategories} />
      <StatsSection siteStats={siteStats} />
      <CategoriesSection categories={displayCategories} />
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedColleges />
      </Suspense>
      <WhyChooseUs />
      <TestimonialsSection testimonials={testimonials} />
      <NewsSection news={news} />
      <CTASection />
    </div>
  );
}
