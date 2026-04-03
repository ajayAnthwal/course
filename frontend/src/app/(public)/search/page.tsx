"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Badge, Button, Input, Card } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

interface College {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  location: { city: string; state: string };
  type: "government" | "private" | "deemed" | "autonomous";
  rating: number;
  reviewCount: number;
  courses: { name: string; fees: { min: number; max: number } }[];
  facilities: string[];
  featured: boolean;
}

const mockColleges: College[] = [
  { _id: "1", name: "Indian Institute of Technology Bombay", slug: "iit-bombay", location: { city: "Mumbai", state: "Maharashtra" }, type: "government", rating: 4.8, reviewCount: 2500, courses: [{ name: "B.Tech", fees: { min: 200000, max: 250000 } }, { name: "MBA", fees: { min: 400000, max: 500000 } }], facilities: ["Library", "Hostel", "Sports"], featured: true },
  { _id: "2", name: "Indian Institute of Technology Delhi", slug: "iit-delhi", location: { city: "New Delhi", state: "Delhi" }, type: "government", rating: 4.7, reviewCount: 2200, courses: [{ name: "B.Tech", fees: { min: 200000, max: 250000 } }, { name: "M.Tech", fees: { min: 150000, max: 200000 } }], facilities: ["Lab", "Hostel", "WiFi"], featured: true },
  { _id: "3", name: "Indian Institute of Technology Madras", slug: "iit-madras", location: { city: "Chennai", state: "Tamil Nadu" }, type: "government", rating: 4.6, reviewCount: 2100, courses: [{ name: "B.Tech", fees: { min: 200000, max: 250000 } }, { name: "MSc", fees: { min: 50000, max: 100000 } }], facilities: ["Library", "Sports", "Cafeteria"], featured: true },
  { _id: "4", name: "Birla Institute of Technology & Science", slug: "bits-pilani", location: { city: "Pilani", state: "Rajasthan" }, type: "private", rating: 4.5, reviewCount: 1800, courses: [{ name: "B.Tech", fees: { min: 400000, max: 500000 } }, { name: "M.Sc", fees: { min: 200000, max: 300000 } }], facilities: ["Hostel", "Lab", "WiFi"], featured: false },
  { _id: "5", name: "Vellore Institute of Technology", slug: "vit-vellore", location: { city: "Vellore", state: "Tamil Nadu" }, type: "private", rating: 4.4, reviewCount: 3200, courses: [{ name: "B.Tech", fees: { min: 200000, max: 400000 } }, { name: "MBA", fees: { min: 300000, max: 400000 } }], facilities: ["Library", "Hostel", "Sports"], featured: true },
  { _id: "6", name: "National Institute of Technology", slug: "nit-trichy", location: { city: "Tiruchirappalli", state: "Tamil Nadu" }, type: "government", rating: 4.3, reviewCount: 1500, courses: [{ name: "B.Tech", fees: { min: 100000, max: 150000 } }, { name: "M.Tech", fees: { min: 80000, max: 120000 } }], facilities: ["Lab", "Hostel", "Library"], featured: false },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [filters, setFilters] = useState({
    type: "all",
    state: "all",
    course: "all",
    fees: "all",
    rating: "all",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const filteredColleges = mockColleges.filter((college) => {
    if (searchQuery && !college.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filters.type !== "all" && college.type !== filters.type) return false;
    if (filters.state !== "all" && college.location.state !== filters.state) return false;
    if (filters.rating !== "all" && college.rating < parseFloat(filters.rating)) return false;
    return true;
  });

  const states = ["All", "Maharashtra", "Delhi", "Tamil Nadu", "Rajasthan", "Karnataka", "Uttar Pradesh", "West Bengal"];
  const courses = ["All", "B.Tech", "MBA", "BBA", "M.Tech", "MBBS", "B.Sc", "BA", "LLB"];
  const feeRanges = ["All", "Under 1 Lakh", "1-3 Lakh", "3-5 Lakh", "5-10 Lakh", "Above 10 Lakh"];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">Search Results</h1>
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1">
              <Input
                placeholder="Search colleges, courses, exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 bg-white text-neutral-900"
              />
            </div>
            <Button className="h-12 px-8" variant="gradient">Search</Button>
          </div>
          {query && (
            <p className="mt-4 text-primary-200">
              Showing results for &quot;{query}&quot; ({filteredColleges.length} colleges found)
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-72 shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-neutral-900">Filters</h2>
                <button className="text-sm text-primary-600 hover:underline">Clear All</button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">College Type</label>
                  <Select value={filters.type} onValueChange={(v) => setFilters({ ...filters, type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="deemed">Deemed</SelectItem>
                      <SelectItem value="autonomous">Autonomous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">State</label>
                  <Select value={filters.state} onValueChange={(v) => setFilters({ ...filters, state: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {states.map((s) => <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Course</label>
                  <Select value={filters.course} onValueChange={(v) => setFilters({ ...filters, course: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {courses.map((c) => <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Fees Range</label>
                  <Select value={filters.fees} onValueChange={(v) => setFilters({ ...filters, fees: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {feeRanges.map((f) => <SelectItem key={f} value={f.toLowerCase()}>{f}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Rating</label>
                  <Select value={filters.rating} onValueChange={(v) => setFilters({ ...filters, rating: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="4.5">4.5 & Above</SelectItem>
                      <SelectItem value="4.0">4.0 & Above</SelectItem>
                      <SelectItem value="3.5">3.5 & Above</SelectItem>
                      <SelectItem value="3.0">3.0 & Above</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-neutral-600">
                <span className="font-semibold text-neutral-900">{filteredColleges.length}</span> colleges found
              </p>
              <div className="flex items-center gap-4">
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="fees-low">Fees: Low to High</SelectItem>
                    <SelectItem value="fees-high">Fees: High to Low</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border rounded-lg overflow-hidden">
                  <button onClick={() => setViewMode("grid")} className={`p-2 ${viewMode === "grid" ? "bg-primary-600 text-white" : "bg-white text-neutral-600"}`}>▦</button>
                  <button onClick={() => setViewMode("list")} className={`p-2 ${viewMode === "list" ? "bg-primary-600 text-white" : "bg-white text-neutral-600"}`}>☰</button>
                </div>
              </div>
            </div>

            {/* College Cards */}
            {filteredColleges.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">No colleges found</h3>
                <p className="text-neutral-600 mb-6">Try adjusting your filters or search query</p>
                <Button variant="outline">Clear Filters</Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredColleges.map((college) => (
                  <Link key={college._id} href={`/colleges/${college._id}`}>
                    <Card className="hover:shadow-lg transition-shadow p-6">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-3xl shrink-0">
                          🎓
                        </div>
                        <div className="min-w-0">
                          {college.featured && <Badge variant="warning" size="sm" className="mb-1">Featured</Badge>}
                          <h3 className="font-semibold text-neutral-900 truncate">{college.name}</h3>
                          <p className="text-sm text-neutral-500">{college.location.city}, {college.location.state}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm font-medium text-primary-600">⭐ {college.rating}</span>
                            <span className="text-xs text-neutral-400">({college.reviewCount} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t flex gap-2 flex-wrap">
                        {college.courses.slice(0, 3).map((course) => (
                          <Badge key={course.name} variant="secondary" size="sm">{course.name}</Badge>
                        ))}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredColleges.map((college) => (
                  <Link key={college._id} href={`/colleges/${college._id}`}>
                    <Card className="hover:shadow-lg transition-shadow p-6">
                      <div className="flex gap-6">
                        <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-4xl shrink-0">
                          🎓
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              {college.featured && <Badge variant="warning" size="sm" className="mb-1">Featured</Badge>}
                              <h3 className="text-lg font-semibold text-neutral-900">{college.name}</h3>
                              <p className="text-neutral-500">{college.location.city}, {college.location.state}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-primary-600">⭐ {college.rating}</div>
                              <p className="text-xs text-neutral-400">{college.reviewCount} reviews</p>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center gap-4">
                            <Badge variant="secondary">{college.type}</Badge>
                            {college.courses.map((c) => (
                              <span key={c.name} className="text-sm text-neutral-600">{c.name}: ₹{(c.fees.min / 100000).toFixed(1)}L</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 self-center">
                          <Button size="sm" variant="outline">Compare</Button>
                          <Button size="sm" variant="gradient">Apply Now</Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}