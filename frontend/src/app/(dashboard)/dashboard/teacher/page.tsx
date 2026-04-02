"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";
import { useLeads, useLeadStats } from "@/features/leads";
import { formatDate } from "@/lib/utils";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  status: "active" | "inactive" | "completed";
}

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  course: string;
  status: "new" | "contacted" | "interested" | "not_interested";
  createdAt: string;
}

function TeacherDashboardContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: leadsData } = useLeads({ limit: 10 });
  const leads = leadsData?.data || [];

  const stats = [
    { label: "My Courses", value: "8", icon: "📚", color: "bg-blue-50" },
    { label: "Total Students", value: "245", icon: "👨‍🎓", color: "bg-green-50" },
    { label: "Assigned Leads", value: leads.length, icon: "📋", color: "bg-yellow-50" },
    { label: "Avg Rating", value: "4.7", icon: "⭐", color: "bg-purple-50" },
  ];

  const students: Student[] = [
    { id: "1", name: "Rahul Sharma", email: "rahul@email.com", course: "B.Tech CSE", progress: 75, status: "active" },
    { id: "2", name: "Priya Patel", email: "priya@email.com", course: "B.Tech CSE", progress: 90, status: "active" },
    { id: "3", name: "Amit Kumar", email: "amit@email.com", course: "B.Tech ME", progress: 45, status: "inactive" },
    { id: "4", name: "Sneha Singh", email: "sneha@email.com", course: "B.Tech ECE", progress: 100, status: "completed" },
  ];

  const todaysSchedule = [
    { subject: "Data Structures", time: "9:00 AM - 10:30 AM", room: "Room 301", students: 45 },
    { subject: "Algorithms", time: "11:00 AM - 12:30 PM", room: "Room 205", students: 38 },
    { subject: "Database Systems", time: "2:00 PM - 3:30 PM", room: "Lab 2", students: 42 },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: "success" | "warning" | "primary" | "danger" | "default" }> = {
      new: { label: "New", variant: "primary" },
      contacted: { label: "Contacted", variant: "warning" },
      interested: { label: "Interested", variant: "success" },
      not_interested: { label: "Not Interested", variant: "danger" },
      active: { label: "Active", variant: "success" },
      inactive: { label: "Inactive", variant: "warning" },
      completed: { label: "Completed", variant: "default" },
    };
    return variants[status] || variants.active;
  };

  return (
    <DashboardLayout role="teacher" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Teacher Dashboard</h1>
            <p className="text-neutral-500">Welcome back, {user?.name}</p>
          </div>
          <Button>Add Notes</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} hover>
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
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-neutral-200 pb-2">
          {["overview", "students", "leads", "schedule", "performance"].map((tab) => (
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
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaysSchedule.map((cls, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div>
                        <p className="font-medium text-neutral-900">{cls.subject}</p>
                        <p className="text-sm text-neutral-500">{cls.time} • {cls.room}</p>
                      </div>
                      <Badge variant="primary">{cls.students} students</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leads.slice(0, 3).map((lead: any) => {
                    const badge = getStatusBadge(lead.status);
                    return (
                      <div key={lead._id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <div>
                          <p className="font-medium text-neutral-900">{lead.name}</p>
                          <p className="text-sm text-neutral-500">{lead.course || "General"}</p>
                        </div>
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "students" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Students ({students.length})</CardTitle>
              <Button variant="outline" size="sm">Add Student</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => {
                  const badge = getStatusBadge(student.status);
                  return (
                    <div key={student.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary-700">{student.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">{student.name}</p>
                          <p className="text-sm text-neutral-500">{student.email} • {student.course}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-neutral-500">Progress</span>
                            <span className="font-medium">{student.progress}%</span>
                          </div>
                          <div className="h-2 bg-neutral-100 rounded-full">
                            <div className="h-2 bg-primary-500 rounded-full" style={{ width: `${student.progress}%` }} />
                          </div>
                        </div>
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "leads" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Assigned Leads ({leads.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📋</div>
                    <p className="text-neutral-500">No leads assigned yet</p>
                  </div>
                ) : (
                  leads.map((lead: any) => {
                    const badge = getStatusBadge(lead.status);
                    return (
                      <div key={lead._id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                        <div>
                          <p className="font-medium text-neutral-900">{lead.name}</p>
                          <p className="text-sm text-neutral-500">{lead.email} • {lead.phone}</p>
                          <p className="text-sm text-neutral-400 mt-1">{lead.college} • {lead.course}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant={badge.variant}>{badge.label}</Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Call</Button>
                            <Button variant="ghost" size="sm">Add Note</Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "schedule" && (
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, idx) => (
                  <div key={day} className="p-4 bg-neutral-50 rounded-lg">
                    <p className="font-medium text-neutral-900 mb-2">{day}</p>
                    <div className="space-y-2">
                      {todaysSchedule.map((cls, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600">{cls.subject}</span>
                          <span className="text-neutral-400">{cls.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "performance" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Student Satisfaction</span>
                    <span className="font-bold text-primary-600">92%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Classes Completed</span>
                    <span className="font-bold text-primary-600">45/50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Average Rating</span>
                    <span className="font-bold text-yellow-600">4.7/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Lead Conversion</span>
                    <span className="font-bold text-green-600">35%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-neutral-500">Analytics coming soon</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default function TeacherDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <TeacherDashboardContent />
    </ProtectedRoute>
  );
}