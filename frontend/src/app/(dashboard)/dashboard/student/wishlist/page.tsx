"use client";

import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { StudentWishlist } from "@/components/student/wishlist";

export default function WishlistPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <DashboardLayout role="student" userName={user?.name}>
        <StudentWishlist />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
