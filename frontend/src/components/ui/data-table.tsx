"use client";

import { useState, useMemo, useCallback } from "react";
import { Input, Spinner, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
  emptyMessage?: string;
  emptyIcon?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  searchValue?: string;
  filters?: React.ReactNode;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
  isFetching?: boolean;
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading,
  emptyMessage = "No data found",
  emptyIcon = "📋",
  searchPlaceholder = "Search...",
  onSearch,
  searchValue,
  filters,
  pagination,
  onPageChange,
  isFetching,
  onRowClick,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [localSearch, setLocalSearch] = useState(searchValue || "");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const handleSearch = useCallback(
    (value: string) => {
      setLocalSearch(value);
      onSearch?.(value);
    },
    [onSearch]
  );

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = (a as any)[sortKey];
      const bVal = (b as any)[sortKey];
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDir]);

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      {(onSearch || filters) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {onSearch && (
            <div className="flex-1">
              <Input
                placeholder={searchPlaceholder}
                value={localSearch}
                onChange={(e) => handleSearch(e.target.value)}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              />
            </div>
          )}
          {filters}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : sortedData.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="text-4xl mb-3">{emptyIcon}</div>
            <p className="text-neutral-600 font-medium">{emptyMessage}</p>
            <p className="text-sm text-neutral-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50/80 border-b border-neutral-200">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={cn(
                        "text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-5 py-3.5",
                        col.sortable && "cursor-pointer hover:text-neutral-700 select-none",
                        col.width
                      )}
                      onClick={() => col.sortable && handleSort(col.key)}
                    >
                      <div className="flex items-center gap-1.5">
                        {col.header}
                        {col.sortable && (
                          <span className="text-neutral-300">
                            {sortKey === col.key ? (
                              sortDir === "asc" ? "↑" : "↓"
                            ) : "↕"}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {sortedData.map((item) => (
                  <tr
                    key={keyExtractor(item)}
                    className={cn(
                      "hover:bg-neutral-50/50 transition-colors",
                      onRowClick && "cursor-pointer"
                    )}
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-5 py-4 text-sm text-neutral-700">
                        {col.render(item)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-neutral-100 bg-neutral-50/50">
            <p className="text-sm text-neutral-500">
              Showing{" "}
              <span className="font-medium text-neutral-700">
                {(pagination.page - 1) * pagination.limit + 1}
              </span>
              –
              <span className="font-medium text-neutral-700">
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-neutral-700">{pagination.total}</span>
            </p>
            <div className="flex items-center gap-1">
              <button
                disabled={pagination.page <= 1 || isFetching}
                onClick={() => onPageChange?.(pagination.page - 1)}
                className="px-3 py-1.5 text-sm font-medium rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                let page: number;
                if (pagination.totalPages <= 5) {
                  page = i + 1;
                } else if (pagination.page <= 3) {
                  page = i + 1;
                } else if (pagination.page >= pagination.totalPages - 2) {
                  page = pagination.totalPages - 4 + i;
                } else {
                  page = pagination.page - 2 + i;
                }
                return (
                  <button
                    key={page}
                    onClick={() => onPageChange?.(page)}
                    className={cn(
                      "w-8 h-8 text-sm font-medium rounded-lg transition-all",
                      page === pagination.page
                        ? "bg-primary-600 text-white shadow-sm"
                        : "text-neutral-600 hover:bg-neutral-100"
                    )}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                disabled={pagination.page >= pagination.totalPages || isFetching}
                onClick={() => onPageChange?.(pagination.page + 1)}
                className="px-3 py-1.5 text-sm font-medium rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
