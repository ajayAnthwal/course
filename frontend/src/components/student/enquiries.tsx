"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/features/auth";
import {
  Card,
  CardContent,
  Button,
  Badge,
  Spinner,
  Modal,
} from "@/components/ui";
import { useLeads } from "@/features/leads";
import { formatDate } from "@/lib/utils";
import type { Lead, LeadStatus } from "@/types";
import { FiPlus, FiFileText, FiMail, FiPhone, FiMessageCircle, FiCalendar, FiEye, FiX } from "react-icons/fi";

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

export function StudentEnquiries() {
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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Enquiries</h1>
          <p className="text-sm text-gray-600 mt-1">Track the status of your college enquiries.</p>
        </div>
        <Link href="/colleges">
          <Button leftIcon={<FiPlus className="w-4 h-4" />}>
            New Enquiry
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Filter:</span>
            <div className="w-48">
              <select
                className="w-full h-10 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card padding="none">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <FiFileText className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">No enquiries found</p>
            <p className="text-sm text-gray-500 mt-1">
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
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">College</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Course</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Date</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => {
                  const badge = statusBadge[lead.status] || statusBadge.new;
                  const collegeId = getCollegeId(lead.college);
                  return (
                    <tr
                      key={lead._id}
                      className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{getCollegeName(lead.college)}</p>
                          {collegeId && (
                            <Link
                              href={`/colleges/${collegeId}`}
                              className="text-xs text-indigo-600 hover:text-indigo-700"
                            >
                              View college
                            </Link>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{lead.course || "General enquiry"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={badge.variant} size="sm" dot>
                          {badge.label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500">{formatDate(lead.createdAt)}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" onClick={() => openDetail(lead)}>
                          <FiEye className="w-4 h-4 mr-1" /> View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
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
              <span className="text-sm text-gray-500 px-2">
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
                <h3 className="text-lg font-semibold text-gray-900">{getCollegeName(selectedLead.college)}</h3>
                <p className="text-sm text-gray-500">Submitted on {formatDate(selectedLead.createdAt)}</p>
              </div>
              <Badge variant={statusBadge[selectedLead.status]?.variant || "default"} size="md" dot>
                {statusBadge[selectedLead.status]?.label || selectedLead.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <FiFileText className="w-3 h-3" /> Your Name
                </p>
                <p className="text-sm font-medium text-gray-900">{selectedLead.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <FiMail className="w-3 h-3" /> Email
                </p>
                <p className="text-sm text-gray-600">{selectedLead.email}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <FiPhone className="w-3 h-3" /> Phone
                </p>
                <p className="text-sm text-gray-600">{selectedLead.phone}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <FiMessageCircle className="w-3 h-3" /> Course
                </p>
                <p className="text-sm text-gray-600">{selectedLead.course || "—"}</p>
              </div>
            </div>

            {selectedLead.message && (
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <FiMessageCircle className="w-3 h-3" /> Your Message
                </p>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3">{selectedLead.message}</p>
              </div>
            )}

            {selectedLead.notes && (
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <FiFileText className="w-3 h-3" /> Admin Notes
                </p>
                <p className="text-sm text-gray-600 bg-indigo-50 rounded-xl p-3">{selectedLead.notes}</p>
              </div>
            )}

            {selectedLead.followUpDate && (
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <FiCalendar className="w-3 h-3" /> Follow-up Date
                </p>
                <p className="text-sm text-gray-600">{formatDate(selectedLead.followUpDate)}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}