"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";
import apiClient from "@/services/axios";
import { formatDate } from "@/lib/utils";
import { FiFileText, FiHeart, FiHome, FiUser, FiFolder, FiCreditCard, FiLock, FiList, FiArrowLeft, FiArrowRight, FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";

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

  useEffect(() => {
    fetchActivities(1);
  }, []);

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
      logout: "bg-gray-100 text-gray-600",
    };
    const colorClass = actionColors[action.toLowerCase()] || "bg-gray-100 text-gray-600";
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>{action}</span>;
  };

  const getResourceIcon = (resource: string) => {
    const icons: Record<string, React.ReactNode> = {
      application: <FiFileText className="w-5 h-5 text-indigo-600" />,
      wishlist: <FiHeart className="w-5 h-5 text-red-500" />,
      college: <FiHome className="w-5 h-5 text-green-600" />,
      user: <FiUser className="w-5 h-5 text-blue-600" />,
      document: <FiFolder className="w-5 h-5 text-orange-600" />,
      payment: <FiCreditCard className="w-5 h-5 text-purple-600" />,
      auth: <FiLock className="w-5 h-5 text-gray-600" />,
    };
    return icons[resource.toLowerCase()] || <FiList className="w-5 h-5 text-gray-600" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <FiCheckCircle className="w-4 h-4 text-green-600" />;
      case "failed": return <FiXCircle className="w-4 h-4 text-red-600" />;
      default: return <FiClock className="w-4 h-4 text-yellow-600" />;
    }
  };

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity</h1>
          <p className="text-sm text-gray-600">Track your recent activities</p>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Total Activities</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalActivities}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Today</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayActivities}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">This Week</p>
                <p className="text-2xl font-bold text-gray-900">{stats.weekActivities}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{stats.monthActivities}</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex gap-4">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700"
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
            className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700"
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

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : activities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No activities found</div>
            ) : (
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div
                    key={activity._id}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                      {getResourceIcon(activity.resource)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getActionBadge(activity.action)}
                        <span className="text-sm text-gray-500">{activity.resource}</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        {activity.action} {activity.resource}
                        {activity.details?.collegeName && ` - ${activity.details.collegeName}`}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(activity.createdAt)}
                      </p>
                    </div>
                    <Badge variant={activity.status === "success" ? "success" : "danger"}>
                      {getStatusIcon(activity.status)}
                      <span className="ml-1">{activity.status}</span>
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === 1}
                  onClick={() => fetchActivities(pagination.page - 1)}
                >
                  <FiArrowLeft className="w-4 h-4" /> Previous
                </Button>
                <span className="px-3 py-2 text-gray-600">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => fetchActivities(pagination.page + 1)}
                >
                  Next <FiArrowRight className="w-4 h-4" />
                </Button>
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