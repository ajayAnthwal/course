"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from "@/components/ui";
import { useLeads } from "@/features/leads";
import { useFeaturedColleges } from "@/features/colleges";
import { DocumentManager } from "@/features/documents";
import { formatDate } from "@/lib/utils";

interface Application {
  id: string;
  collegeName: string;
  collegeLogo: string;
  course: string;
  status: "applied" | "under_review" | "shortlisted" | "rejected" | "admitted";
  appliedDate: string;
  fees: string;
}

interface WishlistItem {
  id: string;
  collegeName: string;
  city: string;
  course: string;
  fees: string;
  rating: number;
}

function StudentDashboardContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: featuredData } = useFeaturedColleges();
  const featuredColleges = featuredData?.data || [];

  const applications: Application[] = [
    { id: "1", collegeName: "IIT Bombay", collegeLogo: "🏛️", course: "B.Tech CSE", status: "shortlisted", appliedDate: "2024-03-15", fees: "₹2,50,000" },
    { id: "2", collegeName: "IIM Ahmedabad", collegeLogo: "📊", course: "MBA", status: "under_review", appliedDate: "2024-03-10", fees: "₹25,00,000" },
    { id: "3", collegeName: "NIT Delhi", collegeLogo: "🏛️", course: "B.Tech ME", status: "applied", appliedDate: "2024-03-01", fees: "₹1,80,000" },
  ];

  const wishlist: WishlistItem[] = [
    { id: "1", collegeName: "BITS Pilani", city: "Pilani", course: "B.Tech CSE", fees: "₹4,00,000", rating: 4.5 },
    { id: "2", collegeName: "VIT Vellore", city: "Vellore", course: "B.Tech CSE", fees: "₹3,50,000", rating: 4.2 },
    { id: "3", collegeName: "Manipal Academy", city: "Manipal", course: "B.Tech", fees: "₹4,20,000", rating: 4.3 },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: "success" | "warning" | "primary" | "danger" | "secondary" | "default" }> = {
      applied: { label: "Applied", variant: "default" },
      under_review: { label: "Under Review", variant: "primary" },
      shortlisted: { label: "Shortlisted", variant: "success" },
      rejected: { label: "Rejected", variant: "danger" },
      admitted: { label: "Admitted", variant: "success" },
    };
    return variants[status] || variants.applied;
  };

  const stats = [
    { label: "Applications", value: applications.length, icon: "📝", color: "bg-primary-50" },
    { label: "Shortlisted", value: applications.filter(a => a.status === "shortlisted").length, icon: "✅", color: "bg-green-50" },
    { label: "Wishlist", value: wishlist.length, icon: "❤️", color: "bg-red-50" },
    { label: "Documents", value: 5, icon: "📄", color: "bg-blue-50" },
  ];

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Student Dashboard</h1>
            <p className="text-neutral-500">Welcome back, {user?.name}</p>
          </div>
          <Link href="/colleges">
            <Button>Browse Colleges</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} hover>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <span className="text-lg">{stat.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">{stat.label}</p>
                    <p className="text-xl font-bold text-neutral-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-neutral-200 pb-2">
          {["overview", "applications", "wishlist", "documents", "compare"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab ? "bg-primary-100 text-primary-700" : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {applications.slice(0, 3).map((app) => {
                    const badge = getStatusBadge(app.status);
                    return (
                      <div key={app.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{app.collegeLogo}</span>
                          <div>
                            <p className="font-medium text-neutral-900">{app.collegeName}</p>
                            <p className="text-sm text-neutral-500">{app.course}</p>
                          </div>
                        </div>
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Colleges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {featuredColleges.slice(0, 3).map((college: any) => (
                    <Link
                      key={college._id}
                      href={`/colleges/${college._id}`}
                      className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100"
                    >
                      <div>
                        <p className="font-medium text-neutral-900">{college.name}</p>
                        <p className="text-sm text-neutral-500">{college.location?.city}, {college.location?.state}</p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <span>⭐</span>
                        <span className="font-medium">{college.rating}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "applications" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Applications ({applications.length})</CardTitle>
              <Link href="/colleges">
                <Button variant="outline" size="sm">Apply to More</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((app) => {
                  const badge = getStatusBadge(app.status);
                  return (
                    <div key={app.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{app.collegeLogo}</span>
                        <div>
                          <p className="font-semibold text-neutral-900">{app.collegeName}</p>
                          <p className="text-sm text-neutral-500">{app.course}</p>
                          <p className="text-xs text-neutral-400 mt-1">Applied: {formatDate(app.appliedDate)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={badge.variant} className="mb-2">{badge.label}</Badge>
                        <p className="text-sm font-medium text-neutral-700">{app.fees}</p>
                        <Link href={`/colleges/${app.id}`}>
                          <Button variant="ghost" size="sm" className="mt-2">View Details</Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "wishlist" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Wishlist ({wishlist.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wishlist.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-neutral-100 rounded-xl flex items-center justify-center text-2xl">🏛️</div>
                      <div>
                        <p className="font-semibold text-neutral-900">{item.collegeName}</p>
                        <p className="text-sm text-neutral-500">{item.course} • {item.city}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-yellow-500">⭐ {item.rating}</span>
                          <span className="text-sm text-neutral-400">•</span>
                          <span className="text-sm text-neutral-600">{item.fees}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/compare?add=${item.id}`}>
                        <Button variant="outline" size="sm">Compare</Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "documents" && (
          <div className="max-w-2xl">
            <DocumentManager maxDocuments={10} />
          </div>
        )}

        {activeTab === "compare" && (
          <Card>
            <CardHeader>
              <CardTitle>Compare Colleges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-4xl mb-4">⚖️</div>
                <p className="text-neutral-500 mb-4">Add colleges to compare side by side</p>
                <Link href="/compare">
                  <Button>Go to Compare</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

export default function StudentDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentDashboardContent />
    </ProtectedRoute>
  );
}