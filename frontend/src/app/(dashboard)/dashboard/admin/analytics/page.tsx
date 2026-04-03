"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, Button, Input, Badge, StatCard, AreaChart, BarChart, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { useLeadStats, useLeads } from "@/features/leads";
import { useCollegeStats } from "@/features/colleges";
import { useUsers } from "@/features/users";
import { usePaymentStats } from "@/features/payments/hooks/usePayments";
import { formatDate } from "@/lib/utils";

type ReportType = "leads" | "revenue" | "colleges" | "users";

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [reportType, setReportType] = useState<ReportType>("leads");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const { data: leadStats } = useLeadStats();
  const { data: collegeStats } = useCollegeStats();
  const { data: usersData } = useUsers({ limit: 1 });
  const { data: paymentStats } = usePaymentStats({
    startDate: dateRange.start || undefined,
    endDate: dateRange.end || undefined,
  });

  const leadData = leadStats?.data;
  const collegeData = collegeStats?.data;
  const userCount = usersData?.pagination?.total || 0;

  const mockLeadsOverTime = [
    { name: "Jan", value: 45 }, { name: "Feb", value: 62 }, { name: "Mar", value: 78 },
    { name: "Apr", value: 95 }, { name: "May", value: 110 }, { name: "Jun", value: 125 },
  ];

  const mockRevenueData = [
    { name: "Jan", value: 50000 }, { name: "Feb", value: 75000 }, { name: "Mar", value: 62000 },
    { name: "Apr", value: 89000 }, { name: "May", value: 110000 }, { name: "Jun", value: 95000 },
  ];

  const mockCollegePerformance = [
    { name: "IIT Bombay", students: 250, revenue: 450000, rating: 4.8 },
    { name: "IIT Delhi", students: 220, revenue: 380000, rating: 4.7 },
    { name: "VIT Vellore", students: 350, revenue: 290000, rating: 4.4 },
    { name: "BITS Pilani", students: 180, revenue: 320000, rating: 4.5 },
  ];

  const handleExport = (format: "csv" | "json") => {
    let data: string;
    let filename: string;
    let mimeType: string;

    if (format === "csv") {
      const headers = ["Name", "Students", "Revenue", "Rating"];
      const rows = mockCollegePerformance.map(c => [c.name, c.students, c.revenue, c.rating].join(","));
      data = [headers.join(","), ...rows].join("\n");
      filename = `analytics-${reportType}-${new Date().toISOString().split("T")[0]}.csv`;
      mimeType = "text/csv";
    } else {
      data = JSON.stringify(reportType === "leads" ? leadData : reportType === "revenue" ? paymentStats : mockCollegePerformance, null, 2);
      filename = `analytics-${reportType}-${new Date().toISOString().split("T")[0]}.json`;
      mimeType = "application/json";
    }

    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
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

        {/* Report Type Tabs */}
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

        {/* Date Range Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-sm font-medium text-neutral-700">Date Range:</span>
              <Input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-40"
              />
              <span className="text-neutral-400">to</span>
              <Input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-40"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportType === "leads" && (
            <>
              <StatCard label="Total Leads" value={leadData?.total || 0} change="+18%" changeType="positive" icon={<svg className="w-5 h-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} iconBg="bg-accent-50" />
              <StatCard label="Converted" value={leadData?.admitted || 0} change="+5%" changeType="positive" icon={<svg className="w-5 h-5 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>} iconBg="bg-green-50" />
              <StatCard label="Contact Rate" value={`${Math.round(((leadData?.contacted || 0) / (leadData?.total || 1)) * 100)}%`} change="+2%" changeType="positive" icon={<svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} iconBg="bg-blue-50" />
              <StatCard label="Avg Response Time" value="2.5h" change="-10%" changeType="positive" icon={<svg className="w-5 h-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} iconBg="bg-secondary-50" />
            </>
          )}
          {reportType === "revenue" && (
            <>
              <StatCard label="Total Revenue" value={`₹${((paymentStats?.data?.totalRevenue || 0) / 100).toLocaleString("en-IN")}`} change="+12%" changeType="positive" icon={<svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} iconBg="bg-emerald-50" />
              <StatCard label="Successful Payments" value={paymentStats?.data?.successfulPayments || 0} change="+8%" changeType="positive" icon={<svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>} iconBg="bg-green-50" />
              <StatCard label="Pending Payments" value={paymentStats?.data?.pendingPayments || 0} change="-5%" changeType="neutral" icon={<svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} iconBg="bg-amber-50" />
              <StatCard label="Failed Payments" value={paymentStats?.data?.failedPayments || 0} change="-15%" changeType="positive" icon={<svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>} iconBg="bg-rose-50" />
            </>
          )}
          {reportType === "colleges" && (
            <>
              <StatCard label="Total Colleges" value={collegeData?.total || 0} change="+5%" changeType="positive" icon={<svg className="w-5 h-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} iconBg="bg-secondary-50" />
              <StatCard label="Government" value={collegeData?.government || 0} icon={<svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} iconBg="bg-blue-50" />
              <StatCard label="Private" value={collegeData?.private || 0} icon={<svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} iconBg="bg-purple-50" />
              <StatCard label="Featured" value={collegeData?.featured || 0} icon={<svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>} iconBg="bg-amber-50" />
            </>
          )}
          {reportType === "users" && (
            <>
              <StatCard label="Total Users" value={userCount.toLocaleString()} change="+12%" changeType="positive" icon={<svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} iconBg="bg-primary-50" />
              <StatCard label="Active Users" value={Math.round(userCount * 0.7).toLocaleString()} change="+8%" changeType="positive" icon={<svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} iconBg="bg-green-50" />
              <StatCard label="New This Month" value={Math.round(userCount * 0.1).toLocaleString()} change="+15%" changeType="positive" icon={<svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>} iconBg="bg-cyan-50" />
              <StatCard label="User Growth" value="+12%" changeType="positive" icon={<svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} iconBg="bg-indigo-50" />
            </>
          )}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">
                {reportType === "leads" ? "Leads Over Time" : reportType === "revenue" ? "Revenue Trend" : "Performance Metrics"}
              </h3>
              <AreaChart
                data={reportType === "revenue" ? mockRevenueData : mockLeadsOverTime}
                color={reportType === "revenue" ? "#10b981" : "#6366f1"}
                height={280}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">
                {reportType === "colleges" ? "Top Colleges" : "Distribution"}
              </h3>
              {reportType === "colleges" ? (
                <div className="space-y-4">
                  {mockCollegePerformance.map((college, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div>
                        <p className="font-medium text-neutral-900">{college.name}</p>
                        <p className="text-xs text-neutral-500">{college.students} students • ₹{(college.revenue / 100000).toFixed(1)}L revenue</p>
                      </div>
                      <Badge variant="warning">⭐ {college.rating}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <BarChart
                  data={[
                    { name: "New", value: leadData?.new || 0 },
                    { name: "Contacted", value: leadData?.contacted || 0 },
                    { name: "Interested", value: leadData?.interested || 0 },
                    { name: "Admitted", value: leadData?.admitted || 0 },
                  ]}
                  height={280}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}