"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge, Spinner, Button } from "@/components/ui";
import { useLeads, useLeadStats } from "@/features/leads";
import { useFeaturedColleges } from "@/features/colleges";
import { formatDate } from "@/lib/utils";
import type { LeadStatus } from "@/types";

const statusBadge: Record<LeadStatus, { label: string; variant: "primary" | "secondary" | "success" | "warning" | "danger" | "default" }> = {
  new: { label: "New", variant: "primary" },
  contacted: { label: "Contacted", variant: "warning" },
  interested: { label: "Interested", variant: "secondary" },
  admitted: { label: "Admitted", variant: "success" },
  not_interested: { label: "Not Interested", variant: "danger" },
};

function getCollegeName(college: any): string {
  if (typeof college === "string") return college;
  return college?.name || "N/A";
}

function StudentDashboardContent() {
  const { user } = useAuth();

  const { data: leadsData, isLoading: leadsLoading } = useLeads({
    limit: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { data: leadStatsData } = useLeadStats();
  const { data: featuredData } = useFeaturedColleges();

  const leads = leadsData?.data || [];
  const leadStats = leadStatsData?.data;
  const featuredColleges = featuredData?.data || [];

  const stats = [
    { label: "Total Enquiries", value: leadStats?.total ?? 0, icon: "📋", color: "bg-primary-50 text-primary-700" },
    { label: "New", value: leadStats?.new ?? 0, icon: "🆕", color: "bg-blue-50 text-blue-700" },
    { label: "Contacted", value: leadStats?.contacted ?? 0, icon: "📞", color: "bg-yellow-50 text-yellow-700" },
    { label: "Admitted", value: leadStats?.admitted ?? 0, icon: "🎓", color: "bg-green-50 text-green-700" },
  ];

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Student Dashboard</h1>
          <p className="text-neutral-500 mt-1">
            Welcome back, {user?.name}. Track your enquiries and explore colleges.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} hover>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${stat.color}`}>
                    {stat.icon}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Enquiries */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Enquiries</CardTitle>
                <Link href="/dashboard/student/enquiries">
                  <Button variant="ghost" size="sm">View all</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {leadsLoading ? (
                <div className="flex justify-center py-8">
                  <Spinner size="md" />
                </div>
              ) : leads.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-3xl mb-2">📋</div>
                  <p className="text-sm text-neutral-500">No enquiries yet</p>
                  <Link href="/colleges">
                    <Button variant="outline" size="sm" className="mt-3">Browse Colleges</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {leads.map((lead) => {
                    const badge = statusBadge[lead.status] || statusBadge.new;
                    return (
                      <div
                        key={lead._id}
                        className="flex items-center justify-between p-3 rounded-lg border border-neutral-100 hover:border-neutral-200 transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-neutral-900 truncate">
                            {getCollegeName(lead.college)}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {lead.course || "General enquiry"} · {formatDate(lead.createdAt)}
                          </p>
                        </div>
                        <Badge variant={badge.variant} size="sm">
                          {badge.label}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Featured Colleges */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Featured Colleges</CardTitle>
                <Link href="/colleges">
                  <Button variant="ghost" size="sm">Browse all</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {featuredColleges.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-3xl mb-2">🏛️</div>
                  <p className="text-sm text-neutral-500">No featured colleges</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {featuredColleges.slice(0, 4).map((college) => (
                    <Link
                      key={college._id}
                      href={`/colleges/${college._id}`}
                      className="flex items-center justify-between p-3 rounded-lg border border-neutral-100 hover:border-primary-300 hover:bg-primary-50/50 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-neutral-900 truncate">{college.name}</p>
                        <p className="text-xs text-neutral-500">
                          {college.location.city}, {college.location.state}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-secondary-600 shrink-0">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-medium">{college.rating}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Profile Summary */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Profile</CardTitle>
              <Link href="/dashboard/student/profile">
                <Button variant="ghost" size="sm">Edit</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Name</p>
                <p className="text-sm font-medium text-neutral-900">{user?.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm text-neutral-700">{user?.email}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Role</p>
                <Badge variant="primary" size="sm">Student</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
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
