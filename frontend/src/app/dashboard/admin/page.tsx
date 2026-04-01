"use client";

import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useCollegeStats } from "@/features/colleges";

function AdminDashboardContent() {
  const { user } = useAuth();
  const { data: collegeStats } = useCollegeStats();

  const stats = [
    { label: "Total Users", value: "1,234", change: "+12%", icon: "👥" },
    { label: "Total Colleges", value: collegeStats?.data?.total || "0", change: "+5%", icon: "🏛️" },
    { label: "Total Leads", value: "4,567", change: "+23%", icon: "📋" },
    { label: "Revenue", value: "₹12.5L", change: "+18%", icon: "💰" },
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
              {[
                { label: "Add College", href: "#", icon: "➕" },
                { label: "View Leads", href: "#", icon: "📋" },
                { label: "Manage Users", href: "#", icon: "👥" },
                { label: "Reports", href: "#", icon: "📊" },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span className="text-sm font-medium text-neutral-700">
                    {action.label}
                  </span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "New lead from Mumbai",
                  time: "2 minutes ago",
                  type: "lead",
                },
                {
                  action: "College profile updated",
                  time: "1 hour ago",
                  type: "college",
                },
                {
                  action: "New user registered",
                  time: "3 hours ago",
                  type: "user",
                },
                {
                  action: "Payment received",
                  time: "5 hours ago",
                  type: "payment",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-500" />
                    <span className="text-sm text-neutral-700">
                      {activity.action}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
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
