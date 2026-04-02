"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { UserRole } from "@/types";

interface ParentDashboardLayoutProps {
  children: React.ReactNode;
}

export default function ParentDashboardLayout({ children }: ParentDashboardLayoutProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: "Overview", href: "/dashboard/parent", icon: "📊" },
    { label: "My Child's Applications", href: "/dashboard/parent/applications", icon: "📝" },
    { label: "Track Status", href: "/dashboard/parent/status", icon: "🔍" },
    { label: "Messages", href: "/dashboard/parent/messages", icon: "💬" },
    { label: "Profile", href: "/dashboard/parent/profile", icon: "👤" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-white border-r border-neutral-200 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-neutral-200 shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">EP</span>
            </div>
            <span className="text-base font-bold text-neutral-900">EduPortal</span>
          </Link>
          <button
            className="lg:hidden p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100"
            onClick={() => setSidebarOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-4 py-4 border-b border-neutral-100 shrink-0">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-lg bg-secondary-100 flex items-center justify-center">
              <span className="text-sm font-semibold text-secondary-700">
                {user?.name?.charAt(0).toUpperCase() || "P"}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">{user?.name || "Parent"}</p>
              <p className="text-xs text-neutral-500">Parent Account</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-all"
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-100 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2.5 text-sm text-neutral-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Website
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-neutral-200/60 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
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
              Welcome, <span className="font-medium text-neutral-900">{user?.name || "Parent"}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-neutral-500 hover:text-primary-600 hidden sm:flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Site
            </Link>
            <div className="w-px h-6 bg-neutral-200 hidden sm:block" />
            <Button variant="ghost" size="sm" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}