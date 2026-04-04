"use client";

import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { StudentProfile } from "@/components/student/profile";

export default function StudentProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <DashboardLayout role="student" userName={user?.name}>
        <StudentProfile />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
