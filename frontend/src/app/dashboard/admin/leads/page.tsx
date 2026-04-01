"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import {
  Card,
  CardContent,
  Button,
  Input,
  Select,
  Badge,
  Spinner,
  Modal,
  Textarea,
} from "@/components/ui";
import { useLeads, useLeadStats, useUpdateLead } from "@/features/leads";
import { formatDate } from "@/lib/utils";
import type { Lead, LeadStatus } from "@/types";

const statusOptions = [
  { label: "All Status", value: "" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Interested", value: "interested" },
  { label: "Admitted", value: "admitted" },
  { label: "Not Interested", value: "not_interested" },
];

const statusBadge: Record<LeadStatus, { label: string; variant: "primary" | "secondary" | "success" | "warning" | "danger" | "default" }> = {
  new: { label: "New", variant: "primary" },
  contacted: { label: "Contacted", variant: "warning" },
  interested: { label: "Interested", variant: "secondary" },
  admitted: { label: "Admitted", variant: "success" },
  not_interested: { label: "Not Interested", variant: "danger" },
};

function getCollegeName(college: Lead["college"]): string {
  if (typeof college === "string") return college;
  return college?.name || "N/A";
}

function AdminLeadsContent() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [editStatus, setEditStatus] = useState<LeadStatus | "">("");
  const [editNotes, setEditNotes] = useState("");

  const { data: statsData } = useLeadStats();
  const { data: leadsData, isLoading, isFetching } = useLeads({
    page,
    limit: 10,
    search: search || undefined,
    status: statusFilter || undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const updateLead = useUpdateLead();

  const stats = statsData?.data;
  const leads = leadsData?.data || [];
  const pagination = leadsData?.pagination;

  const statCards = [
    { label: "Total Leads", value: stats?.total ?? 0, icon: "📋", color: "bg-primary-50 text-primary-700" },
    { label: "New", value: stats?.new ?? 0, icon: "🆕", color: "bg-blue-50 text-blue-700" },
    { label: "Contacted", value: stats?.contacted ?? 0, icon: "📞", color: "bg-yellow-50 text-yellow-700" },
    { label: "Interested", value: stats?.interested ?? 0, icon: "⭐", color: "bg-purple-50 text-purple-700" },
    { label: "Admitted", value: stats?.admitted ?? 0, icon: "🎓", color: "bg-green-50 text-green-700" },
  ];

  const openDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || "");
    setIsDetailOpen(true);
  };

  const handleUpdateLead = () => {
    if (!selectedLead) return;
    updateLead.mutate(
      {
        id: selectedLead._id,
        data: {
          status: editStatus as LeadStatus,
          notes: editNotes || undefined,
        },
      },
      {
        onSuccess: () => {
          setIsDetailOpen(false);
          setSelectedLead(null);
        },
      }
    );
  };

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Lead Management</h1>
            <p className="text-neutral-500 mt-1">Track and manage all enquiries and leads.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.label} hover>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">{stat.label}</p>
                    <p className="text-xl font-bold text-neutral-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                />
              </div>
              <div className="w-full sm:w-48">
                <Select
                  options={statusOptions}
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card padding="none">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : leads.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="text-4xl mb-3">📋</div>
              <p className="text-neutral-500 font-medium">No leads found</p>
              <p className="text-sm text-neutral-400 mt-1">
                {search || statusFilter
                  ? "Try adjusting your filters"
                  : "Leads will appear here when users submit enquiries"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-100">
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Lead</th>
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">College</th>
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Course</th>
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Date</th>
                    <th className="text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => {
                    const badge = statusBadge[lead.status] || statusBadge.new;
                    return (
                      <tr
                        key={lead._id}
                        className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-neutral-900 text-sm">{lead.name}</p>
                            <p className="text-xs text-neutral-500">{lead.email}</p>
                            <p className="text-xs text-neutral-400">{lead.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-neutral-700">{getCollegeName(lead.college)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-neutral-600">{lead.course || "—"}</p>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={badge.variant} size="sm" dot>
                            {badge.label}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-neutral-500">{formatDate(lead.createdAt)}</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDetail(lead)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-100">
              <p className="text-sm text-neutral-500">
                Showing {(pagination.page - 1) * pagination.limit + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1 || isFetching}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm text-neutral-500 px-2">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= pagination.totalPages || isFetching}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Lead Detail Modal */}
      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title="Lead Details"
        size="lg"
      >
        {selectedLead && (
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Name</p>
                <p className="text-sm font-medium text-neutral-900">{selectedLead.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm text-neutral-700">{selectedLead.email}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Phone</p>
                <p className="text-sm text-neutral-700">{selectedLead.phone}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">College</p>
                <p className="text-sm text-neutral-700">{getCollegeName(selectedLead.college)}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Course</p>
                <p className="text-sm text-neutral-700">{selectedLead.course || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Source</p>
                <p className="text-sm text-neutral-700 capitalize">{selectedLead.source}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Submitted</p>
                <p className="text-sm text-neutral-700">{formatDate(selectedLead.createdAt)}</p>
              </div>
            </div>

            {/* Message */}
            {selectedLead.message && (
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Message</p>
                <p className="text-sm text-neutral-700 bg-neutral-50 rounded-xl p-3">{selectedLead.message}</p>
              </div>
            )}

            {/* Update Fields */}
            <div className="border-t border-neutral-100 pt-6 space-y-4">
              <h3 className="text-sm font-semibold text-neutral-900">Update Lead</h3>
              <Select
                label="Status"
                options={statusOptions.filter((o) => o.value !== "")}
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as LeadStatus)}
              />
              <Textarea
                label="Notes"
                placeholder="Add internal notes..."
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
              />
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateLead}
                  isLoading={updateLead.isPending}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}

export default function AdminLeadsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLeadsContent />
    </ProtectedRoute>
  );
}
