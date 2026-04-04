"use client";

import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { DiscoverColleges } from "@/components/student/discover-colleges";

export default function StudentCollegesPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <DashboardLayout role="student" userName={user?.name}>
        <DiscoverColleges />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
