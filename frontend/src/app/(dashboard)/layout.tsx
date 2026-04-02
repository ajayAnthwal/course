"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Button } from "@/components/ui";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { UserRole } from "@/types";

const rolePrefixes: Record<UserRole, string> = {
  student: "/dashboard/student",
  teacher: "/dashboard/teacher",
  college: "/dashboard/college",
  admin: "/dashboard/admin",
  parent: "/dashboard/parent",
};

export default function DashboardGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, isLoggingOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = user?.role as UserRole | undefined;
  const userName = user?.name;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    } else if (!isLoading && isAuthenticated && user?.role && !pathname.startsWith(rolePrefixes[user.role])) {
      router.push(`/dashboard/${user.role}`);
    }
  }, [isLoading, isAuthenticated, user, pathname, router]);

  if (isLoading || !role) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-neutral-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <DashboardSidebar role={role} userName={userName} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-neutral-200/60">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              className="lg:hidden p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="hidden sm:block">
              <p className="text-sm text-neutral-500">
                Welcome back, <span className="font-medium text-neutral-900">{userName}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <Link
                href="/"
                className="text-sm text-neutral-500 hover:text-primary-600 transition-colors hidden sm:flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Site
              </Link>
              <div className="w-px h-6 bg-neutral-200 hidden sm:block" />
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-white">
                    {userName?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-neutral-900 leading-tight">{userName}</p>
                  <p className="text-[11px] text-neutral-500 capitalize">{role}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => logout()} disabled={isLoggingOut}>
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}