"use client";

import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";

const applications = [
  { id: 1, college: "IIT Bombay", course: "B.Tech CSE", status: "under_review", date: "2024-03-15", fees: "₹2,50,000" },
  { id: 2, college: "IIM Ahmedabad", course: "MBA", status: "shortlisted", date: "2024-03-10", fees: "₹25,00,000" },
  { id: 3, college: "NIT Delhi", course: "B.Tech ME", status: "rejected", date: "2024-03-01", fees: "₹1,80,000" },
  { id: 4, college: "BITS Pilani", course: "B.Tech ECE", status: "new", date: "2024-03-20", fees: "₹4,00,000" },
  { id: 5, college: "VIT Vellore", course: "B.Tech CSE", status: "waitlisted", date: "2024-03-18", fees: "₹3,50,000" },
];

const statusColors: Record<string, string> = {
  new: "default",
  under_review: "primary",
  shortlisted: "success",
  admitted: "success",
  rejected: "danger",
  waitlisted: "warning",
};

export default function ParentApplicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">My Child's Applications</h1>
        <p className="text-neutral-500">Track all college applications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {["new", "under_review", "shortlisted", "waitlisted", "rejected"].map((status) => {
          const count = applications.filter((a) => a.status === status).length;
          return (
            <Card key={status}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{count}</div>
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
            {applications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                <div className="flex-1">
                  <p className="font-semibold text-neutral-900">{app.college}</p>
                  <p className="text-sm text-neutral-500">{app.course}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-neutral-400">
                    <span>Applied: {new Date(app.date).toLocaleDateString("en-IN")}</span>
                    <span>Fees: {app.fees}</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={statusColors[app.status] as "default" | "primary" | "success" | "warning" | "danger"}>
                    {app.status.replace("_", " ")}
                  </Badge>
                  <Button variant="ghost" size="sm" className="mt-2">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}