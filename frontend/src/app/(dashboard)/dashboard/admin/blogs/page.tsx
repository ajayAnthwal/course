"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Modal, Button, Input } from "@/components/ui";
import { useBlogs, useCreateBlog, useUpdateBlog, useDeleteBlog } from "@/features/blogs/hooks/useBlogs";
import { formatDate } from "@/lib/utils";
import type { Blog } from "@/types";

function AdminBlogsContent() {
  const { user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({ title: "", excerpt: "", content: "", category: "", author: "", tags: "", featured: false });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data, isLoading } = useBlogs({ limit: "50" });
  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();
  const deleteBlog = useDeleteBlog();

  const blogs = data?.data || [];

  const openCreate = () => {
    setSelected(null);
    setFormData({ title: "", excerpt: "", content: "", category: "", author: user?.name || "Admin", tags: "", featured: false });
    setImageFile(null);
    setIsFormOpen(true);
  };

  const openEdit = (blog: Blog) => {
    setSelected(blog);
    setFormData({ title: blog.title, excerpt: blog.excerpt, content: blog.content, category: blog.category, author: blog.author, tags: blog.tags.join(", "), featured: blog.featured });
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
    fd.append("tags", JSON.stringify(formData.tags.split(",").map(t => t.trim()).filter(Boolean)));
    fd.append("featured", String(formData.featured));
    if (imageFile) fd.append("image", imageFile);

    if (selected) {
      updateBlog.mutate({ id: selected._id, data: fd }, { onSuccess: () => setIsFormOpen(false) });
    } else {
      createBlog.mutate(fd, { onSuccess: () => setIsFormOpen(false) });
    }
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
          <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="bg-white rounded-2xl h-20 animate-pulse" />)}</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-neutral-400"><p className="text-6xl mb-4">✍️</p><p>No blogs yet. Create your first blog post.</p></div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 divide-y divide-neutral-100">
            {blogs.map((blog) => (
              <div key={blog._id} className="flex items-center gap-4 p-4 hover:bg-neutral-50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-2xl shrink-0">
                  {blog.image ? <img src={blog.image} alt="" className="w-full h-full object-cover rounded-xl" /> : "📝"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-neutral-900 truncate">{blog.title}</h3>
                    {blog.featured && <Badge variant="warning" size="sm">Featured</Badge>}
                  </div>
                  <p className="text-xs text-neutral-500">{blog.category} · {blog.readTime} · {formatDate(blog.publishedAt)}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(blog)}>Edit</Button>
                  <Button variant="ghost" size="sm" className="text-error-600" onClick={() => { setSelected(blog); setIsDeleteOpen(true); }}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={selected ? "Edit Blog" : "New Blog"} size="lg">
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <Input label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Blog title" />
            <Input label="Excerpt" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} placeholder="Short summary" />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Content (HTML)</label>
              <textarea className="w-full h-40 px-3 py-2 border border-neutral-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="<p>Your blog content...</p>" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="e.g. Education" />
              <Input label="Author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
            </div>
            <Input label="Tags (comma separated)" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="tag1, tag2" />
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
              <Button onClick={handleSubmit} isLoading={createBlog.isPending || updateBlog.isPending}>{selected ? "Update" : "Publish"}</Button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Blog" size="sm">
          {selected && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">Delete <strong>{selected.title}</strong>?</p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                <Button variant="danger" onClick={() => deleteBlog.mutate(selected._id, { onSuccess: () => setIsDeleteOpen(false) })} isLoading={deleteBlog.isPending}>Delete</Button>
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
