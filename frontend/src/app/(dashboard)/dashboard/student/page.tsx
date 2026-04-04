"use client";

import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { StudentDashboardHome } from "@/components/student/dashboard-home";

export default function StudentDashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <DashboardLayout role="student" userName={user?.name}>
        <StudentDashboardHome />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
