"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";
import { useLeads } from "@/features/leads";
import { formatDate } from "@/lib/utils";

interface Course {
  id: string;
  name: string;
  seats: number;
  filled: number;
  fees: string;
  status: "open" | "closed" | "full";
}

interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
}

function CollegeDashboardContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: leadsData } = useLeads({ limit: 20 });
  const leads = leadsData?.data || [];

  const stats = [
    { label: "Total Leads", value: leads.length, icon: "📋", color: "bg-primary-50" },
    { label: "New Today", value: leads.filter(l => l.status === "new").length, icon: "🆕", color: "bg-blue-50" },
    { label: "Admissions", value: 45, icon: "🎓", color: "bg-green-50" },
    { label: "Avg Rating", value: "4.5", icon: "⭐", color: "bg-yellow-50" },
  ];

  const courses: Course[] = [
    { id: "1", name: "B.Tech CSE", seats: 120, filled: 95, fees: "₹2,50,000", status: "open" },
    { id: "2", name: "B.Tech ECE", seats: 60, filled: 58, fees: "₹2,50,000", status: "full" },
    { id: "3", name: "MBA", seats: 60, filled: 45, fees: "₹12,00,000", status: "open" },
    { id: "4", name: "B.Sc Physics", seats: 40, filled: 20, fees: "₹1,50,000", status: "open" },
  ];

  const reviews: Review[] = [
    { id: "1", studentName: "Rahul S.", rating: 5, comment: "Excellent faculty and infrastructure!", date: "2024-03-10" },
    { id: "2", studentName: "Priya M.", rating: 4, comment: "Great placement opportunities", date: "2024-03-08" },
    { id: "3", studentName: "Amit K.", rating: 4, comment: "Good campus life", date: "2024-03-05" },
  ];

  const statusBadge: Record<string, { label: string; variant: "success" | "warning" | "primary" | "danger" | "default" }> = {
    new: { label: "New", variant: "primary" },
    contacted: { label: "Contacted", variant: "warning" },
    interested: { label: "Interested", variant: "success" },
    admitted: { label: "Admitted", variant: "success" },
    not_interested: { label: "Not Interested", variant: "danger" },
    open: { label: "Open", variant: "success" },
    closed: { label: "Closed", variant: "default" },
    full: { label: "Full", variant: "danger" },
  };

  return (
    <DashboardLayout role="college" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">College Dashboard</h1>
            <p className="text-neutral-500">Welcome back, {user?.name}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/college/settings">
              <Button variant="outline">Edit Profile</Button>
            </Link>
            <Link href="/dashboard/college/courses">
              <Button>Manage Courses</Button>
            </Link>
          </div>
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
          {["overview", "leads", "courses", "reviews", "analytics"].map((tab) => (
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

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Leads</CardTitle>
                <Link href="/dashboard/college/leads">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leads.slice(0, 5).map((lead: any) => {
                    const badge = statusBadge[lead.status] || statusBadge.new;
                    return (
                      <div key={lead._id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <div>
                          <p className="font-medium text-neutral-900">{lead.name}</p>
                          <p className="text-sm text-neutral-500">{lead.course || "General"} • {formatDate(lead.createdAt)}</p>
                        </div>
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Reviews</CardTitle>
                <Link href="/dashboard/college/reviews">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-neutral-900">{review.studentName}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < review.rating ? "text-yellow-400" : "text-neutral-300"}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-neutral-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "leads" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Leads ({leads.length})</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Export</Button>
                <Button variant="outline" size="sm">Filter</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.map((lead: any) => {
                  const badge = statusBadge[lead.status] || statusBadge.new;
                  return (
                    <div key={lead._id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary-700">{lead.name?.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">{lead.name}</p>
                          <p className="text-sm text-neutral-500">{lead.email} • {lead.phone}</p>
                          <p className="text-sm text-neutral-400">{lead.course || "General enquiry"}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="ghost" size="sm">Update Status</Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "courses" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Course Management</CardTitle>
              <Button>Add Course</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => {
                  const badge = statusBadge[course.status];
                  const fillPercent = (course.filled / course.seats) * 100;
                  return (
                    <div key={course.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                      <div className="flex-1">
                        <p className="font-medium text-neutral-900">{course.name}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="w-32">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-neutral-500">Seats</span>
                              <span className="font-medium">{course.filled}/{course.seats}</span>
                            </div>
                            <div className="h-2 bg-neutral-100 rounded-full">
                              <div className={`h-2 rounded-full ${fillPercent >= 90 ? "bg-red-500" : fillPercent >= 70 ? "bg-yellow-500" : "bg-green-500"}`} style={{ width: `${fillPercent}%` }} />
                            </div>
                          </div>
                          <span className="text-sm text-neutral-600">{course.fees}</span>
                        </div>
                      </div>
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "reviews" && (
          <Card>
            <CardHeader>
              <CardTitle>Reviews & Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-neutral-50 rounded-xl">
                  <p className="text-4xl font-bold text-neutral-900">4.5</p>
                  <div className="flex justify-center gap-1 my-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < 4 ? "text-yellow-400" : "text-neutral-300"}>★</span>
                    ))}
                  </div>
                  <p className="text-sm text-neutral-500">Based on 127 reviews</p>
                </div>
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm text-neutral-600">{star} ★</span>
                    <div className="flex-1 h-2 bg-neutral-100 rounded-full">
                      <div className="h-2 bg-yellow-400 rounded-full" style={{ width: `${star * 20}%` }} />
                    </div>
                    <span className="text-sm text-neutral-500">{star * 20}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="p-4 border border-neutral-200 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary-700">{review.studentName.charAt(0)}</span>
                        </div>
                        <p className="font-medium text-neutral-900">{review.studentName}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < review.rating ? "text-yellow-400" : "text-neutral-300"}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-neutral-600">{review.comment}</p>
                    <p className="text-xs text-neutral-400 mt-2">{formatDate(review.date)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: "Website", count: 45, percent: 45 },
                    { source: "Direct", count: 30, percent: 30 },
                    { source: "Referral", count: 15, percent: 15 },
                    { source: "Social Media", count: 10, percent: 10 },
                  ].map((item) => (
                    <div key={item.source} className="flex items-center gap-4">
                      <span className="w-20 text-sm text-neutral-600">{item.source}</span>
                      <div className="flex-1 h-4 bg-neutral-100 rounded-full">
                        <div className="h-4 bg-primary-500 rounded-full" style={{ width: `${item.percent}%` }} />
                      </div>
                      <span className="text-sm font-medium text-neutral-900 w-12 text-right">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stage: "Total Leads", count: 150, color: "bg-blue-500" },
                    { stage: "Contacted", count: 120, color: "bg-yellow-500" },
                    { stage: "Interested", count: 80, color: "bg-purple-500" },
                    { stage: "Applied", count: 45, color: "bg-green-500" },
                    { stage: "Admitted", count: 25, color: "bg-emerald-500" },
                  ].map((item) => (
                    <div key={item.stage} className="flex items-center gap-4">
                      <span className="w-24 text-sm text-neutral-600">{item.stage}</span>
                      <div className="flex-1 h-6 bg-neutral-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} flex items-center justify-end pr-2`} style={{ width: `${(item.count / 150) * 100}%` }}>
                          <span className="text-xs text-white font-medium">{item.count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default function CollegeDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["college"]}>
      <CollegeDashboardContent />
    </ProtectedRoute>
  );
}