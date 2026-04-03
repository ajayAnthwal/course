"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Modal, Button, Input, Select, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { useExams } from "@/features/exams/hooks/useExams";
import { formatDate } from "@/lib/utils";
import apiClient from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Exam } from "@/types";

function AdminExamsContent() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<Exam | null>(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "", fullName: "", description: "", category: "", level: "national",
    conductingBody: "", mode: "computer-based", frequency: "", eligibility: "",
    duration: "", totalMarks: "", applicants: "", website: "", featured: false,
  });

  const { data, isLoading } = useExams({ limit: "20", search: search || undefined });
  const exams = data?.data || [];

  const createExam = useMutation({
    mutationFn: (data: any) => apiClient.post("/exams", data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["exams"] }); showToast("Exam created"); setIsFormOpen(false); },
    onError: () => showToast("Failed to create exam", "error"),
  });
  const updateExam = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => apiClient.patch(`/exams/${id}`, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["exams"] }); showToast("Exam updated"); setIsFormOpen(false); },
    onError: () => showToast("Failed to update exam", "error"),
  });
  const deleteExam = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/exams/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["exams"] }); showToast("Exam deleted"); setIsDeleteOpen(false); },
    onError: () => showToast("Failed to delete exam", "error"),
  });

  const defaultForm = { name: "", fullName: "", description: "", category: "", level: "national", conductingBody: "", mode: "computer-based", frequency: "", eligibility: "", duration: "", totalMarks: "", applicants: "", website: "", featured: false };

  const openCreate = () => { setFormData(defaultForm); setSelected(null); setIsFormOpen(true); };

  const openEdit = (exam: Exam) => {
    setSelected(exam);
    setFormData({
      name: exam.name, fullName: exam.fullName, description: exam.description,
      category: exam.category, level: exam.level, conductingBody: exam.conductingBody,
      mode: exam.mode, frequency: exam.frequency, eligibility: exam.eligibility || "",
      duration: exam.duration || "", totalMarks: String(exam.totalMarks || ""),
      applicants: exam.applicants || "", website: exam.website || "", featured: exam.featured,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) { showToast("Name is required", "error"); return; }
    const payload: any = { ...formData, totalMarks: Number(formData.totalMarks) || 0 };
    if (selected) updateExam.mutate({ id: selected._id, data: payload });
    else createExam.mutate(payload);
  };

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Exam Management</h1>
            <p className="text-neutral-500 mt-1">Manage entrance exams.</p>
          </div>
          <Button onClick={openCreate}>+ Add Exam</Button>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-4">
          <Input placeholder="Search exams..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {isLoading ? (
          <div className="space-y-3">{[1, 2, 3, 4].map((i) => <div key={i} className="bg-white rounded-xl h-16 animate-pulse border border-neutral-200" />)}</div>
        ) : exams.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200">
            <p className="text-6xl mb-4">📝</p><p className="text-neutral-500 mb-4">No exams found.</p>
            <Button onClick={openCreate}>+ Add Exam</Button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Exam</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Conducting Body</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Mode</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Level</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {exams.map((exam) => (
                  <tr key={exam._id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-neutral-900">{exam.name}</p>
                        <p className="text-xs text-neutral-500">{exam.fullName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{exam.conductingBody}</td>
                    <td className="px-6 py-4"><Badge variant="default" size="sm">{exam.mode}</Badge></td>
                    <td className="px-6 py-4"><Badge variant="primary" size="sm">{exam.level}</Badge></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {exam.featured && <Badge variant="warning" size="sm">Featured</Badge>}
                        <Badge variant={exam.isActive ? "success" : "danger"} size="sm" dot>{exam.isActive ? "Active" : "Inactive"}</Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(exam)}>Edit</Button>
                        <Button variant="ghost" size="sm" className="text-error-600" onClick={() => { setSelected(exam); setIsDeleteOpen(true); }}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Modal isOpen={isFormOpen} onClose={() => { setIsFormOpen(false); setSelected(null); }} title={selected ? "Edit Exam" : "Add Exam"} size="lg">
          <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Short Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. JEE Main" />
              <Input label="Full Name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="e.g. Joint Entrance Examination Main" />
            </div>
            <Input label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Brief description" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="e.g. Engineering" />
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Level</label>
                <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                  <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national">National</SelectItem>
                    <SelectItem value="state">State</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Conducting Body" value={formData.conductingBody} onChange={(e) => setFormData({ ...formData, conductingBody: e.target.value })} placeholder="e.g. NTA" />
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Mode</label>
                <Select value={formData.mode} onValueChange={(value) => setFormData({ ...formData, mode: value })}>
                  <SelectTrigger><SelectValue placeholder="Select mode" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer-based">Computer-Based</SelectItem>
                    <SelectItem value="pen-paper">Pen & Paper</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input label="Frequency" value={formData.frequency} onChange={(e) => setFormData({ ...formData, frequency: e.target.value })} placeholder="e.g. Once a year" />
              <Input label="Duration" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g. 3 hours" />
              <Input label="Total Marks" type="number" value={formData.totalMarks} onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })} />
            </div>
            <Input label="Eligibility" value={formData.eligibility} onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })} placeholder="Eligibility criteria" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Applicants" value={formData.applicants} onChange={(e) => setFormData({ ...formData, applicants: e.target.value })} placeholder="e.g. 12 Lakh+" />
              <Input label="Website" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="https://..." />
            </div>
            <label className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
              <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4 rounded border-neutral-300 text-primary-600" />
              Mark as Featured
            </label>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => { setIsFormOpen(false); setSelected(null); }}>Cancel</Button>
              <Button onClick={handleSubmit} isLoading={createExam.isPending || updateExam.isPending}>{selected ? "Update" : "Create"}</Button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={() => { setIsDeleteOpen(false); setSelected(null); }} title="Delete Exam" size="sm">
          {selected && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">Delete <strong>{selected.name}</strong>?</p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => { setIsDeleteOpen(false); setSelected(null); }}>Cancel</Button>
                <Button variant="danger" onClick={() => deleteExam.mutate(selected._id)} isLoading={deleteExam.isPending}>Delete</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default function AdminExamsPage() {
  return <ProtectedRoute allowedRoles={["admin"]}><AdminExamsContent /></ProtectedRoute>;
}
