"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth";
import { LoadingPage } from "@/components/ui";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user) {
        router.push(`/dashboard/${user.role}`);
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  return <LoadingPage message="Redirecting to your dashboard..." />;
}
