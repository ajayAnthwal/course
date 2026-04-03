"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Select, DataTable, Button, StatCard, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import apiClient from "@/services/axios";
import type { ApiResponse } from "@/types";

interface ActivityLog {
  _id: string;
  user?: { _id: string; name: string; email: string };
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  status: "success" | "failure";
  errorMessage?: string;
  createdAt: string;
}

const actionIcon: Record<string, string> = {
  login: "🔑",
  logout: "🚪",
  create: "➕",
  update: "✏️",
  delete: "🗑️",
  view: "👁️",
  export: "📤",
  import: "📥",
  approve: "✅",
  reject: "❌",
  block: "🚫",
  unblock: "✅",
  payment: "💳",
  refund: "💰",
};

const statusBadge: Record<string, { variant: "success" | "danger" }> = {
  success: { variant: "success" },
  failure: { variant: "danger" },
};

export default function ActivityLogsPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [stats, setStats] = useState<any>(null);
  const [filters, setFilters] = useState({ action: "", resource: "", status: "" });

  const fetchLogs = async (page = 1) => {
    setLoading(true);
    try {
      const [logsRes, statsRes] = await Promise.all([
        apiClient.get("/activity-logs", { params: { page, limit: pagination.limit, ...filters } }),
        apiClient.get("/activity-logs/stats"),
      ]);
      setLogs(logsRes.data.data.data || []);
      setPagination(prev => ({ ...prev, ...logsRes.data.data.pagination, page }));
      setStats(statsRes.data.data);
    } catch (error) {
      console.error("Failed to fetch activity logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format: "csv" | "json") => {
    try {
      const response = await apiClient.get(`/activity-logs?limit=${pagination.total}&status=${filters.status || undefined}`, { params: { export: format } });
      const data = format === "csv" 
        ? JSONToCSV(response.data.data.data)
        : JSON.stringify(response.data.data.data, null, 2);
      
      const blob = new Blob([data], { type: format === "csv" ? "text/csv" : "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `activity-logs-${new Date().toISOString().split("T")[0]}.${format}`;
      a.click();
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const JSONToCSV = (data: ActivityLog[]) => {
    if (!data.length) return "";
    const headers = ["Action", "Resource", "User", "Status", "IP Address", "Date"];
    const rows = data.map(log => [
      log.action,
      log.resource,
      log.user?.name || "System",
      log.status,
      log.ipAddress || "",
      log.createdAt,
    ].join(","));
    return [headers.join(","), ...rows].join("\n");
  };

  const columns = [
    {
      key: "action",
      header: "Action",
      render: (log: ActivityLog) => (
        <span className="text-xl">{actionIcon[log.action] || "📝"}</span>
      ),
    },
    {
      key: "user",
      header: "User",
      render: (log: ActivityLog) => (
        <div>
          <p className="font-medium text-neutral-900">{log.user?.name || "System"}</p>
          <p className="text-xs text-neutral-500">{log.user?.email}</p>
        </div>
      ),
    },
    {
      key: "resource",
      header: "Resource",
      render: (log: ActivityLog) => (
        <Badge variant="secondary" size="sm">{log.resource}</Badge>
      ),
    },
    {
      key: "details",
      header: "Details",
      render: (log: ActivityLog) => (
        <p className="text-sm text-neutral-600 truncate max-w-xs">
          {JSON.stringify(log.details)?.slice(0, 50) || log.action}
        </p>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (log: ActivityLog) => {
        const badge = statusBadge[log.status];
        return <Badge variant={badge.variant} size="sm" dot>{log.status}</Badge>;
      },
    },
    {
      key: "createdAt",
      header: "Timestamp",
      render: (log: ActivityLog) => (
        <div>
          <p className="text-sm text-neutral-700">{formatDate(log.createdAt)}</p>
          <p className="text-xs text-neutral-400">{new Date(log.createdAt).toLocaleTimeString()}</p>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Activity Logs</h1>
            <p className="text-neutral-500 mt-1">Monitor user activities and system events</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport("csv")}>Export CSV</Button>
            <Button variant="outline" onClick={() => handleExport("json")}>Export JSON</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Total Logs" value={stats?.totalLogs ?? 0} icon={<span className="text-lg">📋</span>} iconBg="bg-primary-50" />
          <StatCard label="Login Attempts" value={stats?.loginAttempts ?? 0} icon={<span className="text-lg">🔑</span>} iconBg="bg-blue-50" />
          <StatCard label="Failed Attempts" value={stats?.failedAttempts ?? 0} icon={<span className="text-lg">❌</span>} iconBg="bg-red-50" />
          <StatCard label="24h Activity" value={stats?.recentActivity ?? 0} icon={<span className="text-lg">📊</span>} iconBg="bg-green-50" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Select value={filters.action} onValueChange={(v) => { setFilters({ ...filters, action: v }); fetchLogs(1); }}>
            <SelectTrigger className="w-36"><SelectValue placeholder="Action" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Actions</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="export">Export</SelectItem>
              <SelectItem value="import">Import</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.resource} onValueChange={(v) => { setFilters({ ...filters, resource: v }); fetchLogs(1); }}>
            <SelectTrigger className="w-36"><SelectValue placeholder="Resource" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Resources</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="lead">Lead</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.status} onValueChange={(v) => { setFilters({ ...filters, status: v }); fetchLogs(1); }}>
            <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failure">Failure</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={logs}
          keyExtractor={(log) => log._id}
          isLoading={loading}
          pagination={pagination}
          onPageChange={fetchLogs}
          emptyMessage="No activity logs found"
          emptyIcon="📜"
        />
      </div>
    </DashboardLayout>
  );
}