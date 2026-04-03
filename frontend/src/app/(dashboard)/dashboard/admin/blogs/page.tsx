"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Modal, Button, Input, Select, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { FileUpload } from "@/components/ui/file-upload";
import { useBlogs, useCreateBlog, useUpdateBlog, useDeleteBlog } from "@/features/blogs/hooks/useBlogs";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { formatDate } from "@/lib/utils";
import type { Blog } from "@/types";

function AdminBlogsContent() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({ title: "", excerpt: "", content: "", category: "", author: "", tags: "", featured: false });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data, isLoading } = useBlogs({ limit: "50" });
  const { data: categoriesData } = useCategories();
  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();
  const deleteBlog = useDeleteBlog();

  const blogs = data?.data || [];
  const categoryOptions = [
    { label: "Select category", value: "" },
    ...(categoriesData?.data || []).map((c) => ({ label: c.name, value: c.name })),
    { label: "Education", value: "Education" },
    { label: "Career", value: "Career" },
    { label: "Exam Tips", value: "Exam Tips" },
    { label: "College Life", value: "College Life" },
    { label: "Technology", value: "Technology" },
  ];

  const resetForm = () => {
    setFormData({ title: "", excerpt: "", content: "", category: "", author: user?.name || "Admin", tags: "", featured: false });
    setImageFile(null);
    setSelected(null);
  };

  const openCreate = () => { resetForm(); setIsFormOpen(true); };

  const openEdit = (blog: Blog) => {
    setSelected(blog);
    setFormData({ title: blog.title, excerpt: blog.excerpt, content: blog.content, category: blog.category, author: blog.author, tags: blog.tags.join(", "), featured: blog.featured });
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
    const tags = formData.tags.split(",").map(t => t.trim()).filter(Boolean);
    fd.append("tags", JSON.stringify(tags));
    fd.append("featured", String(formData.featured));
    if (imageFile) fd.append("image", imageFile);

    if (selected) {
      updateBlog.mutate({ id: selected._id, data: fd }, {
        onSuccess: () => { showToast("Blog updated successfully"); setIsFormOpen(false); resetForm(); },
        onError: () => showToast("Failed to update blog", "error"),
      });
    } else {
      createBlog.mutate(fd, {
        onSuccess: () => { showToast("Blog published successfully"); setIsFormOpen(false); resetForm(); },
        onError: () => showToast("Failed to create blog", "error"),
      });
    }
  };

  const handleDelete = () => {
    if (!selected) return;
    deleteBlog.mutate(selected._id, {
      onSuccess: () => { showToast("Blog deleted successfully"); setIsDeleteOpen(false); resetForm(); },
      onError: () => showToast("Failed to delete blog", "error"),
    });
  };

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Blog Management</h1>
            <p className="text-neutral-500 mt-1">Create and manage blog posts.</p>
          </div>
          <Button onClick={openCreate}>+ New Blog</Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">{[1, 2, 3, 4].map((i) => <div key={i} className="bg-white rounded-xl h-16 animate-pulse border border-neutral-200" />)}</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200">
            <p className="text-6xl mb-4">✍️</p>
            <p className="text-neutral-500 mb-4">No blogs yet.</p>
            <Button onClick={openCreate}>+ New Blog</Button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Blog</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Published</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-xl shrink-0 overflow-hidden">
                          {blog.image ? <img src={blog.image} alt="" className="w-full h-full object-cover" /> : "📝"}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-neutral-900 truncate max-w-sm">{blog.title}</p>
                          <p className="text-xs text-neutral-500">{blog.readTime} · {blog.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><Badge variant="default" size="sm">{blog.category}</Badge></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Badge variant={blog.featured ? "warning" : "default"} size="sm">{blog.featured ? "Featured" : "Regular"}</Badge>
                        <Badge variant={blog.isActive ? "success" : "danger"} size="sm" dot>{blog.isActive ? "Active" : "Inactive"}</Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{formatDate(blog.publishedAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(blog)}>Edit</Button>
                        <Button variant="ghost" size="sm" className="text-error-600" onClick={() => { setSelected(blog); setIsDeleteOpen(true); }}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Modal isOpen={isFormOpen} onClose={() => { setIsFormOpen(false); resetForm(); }} title={selected ? "Edit Blog" : "New Blog"} size="lg">
          <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-2">
            <Input label="Title *" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Blog title" />
            <Input label="Excerpt" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} placeholder="Short summary" />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Content (HTML supported)</label>
              <textarea className="w-full h-40 px-4 py-3 border border-neutral-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="<p>Your blog content here...</p>" />
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
            <Input label="Tags (comma separated)" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="tag1, tag2, tag3" />
            <label className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
              <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
              Mark as Featured
            </label>
            <FileUpload label="Cover Image" value={selected?.image} onChange={setImageFile} />
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => { setIsFormOpen(false); resetForm(); }}>Cancel</Button>
              <Button onClick={handleSubmit} isLoading={createBlog.isPending || updateBlog.isPending}>{selected ? "Update" : "Publish"}</Button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={() => { setIsDeleteOpen(false); resetForm(); }} title="Delete Blog" size="sm">
          {selected && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">Delete <strong>{selected.title}</strong>?</p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => { setIsDeleteOpen(false); resetForm(); }}>Cancel</Button>
                <Button variant="danger" onClick={handleDelete} isLoading={deleteBlog.isPending}>Delete</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default function AdminBlogsPage() {
  return <ProtectedRoute allowedRoles={["admin"]}><AdminBlogsContent /></ProtectedRoute>;
}
