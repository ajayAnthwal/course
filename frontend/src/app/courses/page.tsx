"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Badge, Card, CardContent, Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui";
import { cn } from "@/lib/utils";

const courseCategories = [
  { id: "all", label: "All Courses", count: 5000 },
  { id: "engineering", label: "Engineering", count: 2500 },
  { id: "management", label: "Management", count: 1200 },
  { id: "medical", label: "Medical", count: 800 },
  { id: "law", label: "Law", count: 600 },
  { id: "arts", label: "Arts & Design", count: 400 },
  { id: "science", label: "Science", count: 1800 },
];

const courses = [
  {
    name: "B.Tech Computer Science",
    category: "engineering",
    duration: "4 Years",
    level: "Undergraduate",
    fees: { min: 200000, max: 2500000 },
    colleges: 1500,
    rating: 4.8,
    popular: true,
    icon: "💻",
  },
  {
    name: "MBA",
    category: "management",
    duration: "2 Years",
    level: "Postgraduate",
    fees: { min: 500000, max: 2500000 },
    colleges: 800,
    rating: 4.7,
    popular: true,
    icon: "📊",
  },
  {
    name: "MBBS",
    category: "medical",
    duration: "5.5 Years",
    level: "Undergraduate",
    fees: { min: 500000, max: 3000000 },
    colleges: 600,
    rating: 4.9,
    popular: true,
    icon: "🩺",
  },
  {
    name: "B.Tech Mechanical",
    category: "engineering",
    duration: "4 Years",
    level: "Undergraduate",
    fees: { min: 200000, max: 2000000 },
    colleges: 1200,
    rating: 4.5,
    popular: false,
    icon: "⚙️",
  },
  {
    name: "B.Com (Hons)",
    category: "arts",
    duration: "3 Years",
    level: "Undergraduate",
    fees: { min: 15000, max: 500000 },
    colleges: 2000,
    rating: 4.3,
    popular: false,
    icon: "💰",
  },
  {
    name: "BBA",
    category: "management",
    duration: "3 Years",
    level: "Undergraduate",
    fees: { min: 50000, max: 1500000 },
    colleges: 1000,
    rating: 4.4,
    popular: false,
    icon: "📈",
  },
  {
    name: "LLB",
    category: "law",
    duration: "3-5 Years",
    level: "Undergraduate",
    fees: { min: 50000, max: 1000000 },
    colleges: 600,
    rating: 4.5,
    popular: false,
    icon: "⚖️",
  },
  {
    name: "B.Sc Computer Science",
    category: "science",
    duration: "3 Years",
    level: "Undergraduate",
    fees: { min: 30000, max: 800000 },
    colleges: 900,
    rating: 4.3,
    popular: false,
    icon: "🔬",
  },
  {
    name: "B.Tech Civil",
    category: "engineering",
    duration: "4 Years",
    level: "Undergraduate",
    fees: { min: 200000, max: 2000000 },
    colleges: 1100,
    rating: 4.4,
    popular: false,
    icon: "🏗️",
  },
  {
    name: "B.Des",
    category: "arts",
    duration: "4 Years",
    level: "Undergraduate",
    fees: { min: 200000, max: 2000000 },
    colleges: 300,
    rating: 4.6,
    popular: false,
    icon: "🎨",
  },
  {
    name: "M.Tech",
    category: "engineering",
    duration: "2 Years",
    level: "Postgraduate",
    fees: { min: 100000, max: 1500000 },
    colleges: 800,
    rating: 4.5,
    popular: false,
    icon: "🔧",
  },
  {
    name: "BDS",
    category: "medical",
    duration: "5 Years",
    level: "Undergraduate",
    fees: { min: 300000, max: 2500000 },
    colleges: 300,
    rating: 4.6,
    popular: false,
    icon: "🦷",
  },
];

function formatFees(amount: number) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${(amount / 1000).toFixed(0)}K`;
}

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCourses = activeCategory === "all"
    ? courses
    : courses.filter((c) => c.category === activeCategory);

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-secondary-900 via-secondary-800 to-secondary-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Badge className="mb-3 bg-white/10 text-white border-white/20">Browse Courses</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Explore Top Courses
          </h1>
          <p className="text-secondary-200/80 max-w-xl">
            Discover 5,000+ courses across engineering, management, medical, law, and more. Find the perfect program for your career.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {courseCategories.map((cat) => (
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
                <span className={cn(
                  "px-1.5 py-0.5 text-xs rounded-full",
                  activeCategory === cat.id
                    ? "bg-white/20 text-white"
                    : "bg-neutral-100 text-neutral-500"
                )}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
            <Card key={course.name} hover className="group cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {course.icon}
                  </div>
                  {course.popular && (
                    <Badge variant="warning" size="sm">Popular</Badge>
                  )}
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {course.name}
                </h3>
                <p className="text-sm text-neutral-500 mb-4">{course.level} · {course.duration}</p>

                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-accent-400">⭐</span>
                    <span className="font-medium text-neutral-700">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {course.colleges}+ colleges
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <div>
                    <p className="text-xs text-neutral-400">Fees Range</p>
                    <p className="text-sm font-semibold text-neutral-900">
                      {formatFees(course.fees.min)} - {formatFees(course.fees.max)}
                    </p>
                  </div>
                  <Link href="/colleges" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                    View Colleges →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
