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
      "Private": "bg-blue-100 text-blue-800",
      "Government": "bg-green-100 text-green-800",
      "Government-Aided": "bg-yellow-100 text-yellow-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Discover Colleges</h1>
          <p className="text-neutral-500">Find and compare colleges that match your preferences</p>
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
          <p className="text-neutral-500">
            {isLoading ? "Loading..." : `${colleges.length} colleges found`}
          </p>
        </div>

        {/* College Grid */}
        {isLoading ? (
          <div className="text-center py-12 text-neutral-500">Loading colleges...</div>
        ) : colleges.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">🏛️</div>
              <p className="text-neutral-500 mb-4">No colleges found matching your criteria</p>
              <Button onClick={() => { setSearchQuery(""); setCityFilter(""); setTypeFilter(""); setCourseFilter(""); }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college: College) => (
              <Card key={college._id} className="overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <span className="text-6xl">🏛️</span>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{college.name}</h3>
                      <p className="text-sm text-neutral-500">
                        {college.location?.city}, {college.location?.state}
                      </p>
                    </div>
                    <Badge className={getTypeBadge(college.type)}>{college.type}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium">{college.rating || "N/A"}</span>
                    </div>
                    {college.ranking && (
                      <span className="text-sm text-neutral-500">Rank #{college.ranking}</span>
                    )}
                    {college.reviewCount && (
                      <span className="text-sm text-neutral-500">({college.reviewCount} reviews)</span>
                    )}
                  </div>

                  {college.courses && college.courses.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-neutral-500 mb-1">Top Courses:</p>
                      <div className="flex flex-wrap gap-1">
                        {college.courses.slice(0, 3).map((course: any) => (
                          <Badge key={course._id} variant="outline" size="sm">
                            {course.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {college.feeStructure && (
                    <div className="mt-3 pt-3 border-t border-neutral-100">
                      <span className="text-sm text-neutral-500">Fees: </span>
                      <span className="font-semibold">
                        ₹{college.feeStructure.min?.toLocaleString()} - ₹{college.feeStructure.max?.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Link href={`/dashboard/student/compare?add=${college._id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">Compare</Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => addToWishlist(college._id)}>
                      ❤️
                    </Button>
                    <Link href={`/dashboard/student/applications/new?college=${college._id}`} className="flex-1">
                      <Button size="sm" className="w-full">Apply</Button>
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
