"use client";

import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";
import { formatDate } from "@/lib/utils";

const applications = [
  { id: "1", collegeName: "IIT Bombay", collegeLogo: "🏛️", course: "B.Tech CSE", status: "shortlisted", appliedDate: "2024-03-15", fees: "₹2,50,000", round: 2 },
  { id: "2", collegeName: "IIM Ahmedabad", collegeLogo: "📊", course: "MBA", status: "under_review", appliedDate: "2024-03-10", fees: "₹25,00,000", round: 1 },
  { id: "3", collegeName: "NIT Delhi", collegeLogo: "🏛️", course: "B.Tech ME", status: "applied", appliedDate: "2024-03-01", fees: "₹1,80,000", round: 1 },
  { id: "4", collegeName: "BITS Pilani", collegeLogo: "🎓", course: "B.Tech ECE", status: "rejected", appliedDate: "2024-02-20", fees: "₹4,00,000", round: 3 },
];

export default function StudentApplicationsPage() {
  const { user } = useAuth();

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: "success" | "warning" | "primary" | "danger" | "default" }> = {
      applied: { label: "Applied", variant: "default" },
      under_review: { label: "Under Review", variant: "primary" },
      shortlisted: { label: "Shortlisted", variant: "success" },
      rejected: { label: "Rejected", variant: "danger" },
      admitted: { label: "Admitted", variant: "success" },
    };
    return variants[status] || variants.applied;
  };

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">My Applications</h1>
          <p className="text-neutral-500">Track all your college applications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {["applied", "under_review", "shortlisted", "rejected", "admitted"].map((status) => {
            const count = applications.filter(a => a.status === status).length;
            return (
              <Card key={status}>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm text-neutral-500 capitalize">{status.replace("_", " ")}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Applications ({applications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((app) => {
                const badge = getStatusBadge(app.status);
                return (
                  <div key={app.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{app.collegeLogo}</span>
                      <div>
                        <p className="font-semibold text-neutral-900">{app.collegeName}</p>
                        <p className="text-sm text-neutral-500">{app.course} • Round {app.round}</p>
                        <p className="text-xs text-neutral-400 mt-1">Applied: {formatDate(app.appliedDate)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={badge.variant} className="mb-2">{badge.label}</Badge>
                      <p className="text-sm font-medium text-neutral-700">{app.fees}</p>
                      <Button variant="ghost" size="sm" className="mt-2">View Details</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default function ApplicationsPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentApplicationsPage />
    </ProtectedRoute>
  );
}