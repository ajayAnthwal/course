"use client";

import Link from "next/link";
import { useAuth } from "@/features/auth";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useFeaturedColleges } from "@/features/colleges";
import { useApplications, useApplicationStats } from "@/features/applications/hooks/useApplications";
import { useWishlistStats } from "@/features/wishlist/hooks/useWishlist";
import { useDocuments } from "@/features/documents";
import { FiFileText, FiCheckCircle, FiHeart, FiFolder, FiMessageCircle, FiCreditCard, FiArrowRight, FiStar, FiMapPin, FiTrendingUp } from "react-icons/fi";

const statusVariants: Record<string, { label: string; variant: "success" | "warning" | "primary" | "danger" | "secondary" | "default" }> = {
  applied: { label: "Applied", variant: "default" },
  under_review: { label: "Under Review", variant: "primary" },
  shortlisted: { label: "Shortlisted", variant: "success" },
  accepted: { label: "Accepted", variant: "success" },
  rejected: { label: "Rejected", variant: "danger" },
  enrolled: { label: "Enrolled", variant: "success" },
};

const statConfig = [
  { label: "Applications", icon: FiFileText, color: "bg-indigo-50 text-indigo-600" },
  { label: "Shortlisted", icon: FiCheckCircle, color: "bg-green-50 text-green-600" },
  { label: "Wishlist", icon: FiHeart, color: "bg-red-50 text-red-600" },
  { label: "Documents", icon: FiFolder, color: "bg-blue-50 text-blue-600" },
];

const quickLinks = [
  { label: "My Wishlist", href: "/dashboard/student/wishlist", icon: FiHeart },
  { label: "Documents", href: "/dashboard/student/documents", icon: FiFolder },
  { label: "Payments", href: "/dashboard/student/payment", icon: FiCreditCard },
  { label: "Messages", href: "/dashboard/student/messages", icon: FiMessageCircle },
];

export function StudentDashboardHome() {
  const { user } = useAuth();

  const { data: collegeData } = useFeaturedColleges();
  const { data: applicationsData } = useApplications({ limit: 5 });
  const { data: appStats } = useApplicationStats();
  const { data: wishlistStats } = useWishlistStats();
  const { data: documentsData } = useDocuments();

  const applications = applicationsData?.data || [];
  const stats = appStats?.data;
  const wishlist = wishlistStats?.data;
  const documents = documentsData?.data || [];

  const getStatValue = (label: string) => {
    switch (label) {
      case "Applications": return stats?.total || 0;
      case "Shortlisted": return stats?.shortlisted || 0;
      case "Wishlist": return wishlist?.total || 0;
      case "Documents": return documents.length || 0;
      default: return 0;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
        </div>
        <Link href="/colleges">
          <Button>Browse Colleges</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statConfig.map((stat) => (
          <Card key={stat.label} hover>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900">{getStatValue(stat.label)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Applications</CardTitle>
            <Link href="/dashboard/student/applications" className="text-sm text-indigo-600 font-medium flex items-center gap-1">
              View all <FiArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-2">No applications yet</p>
                  <Link href="/colleges">
                    <Button variant="outline" size="sm">Apply Now</Button>
                  </Link>
                </div>
              ) : (
                applications.slice(0, 3).map((app: any) => {
                  const status = statusVariants[app.status] || statusVariants.applied;
                  return (
                    <Link
                      key={app._id}
                      href={`/dashboard/student/applications/${app._id}`}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                          <FiTrendingUp className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{(app as any).college?.name}</p>
                          <p className="text-sm text-gray-600">{app.course}</p>
                        </div>
                      </div>
                      <Badge variant={status.variant} size="sm">{status.label}</Badge>
                    </Link>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-gray-900">Recommended Colleges</CardTitle>
            <Link href="/colleges" className="text-sm text-indigo-600 flex items-center gap-1">
              View all <FiArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {((collegeData as any)?.data || []).slice(0, 3).map((college: any) => (
                <Link
                  key={college._id}
                  href={`/colleges/${college._id}`}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">{college.name}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <FiMapPin className="w-3 h-3" />
                      {college.location?.city}, {college.location?.state}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <FiStar className="w-4 h-4" />
                    <span className="font-medium text-gray-900">{college.rating || "N/A"}</span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <item.icon className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}