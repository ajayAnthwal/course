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
    { label: "My Applications", href: "/dashboard/student/applications", icon: "📝" },
    { label: "Saved Colleges", href: "/dashboard/student/saved", icon: "❤️" },
    { label: "Compare", href: "/dashboard/student/compare", icon: "⚖️" },
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
}

export function DashboardSidebar({ role, userName }: DashboardSidebarProps) {
  const pathname = usePathname();
  const items = navItems[role] || [];

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-neutral-200 min-h-screen">
      {/* User Info */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary-700">
              {userName?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-900">{userName}</p>
            <p className="text-xs text-neutral-500 capitalize">{role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
        >
          <span>←</span>
          Back to Website
        </Link>
      </div>
    </aside>
  );
}
