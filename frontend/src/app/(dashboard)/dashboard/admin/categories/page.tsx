"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Modal, Button, Input, Select, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { FileUpload } from "@/components/ui/file-upload";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/features/categories/hooks/useCategories";
import { formatDate } from "@/lib/utils";
import type { Category } from "@/types";

const iconOptions = [
  { label: "⚙️ Engineering", value: "⚙️" },
  { label: "📊 Management", value: "📊" },
  { label: "🩺 Medical", value: "🩺" },
  { label: "⚖️ Law", value: "⚖️" },
  { label: "🎨 Design", value: "🎨" },
  { label: "🔬 Science", value: "🔬" },
  { label: "💻 Technology", value: "💻" },
  { label: "📚 Education", value: "📚" },
  { label: "🏦 Finance", value: "🏦" },
  { label: "🎭 Arts", value: "🎭" },
  { label: "✈️ Aviation", value: "✈️" },
  { label: "🏥 Nursing", value: "🏥" },
  { label: "💊 Pharmacy", value: "💊" },
  { label: "🏗️ Architecture", value: "🏗️" },
  { label: "🌾 Agriculture", value: "🌾" },
];

function AdminCategoriesContent() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "", icon: "", color: "#6366f1", count: "0" });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data, isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const categories = data?.data || [];

  const resetForm = () => {
    setFormData({ name: "", description: "", icon: "", color: "#6366f1", count: "0" });
    setImageFile(null);
    setSelected(null);
  };

  const openCreate = () => { resetForm(); setIsFormOpen(true); };

  const openEdit = (cat: Category) => {
    setSelected(cat);
    setFormData({ name: cat.name, description: cat.description || "", icon: cat.icon || "", color: cat.color || "#6366f1", count: String(cat.count) });
    setImageFile(null);
    setIsFormOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) { showToast("Name is required", "error"); return; }
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("icon", formData.icon);
    fd.append("color", formData.color);
    fd.append("count", formData.count);
    if (imageFile) fd.append("image", imageFile);

    if (selected) {
      updateCategory.mutate({ id: selected._id, data: fd }, {
        onSuccess: () => { showToast("Category updated successfully"); setIsFormOpen(false); resetForm(); },
        onError: () => showToast("Failed to update category", "error"),
      });
    } else {
      createCategory.mutate(fd, {
        onSuccess: () => { showToast("Category created successfully"); setIsFormOpen(false); resetForm(); },
        onError: () => showToast("Failed to create category", "error"),
      });
    }
  };

  const handleDelete = () => {
    if (!selected) return;
    deleteCategory.mutate(selected._id, {
      onSuccess: () => { showToast("Category deleted successfully"); setIsDeleteOpen(false); resetForm(); },
      onError: () => showToast("Failed to delete category", "error"),
    });
  };

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Categories</h1>
            <p className="text-neutral-500 mt-1">Manage course and college categories.</p>
          </div>
          <Button onClick={openCreate}>+ Add Category</Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">{[1, 2, 3, 4].map((i) => <div key={i} className="bg-white rounded-xl h-16 animate-pulse border border-neutral-200" />)}</div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200">
            <p className="text-6xl mb-4">📂</p>
            <p className="text-neutral-500 mb-4">No categories yet.</p>
            <Button onClick={openCreate}>+ Add Category</Button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Count</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Created</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: cat.color || "#6366f1" }}>
                          {cat.icon || "📁"}
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">{cat.name}</p>
                          <p className="text-xs text-neutral-500 truncate max-w-xs">{cat.description || "—"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{cat.count}+</td>
                    <td className="px-6 py-4">
                      <Badge variant={cat.isActive ? "success" : "danger"} size="sm" dot>{cat.isActive ? "Active" : "Inactive"}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{formatDate(cat.createdAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(cat)}>Edit</Button>
                        <Button variant="ghost" size="sm" className="text-error-600" onClick={() => { setSelected(cat); setIsDeleteOpen(true); }}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Modal isOpen={isFormOpen} onClose={() => { setIsFormOpen(false); resetForm(); }} title={selected ? "Edit Category" : "Add Category"} size="md">
          <div className="space-y-5">
            <Input label="Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Engineering" />
            <Input label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Short description" />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Icon</label>
              <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                <SelectTrigger><SelectValue placeholder="Select an icon" /></SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer border border-neutral-200" />
                  <Input value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} />
                </div>
              </div>
              <Input label="Count" type="number" value={formData.count} onChange={(e) => setFormData({ ...formData, count: e.target.value })} className="w-32" />
            </div>
            <FileUpload label="Image" value={selected?.image} onChange={setImageFile} />
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => { setIsFormOpen(false); resetForm(); }}>Cancel</Button>
              <Button onClick={handleSubmit} isLoading={createCategory.isPending || updateCategory.isPending}>
                {selected ? "Update Category" : "Create Category"}
              </Button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={() => { setIsDeleteOpen(false); resetForm(); }} title="Delete Category" size="sm">
          {selected && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">Delete <strong>{selected.name}</strong>? This cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => { setIsDeleteOpen(false); resetForm(); }}>Cancel</Button>
                <Button variant="danger" onClick={handleDelete} isLoading={deleteCategory.isPending}>Delete</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default function AdminCategoriesPage() {
  return <ProtectedRoute allowedRoles={["admin"]}><AdminCategoriesContent /></ProtectedRoute>;
}
