"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge, Spinner, Button } from "@/components/ui";
import { useLeads } from "@/features/leads";
import { formatDate } from "@/lib/utils";
import type { LeadStatus } from "@/types";

const statusBadge: Record<LeadStatus, { label: string; variant: "primary" | "secondary" | "success" | "warning" | "danger" | "default" }> = {
  new: { label: "New", variant: "primary" },
  contacted: { label: "Contacted", variant: "warning" },
  interested: { label: "Interested", variant: "secondary" },
  admitted: { label: "Admitted", variant: "success" },
  not_interested: { label: "Not Interested", variant: "danger" },
};

function CollegeDashboardContent() {
  const { user } = useAuth();

  const { data: leadsData, isLoading } = useLeads({
    limit: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { data: allLeadsData } = useLeads({ limit: 100 });

  const leads = leadsData?.data || [];
  const allLeads = allLeadsData?.data || [];

  const stats = {
    total: allLeadsData?.pagination?.total ?? allLeads.length,
    new: allLeads.filter((l) => l.status === "new").length,
    contacted: allLeads.filter((l) => l.status === "contacted").length,
    interested: allLeads.filter((l) => l.status === "interested").length,
    admitted: allLeads.filter((l) => l.status === "admitted").length,
  };

  const statCards = [
    { label: "Total Leads", value: stats.total, icon: "📋", color: "bg-primary-50 text-primary-700" },
    { label: "New", value: stats.new, icon: "🆕", color: "bg-blue-50 text-blue-700" },
    { label: "Interested", value: stats.interested, icon: "⭐", color: "bg-purple-50 text-purple-700" },
    { label: "Admitted", value: stats.admitted, icon: "🎓", color: "bg-green-50 text-green-700" },
  ];

  return (
    <DashboardLayout role="college" userName={user?.name}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">College Dashboard</h1>
          <p className="text-neutral-500 mt-1">
            Welcome back, {user?.name}. Manage your leads and track admissions.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
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

        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Leads</CardTitle>
              <Link href="/dashboard/college/leads">
                <Button variant="ghost" size="sm">View all</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Spinner size="md" />
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-3xl mb-2">📋</div>
                <p className="text-sm text-neutral-500">No leads yet</p>
                <p className="text-xs text-neutral-400 mt-1">Leads will appear when students enquire about your college</p>
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
                        <p className="text-sm font-medium text-neutral-900">{lead.name}</p>
                        <p className="text-xs text-neutral-500">
                          {lead.course || "General enquiry"} · {formatDate(lead.createdAt)}
                        </p>
                        <p className="text-xs text-neutral-400">{lead.email} · {lead.phone}</p>
                      </div>
                      <Badge variant={badge.variant} size="sm" dot>
                        {badge.label}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/dashboard/college/leads"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                <span className="text-2xl">📋</span>
                <span className="text-sm font-medium text-neutral-700">View Leads</span>
              </Link>
              <Link
                href="/dashboard/college/settings"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                <span className="text-2xl">🏛️</span>
                <span className="text-sm font-medium text-neutral-700">College Profile</span>
              </Link>
              <Link
                href="/dashboard/college/settings"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                <span className="text-2xl">📚</span>
                <span className="text-sm font-medium text-neutral-700">Manage Courses</span>
              </Link>
              <Link
                href="/dashboard/college/settings"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                <span className="text-2xl">⚙️</span>
                <span className="text-sm font-medium text-neutral-700">Settings</span>
              </Link>
            </div>
          </CardContent>
        </Card>
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
