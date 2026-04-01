"use client";

import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";

const mockCourses = [
  { id: 1, name: "Data Structures & Algorithms", code: "CS201", students: 45, semester: "Spring 2026" },
  { id: 2, name: "Database Management Systems", code: "CS301", students: 38, semester: "Spring 2026" },
  { id: 3, name: "Web Development Lab", code: "CS401", students: 52, semester: "Spring 2026" },
];

function TeacherCoursesContent() {
  const { user } = useAuth();

  return (
    <DashboardLayout role="teacher" userName={user?.name}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">My Courses</h1>
            <p className="text-neutral-500 mt-1">Courses you are teaching this semester.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockCourses.map((course) => (
            <Card key={course.id} hover>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <span className="text-lg">📚</span>
                  </div>
                  <Badge variant="primary" size="sm">{course.code}</Badge>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">{course.name}</h3>
                <p className="text-sm text-neutral-500 mb-4">{course.semester}</p>
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                  <div className="flex items-center gap-1 text-sm text-neutral-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    {course.students} students
                  </div>
                  <Button variant="ghost" size="sm">Manage</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function TeacherCoursesPage() {
  return <ProtectedRoute allowedRoles={["teacher"]}><TeacherCoursesContent /></ProtectedRoute>;
}
