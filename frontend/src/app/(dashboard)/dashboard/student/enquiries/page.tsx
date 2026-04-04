"use client";

import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { StudentEnquiries } from "@/components/student/enquiries";

export default function StudentEnquiriesPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <DashboardLayout role="student" userName={user?.name}>
        <StudentEnquiries />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
