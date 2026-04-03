"use client";

import { useState, useEffect } from "react";
import { Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { CollegeFilters } from "@/types";

interface CollegeFiltersProps {
  filters: CollegeFilters;
  onFilterChange: (filters: CollegeFilters) => void;
}

const typeOptions = [
  { label: "All Types", value: "" },
  { label: "Government", value: "government" },
  { label: "Private", value: "private" },
  { label: "Deemed", value: "deemed" },
  { label: "Autonomous", value: "autonomous" },
];

const stateOptions = [
  { label: "All States", value: "" },
  { label: "Maharashtra", value: "Maharashtra" },
  { label: "Delhi", value: "Delhi" },
  { label: "Karnataka", value: "Karnataka" },
  { label: "Tamil Nadu", value: "Tamil Nadu" },
  { label: "Gujarat", value: "Gujarat" },
  { label: "Rajasthan", value: "Rajasthan" },
  { label: "Uttar Pradesh", value: "Uttar Pradesh" },
  { label: "West Bengal", value: "West Bengal" },
];

const courseOptions = [
  { label: "All Courses", value: "" },
  { label: "B.Tech", value: "B.Tech" },
  { label: "M.Tech", value: "M.Tech" },
  { label: "MBA", value: "MBA" },
  { label: "BBA", value: "BBA" },
  { label: "B.Sc", value: "B.Sc" },
  { label: "M.Sc", value: "M.Sc" },
  { label: "BCA", value: "BCA" },
  { label: "MCA", value: "MCA" },
  { label: "MBBS", value: "MBBS" },
  { label: "B.Com", value: "B.Com" },
  { label: "BA", value: "BA" },
  { label: "LLB", value: "LLB" },
  { label: "Pharmacy", value: "Pharmacy" },
];

const sortOptions = [
  { label: "Relevance", value: "" },
  { label: "Rating: High to Low", value: "rating_desc" },
  { label: "Rating: Low to High", value: "rating_asc" },
  { label: "Name: A to Z", value: "name_asc" },
  { label: "Name: Z to A", value: "name_desc" },
];

const feesRanges = [
  { label: "Any Fees", min: "", max: "" },
  { label: "Under 1 Lakh", min: "", max: "100000" },
  { label: "1-3 Lakhs", min: "100000", max: "300000" },
  { label: "3-5 Lakhs", min: "300000", max: "500000" },
  { label: "5-10 Lakhs", min: "500000", max: "1000000" },
  { label: "Above 10 Lakhs", min: "1000000", max: "" },
];

const quickFilters = [
  { label: "All", filter: {} },
  { label: "Government", filter: { type: "government" } },
  { label: "Private", filter: { type: "private" } },
  { label: "Featured", filter: { featured: "true" } },
  { label: "Top Rated", filter: { sortBy: "rating", sortOrder: "desc" as const } },
];

export function CollegeFilters({ filters, onFilterChange }: CollegeFiltersProps) {
  const [search, setSearch] = useState(filters.search || "");
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    setSearch(filters.search || "");
  }, [filters.search]);

  const handleSearch = () => {
    onFilterChange({ ...filters, search, page: 1 });
  };

  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value || undefined,
      page: 1,
    });
  };

  const handleSortChange = (value: string) => {
    if (value) {
      const [sortBy, sortOrder] = value.split("_");
      onFilterChange({ ...filters, sortBy, sortOrder: sortOrder as "asc" | "desc", page: 1 });
    } else {
      onFilterChange({ ...filters, sortBy: undefined, sortOrder: undefined, page: 1 });
    }
  };

  const handleFeesRangeChange = (min: string, max: string) => {
    onFilterChange({
      ...filters,
      minFees: min ? Number(min) : undefined,
      maxFees: max ? Number(max) : undefined,
      page: 1,
    });
  };

  const clearFilters = () => {
    setSearch("");
    onFilterChange({ page: 1, limit: 12 });
  };

  const hasActiveFilters =
    filters.type || filters.state || filters.city || filters.course ||
    filters.search || filters.featured || filters.minFees || filters.maxFees;

  const activeFeesRange = feesRanges.find(
    (r) => r.min === String(filters.minFees || "") && r.max === String(filters.maxFees || "")
  );

  return (
    <div className="space-y-5">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search colleges by name, course, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex h-12 w-full rounded-xl border border-neutral-200 bg-white pl-12 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
        </div>
        <Button onClick={handleSearch} size="lg" className="shrink-0">
          Search
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {quickFilters.map((qf) => {
          const isActive = qf.filter.type
            ? filters.type === qf.filter.type
            : qf.filter.featured
            ? filters.featured === "true"
            : qf.filter.sortBy
            ? filters.sortBy === qf.filter.sortBy
            : !filters.type && !filters.featured && !filters.search;

          return (
            <button
              key={qf.label}
              onClick={() => {
                setSearch("");
                onFilterChange({ ...qf.filter, page: 1, limit: 12 });
              }}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200",
                isActive
                  ? "bg-primary-600 text-white shadow-md shadow-primary-600/20"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:border-primary-300 hover:text-primary-600"
              )}
            >
              {qf.label}
            </button>
          );
        })}
      </div>

      {/* Primary Filters Row */}
      <div className="flex flex-wrap gap-3 items-end bg-white rounded-xl border border-neutral-200 p-4">
        <div className="w-44">
          <Select value={filters.type || ""} onValueChange={(value) => handleFilterChange("type", value)}>
            <SelectTrigger><SelectValue placeholder="College Type" /></SelectTrigger>
            <SelectContent>
              {typeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-44">
          <Select value={filters.state || ""} onValueChange={(value) => handleFilterChange("state", value)}>
            <SelectTrigger><SelectValue placeholder="State" /></SelectTrigger>
            <SelectContent>
              {stateOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-44">
          <Select value={filters.course || ""} onValueChange={(value) => handleFilterChange("course", value)}>
            <SelectTrigger><SelectValue placeholder="Course" /></SelectTrigger>
            <SelectContent>
              {courseOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-48">
          <Select value={filters.sortBy ? `${filters.sortBy}_${filters.sortOrder}` : ""} onValueChange={(value) => handleSortChange(value)}>
            <SelectTrigger><SelectValue placeholder="Sort By" /></SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <label className="flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-600 cursor-pointer rounded-xl hover:bg-neutral-50 transition-colors">
          <input
            type="checkbox"
            checked={filters.featured === "true" || filters.featured === true}
            onChange={(e) => handleFilterChange("featured", e.target.checked ? "true" : "")}
            className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
          />
          Featured Only
        </label>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={cn(showAdvanced && "text-primary-600")}
        >
          <svg className={cn("w-4 h-4 mr-1 transition-transform", showAdvanced && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          {showAdvanced ? "Less Filters" : "More Filters"}
        </Button>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear All
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="flex flex-wrap gap-3 items-end bg-white rounded-xl border border-neutral-200 p-4 animate-fadeIn">
          <div className="w-44">
            <Input
              placeholder="City (e.g. Mumbai)"
              value={filters.city || ""}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              leftIcon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
          </div>

          <div className="w-48">
            <Select value={activeFeesRange ? `${activeFeesRange.min}-${activeFeesRange.max}` : ""} onValueChange={(value) => { const [min, max] = value.split("-"); handleFeesRangeChange(min, max); }}>
              <SelectTrigger><SelectValue placeholder="Fees Range" /></SelectTrigger>
              <SelectContent>
                {feesRanges.map((r) => (
                  <SelectItem key={`${r.min}-${r.max}`} value={`${r.min}-${r.max}`}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-32">
              <Input
                type="number"
                placeholder="Min Fees"
                value={filters.minFees || ""}
                onChange={(e) => handleFilterChange("minFees", e.target.value)}
              />
            </div>
            <span className="text-neutral-400 text-sm pb-2">to</span>
            <div className="w-32">
              <Input
                type="number"
                placeholder="Max Fees"
                value={filters.maxFees || ""}
                onChange={(e) => handleFilterChange("maxFees", e.target.value)}
              />
            </div>
          </div>

          <div className="w-32">
            <Input
              type="number"
              placeholder="Min Rating"
              value={filters.minRating || ""}
              onChange={(e) => handleFilterChange("minRating", e.target.value)}
              leftIcon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
