"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Modal, Button, Input, Select, useToast } from "@/components/ui";
import { FileUpload } from "@/components/ui/file-upload";
import { useCourses, useCreateCourse, useUpdateCourse, useDeleteCourse } from "@/features/courses/hooks/useCourses";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { formatDate } from "@/lib/utils";
import type { Course } from "@/types";

function formatFees(amount: number) {
  if (!amount) return "—";
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${(amount / 1000).toFixed(0)}K`;
}

const levelOptions = [
  { label: "Undergraduate", value: "undergraduate" },
  { label: "Postgraduate", value: "postgraduate" },
  { label: "Diploma", value: "diploma" },
  { label: "Doctorate", value: "doctorate" },
  { label: "Certificate", value: "certificate" },
];

const defaultForm = {
  name: "", shortName: "", description: "", category: "", level: "undergraduate",
  duration: "", durationYears: "4", eligibility: "", feesMin: "", feesMax: "",
  collegeCount: "", rating: "4.0", featured: false,
};

function AdminCoursesContent() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<Course | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState(defaultForm);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data, isLoading } = useCourses({ page, limit: 15, search: search || undefined });
  const { data: categoriesData } = useCategories();
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();

  const courses = data?.data || [];
  const pagination = data?.pagination;

  const categoryOptions = [
    { label: "Select category", value: "" },
    ...(categoriesData?.data || []).map((c) => ({ label: c.name, value: c.name })),
    { label: "Engineering", value: "Engineering" },
    { label: "Management", value: "Management" },
    { label: "Medical", value: "Medical" },
    { label: "Law", value: "Law" },
    { label: "Arts", value: "Arts" },
    { label: "Science", value: "Science" },
  ];

  const resetForm = () => { setFormData(defaultForm); setImageFile(null); setSelected(null); };
  const openCreate = () => { resetForm(); setIsFormOpen(true); };

  const openEdit = (course: Course) => {
    setSelected(course);
    setFormData({
      name: course.name, shortName: course.shortName || "", description: course.description,
      category: course.category, level: course.level, duration: course.duration,
      durationYears: String(course.durationYears || 4), eligibility: course.eligibility || "",
      feesMin: String(course.fees?.min || ""), feesMax: String(course.fees?.max || ""),
      collegeCount: String(course.collegeCount || ""), rating: String(course.rating || "4.0"),
      featured: course.featured,
    });
    setImageFile(null);
    setIsFormOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.category) { showToast("Name and category are required", "error"); return; }
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("shortName", formData.shortName);
    fd.append("description", formData.description);
    fd.append("category", formData.category);
    fd.append("level", formData.level);
    fd.append("duration", formData.duration);
    fd.append("durationYears", formData.durationYears);
    fd.append("eligibility", formData.eligibility);
    fd.append("fees", JSON.stringify({ min: Number(formData.feesMin) || 0, max: Number(formData.feesMax) || 0, currency: "INR" }));
    fd.append("collegeCount", formData.collegeCount || "0");
    fd.append("rating", formData.rating || "0");
    fd.append("featured", String(formData.featured));
    if (imageFile) fd.append("image", imageFile);

    if (selected) {
      updateCourse.mutate({ id: selected._id, data: fd }, {
        onSuccess: () => { showToast("Course updated successfully"); setIsFormOpen(false); resetForm(); },
        onError: () => showToast("Failed to update course", "error"),
      });
    } else {
      createCourse.mutate(fd, {
        onSuccess: () => { showToast("Course created successfully"); setIsFormOpen(false); resetForm(); },
        onError: () => showToast("Failed to create course", "error"),
      });
    }
  };

  const handleDelete = () => {
    if (!selected) return;
    deleteCourse.mutate(selected._id, {
      onSuccess: () => { showToast("Course deleted successfully"); setIsDeleteOpen(false); resetForm(); },
      onError: () => showToast("Failed to delete course", "error"),
    });
  };

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Course Management</h1>
            <p className="text-neutral-500 mt-1">Create, edit, and manage courses.</p>
          </div>
          <Button onClick={openCreate}>+ Add Course</Button>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-4">
          <Input placeholder="Search courses..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>

        {isLoading ? (
          <div className="space-y-3">{[1, 2, 3, 4, 5].map((i) => <div key={i} className="bg-white rounded-xl h-16 animate-pulse border border-neutral-200" />)}</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200">
            <p className="text-6xl mb-4">📚</p>
            <p className="text-neutral-500 mb-4">No courses found.</p>
            <Button onClick={openCreate}>+ Add Course</Button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Course</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Level</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Duration</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Fees</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {courses.map((course) => (
                  <tr key={course._id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-xl shrink-0 overflow-hidden">
                          {course.image ? <img src={course.image} alt="" className="w-full h-full object-cover" /> : "📚"}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-neutral-900 truncate max-w-xs">{course.name}</p>
                          <p className="text-xs text-neutral-500">{course.shortName || "—"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><Badge variant="default" size="sm">{course.category}</Badge></td>
                    <td className="px-6 py-4"><Badge variant="primary" size="sm" className="capitalize">{course.level}</Badge></td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{course.duration}</td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{formatFees(course.fees?.min)} - {formatFees(course.fees?.max)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {course.featured && <Badge variant="warning" size="sm">Popular</Badge>}
                        <Badge variant={course.isActive ? "success" : "danger"} size="sm" dot>{course.isActive ? "Active" : "Inactive"}</Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(course)}>Edit</Button>
                        <Button variant="ghost" size="sm" className="text-error-600" onClick={() => { setSelected(course); setIsDeleteOpen(true); }}>Delete</Button>
                      </div>
                    </td>
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

        <Modal isOpen={isFormOpen} onClose={() => { setIsFormOpen(false); resetForm(); }} title={selected ? "Edit Course" : "Add Course"} size="lg">
          <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Course Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. B.Tech Computer Science" />
              <Input label="Short Name" value={formData.shortName} onChange={(e) => setFormData({ ...formData, shortName: e.target.value })} placeholder="e.g. B.Tech CSE" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
              <textarea className="w-full h-24 px-4 py-3 border border-neutral-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Course description..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Select label="Category *" options={categoryOptions} value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Select category" />
              <Select label="Level" options={levelOptions} value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input label="Duration" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g. 4 Years" />
              <Input label="Duration (Years)" type="number" value={formData.durationYears} onChange={(e) => setFormData({ ...formData, durationYears: e.target.value })} placeholder="4" />
              <Input label="Colleges" type="number" value={formData.collegeCount} onChange={(e) => setFormData({ ...formData, collegeCount: e.target.value })} placeholder="0" />
            </div>
            <Input label="Eligibility" value={formData.eligibility} onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })} placeholder="e.g. 12th with PCM" />
            <div className="grid grid-cols-3 gap-4">
              <Input label="Min Fees (₹)" type="number" value={formData.feesMin} onChange={(e) => setFormData({ ...formData, feesMin: e.target.value })} placeholder="200000" />
              <Input label="Max Fees (₹)" type="number" value={formData.feesMax} onChange={(e) => setFormData({ ...formData, feesMax: e.target.value })} placeholder="2500000" />
              <Input label="Rating" type="number" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} placeholder="4.0" />
            </div>
            <label className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
              <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4 rounded border-neutral-300 text-primary-600" />
              Mark as Popular / Featured
            </label>
            <FileUpload label="Course Image" value={selected?.image} onChange={setImageFile} />
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => { setIsFormOpen(false); resetForm(); }}>Cancel</Button>
              <Button onClick={handleSubmit} isLoading={createCourse.isPending || updateCourse.isPending}>{selected ? "Update Course" : "Create Course"}</Button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={() => { setIsDeleteOpen(false); resetForm(); }} title="Delete Course" size="sm">
          {selected && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">Delete <strong>{selected.name}</strong>? This cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => { setIsDeleteOpen(false); resetForm(); }}>Cancel</Button>
                <Button variant="danger" onClick={handleDelete} isLoading={deleteCourse.isPending}>Delete</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default function AdminCoursesPage() {
  return <ProtectedRoute allowedRoles={["admin"]}><AdminCoursesContent /></ProtectedRoute>;
}
