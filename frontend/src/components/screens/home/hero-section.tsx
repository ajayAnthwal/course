"use client";

import Link from "next/link";
import { Button, Badge } from "@/components/ui";

interface Category {
  name: string;
  icon?: string;
  color?: string;
}

interface HeroSectionProps {
  categories: Category[];
}

export default function HeroSection({ categories }: HeroSectionProps) {
  return (
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
              {categories.slice(0, 5).map((cat) => (
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
  );
}
