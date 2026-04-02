"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Modal, Button, Input } from "@/components/ui";
import { useNews } from "@/features/news/hooks/useNews";
import { formatDate } from "@/lib/utils";
import apiClient from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewsArticle } from "@/types";

function AdminNewsContent() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState({ title: "", excerpt: "", content: "", category: "", author: "", featured: false });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data, isLoading } = useNews({ limit: "50" });
  const news = data?.data || [];

  const createNews = useMutation({
    mutationFn: (fd: FormData) => apiClient.post("/news", fd, { headers: { "Content-Type": "multipart/form-data" } }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["news"] }); setIsFormOpen(false); },
  });
  const updateNews = useMutation({
    mutationFn: ({ id, fd }: { id: string; fd: FormData }) => apiClient.patch(`/news/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" } }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["news"] }); setIsFormOpen(false); },
  });
  const deleteNews = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/news/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["news"] }); setIsDeleteOpen(false); },
  });

  const openCreate = () => {
    setSelected(null);
    setFormData({ title: "", excerpt: "", content: "", category: "", author: user?.name || "Admin", featured: false });
    setImageFile(null);
    setIsFormOpen(true);
  };

  const openEdit = (n: NewsArticle) => {
    setSelected(n);
    setFormData({ title: n.title, excerpt: n.excerpt, content: n.content, category: n.category, author: n.author, featured: n.featured });
    setImageFile(null);
    setIsFormOpen(true);
  };

  const handleSubmit = () => {
    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("excerpt", formData.excerpt);
    fd.append("content", formData.content);
    fd.append("category", formData.category);
    fd.append("author", formData.author);
    fd.append("featured", String(formData.featured));
    if (imageFile) fd.append("image", imageFile);

    if (selected) {
      updateNews.mutate({ id: selected._id, fd });
    } else {
      createNews.mutate(fd);
    }
  };

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">News Management</h1>
            <p className="text-neutral-500 mt-1">Create and manage news articles.</p>
          </div>
          <Button onClick={openCreate}>+ New Article</Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="bg-white rounded-2xl h-20 animate-pulse" />)}</div>
        ) : news.length === 0 ? (
          <div className="text-center py-20 text-neutral-400"><p className="text-6xl mb-4">📰</p><p>No news articles yet.</p></div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 divide-y divide-neutral-100">
            {news.map((n) => (
              <div key={n._id} className="flex items-center gap-4 p-4 hover:bg-neutral-50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-2xl shrink-0">
                  {n.image ? <img src={n.image} alt="" className="w-full h-full object-cover rounded-xl" /> : "📰"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-neutral-900 truncate">{n.title}</h3>
                    {n.featured && <Badge variant="warning" size="sm">Featured</Badge>}
                  </div>
                  <p className="text-xs text-neutral-500">{n.category} · {n.readTime} · {formatDate(n.publishedAt)}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(n)}>Edit</Button>
                  <Button variant="ghost" size="sm" className="text-error-600" onClick={() => { setSelected(n); setIsDeleteOpen(true); }}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={selected ? "Edit Article" : "New Article"} size="lg">
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <Input label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Article title" />
            <Input label="Excerpt" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} placeholder="Short summary" />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Content</label>
              <textarea className="w-full h-40 px-3 py-2 border border-neutral-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Article content..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="e.g. Exam Updates" />
              <Input label="Author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
            </div>
            <label className="flex items-center gap-2 text-sm text-neutral-700">
              <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="rounded" />
              Featured
            </label>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="text-sm" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit} isLoading={createNews.isPending || updateNews.isPending}>{selected ? "Update" : "Publish"}</Button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Article" size="sm">
          {selected && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">Delete <strong>{selected.title}</strong>?</p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                <Button variant="danger" onClick={() => deleteNews.mutate(selected._id)} isLoading={deleteNews.isPending}>Delete</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default function AdminNewsPage() {
  return <ProtectedRoute allowedRoles={["admin"]}><AdminNewsContent /></ProtectedRoute>;
}
