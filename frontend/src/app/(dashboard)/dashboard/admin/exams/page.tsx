"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Button, Input } from "@/components/ui";
import { useExams } from "@/features/exams/hooks/useExams";
import { formatDate } from "@/lib/utils";

export default function AdminExamsPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useExams({ page, limit: 12, search: search || undefined });
  const exams = data?.data || [];
  const pagination = data?.pagination;

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout role="admin" userName={user?.name}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Exams</h1>
              <p className="text-neutral-500 mt-1">View all exams in the database.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-4">
            <Input placeholder="Search exams..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="bg-white rounded-2xl h-40 animate-pulse" />)}</div>
          ) : exams.length === 0 ? (
            <div className="text-center py-20 text-neutral-400"><p className="text-6xl mb-4">📝</p><p>No exams found.</p></div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exams.map((exam) => (
                <div key={exam._id} className="bg-white rounded-2xl border border-neutral-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-neutral-900">{exam.name}</h3>
                    {exam.featured && <Badge variant="warning" size="sm">Popular</Badge>}
                  </div>
                  <p className="text-sm text-neutral-500 mb-2">{exam.fullName}</p>
                  <div className="flex items-center gap-3 text-sm text-neutral-500">
                    <span>🏛️ {exam.conductingBody}</span>
                    <span>📝 {exam.mode}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <Badge variant="default" size="sm">{exam.level}</Badge>
                    <span className="text-xs text-neutral-400">{exam.frequency}</span>
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
