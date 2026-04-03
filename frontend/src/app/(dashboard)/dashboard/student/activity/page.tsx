"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import apiClient from "@/services/axios";
import { formatDate } from "@/lib/utils";

interface Activity {
  _id: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  status: string;
  createdAt: string;
}

interface ActivityStats {
  totalActivities: number;
  todayActivities: number;
  weekActivities: number;
  monthActivities: number;
  actionBreakdown: { action: string; count: number }[];
  resourceBreakdown: { resource: string; count: number }[];
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

function StudentActivityPage() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState<ActivityStats | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState("");
  const [resourceFilter, setResourceFilter] = useState("");

  const fetchActivities = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "20");
      if (actionFilter) params.append("action", actionFilter);
      if (resourceFilter) params.append("resource", resourceFilter);

      const [activityRes, statsRes] = await Promise.all([
        apiClient.get(`/activity-logs/me?${params.toString()}`),
        apiClient.get("/activity-logs/me/stats"),
      ]);

      setActivities(activityRes.data.data);
      setPagination(activityRes.data.pagination);
      setStats(statsRes.data.data);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const getActionBadge = (action: string) => {
    const actionColors: Record<string, string> = {
      create: "bg-green-100 text-green-800",
      update: "bg-blue-100 text-blue-800",
      delete: "bg-red-100 text-red-800",
      login: "bg-purple-100 text-purple-800",
      logout: "bg-gray-100 text-gray-800",
      view: "bg-yellow-100 text-yellow-800",
      apply: "bg-emerald-100 text-emerald-800",
      wishlist: "bg-pink-100 text-pink-800",
    };
    const colorClass = actionColors[action.toLowerCase()] || "bg-gray-100 text-gray-800";
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>{action}</span>;
  };

  const getResourceIcon = (resource: string) => {
    const icons: Record<string, string> = {
      application: "📝",
      wishlist: "❤️",
      college: "🏛️",
      user: "👤",
      document: "📄",
      payment: "💳",
      auth: "🔐",
    };
    return icons[resource.toLowerCase()] || "📋";
  };

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Activity</h1>
          <p className="text-neutral-500">Track your recent activities</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-neutral-500">Total Activities</p>
                <p className="text-2xl font-bold">{stats.totalActivities}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-neutral-500">Today</p>
                <p className="text-2xl font-bold">{stats.todayActivities}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-neutral-500">This Week</p>
                <p className="text-2xl font-bold">{stats.weekActivities}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-neutral-500">This Month</p>
                <p className="text-2xl font-bold">{stats.monthActivities}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-4">
          <select
            className="px-3 py-2 border border-neutral-300 rounded-lg"
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              fetchActivities(1);
            }}
          >
            <option value="">All Actions</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="login">Login</option>
            <option value="apply">Apply</option>
            <option value="wishlist">Wishlist</option>
            <option value="view">View</option>
          </select>
          <select
            className="px-3 py-2 border border-neutral-300 rounded-lg"
            value={resourceFilter}
            onChange={(e) => {
              setResourceFilter(e.target.value);
              fetchActivities(1);
            }}
          >
            <option value="">All Resources</option>
            <option value="application">Application</option>
            <option value="wishlist">Wishlist</option>
            <option value="college">College</option>
            <option value="document">Document</option>
            <option value="payment">Payment</option>
          </select>
        </div>

        {/* Activity List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-neutral-500">Loading...</div>
            ) : activities.length === 0 ? (
              <div className="text-center py-8 text-neutral-500">No activities found</div>
            ) : (
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div
                    key={activity._id}
                    className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg"
                  >
                    <span className="text-2xl">{getResourceIcon(activity.resource)}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getActionBadge(activity.action)}
                        <span className="text-sm text-neutral-500">{activity.resource}</span>
                      </div>
                      <p className="text-sm text-neutral-700">
                        {activity.action} {activity.resource}
                        {activity.details?.collegeName && ` - ${activity.details.collegeName}`}
                      </p>
                      <p className="text-xs text-neutral-400 mt-1">
                        {formatDate(activity.createdAt)}
                      </p>
                    </div>
                    <Badge variant={activity.status === "success" ? "success" : "destructive"}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                <button
                  className="px-3 py-1 border rounded disabled:opacity-50"
                  disabled={pagination.page === 1}
                  onClick={() => fetchActivities(pagination.page - 1)}
                >
                  Previous
                </button>
                <span className="px-3 py-1">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  className="px-3 py-1 border rounded disabled:opacity-50"
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => fetchActivities(pagination.page + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default function ActivityPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentActivityPage />
    </ProtectedRoute>
  );
}
