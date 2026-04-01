"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import { useCollegeStats } from "@/features/colleges";
import { useLeadStats, useLeads } from "@/features/leads";
import { formatDate } from "@/lib/utils";
import type { LeadStatus } from "@/types";

const statusBadge: Record<LeadStatus, { label: string; variant: "primary" | "secondary" | "success" | "warning" | "danger" | "default" }> = {
  new: { label: "New", variant: "primary" },
  contacted: { label: "Contacted", variant: "warning" },
  interested: { label: "Interested", variant: "secondary" },
  admitted: { label: "Admitted", variant: "success" },
  not_interested: { label: "Not Interested", variant: "danger" },
};

function AdminDashboardContent() {
  const { user } = useAuth();
  const { data: collegeStats } = useCollegeStats();
  const { data: leadStats } = useLeadStats();
  const { data: recentLeadsData } = useLeads({ limit: 5, sortBy: "createdAt", sortOrder: "desc" });

  const leadData = leadStats?.data;
  const recentLeads = recentLeadsData?.data || [];

  const stats = [
    { label: "Total Users", value: "1,234", change: "+12%", icon: "👥" },
    { label: "Total Colleges", value: collegeStats?.data?.total || "0", change: "+5%", icon: "🏛️" },
    { label: "Total Leads", value: leadData?.total ?? "0", change: "+23%", icon: "📋" },
    { label: "New Leads", value: leadData?.new ?? "0", change: "uncontacted", icon: "🆕" },
  ];

  const quickActions = [
    { label: "Add College", href: "#", icon: "➕" },
    { label: "View Leads", href: "/dashboard/admin/leads", icon: "📋" },
    { label: "Manage Users", href: "#", icon: "👥" },
    { label: "Reports", href: "#", icon: "📊" },
  ];

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>
          <p className="text-neutral-500 mt-1">
            Welcome back, {user?.name}. Here&apos;s what&apos;s happening.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} hover>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-neutral-900 mt-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-secondary-600 mt-1">
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="text-3xl">{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span className="text-sm font-medium text-neutral-700">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Leads</CardTitle>
              <Link
                href="/dashboard/admin/leads"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentLeads.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-3xl mb-2">📋</div>
                <p className="text-sm text-neutral-500">No leads yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentLeads.map((lead) => {
                  const badge = statusBadge[lead.status] || statusBadge.new;
                  return (
                    <div
                      key={lead._id}
                      className="flex items-center justify-between p-3 rounded-lg border border-neutral-100 hover:border-neutral-200 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary-500" />
                        <div>
                          <p className="text-sm font-medium text-neutral-900">{lead.name}</p>
                          <p className="text-xs text-neutral-500">
                            {lead.course || "General enquiry"} · {formatDate(lead.createdAt)}
                          </p>
                        </div>
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
      </div>
    </DashboardLayout>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
