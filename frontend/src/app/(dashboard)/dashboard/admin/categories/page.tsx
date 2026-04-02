"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Modal, Button, Input } from "@/components/ui";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/features/categories/hooks/useCategories";
import { formatDate } from "@/lib/utils";
import type { Category } from "@/types";

function AdminCategoriesContent() {
  const { user } = useAuth();
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

  const openCreate = () => {
    setSelected(null);
    setFormData({ name: "", description: "", icon: "", color: "#6366f1", count: "0" });
    setImageFile(null);
    setIsFormOpen(true);
  };

  const openEdit = (cat: Category) => {
    setSelected(cat);
    setFormData({ name: cat.name, description: cat.description || "", icon: cat.icon || "", color: cat.color || "#6366f1", count: String(cat.count) });
    setImageFile(null);
    setIsFormOpen(true);
  };

  const handleSubmit = () => {
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("icon", formData.icon);
    fd.append("color", formData.color);
    fd.append("count", formData.count);
    if (imageFile) fd.append("image", imageFile);

    if (selected) {
      updateCategory.mutate({ id: selected._id, data: fd }, { onSuccess: () => setIsFormOpen(false) });
    } else {
      createCategory.mutate(fd, { onSuccess: () => setIsFormOpen(false) });
    }
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => <div key={i} className="bg-white rounded-2xl h-32 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div key={cat._id} className="bg-white rounded-2xl border border-neutral-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: cat.color || "#6366f1" }}>
                      {cat.icon || "📁"}
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">{cat.name}</h3>
                      <p className="text-xs text-neutral-500">{cat.count} items</p>
                    </div>
                  </div>
                  <Badge variant={cat.isActive ? "success" : "danger"} size="sm">{cat.isActive ? "Active" : "Inactive"}</Badge>
                </div>
                {cat.description && <p className="text-sm text-neutral-500 mb-3 line-clamp-2">{cat.description}</p>}
                <div className="flex items-center gap-2 pt-3 border-t border-neutral-100">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(cat)}>Edit</Button>
                  <Button variant="ghost" size="sm" className="text-error-600" onClick={() => { setSelected(cat); setIsDeleteOpen(true); }}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={selected ? "Edit Category" : "Add Category"} size="md">
          <div className="space-y-4">
            <Input label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Engineering" />
            <Input label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Short description" />
            <Input label="Icon (emoji)" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} placeholder="⚙️" />
            <div className="flex gap-4">
              <Input label="Color" type="color" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} />
              <Input label="Count" type="number" value={formData.count} onChange={(e) => setFormData({ ...formData, count: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="text-sm" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit} isLoading={createCategory.isPending || updateCategory.isPending}>
                {selected ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Category" size="sm">
          {selected && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">Delete <strong>{selected.name}</strong>?</p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                <Button variant="danger" onClick={() => deleteCategory.mutate(selected._id, { onSuccess: () => setIsDeleteOpen(false) })} isLoading={deleteCategory.isPending}>Delete</Button>
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
