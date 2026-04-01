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
} from "@/components/ui";
import { useUsers, useUpdateUser, useDeleteUser } from "@/features/users";
import { formatDate } from "@/lib/utils";
import type { User, UserRole } from "@/types";

const roleOptions = [
  { label: "All Roles", value: "" },
  { label: "Admin", value: "admin" },
  { label: "Student", value: "student" },
  { label: "College", value: "college" },
  { label: "Teacher", value: "teacher" },
];

const roleBadge: Record<UserRole, { variant: "primary" | "secondary" | "success" | "warning" | "danger" | "default" }> = {
  admin: { variant: "danger" },
  student: { variant: "primary" },
  college: { variant: "secondary" },
  teacher: { variant: "warning" },
};

const roleIcon: Record<UserRole, string> = {
  admin: "👑",
  student: "🎓",
  college: "🏛️",
  teacher: "👨‍🏫",
};

function getStatusBadge(isActive: boolean) {
  return isActive
    ? { label: "Active", variant: "success" as const }
    : { label: "Inactive", variant: "danger" as const };
}

function AdminUsersContent() {
  const { user: currentUser } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data: usersData, isLoading, isFetching } = useUsers({
    page,
    limit: 10,
    search: search || undefined,
    role: roleFilter || undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const users = usersData?.data || [];
  const pagination = usersData?.pagination;

  const openDetail = (user: User) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
  };

  const openDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const handleToggleActive = () => {
    if (!selectedUser) return;
    updateUser.mutate(
      {
        id: selectedUser._id,
        data: { isActive: !selectedUser.isActive },
      },
      {
        onSuccess: () => {
          setSelectedUser((prev) => prev ? { ...prev, isActive: !prev.isActive } : null);
        },
      }
    );
  };

  const handleDelete = () => {
    if (!selectedUser) return;
    deleteUser.mutate(selectedUser._id, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setSelectedUser(null);
      },
    });
  };

  return (
    <DashboardLayout role="admin" userName={currentUser?.name}>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">User Management</h1>
          <p className="text-neutral-500 mt-1">Manage all registered users and their roles.</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Search by name or email..."
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
                  options={roleOptions}
                  value={roleFilter}
                  onChange={(e) => {
                    setRoleFilter(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card padding="none">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="text-4xl mb-3">👥</div>
              <p className="text-neutral-500 font-medium">No users found</p>
              <p className="text-sm text-neutral-400 mt-1">
                {search || roleFilter
                  ? "Try adjusting your filters"
                  : "Users will appear here after registration"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-100">
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">User</th>
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Role</th>
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Joined</th>
                    <th className="text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const rb = roleBadge[user.role] || roleBadge.student;
                    const sb = getStatusBadge(user.isActive);
                    return (
                      <tr
                        key={user._id}
                        className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                              <span className="text-sm font-semibold text-primary-700">
                                {user.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-neutral-900 text-sm truncate">{user.name}</p>
                              <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={rb.variant} size="sm">
                            {roleIcon[user.role]} {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={sb.variant} size="sm" dot>
                            {sb.label}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-neutral-500">{formatDate(user.createdAt)}</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDetail(user)}
                            >
                              View
                            </Button>
                            {user._id !== currentUser?._id && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-error-600 hover:text-error-700 hover:bg-error-50"
                                onClick={() => openDelete(user)}
                              >
                                Delete
                              </Button>
                            )}
                          </div>
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

      {/* User Detail Modal */}
      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title="User Details"
        size="md"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-xl font-semibold text-primary-700">
                  {selectedUser.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">{selectedUser.name}</h3>
                <p className="text-sm text-neutral-500">{selectedUser.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Role</p>
                <Badge variant={roleBadge[selectedUser.role]?.variant || "default"}>
                  {roleIcon[selectedUser.role]} {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Status</p>
                <Badge variant={getStatusBadge(selectedUser.isActive).variant} dot>
                  {getStatusBadge(selectedUser.isActive).label}
                </Badge>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Phone</p>
                <p className="text-sm text-neutral-700">{selectedUser.phone || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Joined</p>
                <p className="text-sm text-neutral-700">{formatDate(selectedUser.createdAt)}</p>
              </div>
            </div>

            {selectedUser._id !== currentUser?._id && (
              <div className="flex justify-end gap-3 pt-2 border-t border-neutral-100">
                <Button
                  variant={selectedUser.isActive ? "outline" : "primary"}
                  onClick={handleToggleActive}
                  isLoading={updateUser.isPending}
                >
                  {selectedUser.isActive ? "Deactivate User" : "Activate User"}
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete User"
        size="sm"
      >
        {selectedUser && (
          <div className="space-y-4">
            <p className="text-sm text-neutral-600">
              Are you sure you want to delete <strong>{selectedUser.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                isLoading={deleteUser.isPending}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}

export default function AdminUsersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminUsersContent />
    </ProtectedRoute>
  );
}
