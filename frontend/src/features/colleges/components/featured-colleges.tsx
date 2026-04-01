"use client";

import Link from "next/link";
import { useFeaturedColleges } from "../hooks/useColleges";
import { CollegeCard } from "./college-card";
import { LoadingCard, Badge, Button } from "@/components/ui";

export function FeaturedColleges() {
  const { data, isLoading } = useFeaturedColleges();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <Badge variant="primary" className="mb-3">Featured Colleges</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Top-Rated Institutions
            </h2>
            <p className="text-neutral-500 mt-2 max-w-xl">
              Explore India&apos;s best colleges handpicked for academic excellence, placements, and infrastructure.
            </p>
          </div>
          <Link href="/colleges">
            <Button variant="outline" rightIcon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            }>
              View All Colleges
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.data?.map((college) => (
              <CollegeCard key={college._id} college={college} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
