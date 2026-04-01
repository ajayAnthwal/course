"use client";

import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from "@/components/ui";
import { useState } from "react";

const mockStudents = [
  { id: 1, name: "Rahul Sharma", email: "rahul@college.edu", course: "CS201", grade: "A", attendance: 92 },
  { id: 2, name: "Priya Patel", email: "priya@college.edu", course: "CS201", grade: "A+", attendance: 98 },
  { id: 3, name: "Amit Kumar", email: "amit@college.edu", course: "CS301", grade: "B+", attendance: 85 },
  { id: 4, name: "Sneha Reddy", email: "sneha@college.edu", course: "CS301", grade: "A", attendance: 90 },
  { id: 5, name: "Vikram Singh", email: "vikram@college.edu", course: "CS401", grade: "B", attendance: 78 },
  { id: 6, name: "Ananya Gupta", email: "ananya@college.edu", course: "CS401", grade: "A+", attendance: 95 },
];

const gradeColors: Record<string, "success" | "primary" | "warning" | "default"> = {
  "A+": "success", "A": "success", "B+": "primary", "B": "primary", "C": "warning",
};

function TeacherStudentsContent() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const filtered = mockStudents.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="teacher" userName={user?.name}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">My Students</h1>
          <p className="text-neutral-500 mt-1">Students enrolled in your courses.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card><CardContent className="p-5">
            <p className="text-2xl font-bold text-neutral-900">{mockStudents.length}</p>
            <p className="text-xs text-neutral-500">Total Students</p>
          </CardContent></Card>
          <Card><CardContent className="p-5">
            <p className="text-2xl font-bold text-neutral-900">{Math.round(mockStudents.reduce((s, st) => s + st.attendance, 0) / mockStudents.length)}%</p>
            <p className="text-xs text-neutral-500">Avg Attendance</p>
          </CardContent></Card>
          <Card><CardContent className="p-5">
            <p className="text-2xl font-bold text-neutral-900">{mockStudents.filter((s) => s.grade.startsWith("A")).length}</p>
            <p className="text-xs text-neutral-500">A Grade Students</p>
          </CardContent></Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle>Student List</CardTitle>
              <div className="w-full sm:w-64">
                <Input placeholder="Search students..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-100">
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 py-3">Student</th>
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 py-3">Course</th>
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 py-3">Grade</th>
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 py-3">Attendance</th>
                    <th className="text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((student) => (
                    <tr key={student.id} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-xs font-semibold text-primary-700">{student.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-neutral-900">{student.name}</p>
                            <p className="text-xs text-neutral-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3"><Badge variant="outline" size="sm">{student.course}</Badge></td>
                      <td className="px-4 py-3"><Badge variant={gradeColors[student.grade] || "default"} size="sm">{student.grade}</Badge></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary-500 rounded-full" style={{ width: `${student.attendance}%` }} />
                          </div>
                          <span className="text-xs text-neutral-500">{student.attendance}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right"><Button variant="ghost" size="sm">View</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default function TeacherStudentsPage() {
  return <ProtectedRoute allowedRoles={["teacher"]}><TeacherStudentsContent /></ProtectedRoute>;
}
