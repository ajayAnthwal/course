"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, StatCard, AreaChart, PieChart } from "@/components/ui";
import { useDashboardStats } from "@/features/analytics";
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
  const { data: dashboardData, isLoading } = useDashboardStats();

  const stats = dashboardData?.data;
  const leadsData = stats?.leads;
  const collegesData = stats?.colleges;
  const recentLeads = stats?.recentLeads || [];

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Dashboard Overview</h1>
            <p className="text-neutral-500 mt-1">Welcome back, {user?.name}. Here&apos;s your platform at a glance.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Users"
            value={stats?.users?.total ?? 0}
            change="+12%"
            changeType="positive"
            icon={<svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
            iconBg="bg-primary-50"
          />
          <StatCard
            label="Total Colleges"
            value={collegesData?.total ?? 0}
            change="+5%"
            changeType="positive"
            icon={<svg className="w-5 h-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
            iconBg="bg-secondary-50"
          />
          <StatCard
            label="Total Leads"
            value={leadsData?.total ?? 0}
            change="+23%"
            changeType="positive"
            icon={<svg className="w-5 h-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
            iconBg="bg-accent-50"
          />
          <StatCard
            label="Conversion Rate"
            value={`${leadsData?.conversionRate ?? 0}%`}
            change="+3.2%"
            changeType="positive"
            icon={<svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            iconBg="bg-rose-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-neutral-900">Leads Over Time</h2>
                <p className="text-xs text-neutral-500 mt-0.5">Monthly lead submissions</p>
              </div>
              <Badge variant="primary" size="sm">Live Data</Badge>
            </div>
            <AreaChart data={stats?.charts?.leadsOverTime || []} color="#6366f1" height={240} />
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-neutral-900">College Types</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Distribution by type</p>
            </div>
            <PieChart data={stats?.charts?.collegeDistribution || []} height={240} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
              <h2 className="text-sm font-semibold text-neutral-900">Recent Leads</h2>
              <Link href="/dashboard/admin/leads" className="text-xs text-primary-600 hover:text-primary-700 font-medium">View all →</Link>
            </div>
            <div className="p-2">
              {recentLeads.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-3xl mb-2">📋</div>
                  <p className="text-sm text-neutral-500">No leads yet</p>
                </div>
              ) : (
                recentLeads.map((lead: any) => {
                  const badge = statusBadge[lead.status as LeadStatus] || statusBadge.new;
                  return (
                    <div key={lead._id} className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                          <span className="text-xs font-semibold text-primary-600">{lead.name?.charAt(0)}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-neutral-900 truncate">{lead.name}</p>
                          <p className="text-xs text-neutral-500">{lead.course || "General"} · {formatDate(lead.createdAt)}</p>
                        </div>
                      </div>
                      <Badge variant={badge.variant} size="sm">{badge.label}</Badge>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Manage Users", href: "/dashboard/admin/users", icon: "👥", color: "bg-primary-50 text-primary-600" },
                { label: "View Leads", href: "/dashboard/admin/leads", icon: "📋", color: "bg-accent-50 text-accent-600" },
                { label: "Colleges", href: "/dashboard/admin/colleges", icon: "🏛️", color: "bg-secondary-50 text-secondary-600" },
                { label: "Settings", href: "/dashboard/admin/settings", icon: "⚙️", color: "bg-neutral-100 text-neutral-600" },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-neutral-100 hover:border-neutral-200 hover:shadow-sm transition-all"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                    <span className="text-lg">{action.icon}</span>
                  </div>
                  <span className="text-sm font-medium text-neutral-700">{action.label}</span>
                </Link>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-neutral-100">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Lead Status Breakdown</h3>
              <div className="space-y-2.5">
                {[
                  { label: "New", count: leadsData?.new ?? 0, color: "#6366f1" },
                  { label: "Contacted", count: leadsData?.contacted ?? 0, color: "#f59e0b" },
                  { label: "Interested", count: leadsData?.interested ?? 0, color: "#10b981" },
                  { label: "Admitted", count: leadsData?.admitted ?? 0, color: "#f43f5e" },
                ].map((item) => {
                  const total = leadsData?.total || 1;
                  const pct = Math.round((item.count / total) * 100);
                  return (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-neutral-600 flex-1">{item.label}</span>
                      <span className="text-sm font-medium text-neutral-900">{item.count}</span>
                      <span className="text-xs text-neutral-400 w-10 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
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