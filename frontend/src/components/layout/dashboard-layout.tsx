"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { UserRole } from "@/types";

// Dynamic import for sidebar - loaded lazily to improve initial load
const DashboardSidebar = dynamic(() => import("./dashboard-sidebar").then(mod => mod.DashboardSidebar), {
  ssr: false,
  loading: () => (
    <aside className="w-64 bg-white border-r border-neutral-200 animate-pulse">
      <div className="p-6 space-y-4">
        <div className="h-8 bg-neutral-100 rounded-lg w-20" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-10 bg-neutral-100 rounded-lg" />
          ))}
        </div>
      </div>
    </aside>
  ),
});

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
  userName?: string;
}

export function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
  const { user, logout, isLoggingOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar - lazy loaded via dynamic import */}
      <DashboardSidebar 
        role={role} 
        userName={userName || user?.name} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-neutral-200/60">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Breadcrumb / Page Title placeholder */}
            <div className="hidden sm:block">
              <p className="text-sm text-neutral-500">
                Welcome back, <span className="font-medium text-neutral-900">{userName || user?.name}</span>
              </p>
            </div>

            {/* Right side */}
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
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-neutral-900 leading-tight">{user?.name}</p>
                  <p className="text-[11px] text-neutral-500 capitalize">{user?.role}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => logout()} 
                disabled={isLoggingOut}
                className="transition-colors"
              >
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}