"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from "@/components/ui";
import { useUpdateUser } from "@/features/users";
import { formatDate } from "@/lib/utils";

function TeacherProfileContent() {
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
    <DashboardLayout role="teacher" userName={user?.name}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">My Profile</h1>
          <p className="text-neutral-500 mt-1">View and manage your account information.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-warning-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-warning-700">{user?.name?.charAt(0).toUpperCase()}</span>
                </div>
                <h2 className="text-lg font-semibold text-neutral-900">{user?.name}</h2>
                <p className="text-sm text-neutral-500 mt-1">{user?.email}</p>
                <div className="mt-3"><Badge variant="warning">Teacher</Badge></div>
                <p className="text-xs text-neutral-400 mt-4">Member since {user?.createdAt ? formatDate(user.createdAt) : "N/A"}</p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold text-neutral-900 mb-3">Teaching Stats</h3>
                <div className="space-y-3">
                  {[
                    { label: "Courses", value: "3", icon: "📚" },
                    { label: "Students", value: "135", icon: "👨‍🎓" },
                    { label: "Avg Rating", value: "4.6", icon: "⭐" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-50">
                      <span className="text-sm text-neutral-600">{stat.icon} {stat.label}</span>
                      <span className="text-sm font-semibold text-neutral-900">{stat.value}</span>
                    </div>
                  ))}
                </div>
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
                    <div><p className="text-xs text-neutral-400 uppercase mb-1">Name</p><p className="text-sm font-medium">{user?.name}</p></div>
                    <div><p className="text-xs text-neutral-400 uppercase mb-1">Email</p><p className="text-sm">{user?.email}</p></div>
                    <div><p className="text-xs text-neutral-400 uppercase mb-1">Phone</p><p className="text-sm">{user?.phone || "Not provided"}</p></div>
                    <div><p className="text-xs text-neutral-400 uppercase mb-1">Role</p><Badge variant="warning" size="sm">Teacher</Badge></div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function TeacherProfilePage() {
  return <ProtectedRoute allowedRoles={["teacher"]}><TeacherProfileContent /></ProtectedRoute>;
}
