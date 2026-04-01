"use client";

import { DashboardSidebar } from "./dashboard-sidebar";
import { Header } from "./header";
import type { UserRole } from "@/types";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
  userName?: string;
}

export function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="flex">
        <DashboardSidebar role={role} userName={userName} />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
