"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/features/auth";
import { useColleges } from "@/features/colleges";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input } from "@/components/ui";
import { SearchBar } from "@/components/ui/search-bar";
import { Pagination } from "@/components/ui/pagination";
import apiClient from "@/services/axios";
import { FiMapPin, FiStar, FiHeart, FiTrendingUp, FiSearch, FiFilter, FiX, FiArrowRight, FiHome } from "react-icons/fi";

interface College {
  _id: string;
  name: string;
  type: string;
  location: { city: string; state: string };
  rating: number;
  reviewCount: number;
  ranking: number;
  establishedYear: number;
  courses: { _id: string; name: string; duration: string; fees: number }[];
  feeStructure: { min: number; max: number };
  image: string;
  isActive: boolean;
}

const filterOptions = {
  cities: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata"],
  types: ["Private", "Government", "Government-Aided"],
  courses: ["Engineering", "MBA", "Medical", "Arts", "Science", "Commerce"],
};

export function DiscoverColleges() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useColleges({
    search: searchQuery,
    city: cityFilter,
    type: typeFilter,
    course: courseFilter,
    limit: 12,
    page,
  });

  const colleges = (data as any)?.data || [];
  const pagination = (data as any)?.pagination || { page: 1, totalPages: 1 };

  const addToWishlist = async (collegeId: string) => {
    try {
      await apiClient.post("/wishlist", { collegeId });
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      "Private": "bg-indigo-100 text-indigo-700 border-indigo-200",
      "Government": "bg-emerald-100 text-emerald-700 border-emerald-200",
      "Government-Aided": "bg-amber-100 text-amber-700 border-amber-200",
    };
    return colors[type] || "bg-slate-100 text-slate-600 border-slate-200";
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCityFilter("");
    setTypeFilter("");
    setCourseFilter("");
    setPage(1);
  };

  const hasFilters = searchQuery || cityFilter || typeFilter || courseFilter;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Discover Colleges</h1>
        <p className="text-sm text-gray-600">Find and compare colleges that match your preferences</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search colleges..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            />
            <div className="relative">
              <select
                className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                value={cityFilter}
                onChange={(e) => { setCityFilter(e.target.value); setPage(1); }}
              >
                <option value="">All Cities</option>
                {filterOptions.cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                value={typeFilter}
                onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
              >
                <option value="">All Types</option>
                {filterOptions.types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                value={courseFilter}
                onChange={(e) => { setCourseFilter(e.target.value); setPage(1); }}
              >
                <option value="">All Courses</option>
                {filterOptions.courses.map((course) => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>
          {hasFilters && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              <button
                onClick={clearFilters}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
              >
                Clear all <FiX className="w-4 h-4" />
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {isLoading ? "Loading..." : `${colleges.length} colleges found`}
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Loading colleges...</div>
      ) : colleges.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <FiSearch className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-4">No colleges found matching your criteria</p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college: College) => (
            <Card key={college._id} className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white rounded-2xl">
              <div className="h-44 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiHome className="w-16 h-16 text-white/30" />
                </div>
                <div className="absolute top-3 right-3">
                  <button 
                    onClick={() => addToWishlist(college._id)}
                    className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-md"
                  >
                    <FiHeart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 pr-2">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight">{college.name || "College Name"}</h3>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <FiMapPin className="w-4 h-4" />
                      {college.location?.city || "City"}, {college.location?.state || "State"}
                    </p>
                  </div>
                  <Badge className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getTypeBadge(college.type)}`}>{college.type || "Private"}</Badge>
                </div>

                <div className="flex items-center gap-4 mt-2 py-2 border-y border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <FiStar className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-bold text-amber-600">{college.rating != null ? college.rating.toFixed(1) : "N/A"}</span>
                  </div>
                  {college.ranking != null && (
                    <span className="text-sm font-medium text-indigo-600 flex items-center gap-1">
                      <FiTrendingUp className="w-3 h-3" /> Rank #{college.ranking}
                    </span>
                  )}
                  {college.reviewCount != null && (
                    <span className="text-sm text-gray-400">({college.reviewCount})</span>
                  )}
                </div>

                {college.courses && college.courses.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Top Courses</p>
                    <div className="flex flex-wrap gap-1.5">
                      {college.courses.slice(0, 3).map((course: any) => (
                        <Badge key={course._id} variant="outline" size="sm" className="bg-gray-50 border-gray-200 text-gray-600 text-xs px-2 py-0.5">
                          {course.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {college.feeStructure && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-gray-500">Annual Fees</span>
                      <span className="font-bold text-lg text-gray-900">
                        ₹{college.feeStructure.min?.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-400">- ₹{college.feeStructure.max?.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-5">
                  <Link href={`/dashboard/student/compare?add=${college._id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 font-medium rounded-xl">Compare</Button>
                  </Link>
                  <Link href={`/dashboard/student/applications/new?college=${college._id}`} className="flex-[2]">
                    <Button size="sm" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all">Apply Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={pagination.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}