"use client";

import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

function TeacherDashboardContent() {
  const { user } = useAuth();

  const stats = [
    { label: "My Courses", value: "8", icon: "📚" },
    { label: "Total Students", value: "245", icon: "👨‍🎓" },
    { label: "Classes Today", value: "3", icon: "🕐" },
    { label: "Avg Rating", value: "4.7", icon: "⭐" },
  ];

  return (
    <DashboardLayout role="teacher" userName={user?.name}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Teacher Dashboard</h1>
          <p className="text-neutral-500 mt-1">
            Welcome back, {user?.name}. Manage your courses and students.
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

        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { subject: "Data Structures", time: "9:00 AM - 10:30 AM", room: "Room 301", students: 45 },
                { subject: "Algorithms", time: "11:00 AM - 12:30 PM", room: "Room 205", students: 38 },
                { subject: "Database Systems", time: "2:00 PM - 3:30 PM", room: "Lab 2", students: 42 },
              ].map((cls, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-neutral-200"
                >
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{cls.subject}</p>
                    <p className="text-xs text-neutral-500">{cls.time} · {cls.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neutral-900">{cls.students}</p>
                    <p className="text-xs text-neutral-500">students</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default function TeacherDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <TeacherDashboardContent />
    </ProtectedRoute>
  );
}
