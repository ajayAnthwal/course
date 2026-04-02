"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Modal, Button, Input } from "@/components/ui";
import { useTestimonials, useCreateTestimonial, useDeleteTestimonial } from "@/features/testimonials/hooks/useTestimonials";
import { formatDate } from "@/lib/utils";
import type { Testimonial } from "@/types";

function AdminTestimonialsContent() {
  const { user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", content: "", college: "", rating: "5" });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const { data, isLoading } = useTestimonials();
  const createTestimonial = useCreateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  const testimonials = data?.data || [];

  const handleSubmit = () => {
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("role", formData.role);
    fd.append("content", formData.content);
    fd.append("college", formData.college);
    fd.append("rating", formData.rating);
    if (avatarFile) fd.append("avatar", avatarFile);
    createTestimonial.mutate(fd, { onSuccess: () => { setIsFormOpen(false); setFormData({ name: "", role: "", content: "", college: "", rating: "5" }); } });
  };

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Testimonials</h1>
            <p className="text-neutral-500 mt-1">Manage student testimonials and reviews.</p>
          </div>
          <Button onClick={() => { setFormData({ name: "", role: "", content: "", college: "", rating: "5" }); setAvatarFile(null); setIsFormOpen(true); }}>+ Add Testimonial</Button>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{[1, 2, 3].map((i) => <div key={i} className="bg-white rounded-2xl h-40 animate-pulse" />)}</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20 text-neutral-400"><p className="text-6xl mb-4">💬</p><p>No testimonials yet.</p></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t._id} className="bg-white rounded-2xl border border-neutral-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => <span key={i} className="text-accent-400 text-sm">⭐</span>)}
                </div>
                <p className="text-sm text-neutral-600 mb-4 line-clamp-3">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-700">{t.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{t.name}</p>
                      <p className="text-xs text-neutral-500">{t.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-error-600" onClick={() => deleteTestimonial.mutate(t._id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Add Testimonial" size="md">
          <div className="space-y-4">
            <Input label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Student name" />
            <Input label="Role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="e.g. B.Tech Student, IIT Delhi" />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Content</label>
              <textarea className="w-full h-24 px-3 py-2 border border-neutral-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Testimonial content..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="College (optional)" value={formData.college} onChange={(e) => setFormData({ ...formData, college: e.target.value })} />
              <Input label="Rating (1-5)" type="number" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Avatar</label>
              <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files?.[0] || null)} className="text-sm" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit} isLoading={createTestimonial.isPending}>Add</Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default function AdminTestimonialsPage() {
  return <ProtectedRoute allowedRoles={["admin"]}><AdminTestimonialsContent /></ProtectedRoute>;
}
