"use client";

import { useState } from "react";
import Link from "next/link";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";
import { DocumentManager } from "@/features/documents";

interface Application {
  id: string;
  collegeName: string;
  collegeLogo: string;
  course: string;
  status: "applied" | "under_review" | "shortlisted" | "rejected" | "admitted";
  appliedDate: string;
  fees: string;
}

interface Child {
  id: string;
  name: string;
  dateOfBirth: string;
  class: string;
  examScore: string;
  examName: string;
}

function ParentDashboardContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const child: Child = {
    id: "1",
    name: "Aryan Kumar",
    dateOfBirth: "2006-05-15",
    class: "Class 12 (Science)",
    examScore: "250/300",
    examName: "JEE Main",
  };

  const applications: Application[] = [
    { id: "1", collegeName: "IIT Bombay", collegeLogo: "🏛️", course: "B.Tech CSE", status: "shortlisted", appliedDate: "2024-03-15", fees: "₹2,50,000" },
    { id: "2", collegeName: "IIM Ahmedabad", collegeLogo: "📊", course: "MBA", status: "under_review", appliedDate: "2024-03-10", fees: "₹25,00,000" },
    { id: "3", collegeName: "NIT Delhi", collegeLogo: "🏛️", course: "B.Tech ME", status: "applied", appliedDate: "2024-03-01", fees: "₹1,80,000" },
  ];

  const statusTimeline = [
    { step: "Application Submitted", date: "2024-03-15", status: "completed" },
    { step: "Document Verification", date: "2024-03-16", status: "completed" },
    { step: "Entrance Exam Score", date: "2024-03-17", status: "completed" },
    { step: "Personal Interview", date: "2024-03-25", status: "current" },
    { step: "Final Result", date: "April 2024", status: "pending" },
  ];

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

  const stats = [
    { label: "Applications", value: applications.length, icon: "📝", color: "bg-primary-50" },
    { label: "Shortlisted", value: applications.filter(a => a.status === "shortlisted").length, icon: "✅", color: "bg-green-50" },
    { label: "Interviews", value: 1, icon: "📅", color: "bg-yellow-50" },
    { label: "Documents", value: 5, icon: "📄", color: "bg-blue-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Parent Dashboard</h1>
          <p className="text-neutral-500">Track your child's application progress</p>
        </div>
      </div>

      {/* Child Info Card */}
      <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-700">{child.name.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-neutral-900">{child.name}</h2>
              <p className="text-neutral-600">{child.class}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm bg-white px-3 py-1 rounded-full">🎯 {child.examName}: {child.examScore}</span>
              </div>
            </div>
            <Link href="/dashboard/parent/profile">
              <Button variant="outline" size="sm">Edit Child Info</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={`#${stat.label.toLowerCase()}`}>
            <Card hover>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <span className="text-lg">{stat.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">{stat.label}</p>
                    <p className="text-xl font-bold text-neutral-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-neutral-200 pb-2">
        {["overview", "applications", "status", "documents", "messages"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab ? "bg-primary-100 text-primary-700" : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {applications.slice(0, 3).map((app) => {
                  const badge = getStatusBadge(app.status);
                  return (
                    <div key={app.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{app.collegeLogo}</span>
                        <div>
                          <p className="font-medium text-neutral-900">{app.collegeName}</p>
                          <p className="text-sm text-neutral-500">{app.course}</p>
                        </div>
                      </div>
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="font-medium text-neutral-900">Personal Interview</p>
                    <p className="text-sm text-neutral-500">IIT Bombay - March 25, 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="font-medium text-neutral-900">Document Verification</p>
                    <p className="text-sm text-neutral-500">Last date: March 20, 2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "applications" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Child's Applications ({applications.length})</CardTitle>
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
                        <p className="text-sm text-neutral-500">{app.course}</p>
                        <p className="text-xs text-neutral-400 mt-1">Applied: {new Date(app.appliedDate).toLocaleDateString("en-IN")}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={badge.variant} className="mb-2">{badge.label}</Badge>
                      <p className="text-sm font-medium text-neutral-700">{app.fees}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "status" && (
        <Card>
          <CardHeader>
            <CardTitle>Application Status Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {statusTimeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      item.status === "completed" ? "bg-success-100 text-success-600" :
                      item.status === "current" ? "bg-primary-100 text-primary-600" :
                      "bg-neutral-100 text-neutral-400"
                    }`}>
                      {item.status === "completed" ? "✓" : item.status === "current" ? "●" : "○"}
                    </div>
                    {index < statusTimeline.length - 1 && (
                      <div className={`w-0.5 h-16 ${item.status === "completed" ? "bg-success-200" : "bg-neutral-200"}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium ${item.status === "pending" ? "text-neutral-400" : "text-neutral-900"}`}>
                        {item.step}
                      </p>
                      <span className="text-sm text-neutral-500">{item.date}</span>
                    </div>
                    {item.status === "current" && (
                      <Badge variant="primary" className="mt-2">In Progress</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "documents" && (
        <div className="max-w-2xl">
          <DocumentManager maxDocuments={10} />
        </div>
      )}

      {activeTab === "messages" && (
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-4xl mb-2">💬</div>
              <p className="text-neutral-500">No messages yet</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function ParentDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <ParentDashboardContent />
    </ProtectedRoute>
  );
}