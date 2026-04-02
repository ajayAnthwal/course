"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Button, Input } from "@/components/ui";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { formatDate } from "@/lib/utils";

export default function AdminCoursesPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useCourses({ page, limit: 12, search: search || undefined });
  const courses = data?.data || [];
  const pagination = data?.pagination;

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout role="admin" userName={user?.name}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Courses</h1>
              <p className="text-neutral-500 mt-1">View all courses in the database.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-4">
            <Input placeholder="Search courses..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="bg-white rounded-2xl h-40 animate-pulse" />)}</div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20 text-neutral-400"><p className="text-6xl mb-4">📚</p><p>No courses found.</p></div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <div key={course._id} className="bg-white rounded-2xl border border-neutral-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-neutral-900">{course.name}</h3>
                    {course.featured && <Badge variant="warning" size="sm">Popular</Badge>}
                  </div>
                  <p className="text-sm text-neutral-500 capitalize mb-2">{course.level} · {course.duration}</p>
                  <div className="flex items-center gap-3 text-sm text-neutral-500">
                    <span>⭐ {course.rating}</span>
                    <span>🏫 {course.collegeCount}+ colleges</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs text-neutral-400 capitalize">{course.category}</span>
                    <span className="text-xs text-neutral-400">{formatDate(course.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`w-8 h-8 rounded-lg text-sm font-medium ${page === i + 1 ? "bg-primary-600 text-white" : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"}`}>{i + 1}</button>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
