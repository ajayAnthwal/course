"use client";

import { useState } from "react";
import { useColleges } from "../hooks/useColleges";
import { CollegeCard } from "./college-card";
import { CollegeFilters } from "./college-filters";
import { LoadingSkeleton, Button } from "@/components/ui";
import type { CollegeFilters as CollegeFiltersType } from "@/types";

export function CollegeList() {
  const [filters, setFilters] = useState<CollegeFiltersType>({
    page: 1,
    limit: 12,
  });

  const { data, isLoading, isError, error } = useColleges(filters);

  const handleFilterChange = (newFilters: CollegeFiltersType) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <CollegeFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Results Header */}
      {data && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-600">
            Showing{" "}
            <span className="font-medium text-neutral-900">
              {(data.pagination.page - 1) * data.pagination.limit + 1}-
              {Math.min(
                data.pagination.page * data.pagination.limit,
                data.pagination.total
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-neutral-900">
              {data.pagination.total}
            </span>{" "}
            colleges
          </p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingSkeleton key={i} className="h-80" />
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-12">
          <p className="text-error-600 mb-2">Failed to load colleges</p>
          <p className="text-sm text-neutral-500">{error?.message}</p>
        </div>
      )}

      {/* College Grid */}
      {data && data.data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((college) => (
            <CollegeCard key={college._id} college={college} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {data && data.data.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            No colleges found
          </h3>
          <p className="text-neutral-500 mb-4">
            Try adjusting your filters or search criteria
          </p>
          <Button variant="outline" onClick={() => setFilters({ page: 1, limit: 12 })}>
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {data && data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(data.pagination.page - 1)}
            disabled={data.pagination.page === 1}
          >
            Previous
          </Button>

          {Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1)
            .filter((page) => {
              const current = data.pagination.page;
              return page === 1 || page === data.pagination.totalPages || Math.abs(page - current) <= 1;
            })
            .map((page, index, arr) => (
              <span key={page} className="flex items-center gap-2">
                {index > 0 && arr[index - 1] !== page - 1 && (
                  <span className="text-neutral-400">...</span>
                )}
                <Button
                  variant={page === data.pagination.page ? "primary" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              </span>
            ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(data.pagination.page + 1)}
            disabled={data.pagination.page === data.pagination.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
