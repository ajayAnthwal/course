"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, Button, Input, Modal, Textarea, useToast, Badge } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import apiClient from "@/services/axios";

const RESOURCES = ["users", "colleges", "leads", "payments", "notifications", "analytics", "settings", "courses", "applications", "profile"];
const ACTIONS = ["create", "read", "update", "delete"];

const defaultPermissions: Record<string, { resource: string; actions: string[] }[]> = {
  admin: [
    { resource: "users", actions: ["create", "read", "update", "delete"] },
    { resource: "colleges", actions: ["create", "read", "update", "delete"] },
    { resource: "leads", actions: ["create", "read", "update", "delete"] },
    { resource: "payments", actions: ["create", "read", "update", "delete"] },
    { resource: "notifications", actions: ["create", "read", "update", "delete"] },
    { resource: "analytics", actions: ["read"] },
    { resource: "settings", actions: ["read", "update"] },
  ],
  student: [
    { resource: "colleges", actions: ["read"] },
    { resource: "applications", actions: ["create", "read"] },
    { resource: "profile", actions: ["read", "update"] },
  ],
  teacher: [
    { resource: "courses", actions: ["read", "update"] },
    { resource: "students", actions: ["read"] },
    { resource: "profile", actions: ["read", "update"] },
  ],
  college: [
    { resource: "leads", actions: ["read", "update"] },
    { resource: "courses", actions: ["create", "read", "update"] },
    { resource: "profile", actions: ["read", "update"] },
  ],
  parent: [
    { resource: "students", actions: ["read"] },
    { resource: "applications", actions: ["read"] },
    { resource: "profile", actions: ["read", "update"] },
  ],
};

export default function RolesPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", description: "", permissions: [] as { resource: string; actions: string[] }[] });
  const [saving, setSaving] = useState(false);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/roles");
      setRoles(response.data.data.data || []);
    } catch (error) {
      setRoles(Object.keys(defaultPermissions).map(name => ({
        name,
        description: `Default ${name} role`,
        permissions: defaultPermissions[name as keyof typeof defaultPermissions],
        isDefault: true,
      })));
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (selectedRole) {
        await apiClient.patch(`/roles/${selectedRole._id}`, formData);
        showToast("Role updated successfully", "success");
      } else {
        await apiClient.post("/roles", formData);
        showToast("Role created successfully", "success");
      }
      setIsFormOpen(false);
      setSelectedRole(null);
      setFormData({ name: "", description: "", permissions: [] });
      fetchRoles();
    } catch (error: any) {
      showToast(error.response?.data?.message || "Failed to save role", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (roleId: string) => {
    if (!confirm("Are you sure you want to delete this role?")) return;
    try {
      await apiClient.delete(`/roles/${roleId}`);
      showToast("Role deleted successfully", "success");
      fetchRoles();
    } catch (error: any) {
      showToast(error.response?.data?.message || "Failed to delete role", "error");
    }
  };

  const togglePermission = (resource: string, action: string) => {
    const existing = formData.permissions.find(p => p.resource === resource);
    if (existing) {
      if (existing.actions.includes(action)) {
        existing.actions = existing.actions.filter(a => a !== action);
        if (existing.actions.length === 0) {
          setFormData({ ...formData, permissions: formData.permissions.filter(p => p.resource !== resource) });
        }
      } else {
        existing.actions = [...existing.actions, action];
      }
    } else {
      setFormData({ ...formData, permissions: [...formData.permissions, { resource, actions: [action] }] });
    }
  };

  const openEdit = (role: any) => {
    setSelectedRole(role);
    setFormData({ name: role.name, description: role.description || "", permissions: role.permissions || [] });
    setIsFormOpen(true);
  };

  const openCreate = () => {
    setSelectedRole(null);
    setFormData({ name: "", description: "", permissions: [] });
    setIsFormOpen(true);
  };

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Role & Permission Management</h1>
            <p className="text-neutral-500 mt-1">Manage roles and their permissions</p>
          </div>
          <Button onClick={openCreate}>Create Role</Button>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-neutral-500 col-span-3 text-center py-8">Loading...</p>
          ) : (
            roles.map((role) => (
              <Card key={role._id || role.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 capitalize">{role.name}</h3>
                      <p className="text-sm text-neutral-500">{role.description || "No description"}</p>
                    </div>
                    {role.isDefault && <Badge variant="secondary">Default</Badge>}
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-medium text-neutral-500 uppercase mb-2">Permissions ({role.permissions?.length || 0})</p>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions?.slice(0, 4).map((p: any, i: number) => (
                        <span key={i} className="text-xs bg-neutral-100 px-2 py-1 rounded">{p.resource}</span>
                      ))}
                      {role.permissions?.length > 4 && <span className="text-xs text-neutral-500">+{role.permissions.length - 4} more</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(role)} className="flex-1">Edit</Button>
                    {!role.isDefault && <Button variant="ghost" size="sm" onClick={() => handleDelete(role._id)} className="text-red-600">Delete</Button>}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Role Form Modal */}
        <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={selectedRole ? "Edit Role" : "Create Role"} size="lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Role Name</label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., moderator" disabled={selectedRole?.isDefault} />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Role description" rows={2} />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Permissions</label>
              <div className="border border-neutral-200 rounded-lg max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-neutral-50 sticky top-0">
                    <tr>
                      <th className="text-left px-3 py-2 font-medium text-neutral-600">Resource</th>
                      {ACTIONS.map(action => <th key={action} className="text-center px-2 py-2 font-medium text-neutral-600 capitalize">{action}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {RESOURCES.map(resource => {
                      const perm = formData.permissions.find(p => p.resource === resource);
                      return (
                        <tr key={resource} className="border-t border-neutral-100">
                          <td className="px-3 py-2 font-medium text-neutral-700 capitalize">{resource}</td>
                          {ACTIONS.map(action => (
                            <td key={action} className="text-center px-2 py-2">
                              <input type="checkbox" checked={perm?.actions?.includes(action) || false} onChange={() => togglePermission(resource, action)} className="w-4 h-4 rounded border-neutral-300 text-primary-600" />
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} isLoading={saving}>{selectedRole ? "Update" : "Create"} Role</Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}