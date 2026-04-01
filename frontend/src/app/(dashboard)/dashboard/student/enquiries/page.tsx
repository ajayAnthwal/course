"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import {
  Card,
  CardContent,
  Button,
  Badge,
  Spinner,
  Modal,
  Select,
} from "@/components/ui";
import { useLeads } from "@/features/leads";
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

function getCollegeId(college: Lead["college"]): string | null {
  if (typeof college === "string") return college;
  return college?._id || null;
}

function StudentEnquiriesContent() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { data: leadsData, isLoading, isFetching } = useLeads({
    page,
    limit: 10,
    status: statusFilter || undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const leads = leadsData?.data || [];
  const pagination = leadsData?.pagination;

  const openDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailOpen(true);
  };

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">My Enquiries</h1>
            <p className="text-neutral-500 mt-1">Track the status of your college enquiries.</p>
          </div>
          <Link href="/colleges">
            <Button leftIcon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }>
              New Enquiry
            </Button>
          </Link>
        </div>

        {/* Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-500">Filter:</span>
              <div className="w-48">
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

        {/* Enquiries List */}
        <Card padding="none">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : leads.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="text-4xl mb-3">📋</div>
              <p className="text-neutral-500 font-medium">No enquiries found</p>
              <p className="text-sm text-neutral-400 mt-1">
                {statusFilter ? "Try a different filter" : "Start by exploring colleges and sending an enquiry"}
              </p>
              {!statusFilter && (
                <Link href="/colleges">
                  <Button className="mt-4">Browse Colleges</Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-100">
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
                    const collegeId = getCollegeId(lead.college);
                    return (
                      <tr
                        key={lead._id}
                        className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-neutral-900 text-sm">{getCollegeName(lead.college)}</p>
                            {collegeId && (
                              <Link
                                href={`/colleges/${collegeId}`}
                                className="text-xs text-primary-600 hover:text-primary-700"
                              >
                                View college
                              </Link>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-neutral-600">{lead.course || "General enquiry"}</p>
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
                          <Button variant="ghost" size="sm" onClick={() => openDetail(lead)}>
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

      {/* Detail Modal */}
      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title="Enquiry Details"
        size="md"
      >
        {selectedLead && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">{getCollegeName(selectedLead.college)}</h3>
                <p className="text-sm text-neutral-500">Submitted on {formatDate(selectedLead.createdAt)}</p>
              </div>
              <Badge variant={statusBadge[selectedLead.status]?.variant || "default"} size="md" dot>
                {statusBadge[selectedLead.status]?.label || selectedLead.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Your Name</p>
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
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Course</p>
                <p className="text-sm text-neutral-700">{selectedLead.course || "—"}</p>
              </div>
            </div>

            {selectedLead.message && (
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Your Message</p>
                <p className="text-sm text-neutral-700 bg-neutral-50 rounded-xl p-3">{selectedLead.message}</p>
              </div>
            )}

            {selectedLead.notes && (
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Admin Notes</p>
                <p className="text-sm text-neutral-700 bg-primary-50 rounded-xl p-3">{selectedLead.notes}</p>
              </div>
            )}

            {selectedLead.followUpDate && (
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Follow-up Date</p>
                <p className="text-sm text-neutral-700">{formatDate(selectedLead.followUpDate)}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}

export default function StudentEnquiriesPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentEnquiriesContent />
    </ProtectedRoute>
  );
}
