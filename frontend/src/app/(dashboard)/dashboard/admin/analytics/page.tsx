"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, Button, Input, Badge, StatCard, AreaChart, BarChart, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { useDashboardStats, useRevenueStats, useLeadAnalytics, useCollegePerformance } from "@/features/analytics";

type ReportType = "leads" | "revenue" | "colleges" | "users";

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [reportType, setReportType] = useState<ReportType>("leads");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const { data: dashboardData } = useDashboardStats();
  const { data: revenueData } = useRevenueStats(dateRange.start ? { startDate: dateRange.start } : undefined);
  const { data: leadAnalytics } = useLeadAnalytics();
  const { data: collegePerf } = useCollegePerformance();

  const stats = dashboardData?.data;
  const leadStats = stats?.leads;
  const collegeStats = stats?.colleges;
  const userStats = stats?.users;

  const handleExport = (format: "csv" | "json") => {
    let data: string;
    let filename: string;

    if (format === "csv" && collegePerf?.data) {
      const rows = collegePerf.data.map((c: any) => [c.name, c.rating, c.reviewCount].join(","));
      data = ["Name,Rating,Reviews", ...rows].join("\n");
    } else {
      data = JSON.stringify({
        leads: leadAnalytics?.data,
        revenue: revenueData?.data,
        colleges: collegePerf?.data,
        users: userStats
      }, null, 2);
    }

    filename = `analytics-${reportType}-${new Date().toISOString().split("T")[0]}.${format}`;
    const blob = new Blob([format === "csv" ? data : data], { type: format === "csv" ? "text/csv" : "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getChartData = () => {
    if (reportType === "leads") {
      return stats?.charts?.leadsOverTime || [];
    }
    if (reportType === "revenue") {
      return revenueData?.data || [];
    }
    return stats?.charts?.leadsOverTime || [];
  };

  const getBarData = () => {
    return [
      { name: "New", value: leadStats?.new || 0 },
      { name: "Contacted", value: leadStats?.contacted || 0 },
      { name: "Interested", value: leadStats?.interested || 0 },
      { name: "Admitted", value: leadStats?.admitted || 0 },
    ];
  };

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Analytics & Reports</h1>
            <p className="text-neutral-500 mt-1">Track performance and export data</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport("csv")}>Export CSV</Button>
            <Button variant="outline" onClick={() => handleExport("json")}>Export JSON</Button>
          </div>
        </div>

        <div className="flex gap-2 border-b border-neutral-200">
          {(["leads", "revenue", "colleges", "users"] as ReportType[]).map((type) => (
            <button
              key={type}
              onClick={() => setReportType(type)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                reportType === type
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-sm font-medium text-neutral-700">Date Range:</span>
              <Input type="date" value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} className="w-40" />
              <span className="text-neutral-400">to</span>
              <Input type="date" value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} className="w-40" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportType === "leads" && (
            <>
              <StatCard label="Total Leads" value={leadStats?.total || 0} change="+18%" changeType="positive" icon={<span className="text-lg">📋</span>} iconBg="bg-accent-50" />
              <StatCard label="Converted" value={leadStats?.admitted || 0} change="+5%" changeType="positive" icon={<span className="text-lg">✅</span>} iconBg="bg-green-50" />
              <StatCard label="Contact Rate" value={`${Math.round(((leadStats?.contacted || 0) / (leadStats?.total || 1)) * 100)}%`} change="+2%" changeType="positive" icon={<span className="text-lg">📞</span>} iconBg="bg-blue-50" />
              <StatCard label="Conversion Rate" value={`${leadStats?.conversionRate || 0}%`} change="-10%" changeType="positive" icon={<span className="text-lg">📈</span>} iconBg="bg-secondary-50" />
            </>
          )}
          {reportType === "revenue" && (
            <>
              <StatCard label="Total Revenue" value={`₹${((stats?.revenue?.total || 0) / 100).toLocaleString("en-IN")}`} change="+12%" changeType="positive" icon={<span className="text-lg">💰</span>} iconBg="bg-emerald-50" />
              <StatCard label="Successful Payments" value={stats?.revenue?.successful || 0} change="+8%" changeType="positive" icon={<span className="text-lg">✅</span>} iconBg="bg-green-50" />
              <StatCard label="Pending Payments" value={stats?.revenue?.pending || 0} change="-5%" changeType="neutral" icon={<span className="text-lg">⏳</span>} iconBg="bg-amber-50" />
              <StatCard label="Conversion Rate" value={`${leadStats?.conversionRate || 0}%`} change="-15%" changeType="positive" icon={<span className="text-lg">📊</span>} iconBg="bg-rose-50" />
            </>
          )}
          {reportType === "colleges" && (
            <>
              <StatCard label="Total Colleges" value={(collegeStats as any)?.total || 0} change="+5%" changeType="positive" icon={<span className="text-lg">🏛️</span>} iconBg="bg-secondary-50" />
              <StatCard label="Government" value={(collegeStats as any)?.government || 0} icon={<span className="text-lg">🏢</span>} iconBg="bg-blue-50" />
              <StatCard label="Private" value={(collegeStats as any)?.private || 0} icon={<span className="text-lg">🏫</span>} iconBg="bg-purple-50" />
              <StatCard label="Featured" value={(collegeStats as any)?.featured || 0} icon={<span className="text-lg">⭐</span>} iconBg="bg-amber-50" />
            </>
          )}
          {reportType === "users" && (
            <>
              <StatCard label="Total Users" value={userStats?.total || 0} change="+12%" changeType="positive" icon={<span className="text-lg">👥</span>} iconBg="bg-primary-50" />
              <StatCard label="Active Users" value={Math.round((userStats?.total || 0) * 0.7)} change="+8%" changeType="positive" icon={<span className="text-lg">✅</span>} iconBg="bg-green-50" />
              <StatCard label="Leads" value={leadStats?.total || 0} change="+15%" changeType="positive" icon={<span className="text-lg">📋</span>} iconBg="bg-cyan-50" />
              <StatCard label="Colleges" value={collegeStats?.total || 0} change="+12%" changeType="positive" icon={<span className="text-lg">🏛️</span>} iconBg="bg-indigo-50" />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">
                {reportType === "leads" ? "Leads Over Time" : reportType === "revenue" ? "Revenue Trend" : "Performance Metrics"}
              </h3>
              <AreaChart data={getChartData()} color={reportType === "revenue" ? "#10b981" : "#6366f1"} height={280} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">
                {reportType === "colleges" ? "Top Colleges" : "Distribution"}
              </h3>
              {reportType === "colleges" ? (
                <div className="space-y-4">
                  {(collegePerf?.data || []).slice(0, 5).map((college: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div>
                        <p className="font-medium text-neutral-900">{college.name}</p>
                        <p className="text-xs text-neutral-500">{college.location?.city || "N/A"}</p>
                      </div>
                      <Badge variant="warning">⭐ {college.rating || "N/A"}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <BarChart data={getBarData()} height={280} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}