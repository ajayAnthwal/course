"use client";

import { useState } from "react";
import { CollegeList, CollegeFilters, useCollegeStats } from "@/features/colleges";
import { Badge } from "@/components/ui";
import type { CollegeFilters as CollegeFiltersType } from "@/types";

const quickFilters = [
  { label: "All Colleges", filter: {} },
  { label: "Government", filter: { type: "government" } },
  { label: "Private", filter: { type: "private" } },
  { label: "Deemed", filter: { type: "deemed" } },
  { label: "Featured", filter: { featured: "true" } },
];

export default function CollegesPage() {
  const { data: stats } = useCollegeStats();

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Badge variant="primary" className="mb-3 bg-white/10 text-white border-white/20">
                Explore Colleges
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                Find Your Perfect College
              </h1>
              <p className="text-primary-200/80 max-w-xl">
                Browse through {stats?.data?.total || "thousands of"} colleges across India.
                Use advanced filters to find the right match for your academic goals.
              </p>
            </div>
            {stats?.data && (
              <div className="flex gap-6">
                {[
                  { label: "Total", value: stats.data.total },
                  { label: "Government", value: stats.data.government },
                  { label: "Private", value: stats.data.private },
                  { label: "Featured", value: stats.data.featured },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-primary-300">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CollegeList />
      </div>
    </div>
  );
}
