"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Button, Input } from "@/components/ui";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { formatDate } from "@/lib/utils";

function formatFees(amount: number) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${(amount / 1000).toFixed(0)}K`;
}

export default function AdminCoursesPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useCourses({ page, limit: 15, search: search || undefined });
  const courses = data?.data || [];
  const pagination = data?.pagination;

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout role="admin" userName={user?.name}>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Courses</h1>
            <p className="text-neutral-500 mt-1">View all courses in the database.</p>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-4">
            <Input placeholder="Search courses..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>

          {isLoading ? (
            <div className="space-y-3">{[1, 2, 3, 4, 5].map((i) => <div key={i} className="bg-white rounded-xl h-16 animate-pulse border border-neutral-200" />)}</div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200">
              <p className="text-6xl mb-4">📚</p><p className="text-neutral-500">No courses found.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Course</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Level</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Duration</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Fees</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Colleges</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Rating</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Added</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {courses.map((course) => (
                    <tr key={course._id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-neutral-900">{course.name}</p>
                          <p className="text-xs text-neutral-500">{course.shortName} · {course.category}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4"><Badge variant="primary" size="sm" className="capitalize">{course.level}</Badge></td>
                      <td className="px-6 py-4 text-sm text-neutral-600">{course.duration}</td>
                      <td className="px-6 py-4 text-sm text-neutral-600">{formatFees(course.fees.min)} - {formatFees(course.fees.max)}</td>
                      <td className="px-6 py-4 text-sm text-neutral-600">{course.collegeCount}+</td>
                      <td className="px-6 py-4"><div className="flex items-center gap-1"><span className="text-accent-400 text-sm">⭐</span><span className="text-sm font-medium">{course.rating}</span></div></td>
                      <td className="px-6 py-4 text-sm text-neutral-500">{formatDate(course.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: Math.min(pagination.totalPages, 10) }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === i + 1 ? "bg-primary-600 text-white" : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"}`}>{i + 1}</button>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
