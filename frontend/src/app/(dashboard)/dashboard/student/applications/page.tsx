"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { useApplications, useApplicationStats } from "@/features/applications/hooks/useApplications";
import { formatDate } from "@/lib/utils";

function StudentApplicationsPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  const { data: statsData } = useApplicationStats();
  const { data: applicationsData, isLoading } = useApplications({
    page,
    limit: 10,
    status: statusFilter || undefined,
  });

  const applications = applicationsData?.data || [];
  const pagination = applicationsData?.pagination;
  const stats = statsData?.data;

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: "success" | "warning" | "primary" | "danger" | "default" }> = {
      applied: { label: "Applied", variant: "default" },
      under_review: { label: "Under Review", variant: "primary" },
      shortlisted: { label: "Shortlisted", variant: "success" },
      rejected: { label: "Rejected", variant: "danger" as const },
      accepted: { label: "Accepted", variant: "success" as const },
      paid: { label: "Fee Paid", variant: "primary" as const },
      enrolled: { label: "Enrolled", variant: "success" as const },
    };
    return variants[status] || { label: status, variant: "default" as any };
  };

  const statusCounts = [
    { status: "", label: "All", count: stats?.total || 0 },
    { status: "applied", label: "Applied", count: stats?.applied || 0 },
    { status: "under_review", label: "Under Review", count: stats?.underReview || 0 },
    { status: "shortlisted", label: "Shortlisted", count: stats?.shortlisted || 0 },
    { status: "accepted", label: "Accepted", count: stats?.accepted || 0 },
    { status: "rejected", label: "Rejected", count: stats?.rejected || 0 },
  ];

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text)]">My Applications</h1>
            <p className="text-[var(--color-text-muted)]">Track all your college applications</p>
          </div>
          <Link href="/colleges">
            <Button>Apply to College</Button>
          </Link>
        </div>

        {/* Status Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {statusCounts.map((item) => (
            <div 
              key={item.status}
              className={`cursor-pointer ${statusFilter === item.status ? 'ring-2 ring-primary-500' : ''}`}
              onClick={() => { setStatusFilter(item.status); setPage(1); }}
            >
              <Card hover>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">{item.count}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{item.label}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <CardTitle>All Applications ({pagination?.total || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-[var(--color-text-muted)]">Loading...</div>
            ) : applications.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[var(--color-text-muted)] mb-4">No applications found</p>
                <Link href="/colleges">
                  <Button>Apply to College</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app: any) => {
                  const badge = getStatusBadge(app.status);
                  return (
                    <div 
                      key={app._id} 
                      className="flex items-center justify-between p-4 border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg-muted)]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-[var(--color-bg-muted)] rounded-xl flex items-center justify-center text-2xl">
                          🏛️
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--color-text)]">{(app as any).college?.name}</p>
                          <p className="text-sm text-[var(--color-text-muted)]">{app.course}</p>
                          <p className="text-xs text-[var(--color-text-muted)] mt-1">
                            Applied: {formatDate(app.appliedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div>
                          <Badge variant={badge.variant} className="mb-2">{badge.label}</Badge>
                          <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                            {app.paymentAmount ? `₹${app.paymentAmount.toLocaleString()}` : "—"}
                          </p>
                          <Link href={`/dashboard/student/applications/${app._id}`}>
                            <Button variant="ghost" size="sm" className="mt-2">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-sm text-[var(--color-text-muted)]">
                  Showing {applications.length} of {pagination.total}
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={page >= pagination.totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function ApplicationsPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentApplicationsPage />
    </ProtectedRoute>
  );
}

export default ApplicationsPage;