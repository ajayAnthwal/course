"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, StatCard } from "@/components/ui";
import { useFeaturedColleges } from "@/features/colleges";
import { useApplications, useApplicationStats } from "@/features/applications/hooks/useApplications";
import { useWishlistStats } from "@/features/wishlist/hooks/useWishlist";
import { useDocuments } from "@/features/documents";
import { formatDate } from "@/lib/utils";

const statusVariants: Record<string, { label: string; variant: "success" | "warning" | "primary" | "danger" | "secondary" | "default" }> = {
  applied: { label: "Applied", variant: "default" },
  under_review: { label: "Under Review", variant: "primary" },
  shortlisted: { label: "Shortlisted", variant: "success" },
  accepted: { label: "Accepted", variant: "success" },
  rejected: { label: "Rejected", variant: "danger" },
  enrolled: { label: "Enrolled", variant: "success" },
};

function StudentDashboardContent() {
  const { user } = useAuth();

  const { data: collegeData } = useFeaturedColleges();
  const { data: applicationsData, isLoading: appsLoading } = useApplications({ limit: 5 });
  const { data: appStats } = useApplicationStats();
  const { data: wishlistStats } = useWishlistStats();
  const { data: documentsData } = useDocuments();

  const applications = applicationsData?.data || [];
  const stats = appStats?.data;
  const wishlist = wishlistStats?.data;
  const documents = documentsData?.data || [];

  const statCards = [
    { label: "Applications", value: stats?.total || 0, icon: "📝", color: "bg-indigo-50" },
    { label: "Shortlisted", value: stats?.shortlisted || 0, icon: "✅", color: "bg-green-50" },
    { label: "Wishlist", value: wishlist?.total || 0, icon: "❤️", color: "bg-red-50" },
    { label: "Documents", value: documents.length || 0, icon: "📄", color: "bg-blue-50" },
  ];

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <p className="text-sm">Welcome back, {user?.name}</p>
          </div>
          <Link href="/colleges">
            <Button>Browse Colleges</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.label} hover>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <span className="text-lg">{stat.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Applications</CardTitle>
              <Link href="/dashboard/student/applications" className="text-sm text-indigo-600 font-medium">
                View all →
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-[var(--color-text-muted)]">No applications yet</p>
                    <Link href="/colleges">
                      <Button variant="outline" size="sm" className="mt-2">Apply Now</Button>
                    </Link>
                  </div>
                ) : (
                  applications.slice(0, 3).map((app: any) => {
                    const status = statusVariants[app.status] || statusVariants.applied;
                    return (
                      <Link
                        key={app._id}
                        href={`/dashboard/student/applications/${app._id}`}
                        className="flex items-center justify-between p-3 bg-[var(--color-bg-muted)] rounded-lg hover:bg-[var(--color-border-subtle)]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🏛️</span>
                          <div>
                    <p className="font-medium">{(app as any).college?.name}</p>
                            <p className="text-sm">{app.course}</p>
                          </div>
                        </div>
                        <Badge variant={status.variant} size="sm">{status.label}</Badge>
                      </Link>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Colleges */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recommended Colleges</CardTitle>
              <Link href="/colleges" className="text-sm text-indigo-600">
                View all →
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {((collegeData as any)?.data || []).slice(0, 3).map((college: any) => (
                  <Link
                    key={college._id}
                    href={`/colleges/${college._id}`}
                    className="flex items-center justify-between p-3 bg-[var(--color-bg-muted)] rounded-lg hover:bg-[var(--color-border-subtle)]"
                  >
                    <div>
                      <p className="font-medium">{college.name}</p>
                      <p className="text-sm">
                        {college.location?.city}, {college.location?.state}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <span>⭐</span>
                      <span className="font-medium">{college.rating || "N/A"}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "My Wishlist", href: "/dashboard/student/wishlist", icon: "❤️" },
            { label: "Documents", href: "/dashboard/student/documents", icon: "📄" },
            { label: "Payments", href: "/dashboard/student/payment", icon: "💳" },
            { label: "Messages", href: "/dashboard/student/messages", icon: "💬" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:shadow-sm transition-all"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
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