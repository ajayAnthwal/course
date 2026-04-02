"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from "@/components/ui";
import { useUpdateUser } from "@/features/users";
import { formatDate } from "@/lib/utils";

function AdminSettingsContent() {
  const { user } = useAuth();
  const updateUser = useUpdateUser();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "" });

  const handleSave = () => {
    if (!user) return;
    updateUser.mutate(
      { id: user._id, data: { name: form.name, phone: form.phone || undefined } },
      { onSuccess: () => setIsEditing(false) }
    );
  };

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Admin Settings</h1>
          <p className="text-neutral-500 mt-1">Manage your account settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-error-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-error-700">{user?.name?.charAt(0).toUpperCase()}</span>
                </div>
                <h2 className="text-lg font-semibold text-neutral-900">{user?.name}</h2>
                <p className="text-sm text-neutral-500 mt-1">{user?.email}</p>
                <div className="mt-3"><Badge variant="danger">Admin</Badge></div>
                <p className="text-xs text-neutral-500 mt-4">Member since {user?.createdAt ? formatDate(user.createdAt) : "N/A"}</p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Account Information</CardTitle>
                  {!isEditing && <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>}
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <Input label="Full Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                    <Input label="Phone" type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
                    <div className="flex justify-end gap-3 pt-2">
                      <Button variant="outline" onClick={() => { setForm({ name: user?.name || "", phone: user?.phone || "" }); setIsEditing(false); }}>Cancel</Button>
                      <Button onClick={handleSave} isLoading={updateUser.isPending}>Save</Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Name</p><p className="text-sm font-semibold text-neutral-900">{user?.name}</p></div>
                    <div><p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Email</p><p className="text-sm font-medium text-neutral-900">{user?.email}</p></div>
                    <div><p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Phone</p><p className="text-sm font-medium text-neutral-900">{user?.phone || "Not provided"}</p></div>
                    <div><p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Role</p><Badge variant="danger" size="sm">Admin</Badge></div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader><CardTitle>Platform Configuration</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "SMS Provider", value: "Configured via env", status: "Active" },
                    { label: "Payment Gateway", value: "Razorpay (stubbed)", status: "Pending" },
                    { label: "Email Service", value: "Not configured", status: "Inactive" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3 rounded-lg border border-neutral-100">
                      <div><p className="text-sm font-medium text-neutral-900">{item.label}</p><p className="text-xs text-neutral-500">{item.value}</p></div>
                      <Badge variant={item.status === "Active" ? "success" : item.status === "Pending" ? "warning" : "default"} size="sm" dot>{item.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function AdminSettingsPage() {
  return <ProtectedRoute allowedRoles={["admin"]}><AdminSettingsContent /></ProtectedRoute>;
}
