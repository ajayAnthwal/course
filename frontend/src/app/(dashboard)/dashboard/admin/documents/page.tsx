"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Select, Modal, Textarea, DataTable, Button, StatCard, SelectTrigger, SelectValue, SelectContent, SelectItem, Card, CardContent } from "@/components/ui";
import { formatDate, formatBytes } from "@/lib/utils";
import apiClient from "@/services/axios";
import type { ApiResponse } from "@/types";

interface Document {
  _id: string;
  name: string;
  type: string;
  category: "college" | "user" | "lead" | "payment" | "system";
  fileUrl: string;
  originalName: string;
  mimeType?: string;
  size?: number;
  uploadedBy: { _id: string; name: string; email: string };
  entityId?: string;
  status: "pending" | "approved" | "rejected";
  verifiedBy?: { _id: string; name: string };
  rejectionReason?: string;
  createdAt: string;
}

const categoryIcon: Record<string, string> = {
  college: "🏛️",
  user: "👤",
  lead: "📋",
  payment: "💳",
  system: "⚙️",
};

const statusBadge: Record<string, { label: string; variant: "primary" | "success" | "warning" | "danger" }> = {
  pending: { label: "Pending", variant: "warning" },
  approved: { label: "Approved", variant: "success" },
  rejected: { label: "Rejected", variant: "danger" },
};

export default function DocumentsPage() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [stats, setStats] = useState<any>(null);
  const [filters, setFilters] = useState({ category: "", status: "" });
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<"approved" | "rejected">("approved");
  const [rejectReason, setRejectReason] = useState("");

  const fetchDocuments = async (page = 1) => {
    setLoading(true);
    try {
      const [docsRes, statsRes] = await Promise.all([
        apiClient.get("/documents", { params: { page, limit: pagination.limit, ...filters } }),
        apiClient.get("/documents/stats"),
      ]);
      setDocuments(docsRes.data.data.data || []);
      setPagination(prev => ({ ...prev, ...docsRes.data.data.pagination, page }));
      setStats(statsRes.data.data);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDocuments(); }, []);

  const handleVerify = async () => {
    if (!selectedDoc) return;
    try {
      await apiClient.patch(`/documents/${selectedDoc._id}/verify`, {
        status: verifyStatus,
        reason: verifyStatus === "rejected" ? rejectReason : undefined,
      });
      setIsVerifyOpen(false);
      setSelectedDoc(null);
      setRejectReason("");
      fetchDocuments(pagination.page);
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const openVerify = (doc: Document) => {
    setSelectedDoc(doc);
    setVerifyStatus("approved");
    setRejectReason("");
    setIsVerifyOpen(true);
  };

  const columns = [
    {
      key: "name",
      header: "Document",
      render: (doc: Document) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-lg">
            {categoryIcon[doc.category]}
          </div>
          <div>
            <p className="font-medium text-neutral-900 truncate max-w-xs">{doc.name}</p>
            <p className="text-xs text-neutral-500">{doc.originalName}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (doc: Document) => (
        <Badge variant="secondary" size="sm">{doc.category}</Badge>
      ),
    },
    {
      key: "size",
      header: "Size",
      render: (doc: Document) => (
        <span className="text-sm text-neutral-600">{doc.size ? formatBytes(doc.size) : "—"}</span>
      ),
    },
    {
      key: "uploadedBy",
      header: "Uploaded By",
      render: (doc: Document) => (
        <p className="text-sm text-neutral-700">{doc.uploadedBy?.name}</p>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (doc: Document) => {
        const badge = statusBadge[doc.status];
        return <Badge variant={badge.variant} size="sm" dot>{badge.label}</Badge>;
      },
    },
    {
      key: "createdAt",
      header: "Date",
      render: (doc: Document) => (
        <span className="text-sm text-neutral-500">{formatDate(doc.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (doc: Document) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); window.open(doc.fileUrl, "_blank"); }}>
            View
          </Button>
          {doc.status === "pending" && (
            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openVerify(doc); }}>
              Verify
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Document Management</h1>
          <p className="text-neutral-500 mt-1">Verify and manage uploaded documents</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Total" value={stats?.total ?? 0} icon={<span className="text-lg">📄</span>} iconBg="bg-primary-50" />
          <StatCard label="Pending" value={stats?.pending ?? 0} icon={<span className="text-lg">⏳</span>} iconBg="bg-yellow-50" />
          <StatCard label="Approved" value={stats?.approved ?? 0} icon={<span className="text-lg">✅</span>} iconBg="bg-green-50" />
          <StatCard label="Rejected" value={stats?.rejected ?? 0} icon={<span className="text-lg">❌</span>} iconBg="bg-red-50" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Select value={filters.category} onValueChange={(v) => { setFilters({ ...filters, category: v }); fetchDocuments(1); }}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="lead">Lead</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.status} onValueChange={(v) => { setFilters({ ...filters, status: v }); fetchDocuments(1); }}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={documents}
          keyExtractor={(doc) => doc._id}
          isLoading={loading}
          pagination={pagination}
          onPageChange={fetchDocuments}
          onRowClick={openVerify}
          emptyMessage="No documents found"
          emptyIcon="📄"
        />
      </div>

      {/* Verify Modal */}
      <Modal isOpen={isVerifyOpen} onClose={() => setIsVerifyOpen(false)} title="Verify Document" size="md">
        {selectedDoc && (
          <div className="space-y-4">
            <div className="p-3 bg-neutral-50 rounded-lg">
              <p className="font-medium">{selectedDoc.name}</p>
              <p className="text-sm text-neutral-500">{selectedDoc.originalName}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Verification Status</label>
              <Select value={verifyStatus} onValueChange={(v) => setVerifyStatus(v as any)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">Approve</SelectItem>
                  <SelectItem value="rejected">Reject</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {verifyStatus === "rejected" && (
              <Textarea
                label="Rejection Reason"
                placeholder="Reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            )}

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsVerifyOpen(false)}>Cancel</Button>
              <Button onClick={handleVerify}>Verify</Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}