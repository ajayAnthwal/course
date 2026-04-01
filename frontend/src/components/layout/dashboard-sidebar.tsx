"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: Record<UserRole, NavItem[]> = {
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: "📊" },
    { label: "Users", href: "/dashboard/admin/users", icon: "👥" },
    { label: "Colleges", href: "/dashboard/admin/colleges", icon: "🏛️" },
    { label: "Leads", href: "/dashboard/admin/leads", icon: "📋" },
    { label: "Settings", href: "/dashboard/admin/settings", icon: "⚙️" },
  ],
  student: [
    { label: "Overview", href: "/dashboard/student", icon: "📊" },
    { label: "My Enquiries", href: "/dashboard/student/enquiries", icon: "📋" },
    { label: "Profile", href: "/dashboard/student/profile", icon: "👤" },
  ],
  college: [
    { label: "Overview", href: "/dashboard/college", icon: "📊" },
    { label: "Leads", href: "/dashboard/college/leads", icon: "📋" },
    { label: "Courses", href: "/dashboard/college/courses", icon: "📚" },
    { label: "Reviews", href: "/dashboard/college/reviews", icon: "⭐" },
    { label: "Settings", href: "/dashboard/college/settings", icon: "⚙️" },
  ],
  teacher: [
    { label: "Overview", href: "/dashboard/teacher", icon: "📊" },
    { label: "Courses", href: "/dashboard/teacher/courses", icon: "📚" },
    { label: "Students", href: "/dashboard/teacher/students", icon: "👨‍🎓" },
    { label: "Profile", href: "/dashboard/teacher/profile", icon: "👤" },
  ],
};

interface DashboardSidebarProps {
  role: UserRole;
  userName?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function DashboardSidebar({ role, userName, isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const items = navItems[role] || [];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-white border-r border-neutral-200 transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-neutral-200 shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">EP</span>
            </div>
            <span className="text-base font-bold text-neutral-900">EduPortal</span>
          </Link>
          <button
            className="lg:hidden p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100"
            onClick={onClose}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        <div className="px-4 py-4 border-b border-neutral-100 shrink-0">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary-700">
                {userName?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">{userName}</p>
              <p className="text-xs text-neutral-500 capitalize">{role} Account</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
            Menu
          </p>
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-primary-50 text-primary-700 shadow-sm"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                )}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
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
    </>
  );
}
