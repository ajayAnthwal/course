"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge, Card, CardContent } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useCourses } from "@/features/courses/hooks/useCourses";

function formatFees(amount: number) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${(amount / 1000).toFixed(0)}K`;
}

const categoryFilters = [
  { id: "all", label: "All Courses" },
  { id: "engineering", label: "Engineering" },
  { id: "management", label: "Management" },
  { id: "medical", label: "Medical" },
  { id: "law", label: "Law" },
  { id: "arts", label: "Arts & Design" },
  { id: "science", label: "Science" },
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filters: Record<string, any> = { limit: "20" };
  if (activeCategory !== "all") filters.category = activeCategory;

  const { data, isLoading } = useCourses(filters);
  const courses = data?.data || [];

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-gradient-to-r from-secondary-900 via-secondary-800 to-secondary-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Badge className="mb-3 bg-white/10 text-white border-white/20">Browse Courses</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Explore Top Courses</h1>
          <p className="text-secondary-200/80 max-w-xl">
            Discover courses across engineering, management, medical, law, and more.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {categoryFilters.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200",
                  activeCategory === cat.id
                    ? "bg-primary-600 text-white shadow-md shadow-primary-600/20"
                    : "bg-white text-neutral-600 border border-neutral-200 hover:border-primary-300 hover:text-primary-600"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-48 animate-pulse" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 text-neutral-400">
            <p className="text-6xl mb-4">📚</p>
            <p className="text-lg">No courses found in this category</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course) => (
              <Link key={course._id} href={`/courses/${course.slug}`}>
                <Card hover className="group cursor-pointer h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                        📚
                      </div>
                      {course.featured && <Badge variant="warning" size="sm">Popular</Badge>}
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-sm text-neutral-500 mb-4 capitalize">{course.level} · {course.duration}</p>
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-accent-400">⭐</span>
                        <span className="font-medium text-neutral-700">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-neutral-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {course.collegeCount}+ colleges
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div>
                        <p className="text-xs text-neutral-400">Fees Range</p>
                        <p className="text-sm font-semibold text-neutral-900">
                          {formatFees(course.fees.min)} - {formatFees(course.fees.max)}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-primary-600">View Details →</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
