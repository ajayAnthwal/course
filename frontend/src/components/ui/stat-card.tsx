"use client";

import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  iconBg?: string;
}

export function StatCard({ label, value, change, changeType = "neutral", icon, iconBg = "bg-primary-50" }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1.5">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  "text-xs font-medium",
                  changeType === "positive" && "text-secondary-600",
                  changeType === "negative" && "text-error-500",
                  changeType === "neutral" && "text-neutral-400"
                )}
              >
                {changeType === "positive" && "↑ "}
                {changeType === "negative" && "↓ "}
                {change}
              </span>
              <span className="text-xs text-neutral-400">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", iconBg)}>
          {icon}
        </div>
      </div>
    </div>
  );
}
