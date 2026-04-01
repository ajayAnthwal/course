"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { LoadingPage } from "@/components/ui";
import type { UserRole } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <LoadingPage message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="text-4xl">🔒</div>
        <h2 className="text-xl font-semibold text-neutral-900">Access Denied</h2>
        <p className="text-neutral-500">
          You don&apos;t have permission to access this page.
        </p>
        <button
          onClick={() => router.push(`/dashboard/${user.role}`)}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Go to your dashboard
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
