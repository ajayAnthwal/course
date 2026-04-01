"use client";

import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";

const levelLabels: Record<string, string> = {
  undergraduate: "UG", postgraduate: "PG", diploma: "Diploma", doctorate: "PhD",
};

function CollegeCoursesContent() {
  const { user } = useAuth();

  return (
    <DashboardLayout role="college" userName={user?.name}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Courses</h1>
          <p className="text-neutral-500 mt-1">Manage courses offered by your college.</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Course Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary-50 border border-primary-100">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary-900">Contact Admin</h3>
                <p className="text-sm text-primary-700 mt-1">
                  Course management (add/edit/delete courses, fees, syllabus) is handled by the admin team.
                  Please contact support to update your course listings.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">Your Listed Courses</h3>
              <p className="text-sm text-neutral-500">
                Course details shown on your college profile are managed centrally.
                Visit your college listing page to see how students view your courses.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default function CollegeCoursesPage() {
  return <ProtectedRoute allowedRoles={["college"]}><CollegeCoursesContent /></ProtectedRoute>;
}
