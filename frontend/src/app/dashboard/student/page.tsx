"use client";

import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

function StudentDashboardContent() {
  const { user } = useAuth();

  const stats = [
    { label: "Applications", value: "5", icon: "📝" },
    { label: "Saved Colleges", value: "12", icon: "❤️" },
    { label: "Counseling Sessions", value: "2", icon: "📞" },
    { label: "Documents", value: "8", icon: "📄" },
  ];

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Student Dashboard</h1>
          <p className="text-neutral-500 mt-1">
            Welcome back, {user?.name}. Track your applications and explore colleges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} hover>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{stat.icon}</div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                    <p className="text-sm text-neutral-500">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { college: "IIT Bombay", status: "Under Review", statusColor: "warning" },
                  { college: "Delhi University", status: "Accepted", statusColor: "success" },
                  { college: "BITS Pilani", status: "Pending", statusColor: "default" },
                ].map((app, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-neutral-200"
                  >
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{app.college}</p>
                      <p className="text-xs text-neutral-500">Applied 2 weeks ago</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      app.statusColor === "success"
                        ? "bg-secondary-100 text-secondary-700"
                        : app.statusColor === "warning"
                        ? "bg-warning-100 text-warning-600"
                        : "bg-neutral-100 text-neutral-600"
                    }`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Colleges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "IIM Ahmedabad", location: "Ahmedabad, Gujarat", rating: 4.9 },
                  { name: "VIT Vellore", location: "Vellore, Tamil Nadu", rating: 4.3 },
                  { name: "SRM University", location: "Chennai, Tamil Nadu", rating: 4.1 },
                ].map((college, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{college.name}</p>
                      <p className="text-xs text-neutral-500">{college.location}</p>
                    </div>
                    <div className="flex items-center gap-1 text-secondary-600">
                      <span className="text-xs">⭐</span>
                      <span className="text-sm font-medium">{college.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
