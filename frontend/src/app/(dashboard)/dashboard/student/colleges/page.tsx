"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { useColleges } from "@/features/colleges";
import apiClient from "@/services/axios";

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

function StudentCollegesPage() {
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

  console.log("Colleges data:", JSON.stringify(colleges, null, 2));

  const addToWishlist = async (collegeId: string) => {
    try {
      await apiClient.post("/wishlist", { collegeId });
      alert("Added to wishlist");
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

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Discover Colleges</h1>
          <p className="text-sm">Find and compare colleges that match your preferences</p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search colleges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Cities</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="Pune">Pune</SelectItem>
                  <SelectItem value="Kolkata">Kolkata</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Government">Government</SelectItem>
                  <SelectItem value="Government-Aided">Government-Aided</SelectItem>
                </SelectContent>
              </Select>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Courses</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="MBA">MBA</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Commerce">Commerce</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm">
            {isLoading ? "Loading..." : `${colleges.length} colleges found`}
          </p>
        </div>

        {/* College Grid */}
        {isLoading ? (
          <div className="text-center py-12">Loading colleges...</div>
        ) : colleges.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">🏛️</div>
              <p className="mb-4">No colleges found matching your criteria</p>
              <Button onClick={() => { setSearchQuery(""); setCityFilter(""); setTypeFilter(""); setCourseFilter(""); }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college: College) => (
              <Card key={college._id} className="overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white rounded-2xl">
                <div className="h-44 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl filter drop-shadow-lg">🏛️</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button 
                      onClick={() => addToWishlist(college._id)}
                      className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-xl hover:bg-white hover:scale-110 transition-all shadow-md"
                    >
                      🤍
                    </button>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 pr-2">
                      <h3 className="font-bold text-lg text-slate-900 leading-tight">{college.name || "College Name"}</h3>
                      <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                        <span>📍</span>
                        {college.location?.city || "City"}, {college.location?.state || "State"}
                      </p>
                    </div>
                    <Badge className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getTypeBadge(college.type)}`}>{college.type || "Private"}</Badge>
                  </div>

                  <div className="flex items-center gap-4 mt-2 py-2 border-y border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg">⭐</span>
                      <span className="text-sm font-bold text-amber-600">{college.rating != null ? college.rating.toFixed(1) : "N/A"}</span>
                    </div>
                    {college.ranking != null && (
                      <span className="text-sm font-medium text-indigo-600">Rank #{college.ranking}</span>
                    )}
                    {college.reviewCount != null && (
                      <span className="text-sm text-slate-400">({college.reviewCount})</span>
                    )}
                  </div>

                  {college.courses && college.courses.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Top Courses</p>
                      <div className="flex flex-wrap gap-1.5">
                        {college.courses.slice(0, 3).map((course: any) => (
                          <Badge key={course._id} variant="outline" size="sm" className="bg-slate-50 border-slate-200 text-slate-600 text-xs px-2 py-0.5">
                            {course.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {college.feeStructure && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm text-slate-500">Annual Fees</span>
                        <span className="font-bold text-lg text-slate-900">
                          ₹{college.feeStructure.min?.toLocaleString()}
                        </span>
                        <span className="text-sm text-slate-400">- ₹{college.feeStructure.max?.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-5">
                    <Link href={`/dashboard/student/compare?add=${college._id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 font-medium rounded-xl">Compare</Button>
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

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              disabled={pagination.page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <span className="px-4 py-2">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default function CollegesPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentCollegesPage />
    </ProtectedRoute>
  );
}
