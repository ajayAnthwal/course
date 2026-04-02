"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Badge, Select, Modal, DataTable, Button, useToast } from "@/components/ui";
import { useUsers, useUpdateUser, useDeleteUser } from "@/features/users";
import { formatDate } from "@/lib/utils";
import type { User, UserRole } from "@/types";

const roleOptions = [
  { label: "All Roles", value: "" },
  { label: "Admin", value: "admin" },
  { label: "Student", value: "student" },
  { label: "College", value: "college" },
  { label: "Teacher", value: "teacher" },
  { label: "Parent", value: "parent" },
];

const roleBadge: Record<UserRole, { variant: "danger" | "primary" | "secondary" | "warning" | "default" }> = {
  admin: { variant: "danger" },
  student: { variant: "primary" },
  college: { variant: "secondary" },
  teacher: { variant: "warning" },
  parent: { variant: "default" },
};

const roleIcon: Record<UserRole, string> = {
  admin: "👑", student: "🎓", college: "🏛️", teacher: "👨‍🏫", parent: "👨‍👩‍👧",
};

function AdminUsersContent() {
  const { user: currentUser } = useAuth();
  const { showToast } = useToast();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [newRole, setNewRole] = useState("");

  const { data: usersData, isLoading, isFetching } = useUsers({
    page, limit: 10, search: search || undefined, role: roleFilter || undefined, sortBy: "createdAt", sortOrder: "desc",
  });
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const users = usersData?.data || [];
  const pagination = usersData?.pagination;

  const columns = [
    {
      key: "name", header: "User", sortable: true,
      render: (u: User) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
            <span className="text-sm font-semibold text-primary-700">{u.name?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="min-w-0">
            <p className="font-medium text-neutral-900 truncate">{u.name}</p>
            <p className="text-xs text-neutral-500 truncate">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role", header: "Role", sortable: true,
      render: (u: User) => (
        <Badge variant={roleBadge[u.role]?.variant || "default"} size="sm">
          {roleIcon[u.role]} {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
        </Badge>
      ),
    },
    {
      key: "isActive", header: "Status",
      render: (u: User) => (
        <Badge variant={u.isActive ? "success" : "danger"} size="sm" dot>
          {u.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "createdAt", header: "Joined", sortable: true,
      render: (u: User) => <p className="text-neutral-500">{formatDate(u.createdAt)}</p>,
    },
    {
      key: "actions", header: "Actions",
      render: (u: User) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedUser(u); setIsDetailOpen(true); }}>View</Button>
          {u._id !== currentUser?._id && (
            <Button variant="ghost" size="sm" className="text-error-600 hover:text-error-700" onClick={(e) => { e.stopPropagation(); setSelectedUser(u); setIsDeleteOpen(true); }}>Delete</Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout role="admin" userName={currentUser?.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">User Management</h1>
          <p className="text-neutral-500 mt-1">Manage all registered users and their roles.</p>
        </div>

        <DataTable
          columns={columns}
          data={users}
          keyExtractor={(u) => u._id}
          isLoading={isLoading}
          searchPlaceholder="Search by name or email..."
          onSearch={(q) => { setSearch(q); setPage(1); }}
          searchValue={search}
          filters={
            <div className="w-full sm:w-44">
              <Select options={roleOptions} value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }} />
            </div>
          }
          pagination={pagination}
          onPageChange={setPage}
          isFetching={isFetching}
          emptyMessage="No users found"
          emptyIcon="👥"
        />
      </div>

      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} title="User Details" size="md">
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center">
                <span className="text-xl font-semibold text-primary-700">{selectedUser.name?.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">{selectedUser.name}</h3>
                <p className="text-sm text-neutral-500">{selectedUser.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Role</p><Badge variant={roleBadge[selectedUser.role]?.variant || "default"}>{roleIcon[selectedUser.role]} {selectedUser.role}</Badge></div>
              <div><p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Status</p><Badge variant={selectedUser.isActive ? "success" : "danger"} dot>{selectedUser.isActive ? "Active" : "Inactive"}</Badge></div>
              <div><p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Phone</p><p className="text-sm text-neutral-700">{selectedUser.phone || "—"}</p></div>
              <div><p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Joined</p><p className="text-sm text-neutral-700">{formatDate(selectedUser.createdAt)}</p></div>
            </div>
            {selectedUser._id !== currentUser?._id && (
              <div className="flex justify-end gap-3 pt-2 border-t border-neutral-100">
                <div className="flex-1">
                  <Select
                    label="Change Role"
                    options={[{ label: "Admin", value: "admin" }, { label: "Student", value: "student" }, { label: "College", value: "college" }, { label: "Teacher", value: "teacher" }]}
                    value={newRole || selectedUser.role}
                    onChange={(e) => setNewRole(e.target.value)}
                  />
                </div>
                {newRole && newRole !== selectedUser.role && (
                  <Button className="self-end" onClick={() => updateUser.mutate({ id: selectedUser._id, data: { role: newRole } }, { onSuccess: () => { showToast("Role updated to " + newRole); setSelectedUser((prev) => prev ? { ...prev, role: newRole as UserRole } : null); setNewRole(""); } })} isLoading={updateUser.isPending}>
                    Update Role
                  </Button>
                )}
                <Button variant={selectedUser.isActive ? "outline" : "primary"} className="self-end" onClick={() => updateUser.mutate({ id: selectedUser._id, data: { isActive: !selectedUser.isActive } }, { onSuccess: () => { showToast(selectedUser.isActive ? "User deactivated" : "User activated"); setSelectedUser((prev) => prev ? { ...prev, isActive: !prev.isActive } : null); } })} isLoading={updateUser.isPending}>
                  {selectedUser.isActive ? "Deactivate" : "Activate"}
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete User" size="sm">
        {selectedUser && (
          <div className="space-y-4">
            <p className="text-sm text-neutral-600">Are you sure you want to delete <strong>{selectedUser.name}</strong>? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => deleteUser.mutate(selectedUser._id, { onSuccess: () => { setIsDeleteOpen(false); setSelectedUser(null); showToast("User deleted"); } })} isLoading={deleteUser.isPending}>Delete</Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}

export default function AdminUsersPage() {
  return <ProtectedRoute allowedRoles={["admin"]}><AdminUsersContent /></ProtectedRoute>;
}
