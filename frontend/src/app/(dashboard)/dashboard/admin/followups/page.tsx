"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Select, Modal, Textarea, DataTable, Button, StatCard, SelectTrigger, SelectValue, SelectContent, SelectItem, Card, CardContent } from "@/components/ui";
import { useFollowups, useFollowupStats, useCreateFollowup, useUpdateFollowup, useDeleteFollowup } from "@/features/followup";
import { formatDate } from "@/lib/utils";
import type { Followup } from "@/features/followup/services/followup.service";

const statusBadge: Record<string, { label: string; variant: "primary" | "secondary" | "success" | "warning" | "danger" | "default" }> = {
  pending: { label: "Pending", variant: "warning" },
  completed: { label: "Completed", variant: "success" },
  cancelled: { label: "Cancelled", variant: "default" },
  missed: { label: "Missed", variant: "danger" },
};

const typeIcon: Record<string, string> = {
  call: "📞",
  meeting: "🤝",
  email: "📧",
  reminder: "⏰",
  note: "📝",
};

const priorityBadge: Record<string, { label: string; variant: "success" | "warning" | "danger" }> = {
  low: { label: "Low", variant: "success" },
  medium: { label: "Medium", variant: "warning" },
  high: { label: "High", variant: "danger" },
};

function AdminFollowupsContent() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedFollowup, setSelectedFollowup] = useState<Followup | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editStatus, setEditStatus] = useState("");
  const [editOutcome, setEditOutcome] = useState("");
  const [newFollowup, setNewFollowup] = useState({
    lead: "",
    type: "call",
    subject: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  const { data: statsData } = useFollowupStats();
  const { data: followupsData, isLoading, isFetching } = useFollowups({
    page,
    limit: 10,
    status: statusFilter || undefined,
    type: typeFilter || undefined,
    sortBy: "dueDate",
    sortOrder: "asc",
  });

  const updateFollowup = useUpdateFollowup();
  const deleteFollowup = useDeleteFollowup();

  const stats = statsData?.data;
  const followups = followupsData?.data || [];
  const pagination = followupsData?.pagination;

  const openDetail = (followup: Followup) => {
    setSelectedFollowup(followup);
    setEditStatus(followup.status);
    setEditOutcome(followup.outcome || "");
    setIsDetailOpen(true);
  };

  const handleUpdateStatus = () => {
    if (!selectedFollowup) return;
    updateFollowup.mutate(
      { id: selectedFollowup._id, data: { status: editStatus as any, outcome: editOutcome || undefined } },
      { onSuccess: () => { setIsDetailOpen(false); setSelectedFollowup(null); } }
    );
  };

  const handleCreate = () => {
    if (!newFollowup.subject || !newFollowup.dueDate) return;
    useCreateFollowup().mutate(newFollowup as any, {
      onSuccess: () => { setIsCreateOpen(false); setNewFollowup({ lead: "", type: "call", subject: "", description: "", dueDate: "", priority: "medium" }); }
    });
  };

  const columns = [
    {
      key: "type",
      header: "Type",
      render: (f: Followup) => (
        <span className="text-xl">{typeIcon[f.type]}</span>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      sortable: true,
      render: (f: Followup) => (
        <div>
          <p className="font-medium text-neutral-900">{f.subject}</p>
          <p className="text-xs text-neutral-500">{f.lead?.name}</p>
        </div>
      ),
    },
    {
      key: "dueDate",
      header: "Due Date",
      sortable: true,
      render: (f: Followup) => (
        <div>
          <p className="text-sm text-neutral-700">{formatDate(f.dueDate)}</p>
          <p className="text-xs text-neutral-400">{new Date(f.dueDate).toLocaleTimeString()}</p>
        </div>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      render: (f: Followup) => {
        const badge = priorityBadge[f.priority] || priorityBadge.medium;
        return <Badge variant={badge.variant} size="sm">{badge.label}</Badge>;
      },
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (f: Followup) => {
        const badge = statusBadge[f.status] || statusBadge.pending;
        return <Badge variant={badge.variant} size="sm" dot>{badge.label}</Badge>;
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (f: Followup) => (
        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openDetail(f); }}>
          Manage
        </Button>
      ),
    },
  ];

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Follow-up Management</h1>
            <p className="text-neutral-500 mt-1">Track calls, meetings, and reminders</p>
          </div>
          <Button onClick={() => setIsCreateOpen(true)} leftIcon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }>
            Add Follow-up
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Total" value={stats?.total ?? 0} icon={<span className="text-lg">📋</span>} iconBg="bg-primary-50" />
          <StatCard label="Pending" value={stats?.pending ?? 0} icon={<span className="text-lg">⏳</span>} iconBg="bg-yellow-50" />
          <StatCard label="Completed" value={stats?.completed ?? 0} icon={<span className="text-lg">✅</span>} iconBg="bg-green-50" />
          <StatCard label="Today" value={stats?.todayReminders ?? 0} icon={<span className="text-lg">📅</span>} iconBg="bg-blue-50" />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={followups}
          keyExtractor={(f) => f._id}
          isLoading={isLoading}
          filters={
            <div className="flex gap-2">
              <div className="w-36">
                <Select value={statusFilter} onValueChange={(value) => { setStatusFilter(value); setPage(1); }}>
                  <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="missed">Missed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-36">
                <Select value={typeFilter} onValueChange={(value) => { setTypeFilter(value); setPage(1); }}>
                  <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          }
          pagination={pagination}
          onPageChange={setPage}
          isFetching={isFetching}
          onRowClick={openDetail}
          emptyMessage="No follow-ups found"
          emptyIcon="📅"
        />
      </div>

      {/* Detail Modal */}
      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} title="Follow-up Details" size="lg">
        {selectedFollowup && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-neutral-400 uppercase">Type</p><p className="text-lg">{typeIcon[selectedFollowup.type]} {selectedFollowup.type}</p></div>
              <div><p className="text-xs text-neutral-400 uppercase">Priority</p><Badge variant={priorityBadge[selectedFollowup.priority]?.variant as any}>{selectedFollowup.priority}</Badge></div>
              <div><p className="text-xs text-neutral-400 uppercase">Due Date</p><p className="text-sm font-medium">{formatDate(selectedFollowup.dueDate)}</p></div>
              <div><p className="text-xs text-neutral-400 uppercase">Lead</p><p className="text-sm">{selectedFollowup.lead?.name}</p></div>
            </div>
            <div><p className="text-xs text-neutral-400 uppercase">Subject</p><p className="text-sm font-medium">{selectedFollowup.subject}</p></div>
            {selectedFollowup.description && (
              <div><p className="text-xs text-neutral-400 uppercase">Description</p><p className="text-sm bg-neutral-50 rounded-lg p-3">{selectedFollowup.description}</p></div>
            )}
            <div className="border-t border-neutral-100 pt-4 space-y-4">
              <h3 className="text-sm font-semibold">Update Status</h3>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="missed">Missed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Textarea label="Outcome/Notes" placeholder="Add outcome notes..." value={editOutcome} onChange={(e) => setEditOutcome(e.target.value)} />
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Cancel</Button>
                <Button onClick={handleUpdateStatus} isLoading={updateFollowup.isPending}>Save</Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}

export default function AdminFollowupsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminFollowupsContent />
    </ProtectedRoute>
  );
}