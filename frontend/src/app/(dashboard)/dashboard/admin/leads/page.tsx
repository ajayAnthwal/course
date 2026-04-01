"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Select, Modal, Textarea, DataTable, Button, StatCard } from "@/components/ui";
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
  const leads = leadsData?.data || [];
  const pagination = leadsData?.pagination;
  const stats = statsData?.data;

  const openDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || "");
    setIsDetailOpen(true);
  };

  const handleUpdateLead = () => {
    if (!selectedLead) return;
    updateLead.mutate(
      { id: selectedLead._id, data: { status: editStatus as LeadStatus, notes: editNotes || undefined } },
      { onSuccess: () => { setIsDetailOpen(false); setSelectedLead(null); } }
    );
  };

  const columns = [
    {
      key: "name",
      header: "Lead",
      sortable: true,
      render: (lead: Lead) => (
        <div>
          <p className="font-medium text-neutral-900">{lead.name}</p>
          <p className="text-xs text-neutral-500">{lead.email}</p>
          <p className="text-xs text-neutral-400">{lead.phone}</p>
        </div>
      ),
    },
    {
      key: "college",
      header: "College",
      render: (lead: Lead) => <p className="text-neutral-700">{getCollegeName(lead.college)}</p>,
    },
    {
      key: "course",
      header: "Course",
      render: (lead: Lead) => <p className="text-neutral-600">{lead.course || "—"}</p>,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (lead: Lead) => {
        const badge = statusBadge[lead.status] || statusBadge.new;
        return <Badge variant={badge.variant} size="sm" dot>{badge.label}</Badge>;
      },
    },
    {
      key: "createdAt",
      header: "Date",
      sortable: true,
      render: (lead: Lead) => <p className="text-neutral-500">{formatDate(lead.createdAt)}</p>,
    },
    {
      key: "actions",
      header: "Actions",
      render: (lead: Lead) => (
        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openDetail(lead); }}>
          Manage
        </Button>
      ),
    },
  ];

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Lead Management</h1>
          <p className="text-neutral-500 mt-1">Track and manage all enquiries and leads.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Total" value={stats?.total ?? 0} icon={<span className="text-lg">📋</span>} iconBg="bg-primary-50" />
          <StatCard label="New" value={stats?.new ?? 0} icon={<span className="text-lg">🆕</span>} iconBg="bg-blue-50" />
          <StatCard label="Interested" value={stats?.interested ?? 0} icon={<span className="text-lg">⭐</span>} iconBg="bg-purple-50" />
          <StatCard label="Admitted" value={stats?.admitted ?? 0} icon={<span className="text-lg">🎓</span>} iconBg="bg-green-50" />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={leads}
          keyExtractor={(l) => l._id}
          isLoading={isLoading}
          searchPlaceholder="Search by name, email, or phone..."
          onSearch={(q) => { setSearch(q); setPage(1); }}
          searchValue={search}
          filters={
            <div className="w-full sm:w-44">
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              />
            </div>
          }
          pagination={pagination}
          onPageChange={setPage}
          isFetching={isFetching}
          onRowClick={openDetail}
          emptyMessage="No leads found"
          emptyIcon="📋"
        />
      </div>

      {/* Detail Modal */}
      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} title="Lead Details" size="lg">
        {selectedLead && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Name</p><p className="text-sm font-medium text-neutral-900">{selectedLead.name}</p></div>
              <div><p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Email</p><p className="text-sm text-neutral-700">{selectedLead.email}</p></div>
              <div><p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Phone</p><p className="text-sm text-neutral-700">{selectedLead.phone}</p></div>
              <div><p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">College</p><p className="text-sm text-neutral-700">{getCollegeName(selectedLead.college)}</p></div>
              <div><p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Course</p><p className="text-sm text-neutral-700">{selectedLead.course || "—"}</p></div>
              <div><p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Source</p><p className="text-sm text-neutral-700 capitalize">{selectedLead.source}</p></div>
            </div>
            {selectedLead.message && (
              <div><p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Message</p><p className="text-sm text-neutral-700 bg-neutral-50 rounded-xl p-3">{selectedLead.message}</p></div>
            )}
            <div className="border-t border-neutral-100 pt-6 space-y-4">
              <h3 className="text-sm font-semibold text-neutral-900">Update Lead</h3>
              <Select label="Status" options={statusOptions.filter((o) => o.value !== "")} value={editStatus} onChange={(e) => setEditStatus(e.target.value as LeadStatus)} />
              <Textarea label="Notes" placeholder="Add internal notes..." value={editNotes} onChange={(e) => setEditNotes(e.target.value)} />
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Cancel</Button>
                <Button onClick={handleUpdateLead} isLoading={updateLead.isPending}>Save Changes</Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}

export default function AdminLeadsPage() {
  return <ProtectedRoute allowedRoles={["admin"]}><AdminLeadsContent /></ProtectedRoute>;
}
