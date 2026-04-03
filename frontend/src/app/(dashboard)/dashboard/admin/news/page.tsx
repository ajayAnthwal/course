"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Modal, Button, Input, Select, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { FileUpload } from "@/components/ui/file-upload";
import { useNews } from "@/features/news/hooks/useNews";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { formatDate } from "@/lib/utils";
import apiClient from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewsArticle } from "@/types";

function AdminNewsContent() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState({ title: "", excerpt: "", content: "", category: "", author: "", featured: false });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data, isLoading } = useNews({ limit: "50" });
  const { data: categoriesData } = useCategories();
  const news = data?.data || [];

  const categoryOptions = [
    { label: "Select category", value: "" },
    ...(categoriesData?.data || []).map((c) => ({ label: c.name, value: c.name })),
    { label: "Exam Updates", value: "Exam Updates" },
    { label: "Rankings", value: "Rankings" },
    { label: "Admissions", value: "Admissions" },
    { label: "Placements", value: "Placements" },
    { label: "Scholarships", value: "Scholarships" },
  ];

  const createNews = useMutation({
    mutationFn: (fd: FormData) => apiClient.post("/news", fd, { headers: { "Content-Type": "multipart/form-data" } }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["news"] }); showToast("Article published"); setIsFormOpen(false); },
    onError: () => showToast("Failed to publish article", "error"),
  });
  const updateNews = useMutation({
    mutationFn: ({ id, fd }: { id: string; fd: FormData }) => apiClient.patch(`/news/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" } }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["news"] }); showToast("Article updated"); setIsFormOpen(false); },
    onError: () => showToast("Failed to update article", "error"),
  });
  const deleteNews = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/news/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["news"] }); showToast("Article deleted"); setIsDeleteOpen(false); },
    onError: () => showToast("Failed to delete article", "error"),
  });

  const resetForm = () => {
    setFormData({ title: "", excerpt: "", content: "", category: "", author: user?.name || "Admin", featured: false });
    setImageFile(null);
    setSelected(null);
  };

  const openCreate = () => { resetForm(); setIsFormOpen(true); };

  const openEdit = (n: NewsArticle) => {
    setSelected(n);
    setFormData({ title: n.title, excerpt: n.excerpt, content: n.content, category: n.category, author: n.author, featured: n.featured });
    setImageFile(null);
    setIsFormOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.category) { showToast("Title and category are required", "error"); return; }
    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("excerpt", formData.excerpt);
    fd.append("content", formData.content);
    fd.append("category", formData.category);
    fd.append("author", formData.author);
    fd.append("featured", String(formData.featured));
    if (imageFile) fd.append("image", imageFile);

    if (selected) updateNews.mutate({ id: selected._id, fd });
    else createNews.mutate(fd);
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
          <div className="space-y-3">{[1, 2, 3, 4].map((i) => <div key={i} className="bg-white rounded-xl h-16 animate-pulse border border-neutral-200" />)}</div>
        ) : news.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200">
            <p className="text-6xl mb-4">📰</p><p className="text-neutral-500 mb-4">No articles yet.</p>
            <Button onClick={openCreate}>+ New Article</Button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Article</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Published</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {news.map((n) => (
                  <tr key={n._id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-xl shrink-0 overflow-hidden">
                          {n.image ? <img src={n.image} alt="" className="w-full h-full object-cover" /> : "📰"}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-neutral-900 truncate max-w-sm">{n.title}</p>
                          <p className="text-xs text-neutral-500">{n.readTime} · {n.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><Badge variant="default" size="sm">{n.category}</Badge></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {n.featured && <Badge variant="warning" size="sm">Featured</Badge>}
                        <Badge variant={n.isActive ? "success" : "danger"} size="sm" dot>{n.isActive ? "Active" : "Inactive"}</Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{formatDate(n.publishedAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(n)}>Edit</Button>
                        <Button variant="ghost" size="sm" className="text-error-600" onClick={() => { setSelected(n); setIsDeleteOpen(true); }}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Modal isOpen={isFormOpen} onClose={() => { setIsFormOpen(false); resetForm(); }} title={selected ? "Edit Article" : "New Article"} size="lg">
          <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-2">
            <Input label="Title *" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Article title" />
            <Input label="Excerpt" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} placeholder="Short summary" />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Content</label>
              <textarea className="w-full h-40 px-4 py-3 border border-neutral-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Article content..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Category *</label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input label="Author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
            </div>
            <label className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
              <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
              Mark as Featured
            </label>
            <FileUpload label="Cover Image" value={selected?.image} onChange={setImageFile} />
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => { setIsFormOpen(false); resetForm(); }}>Cancel</Button>
              <Button onClick={handleSubmit} isLoading={createNews.isPending || updateNews.isPending}>{selected ? "Update" : "Publish"}</Button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={() => { setIsDeleteOpen(false); setSelected(null); }} title="Delete Article" size="sm">
          {selected && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">Delete <strong>{selected.title}</strong>?</p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => { setIsDeleteOpen(false); setSelected(null); }}>Cancel</Button>
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
