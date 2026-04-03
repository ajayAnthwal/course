"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Modal, Button, Input, Select, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem, StatCard, Textarea } from "@/components/ui";
import { FileUpload } from "@/components/ui/file-upload";
import { useTestimonials, useCreateTestimonial, useDeleteTestimonial } from "@/features/testimonials/hooks/useTestimonials";
import { formatDate } from "@/lib/utils";
import apiClient from "@/services/axios";
import type { Testimonial } from "@/types";

interface ReviewItem extends Testimonial {
  status: "pending" | "approved" | "rejected";
  isFeatured: boolean;
  rejectionReason?: string;
}

const statusBadge: Record<string, { label: string; variant: "primary" | "success" | "warning" | "danger" }> = {
  pending: { label: "Pending", variant: "warning" },
  approved: { label: "Approved", variant: "success" },
  rejected: { label: "Rejected", variant: "danger" },
};

function AdminTestimonialsContent() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState<Testimonial | null>(null);
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [formData, setFormData] = useState({ name: "", role: "", content: "", college: "", rating: "5" });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { data, isLoading: testimonialsLoading } = useTestimonials();
  const createTestimonial = useCreateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const [reviewsRes, statsRes] = await Promise.all([
        apiClient.get("/testimonials", { params: { status: statusFilter || undefined, limit: 20 } }),
        apiClient.get("/testimonials/stats"),
      ]);
      setReviews(reviewsRes.data.data.data || []);
      setStats(statsRes.data.data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, [statusFilter]);

  const handleApprove = async (id: string) => {
    try {
      await apiClient.patch(`/testimonials/${id}/approve`);
      showToast("Approved");
      fetchReviews();
    } catch (error) {
      showToast("Failed", "error");
    }
  };

  const handleReject = async () => {
    if (!selectedReview) return;
    try {
      await apiClient.patch(`/testimonials/${selectedReview._id}/reject`, { reason: rejectReason });
      showToast("Rejected");
      setIsReviewOpen(false);
      setSelectedReview(null);
      setRejectReason("");
      fetchReviews();
    } catch (error) {
      showToast("Failed", "error");
    }
  };

  const testimonials = data?.data || [];

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.content.trim()) { showToast("Name and content are required", "error"); return; }
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("role", formData.role);
    fd.append("content", formData.content);
    fd.append("college", formData.college);
    fd.append("rating", formData.rating);
    if (avatarFile) fd.append("avatar", avatarFile);

    createTestimonial.mutate(fd, {
      onSuccess: () => { showToast("Testimonial added successfully"); setIsFormOpen(false); setFormData({ name: "", role: "", content: "", college: "", rating: "5" }); setAvatarFile(null); },
      onError: () => showToast("Failed to add testimonial", "error"),
    });
  };

  const ratingOptions = [
    { label: "⭐⭐⭐⭐⭐ (5)", value: "5" },
    { label: "⭐⭐⭐⭐ (4)", value: "4" },
    { label: "⭐⭐⭐ (3)", value: "3" },
    { label: "⭐⭐ (2)", value: "2" },
    { label: "⭐ (1)", value: "1" },
  ];

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Reviews & Ratings</h1>
            <p className="text-neutral-500 mt-1">Manage testimonials and reviews</p>
          </div>
          <Button onClick={() => { setFormData({ name: "", role: "", content: "", college: "", rating: "5" }); setAvatarFile(null); setIsFormOpen(true); }}>+ Add Testimonial</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Total" value={stats?.total ?? 0} icon={<span className="text-lg">⭐</span>} iconBg="bg-primary-50" />
          <StatCard label="Pending" value={stats?.pending ?? 0} icon={<span className="text-lg">⏳</span>} iconBg="bg-yellow-50" />
          <StatCard label="Approved" value={stats?.approved ?? 0} icon={<span className="text-lg">✅</span>} iconBg="bg-green-50" />
          <StatCard label="Avg Rating" value={stats?.averageRating || "0"} icon={<span className="text-lg">★</span>} iconBg="bg-yellow-50" />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 items-center">
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v)}>
            <SelectTrigger className="w-40"><SelectValue placeholder="All Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reviews Table */}
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase">User</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase">Rating</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase">Review</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase">Date</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-neutral-500">Loading...</td></tr>
              ) : reviews.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-neutral-500">No reviews found</td></tr>
              ) : (
                reviews.map((r) => {
                  const badge = statusBadge[r.status] || statusBadge.pending;
                  return (
                    <tr key={r._id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                            <span className="text-sm font-bold text-primary-700">{r.name?.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900">{r.name}</p>
                            <p className="text-xs text-neutral-500">{r.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: r.rating }).map((_, i) => <span key={i} className="text-yellow-400 text-sm">⭐</span>)}
                        </div>
                      </td>
                      <td className="px-6 py-4"><p className="text-sm text-neutral-600 line-clamp-2 max-w-xs">&ldquo;{r.content}&rdquo;</p></td>
                      <td className="px-6 py-4"><Badge variant={badge.variant} size="sm" dot>{badge.label}</Badge></td>
                      <td className="px-6 py-4 text-sm text-neutral-500">{formatDate(r.createdAt)}</td>
                      <td className="px-6 py-4 text-right">
                        {r.status === "pending" && (
                          <>
                            <Button variant="ghost" size="sm" className="text-green-600" onClick={() => handleApprove(r._id)}>Approve</Button>
                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => { setSelectedReview(r); setIsReviewOpen(true); }}>Reject</Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm" className="text-error-600" onClick={() => { setSelectedForDelete(r); setIsDeleteOpen(true); }}>Delete</Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{[1, 2, 3].map((i) => <div key={i} className="bg-white rounded-2xl h-48 animate-pulse border border-neutral-200" />)}</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200">
            <p className="text-6xl mb-4">💬</p><p className="text-neutral-500 mb-4">No testimonials yet.</p>
            <Button onClick={() => setIsFormOpen(true)}>+ Add Testimonial</Button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Student</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Rating</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Content</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Added</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {testimonials.map((t) => (
                  <tr key={t._id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-primary-700">{t.name.split(" ").map(n => n[0]).join("")}</span>
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">{t.name}</p>
                          <p className="text-xs text-neutral-500">{t.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: t.rating }).map((_, i) => <span key={i} className="text-accent-400 text-sm">⭐</span>)}
                      </div>
                    </td>
                    <td className="px-6 py-4"><p className="text-sm text-neutral-600 line-clamp-2 max-w-xs">&ldquo;{t.content}&rdquo;</p></td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{formatDate(t.createdAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-error-600" onClick={() => { setSelectedForDelete(t); setIsDeleteOpen(true); }}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Add Testimonial" size="md">
          <div className="space-y-5">
            <Input label="Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Student name" />
            <Input label="Role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="e.g. B.Tech Student, IIT Delhi" />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Content *</label>
              <textarea className="w-full h-24 px-4 py-3 border border-neutral-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="What the student said about EduPortal..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="College (optional)" value={formData.college} onChange={(e) => setFormData({ ...formData, college: e.target.value })} placeholder="e.g. IIT Delhi" />
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Rating</label>
                <Select value={formData.rating} onValueChange={(value) => setFormData({ ...formData, rating: value })}>
                  <SelectTrigger><SelectValue placeholder="Select rating" /></SelectTrigger>
                  <SelectContent>
                    {ratingOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <FileUpload label="Avatar (optional)" onChange={setAvatarFile} />
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit} isLoading={createTestimonial.isPending}>Add Testimonial</Button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={() => { setIsDeleteOpen(false); setSelectedForDelete(null); }} title="Delete Testimonial" size="sm">
          {selectedForDelete && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">Delete testimonial from <strong>{selectedForDelete.name}</strong>?</p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => { setIsDeleteOpen(false); setSelectedForDelete(null); }}>Cancel</Button>
                <Button variant="danger" onClick={() => deleteTestimonial.mutate(selectedForDelete._id, { onSuccess: () => { showToast("Deleted"); setIsDeleteOpen(false); setSelectedForDelete(null); } })} isLoading={deleteTestimonial.isPending}>Delete</Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Reject Modal */}
        <Modal isOpen={isReviewOpen} onClose={() => { setIsReviewOpen(false); setSelectedReview(null); setRejectReason(""); }} title="Reject Review" size="sm">
          <div className="space-y-4">
            <Textarea label="Reason" placeholder="Why is this being rejected?" value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} />
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => { setIsReviewOpen(false); setSelectedReview(null); setRejectReason(""); }}>Cancel</Button>
              <Button variant="danger" onClick={handleReject}>Reject</Button>
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
