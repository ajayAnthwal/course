"use client";

import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

function CollegeDashboardContent() {
  const { user } = useAuth();

  const stats = [
    { label: "Total Leads", value: "156", change: "+23%", icon: "📋" },
    { label: "New Leads", value: "12", change: "+8%", icon: "🆕" },
    { label: "Admissions", value: "34", change: "+15%", icon: "🎓" },
    { label: "Revenue", value: "₹2.4L", change: "+12%", icon: "💰" },
  ];

  return (
    <DashboardLayout role="college" userName={user?.name}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">College Dashboard</h1>
          <p className="text-neutral-500 mt-1">
            Manage your leads and track admissions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} hover>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-neutral-900 mt-1">{stat.value}</p>
                    <p className="text-xs text-secondary-600 mt-1">{stat.change}</p>
                  </div>
                  <div className="text-3xl">{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Rahul Sharma", course: "B.Tech CSE", status: "New", time: "2 hours ago" },
                { name: "Priya Patel", course: "MBA", status: "Contacted", time: "5 hours ago" },
                { name: "Amit Kumar", course: "B.Com", status: "Interested", time: "1 day ago" },
              ].map((lead, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-neutral-200"
                >
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{lead.name}</p>
                    <p className="text-xs text-neutral-500">{lead.course} · {lead.time}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    lead.status === "New"
                      ? "bg-primary-100 text-primary-700"
                      : lead.status === "Interested"
                      ? "bg-secondary-100 text-secondary-700"
                      : "bg-warning-100 text-warning-600"
                  }`}>
                    {lead.status}
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

export default function CollegeDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["college"]}>
      <CollegeDashboardContent />
    </ProtectedRoute>
  );
}
